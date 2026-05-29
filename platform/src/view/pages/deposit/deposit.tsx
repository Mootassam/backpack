import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import method from "src/modules/depositMethod/list/depositMethodListActions";
import selectors from "src/modules/depositMethod/list/depositMethodSelectors";
import depositActions from "src/modules/deposit/form/depositFormActions";
import depositFormSelectors from "src/modules/deposit/form/depositFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";

// Currency configurations
const CURRENCIES = [
  "USDT", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum deposit in USD
const MIN_DEPOSIT_USD = 100;

// Decimal places for each currency
const CURRENCY_DECIMALS = {
  USDT: 2,
  ETH: 6,
  BTC: 8,
  USDC: 2,
  DAI: 2,
  SHIB: 0,
  XRP: 2,
  TRX: 2,
  SOL: 4,
  BNB: 6,
  DOGE: 2,
};

interface CurrencyType {
  _id?: string;
  name?: string;
  symbol?: string;
  network?: any[];
  address?: string;
  minDeposit?: number;
  minimumAmount?: number;
  [key: string]: any;
}

// Helper to format numbers consistently - MOVED TO TOP LEVEL
const formatNumberHelper = (value: number, symbol?: string, decimals?: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "0";
  }
  
  const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[symbol?.toUpperCase()] || 2);
  
  // For very small numbers, show more precision but not scientific notation
  if (value > 0 && value < 0.000001) {
    return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
  }
  
  // For regular numbers
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

// Helper to format USD values - MOVED TO TOP LEVEL
const formatUSDHelper = (value: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "$0.00";
  }
  
  // For very small USD values, show more precision
  if (value > 0 && value < 0.01) {
    return `$${value.toFixed(6)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};

function Deposit() {
  const dispatch = useDispatch();
  const params = useParams();
  const symbol = (params?.id || "").toString();

  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const showSuccessModal = useSelector(depositFormSelectors.selectDepositModal);

  const [showToast, setShowToast] = useState(false);
  const [copiedText, setCopiedText] = useState("Address copied");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType | null>(null);
  const [networkOptions, setNetworkOptions] = useState<Array<{ _id: string; name: string; wallet: string; raw: any }>>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [minDepositAmount, setMinDepositAmount] = useState(0);
  const [submittedAmount, setSubmittedAmount] = useState("");

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoadingRates(true);
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/pricemulti",
          {
            params: {
              fsyms: CURRENCIES.join(","),
              tsyms: "USD",
            },
          }
        );
        
        if (response.data && response.data.Response !== "Error") {
          const rates: Record<string, number> = {};
          CURRENCIES.forEach(currency => {
            if (response.data[currency]?.USD) {
              rates[currency] = response.data[currency].USD;
            }
          });
          setExchangeRates(rates);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate minimum deposit in selected currency
  const minInCurrency = useMemo(() => {
    if (!symbol || !exchangeRates[symbol.toUpperCase()]) return 0;
    const rate = exchangeRates[symbol.toUpperCase()];
    return MIN_DEPOSIT_USD / rate;
  }, [symbol, exchangeRates]);

  // Format minimum amount for display
  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumberHelper(minInCurrency, symbol);
  }, [minInCurrency, symbol]);

  // Dynamic validation schema based on minInCurrency - FIXED: Use formattedMinAmount directly
  const schema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required")
        .min(minInCurrency || 0, `Minimum deposit is ${formattedMinAmount} ${symbol}`),
      txid: yup.string().required("Transaction ID is required"),
    });
  }, [minInCurrency, formattedMinAmount, symbol]);

  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      txid: "",
    },
  });

  // Memoized version of formatNumber for component use
  const formatNumber = useCallback((value: number, decimals?: number) => {
    return formatNumberHelper(value, symbol, decimals);
  }, [symbol]);

  // Memoized version of formatUSD for component use
  const formatUSD = useCallback((value: number) => {
    return formatUSDHelper(value);
  }, []);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // When listMethod or symbol changes, find currency and setup network options
  useEffect(() => {
    if (!listMethod || !symbol) {
      return;
    }

    // Find currency by symbol (case-insensitive)
    const currency = listMethod.find((item) => {
      if (!item || !item.symbol) return false;
      return item.symbol.toString().toLowerCase() === symbol.toString().toLowerCase();
    });

    if (!currency) {
      // No matching currency found
      setCurrentCurrency(null);
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
      return;
    }

    setCurrentCurrency(currency);

    // Update min deposit amount
    setMinDepositAmount(minInCurrency);

    // Normalize networks
    if (Array.isArray(currency.network) && currency.network.length > 0) {
      const normalized = currency.network.map((n, idx) => ({
        _id: n._id ?? `${currency._id ?? symbol}-network-${idx}`,
        name: n.name ?? n.network ?? `${currency.name ?? symbol} Network`,
        wallet: n.wallet ?? n.address ?? n.depositAddress ?? "",
        raw: n,
      }));
      setNetworkOptions(normalized);

      // default to first network's id (or keep the current selectedNetwork if it exists in normalized)
      const defaultNet = normalized.find(n => n._id === selectedNetwork) || normalized[0];
      setSelectedNetwork(defaultNet._id);
      setCurrentAddress(defaultNet.wallet || "");
    } else if (currency.address) {
      // Currency has a direct address (no separate networks)
      const single = {
        _id: currency._id ?? `${symbol}-single`,
        name: `${currency.name ?? symbol} Network`,
        wallet: currency.address,
        raw: null,
      };
      setNetworkOptions([single]);
      setSelectedNetwork(single._id);
      setCurrentAddress(single.wallet || "");
    } else {
      // No networks and no direct address
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
    }
  }, [listMethod, symbol, minInCurrency]);

  // Update currentAddress when selectedNetwork changes
  useEffect(() => {
    if (!selectedNetwork) {
      return;
    }
    const found = networkOptions.find((n) => n._id === selectedNetwork);
    if (found) {
      setCurrentAddress(found.wallet || "");
    }
  }, [selectedNetwork, networkOptions]);

  // Copy address to clipboard with feedback
  const copyAddressToClipboard = useCallback(async () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(currentAddress);
      setCopiedText("Address copied");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy address: ", err);
      setCopiedText("Failed to copy address");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [currentAddress]);

  // Save QR code as PNG
  const saveQRCode = useCallback(() => {
    const canvas = document.querySelector(".qr-box canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("QR canvas not found");
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      const link = document.createElement("a");
      const networkNameSafe = (networkOptions.find(n => n._id === selectedNetwork)?.name || "deposit").replace(/\s+/g, "-");
      link.download = `${symbol}-${networkNameSafe}-address.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCopiedText("QR code saved");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to save QR code", err);
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [networkOptions, selectedNetwork, symbol]);

  // Handle network selection change
  const handleNetworkSelect = useCallback((event) => {
    const networkId = event.target.value;
    setSelectedNetwork(networkId);
    // clear amount to avoid mismatched validation if min changes
    formMethods.setValue("amount", "");
    formMethods.clearErrors("amount");
  }, [formMethods]);

  // Handle form submit
  const onSubmit = useCallback(async (data) => {
    if (!selectedNetwork || !currentCurrency || !currentAddress) {
      console.error("Missing required information");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
      const orderno = `RE${year}${month}${day}${randomDigits}`;
      const depositData = {
        orderno,
        amount: data.amount,
        txid: data.txid,
        rechargechannel: symbol,
        status: "pending",
        network: selectedNetwork,
        rechargetime: now.toISOString()
      };

      setSubmittedAmount(data.amount);

      await dispatch(depositActions.doCreate(depositData));

      formMethods.reset();
    } catch (error) {
      console.error("Deposit submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedNetwork, currentCurrency, currentAddress, symbol, dispatch, formMethods]);

  const handleCloseModal = useCallback(() => {
    dispatch(depositActions.doClose());
    setSubmittedAmount("");
  }, [dispatch]);

  // Get currency icon URL
  const getCurrencyIcon = useCallback((sym: string) => {
    const cleanSymbol = sym ? sym.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  // Calculate USD value of entered amount
  const enteredAmount = formMethods.watch("amount");
  const enteredAmountUSD = useMemo(() => {
    if (!enteredAmount || !exchangeRates[symbol?.toUpperCase()]) return 0;
    const amountNum = Number(enteredAmount);
    if (isNaN(amountNum) || !isFinite(amountNum)) return 0;
    return amountNum * exchangeRates[symbol.toUpperCase()];
  }, [enteredAmount, symbol, exchangeRates]);

  return (
    <div className="deposit-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/deposit" className="back-arrow" aria-label="Back to deposits">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Deposit {symbol || "..."}</div>
        </div>
      </div>

      {/* Content */}
      <div className="content-card">
        <div className="deposit-content">
          {/* Minimum deposit requirement */}
          {symbol && exchangeRates[symbol.toUpperCase()] && (
            <div className="info-box">
              <div className="info-row">
                <span className="info-label">Minimum deposit:</span>
                <span className="info-value">
                  {formattedMinAmount} {symbol} ({formatUSD(MIN_DEPOSIT_USD)})
                </span>
              </div>
              {loadingRates && (
                <div className="rate-loading">
                  <i className="fas fa-spinner fa-spin" /> Loading rates...
                </div>
              )}
            </div>
          )}

          {/* Currency display */}
          <div className="section">
            <div className="section-label">Deposit currency</div>
            <div className="currency-display">
              <div className="currency-icon" aria-hidden>
                <img
                  src={getCurrencyIcon(symbol)}
                  alt={symbol}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      parent.textContent = (symbol && symbol.charAt(0)) || "C";
                      parent.style.background = "#f0f0f0";
                      parent.style.color = "#333";
                      parent.style.fontSize = "12px";
                      parent.style.fontWeight = "bold";
                      parent.style.display = "inline-flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.style.width = "36px";
                      parent.style.height = "36px";
                      parent.style.borderRadius = "6px";
                    }
                  }}
                />
              </div>
              <div className="currency-details">
                <div className="currency-name">{currentCurrency?.name || symbol}</div>
                {exchangeRates[symbol?.toUpperCase()] && (
                  <div className="currency-rate">
                    1 {symbol} ≈ {formatUSD(exchangeRates[symbol.toUpperCase()])}
                  </div>
                )}
              </div>
            </div>
            <div className="section-note">Fixed currency - cannot be changed</div>
          </div>

          {/* Network select */}
          {networkOptions.length > 0 && (
            <div className="section">
              <div className="section-label">Deposit network</div>
              <div className="network-select-wrapper">
                <select
                  className="network-select"
                  value={selectedNetwork || ""}
                  onChange={handleNetworkSelect}
                  aria-label="Select deposit network"
                >
                  {networkOptions.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <i className="fas fa-chevron-down" />
                </div>
              </div>
            </div>
          )}

          {/* QR code & address */}
          {currentAddress && (
            <div className="qr-section">
              <div className="section-label">Save QR code</div>
              <div className="qr-container">
                <div className="qr-box" aria-hidden>
                  <QRCodeCanvas
                    value={currentAddress}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="address-section">
                  <div className="address-label">Wallet Address</div>
                  <div className="address-text" id="walletAddress">
                    {currentAddress}
                  </div>
                  <div className="address-actions">
                    <button
                      type="button"
                      className="action-btn copy-btn"
                      onClick={copyAddressToClipboard}
                      aria-label="Copy address"
                    >
                      <i className="fas fa-copy" /> Copy Address
                    </button>
                    <button
                      type="button"
                      className="action-btn save-btn"
                      onClick={saveQRCode}
                      aria-label="Save QR code"
                    >
                      <i className="fas fa-download" /> Save QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposit form */}
          {currentAddress && (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="deposit-form">
                <div className="section">
                  <div className="form-group">
                    <div className="input-with-usd">
                      <FieldFormItem
                        name="amount"
                        label={`Amount (${symbol})`}
                        placeholder={`Minimum: ${formattedMinAmount} ${symbol}`}
                        className="form-input"
                      />
                      {enteredAmountUSD > 0 && (
                        <div className="usd-value-display">
                          ≈ {formatUSD(enteredAmountUSD)}
                        </div>
                      )}
                    </div>
                    <div className="min-amount-note">
                      Minimum deposit: {formattedMinAmount} {symbol} ({formatUSD(MIN_DEPOSIT_USD)})
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="form-group">
                    <FieldFormItem
                      name="txid"
                      label="Transaction ID"
                      placeholder="Enter your transaction ID"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                    aria-disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Processing...
                      </>
                    ) : loadingRates ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Loading rates...
                      </>
                    ) : (
                      "Confirm Deposit"
                    )}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-section" role="status" aria-live="polite">
              <div className="spinner" />
              <div>Loading deposit information...</div>
            </div>
          )}

          {/* No address found */}
          {!loading && !currentAddress && symbol && (
            <div className="error-section" role="alert">
              <i className="fas fa-exclamation-triangle" />
              <div>No deposit address found for {symbol}</div>
              <div className="error-note">Please contact support or try another currency.</div>
            </div>
          )}

          {/* Hint Section */}
          <div className="hint-section">
            <div className="hint-title">Important Notes</div>
            <div className="hint-content">
              <div className="hint-item">
                1. Send only {symbol} to this deposit address. Sending other currencies may result in permanent loss.
              </div>
              <div className="hint-item">2. Ensure you are using the correct network ({networkOptions.find(n => n._id === selectedNetwork)?.name}).</div>
              <div className="hint-item">
                3. Minimum deposit amount: {formattedMinAmount} {symbol} (${MIN_DEPOSIT_USD} USD equivalent)
              </div>
              <div className="hint-item">4. Transactions typically require 1-3 network confirmations before being credited to your account.</div>
              <div className="hint-item">5. Always double-check the address before sending funds.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? "visible" : ""}`} role="status" aria-live="polite">
        <i className="fas fa-check-circle toast-icon" />
        {copiedText}
      </div>

      <SuccessModalComponent
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        type="deposit"
        amount={submittedAmount}
        coinType={symbol}
      />

      <style>{`
        /* ── Base ── */
        .deposit-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
        }

        /* ── Top bar ── */
        .header {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 16px;
          background: #0e0f14;
          border-bottom: 1px solid #1e1f26;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .back-arrow {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #15161c;
          border: 1px solid #2a2a2e;
          color: #fff;
          font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .back-arrow:hover { background: #2a2a2e; border-color: #fd4b4e; color: #fd4b4e; }
        .page-title {
          color: #fff; font-size: 15px; font-weight: 700;
          position: absolute; left: 50%; transform: translateX(-50%);
        }

        /* ── Content ── */
        .content-card {
          background: #0e0f14;
          padding: 20px 16px;
          min-height: calc(100vh - 56px);
        }
        .deposit-content { width: 100%; }

        /* ── Info box (min deposit) ── */
        .info-box {
          background: rgba(38,161,123,0.08);
          border: 1px solid rgba(38,161,123,0.25);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 18px;
        }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
        .info-label { font-size: 12px; color: #26a17b; font-weight: 600; }
        .info-value { font-size: 12px; font-weight: 700; color: #e8e8e8; }
        .rate-loading { font-size: 11px; color: #555; text-align: center; margin-top: 4px; }

        /* ── Section ── */
        .section { margin-bottom: 16px; }
        .section-label {
          font-size: 12px; font-weight: 700; color: #888;
          text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
        }
        .section-note { font-size: 11px; color: #444; margin-top: 6px; font-style: italic; }

        /* ── Currency display ── */
        .currency-display {
          display: flex; align-items: center; gap: 12px;
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 14px; padding: 14px;
        }
        .currency-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: #0e0f14; border: 1px solid #1e1f26;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .currency-icon img { width: 100%; height: 100%; object-fit: contain; }
        .currency-details { flex: 1; }
        .currency-name { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .currency-rate { font-size: 11.5px; color: #555; }

        /* ── Network select ── */
        .network-select-wrapper { position: relative; }
        .network-select {
          width: 100%; padding: 13px 42px 13px 14px;
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 12px; color: #e8e8e8;
          font-size: 14px; font-weight: 600;
          appearance: none; cursor: pointer; outline: none;
          transition: border-color 0.2s;
        }
        .network-select:focus { border-color: #fd4b4e; }
        .select-arrow {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          color: #555; pointer-events: none; font-size: 12px;
        }

        /* ── QR section ── */
        .qr-section { margin-bottom: 20px; }
        .qr-container {
          background: #15161c; border: 1px solid #1e1f26;
          border-radius: 16px; padding: 20px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .qr-box {
          padding: 12px; background: #fff; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .qr-box canvas { border-radius: 6px; display: block; }
        .address-section { width: 100%; text-align: center; }
        .address-label { font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .address-text {
          font-size: 12px; color: #aaa;
          background: #0e0f14; border: 1px solid #1e1f26;
          padding: 12px; border-radius: 10px;
          word-break: break-all; font-family: 'Courier New', monospace;
          line-height: 1.5; margin-bottom: 14px;
        }
        .address-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .action-btn {
          flex: 1; min-width: 120px;
          padding: 11px 14px; border: none; border-radius: 10px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .action-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .copy-btn { background: #fd4b4e; color: #fff; }
        .save-btn { background: #15161c; color: #aaa; border: 1.5px solid #2a2a2e; }
        .save-btn:hover { border-color: #fd4b4e; color: #fd4b4e; }

        /* ── Form ── */
        .deposit-form { margin-top: 4px; }
        .form-group { margin-bottom: 4px; }
        .input-with-usd { position: relative; }
        /* FieldFormItem renders its own input — target it via global selector */
        .deposit-form input[type="text"],
        .deposit-form input[type="number"],
        .deposit-form input {
          background: #15161c !important;
          border: 1px solid #1e1f26 !important;
          border-radius: 12px !important;
          color: #e8e8e8 !important;
          padding: 13px 14px !important;
          font-size: 14px !important;
          width: 100% !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: border-color 0.2s !important;
        }
        .deposit-form input:focus {
          border-color: #fd4b4e !important;
        }
        .deposit-form label {
          color: #888 !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          margin-bottom: 6px !important;
          display: block !important;
        }
        .usd-value-display {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 12px; color: #555;
          background: #15161c; padding: 2px 8px; border-radius: 6px;
          pointer-events: none;
        }
        .min-amount-note { font-size: 11.5px; color: #444; margin-top: 6px; }

        /* ── Submit ── */
        .form-actions { margin-top: 20px; }
        .submit-btn {
          width: 100%; padding: 14px;
          background: #fd4b4e; color: #fff;
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s;
        }
        .submit-btn:hover:not(:disabled) { background: #e8393c; transform: translateY(-1px); }
        .submit-btn:disabled { background: #2a2a2e; color: #444; cursor: not-allowed; }

        /* ── Spinner ── */
        .fa-spin { animation: depSpin 1s infinite linear; }
        @keyframes depSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-section { text-align: center; padding: 40px 0; color: #555; }
        .spinner {
          border: 3px solid #1e1f26; border-top: 3px solid #fd4b4e;
          border-radius: 50%; width: 40px; height: 40px;
          animation: depSpin 1s linear infinite; margin: 0 auto 16px;
        }

        /* ── Error state ── */
        .error-section { text-align: center; padding: 40px 20px; }
        .error-section i { font-size: 40px; color: #fd4b4e; margin-bottom: 16px; display: block; }
        .error-section div { color: #aaa; font-size: 14px; }
        .error-note { margin-top: 8px; font-size: 12px; color: #555; }

        /* ── Important notes ── */
        .hint-section {
          margin-top: 24px; background: #15161c;
          border: 1px solid #1e1f26; border-radius: 16px; padding: 18px;
        }
        .hint-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 12px; }
        .hint-content { display: flex; flex-direction: column; gap: 9px; }
        .hint-item {
          font-size: 11.5px; color: #555; line-height: 1.5;
          padding-left: 14px; position: relative;
        }
        .hint-item::before { content: "•"; position: absolute; left: 0; color: #fd4b4e; font-weight: bold; }

        /* ── Toast ── */
        .toast {
          position: fixed; bottom: 24px; left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: #15161c; border: 1px solid #2a2a2e;
          color: #fff; padding: 12px 22px; border-radius: 12px;
          font-size: 13px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .toast.visible { transform: translateX(-50%) translateY(0); }
        .toast-icon { color: #26a17b; }

      `}</style>
    </div>
  );
}

export default Deposit;