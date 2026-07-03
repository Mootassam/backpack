import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import AuthService from "src/modules/auth/authService";
import actions from "src/modules/withdraw/form/withdrawFormActions";
import selectors from "src/modules/withdraw/form/withdrawFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsListActions from "src/modules/assets/list/assetsListActions";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import method from "src/modules/depositMethod/list/depositMethodListActions";
import depositMethodselectors from "src/modules/depositMethod/list/depositMethodSelectors";
import axios from "axios";

// Currency configurations
const CURRENCIES = [
  "USDT", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum withdrawal in USD
const MIN_WITHDRAWAL_USD = 50;
const WITHDRAWAL_FEE_USD = 5;

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

const schema = yup.object().shape({
  orderNo: yupFormSchemas.string(i18n("entities.withdraw.fields.orderNo")),
  currency: yupFormSchemas.string(i18n("entities.withdraw.fields.currency")),
  withdrawAmount: yup
    .number()
    .typeError(i18n("pages.withdraw.errors.amountNumber"))
    .required(i18n("pages.withdraw.errors.amountRequired"))
    .test(
      "positive",
      i18n("pages.withdraw.errors.amountPositive"),
      (val) => typeof val === "number" && val > 0
    ),
  fee: yupFormSchemas.decimal(i18n("entities.withdraw.fields.fee")),
  totalAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.totalAmount")
  ),
  auditor: yupFormSchemas.relationToOne(i18n("entities.withdraw.fields.auditor")),
  acceptTime: yupFormSchemas.datetime(i18n("entities.withdraw.fields.acceptTime")),
  status: yupFormSchemas.enumerator(i18n("entities.withdraw.fields.status"), {
    options: ["pending", "canceled", "success"],
  }),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assets = useSelector(assetsListSelectors.selectRows) || [];
  const selectModal = useSelector(selectors.selectModal);
  const listMethod = useSelector(depositMethodselectors.selectRows);
  const loading = useSelector(selectors.selectSaveLoading);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [item, setItem] = useState<{ symbol: string; amount: number } | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  // Withdrawal password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [pendingValues, setPendingValues] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch('exchange'));
  }, [dispatch]);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

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

  // Set default currency when listMethod loads
  useEffect(() => {
    if (listMethod && listMethod.length > 0 && !selected) {
      const defaultCurrency = listMethod[0];
      const symbol = defaultCurrency.symbol || defaultCurrency.id;
      setSelected(symbol);
      form.setValue("currency", symbol);
      
      if (defaultCurrency.network && defaultCurrency.network.length > 0) {
        setSelectedNetwork(defaultCurrency.network[0]._id || defaultCurrency.network[0].name);
      }
    }
  }, [listMethod]);

  // Update selected asset info when currency or assets change
  useEffect(() => {
    if (selected && assets.length) {
      const found = assets.find((a) =>
        String(a.symbol).toUpperCase() === String(selected).toUpperCase()
      );
      setItem(found || null);

      const walletAddress = currentUser?.wallet?.[selected]?.address || "";
      setAddress(walletAddress);

      form.setValue("currency", selected);
      
      if (walletAddress) {
        form.setValue("withdrawAdress", walletAddress);
      }
    } else {
      setItem(null);
      setAddress("");
      form.setValue("currency", "");
      form.setValue("withdrawAdress", "");
    }
  }, [selected, assets, currentUser]);

  const initialValues = {
    orderNo: "",
    currency: "",
    withdrawAmount: "",
    fee: "",
    totalAmount: "",
    auditor: "",
    acceptTime: "",
    status: "pending",
    withdrawAdress: "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Watch fields we need to react to
  const watchedAmount = useWatch({ control: form.control, name: "withdrawAmount" });
  const watchedCurrency = useWatch({ control: form.control, name: "currency" });

  // Parsed numeric values
  const parsedAmount = Number(watchedAmount);
  const isAmountNumber = !Number.isNaN(parsedAmount) && isFinite(parsedAmount);
  const availableBalance = item ? Number(item.amount) || 0 : 0;

  // Calculate minimum withdrawal and fee in selected currency
  const { minInCurrency, feeInCurrency } = useMemo(() => {
    if (!selected || !exchangeRates[selected]) {
      return { minInCurrency: 0, feeInCurrency: 0 };
    }

    const rate = exchangeRates[selected];
    const minInCurrency = MIN_WITHDRAWAL_USD / rate;
    const feeInCurrency = WITHDRAWAL_FEE_USD / rate;

    return {
      minInCurrency,
      feeInCurrency,
    };
  }, [selected, exchangeRates]);

  // Get selected method details
  const selectedMethod = useMemo(() => {
    if (!listMethod || !selected) return null;
    return listMethod.find((method) => {
      const methodSymbol = method.symbol || method.id || "";
      return String(methodSymbol).toUpperCase() === String(selected).toUpperCase();
    });
  }, [listMethod, selected]);

  // Get network list for selected currency
  const networkList = selectedMethod?.network || [];

  // Set default network when currency changes
  useEffect(() => {
    if (networkList.length > 0) {
      const defaultNetwork = networkList[0];
      setSelectedNetwork(defaultNetwork._id || defaultNetwork.name);
      setShowNetworkDropdown(false);
    } else {
      setSelectedNetwork("");
    }
  }, [selectedMethod, networkList]);

  // Receive amount (what user receives after fee)
  const receiveAmount = isAmountNumber ? Math.max(parsedAmount - feeInCurrency, 0) : 0;

  // Helper to format numbers consistently - FIXED FOR ZERO AND SMALL VALUES
  const formatNumber = useCallback((value: number, decimals?: number) => {
    if (typeof value !== "number" || !isFinite(value) || value === 0) {
      return "0";
    }
    
    const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[selected] || 2);
    
    // For very small numbers, show more precision but not scientific notation
    if (value > 0 && value < 0.000001) {
      // Format with maximum precision but no scientific notation
      return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
    }
    
    // For regular numbers
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalPlaces,
    }).format(value);
  }, [selected]);

  // Helper to format USD values
  const formatUSD = useCallback((value: number) => {
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
  }, []);

  // Get currency icon URL
  const getCurrencyIcon = useCallback((symbol: string) => {
    const cleanSymbol = symbol ? symbol.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  // Handle network selection
  const handleNetworkSelect = useCallback((network: any) => {
    setSelectedNetwork(network._id || network.name);
    setShowNetworkDropdown(false);
  }, []);

  // Validation checks
  const computeValidationState = useCallback(() => {
    if (!selected) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectCurrency"), reason: "selectCurrency" };
    }

    if (networkList.length > 0 && !selectedNetwork) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectNetwork"), reason: "selectNetwork" };
    }

    if (!isAmountNumber || parsedAmount <= 0) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAmount"), reason: "enterAmount" };
    }

    // Check minimum withdrawal
    if (parsedAmount < minInCurrency) {
      const formattedMin = formatNumber(minInCurrency);
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.belowMin", formattedMin, selected),
        reason: "belowMin",
      };
    }

    // Check available balance
    if (parsedAmount > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientBalance"),
        reason: "insufficientBalance",
      };
    }

    // Check if fee can be covered
    if (parsedAmount + feeInCurrency > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientForFee"),
        reason: "insufficientForFee",
      };
    }

    const withdrawAddress = form.getValues("withdrawAdress");
    if (!withdrawAddress || withdrawAddress.trim() === "") {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAddress"), reason: "enterAddress" };
    }

    return { disabled: false, label: i18n("pages.withdraw.confirmWithdrawal"), reason: "ok" };
  }, [selected, networkList, selectedNetwork, isAmountNumber, parsedAmount, minInCurrency, availableBalance, feeInCurrency, form, formatNumber]);

  const validationState = computeValidationState();

  const handleCloseModal = useCallback(() => {
    dispatch(actions.doClose());
    form.reset(initialValues);
    setSelected("");
    setAddress("");
    setAmount("");
    setSelectedNetwork("");
  }, [dispatch, form, initialValues]);

  // Submit handler — opens password confirmation modal
  const onSubmit = useCallback((values: any) => {
    if (validationState.disabled) return;

    values.currency = selected;

    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const randomDigits = Math.floor(Math.random() * 1e7).toString().padStart(7, "0");
    values.orderNo = `RE${dateStr}${randomDigits}`;

    const amountNum = Number(values.withdrawAmount) || 0;
    values.fee = feeInCurrency;
    values.totalAmount = amountNum - feeInCurrency;
    values.status = "pending";
    values.network = selectedNetwork;

    setPendingValues(values);
    setPasswordInput("");
    setPasswordError("");
    setPasswordVisible(false);
    setShowPasswordModal(true);
    setTimeout(() => passwordInputRef.current?.focus(), 120);
  }, [selected, feeInCurrency, selectedNetwork, validationState.disabled]);

  // Confirm withdrawal after password check — verified server-side
  const handlePasswordConfirm = useCallback(async () => {
    if (!pendingValues) return;

    if (!passwordInput.trim()) {
      setPasswordError("Please enter your withdrawal password.");
      return;
    }

    setIsVerifying(true);
    try {
      // Ask the server to compare against the DB value directly
      const result = await AuthService.verifyWithdrawPassword(passwordInput.trim());

      if (!result.ok) {
        if (result.reason === "no_password_set") {
          setPasswordError("no_password_set");
        } else {
          setPasswordError("Incorrect withdrawal password. Please try again.");
          setPasswordInput("");
          setTimeout(() => passwordInputRef.current?.focus(), 80);
        }
        return;
      }

      // Password verified — include it in the payload so rechargeRepository passes its own check
      const valuesWithPassword = { ...pendingValues, withdrawPassword: passwordInput.trim() };
      setAmount(pendingValues.totalAmount.toString());
      await dispatch(actions.doCreate(valuesWithPassword));
      setShowPasswordModal(false);
      setPendingValues(null);
      setPasswordInput("");
      setPasswordError("");
    } catch (error) {
      console.error("Withdrawal submission error:", error);
      setPasswordError("Withdrawal failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }, [pendingValues, passwordInput, dispatch]);

  const handlePasswordModalClose = useCallback(() => {
    setShowPasswordModal(false);
    setPendingValues(null);
    setPasswordInput("");
    setPasswordError("");
    setPasswordVisible(false);
  }, []);

  // Handle currency selection
  const handleCurrencySelect = useCallback((currency: any) => {
    const symbol = currency.symbol || currency.id;
    setSelected(symbol);
    form.setValue("currency", symbol);
    form.setValue("withdrawAmount", "");
    form.setValue("withdrawAdress", "");
    setShowCurrencyDropdown(false);
    setShowNetworkDropdown(false);
  }, [form]);

  // Calculate USD value of withdrawal amount
  const withdrawalUSDValue = useMemo(() => {
    if (!isAmountNumber || !exchangeRates[selected]) return 0;
    return parsedAmount * exchangeRates[selected];
  }, [parsedAmount, selected, exchangeRates, isAmountNumber]);

  // Calculate USD value of fee
  const feeUSDValue = useMemo(() => {
    if (!exchangeRates[selected]) return 0;
    return feeInCurrency * exchangeRates[selected];
  }, [feeInCurrency, selected, exchangeRates]);

  // Calculate USD value of receive amount
  const receiveUSDValue = useMemo(() => {
    if (!exchangeRates[selected]) return 0;
    return receiveAmount * exchangeRates[selected];
  }, [receiveAmount, selected, exchangeRates]);

  // Format available balance with proper handling
  const formattedAvailableBalance = useMemo(() => {
    if (availableBalance === 0) return "0";
    return formatNumber(availableBalance);
  }, [availableBalance, formatNumber]);

  // Format minimum withdrawal amount
  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumber(minInCurrency);
  }, [minInCurrency, formatNumber]);

  // Format fee amount
  const formattedFeeAmount = useMemo(() => {
    if (feeInCurrency === 0) return "0";
    return formatNumber(feeInCurrency);
  }, [feeInCurrency, formatNumber]);

  // Format receive amount
  const formattedReceiveAmount = useMemo(() => {
    if (receiveAmount === 0) return "0";
    return formatNumber(receiveAmount);
  }, [receiveAmount, formatNumber]);

  // Form errors
  const { errors } = form.formState;

  return (
    <div className="withdraw-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Withdraw</div>
          <Link className="header-icon" to="/history" style={{ color: 'white' }}>
            <i className="fas fa-receipt" />
          </Link>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <div className="withdraw-content">
          {/* Select currency section */}
          <div className="form-section">
            <div className="input-field">
              <label className="input-label">Select currency</label>
              <div className="custom-select-wrapper">
                <div
                  className="currency-select-trigger"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  {selected ? (
                    <div className="selected-currency">
                      <div className="currency-icon">
                        <img
                          src={getCurrencyIcon(selected)}
                          alt={selected}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.style.display = "none";
                            const parent = img.parentElement;
                            if (parent) {
                              parent.textContent = selected.charAt(0);
                              parent.style.background = "#f0f0f0";
                              parent.style.color = "#333";
                              parent.style.fontSize = "14px";
                              parent.style.fontWeight = "bold";
                              parent.style.display = "inline-flex";
                              parent.style.alignItems = "center";
                              parent.style.justifyContent = "center";
                              parent.style.width = "24px";
                              parent.style.height = "24px";
                              parent.style.borderRadius = "50%";
                            }
                          }}
                        />
                      </div>
                      <span className="currency-text">{selected}</span>
                      {loadingRates ? (
                        <span className="rate-loading">Loading rates...</span>
                      ) : exchangeRates[selected] ? (
                        <span className="currency-rate">
                          (1 {selected} ≈ {formatUSD(exchangeRates[selected])})
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <span className="placeholder">Select Currency</span>
                  )}
                  <i className="fas fa-chevron-down dropdown-arrow" />
                </div>

                {showCurrencyDropdown && (
                  <div className="currency-dropdown">
                    {listMethod && listMethod.length > 0 ? (
                      listMethod
                        .filter(currency => CURRENCIES.includes(currency.symbol || currency.id))
                        .map((currency) => {
                          const symbol = currency.symbol || currency.id;
                          return (
                            <div
                              key={currency.id || symbol}
                              className="currency-option"
                              onClick={() => handleCurrencySelect(currency)}
                            >
                              <div className="currency-icon">
                                <img
                                  src={getCurrencyIcon(symbol)}
                                  alt={symbol}
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.onerror = null;
                                    img.style.display = "none";
                                    const parent = img.parentElement;
                                    if (parent) {
                                      parent.textContent = symbol.charAt(0);
                                      parent.style.background = "#f0f0f0";
                                      parent.style.color = "#333";
                                      parent.style.fontSize = "14px";
                                      parent.style.fontWeight = "bold";
                                      parent.style.display = "inline-flex";
                                      parent.style.alignItems = "center";
                                      parent.style.justifyContent = "center";
                                      parent.style.width = "24px";
                                      parent.style.height = "24px";
                                      parent.style.borderRadius = "50%";
                                    }
                                  }}
                                />
                              </div>
                              <span className="currency-text">{symbol}</span>
                              {loadingRates ? (
                                <span className="rate-loading-small">...</span>
                              ) : exchangeRates[symbol] ? (
                                <span className="currency-rate-small">
                                  ({formatUSD(exchangeRates[symbol])})
                                </span>
                              ) : null}
                            </div>
                          );
                        })
                    ) : (
                      <div className="no-options">No currencies available</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Minimum withdrawal requirement */}
            {selected && exchangeRates[selected] && (
              <div className="info-box">
                <div className="info-row">
                  <span className="info-label">Minimum withdrawal:</span>
                  <span className="info-value">
                    {formattedMinAmount} {selected} ({formatUSD(MIN_WITHDRAWAL_USD)})
                  </span>
                </div>
              </div>
            )}

            {/* Withdraw network */}
            {selected && networkList.length > 0 && (
              <div className="input-field">
                <label className="input-label">Withdraw network</label>
                <div className="custom-select-wrapper">
                  <div
                    className="network-select-trigger"
                    onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  >
                    <div className="selected-network">
                      <i className="fas fa-network-wired network-icon" />
                      <span className="network-text">
                        {networkList.find(n => 
                          n._id === selectedNetwork || 
                          n.id === selectedNetwork || 
                          n.name === selectedNetwork
                        )?.name || "Select Network"}
                      </span>
                    </div>
                    <i className="fas fa-chevron-down dropdown-arrow" />
                  </div>
                  
                  {showNetworkDropdown && (
                    <div className="network-dropdown">
                      {networkList.map((network) => (
                        <div
                          key={network._id || network.id || network.name}
                          className="network-option"
                          onClick={() => handleNetworkSelect(network)}
                        >
                          <i className="fas fa-network-wired network-icon-small" />
                          <span className="network-text">{network.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Withdraw address */}
                <div className="input-field">
                  <label className="input-label">Withdraw address</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAdress"
                      type="text"
                      className="address-field"
                      placeholder="Enter your wallet address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <br />
                </div>

                {/* Amount section */}
                <div className="input-field">
                  <label className="input-label">Amount of coins withdrawn</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAmount"
                      type="number"
                      className="amount-field"
                      placeholder="0.0"
                      step="any"
                    />
                  </div>
                  <div className="balance-info">
                    <div className="balance-text">
                      Available: <span className="balance-amount">{formattedAvailableBalance} {selected}</span>
                    </div>
                    {isAmountNumber && withdrawalUSDValue > 0 && (
                      <div className="usd-value">
                        ≈ {formatUSD(withdrawalUSDValue)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fee section */}
                <div className="fee-section">
                  <div className="fee-row">
                    <div className="fee-label">Withdrawal fee:</div>
                    <div className="fee-value">
                      {formattedFeeAmount} {selected}
                      <span className="fee-usd"> ({formatUSD(feeUSDValue)})</span>
                    </div>
                  </div>
                  <div className="fee-row">
                    <div className="fee-label">Minimum withdrawal:</div>
                    <div className="fee-value">
                      {formattedMinAmount} {selected}
                      <span className="fee-usd"> ({formatUSD(MIN_WITHDRAWAL_USD)})</span>
                    </div>
                  </div>
                  <div className="fee-row">
                    <div className="fee-label">You will receive:</div>
                    <div className="fee-value receive-amount">
                      {formattedReceiveAmount} {selected}
                      {receiveUSDValue > 0 && (
                        <span className="receive-usd"> (≈ {formatUSD(receiveUSDValue)})</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Important notice section */}
                <div className="notice-section">
                  <div className="notice-title">Important notice</div>
                  <div className="notice-content">
                    <div className="notice-item">1. Minimum withdrawal amount is ${MIN_WITHDRAWAL_USD} USD equivalent in selected currency.</div>
                    <div className="notice-item">2. Withdrawal fee is ${WITHDRAWAL_FEE_USD} USD equivalent in selected currency.</div>
                    <div className="notice-item">3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service.</div>
                    <div className="notice-item">4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset.</div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="withdraw-button"
                  disabled={validationState.disabled || loading || loadingRates}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Processing...
                    </>
                  ) : loadingRates ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Loading rates...
                    </>
                  ) : (
                    validationState.label
                  )}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {selectModal && (
        <SuccessModalComponent
          isOpen={selectModal}
          onClose={handleCloseModal}
          type='withdraw'
          amount={amount}
          coinType={selected}
        />
      )}

      {/* Withdrawal Password Modal */}
      {showPasswordModal && (() => {
        // Also treat server-confirmed "no password" (stale Redux state) the same way
        const hasWithdrawPassword = !!(currentUser?.withdrawPassword) && passwordError !== "no_password_set";
        return (
          <div className="wp-overlay" role="dialog" aria-modal="true" aria-labelledby="wp-title">
            <div className="wp-modal">

              {/* Header */}
              <div className="wp-header">
                <div className="wp-header-left">
                  <div className={`wp-shield-icon${!hasWithdrawPassword ? " wp-shield-warn" : ""}`}>
                    <i className={`fas ${hasWithdrawPassword ? "fa-shield-alt" : "fa-exclamation-triangle"}`} />
                  </div>
                  <div>
                    <div className="wp-title" id="wp-title">
                      {hasWithdrawPassword ? "Security Verification" : "Withdrawal Password Required"}
                    </div>
                    <div className="wp-subtitle">
                      {hasWithdrawPassword ? "Confirm your withdrawal" : "Action needed before you can withdraw"}
                    </div>
                  </div>
                </div>
                <button className="wp-close-btn" onClick={handlePasswordModalClose} aria-label="Cancel">
                  <i className="fas fa-times" />
                </button>
              </div>

              {!hasWithdrawPassword ? (
                /* ── No password set state ── */
                <div className="wp-no-password">
                  <div className="wp-no-password-icon">
                    <i className="fas fa-lock-open" />
                  </div>
                  <div className="wp-no-password-title">No Withdrawal Password Set</div>
                  <div className="wp-no-password-desc">
                    Your account does not have a withdrawal password configured.
                    A withdrawal password is required to authorize any funds transfer and protect your assets.
                  </div>
                  <div className="wp-no-password-steps">
                    <div className="wp-step">
                      <div className="wp-step-num">1</div>
                      <div className="wp-step-text">Go to <strong>Security Settings</strong></div>
                    </div>
                    <div className="wp-step">
                      <div className="wp-step-num">2</div>
                      <div className="wp-step-text">Tap <strong>Withdrawal Password</strong></div>
                    </div>
                    <div className="wp-step">
                      <div className="wp-step-num">3</div>
                      <div className="wp-step-text">Set a secure withdrawal password</div>
                    </div>
                  </div>
                  <div className="wp-actions">
                    <button className="wp-cancel-btn" onClick={handlePasswordModalClose}>
                      Cancel
                    </button>
                    <Link to="/withdrawPassword" className="wp-goto-btn" onClick={handlePasswordModalClose}>
                      <i className="fas fa-cog" />
                      Set Password Now
                    </Link>
                  </div>
                </div>
              ) : (
                /* ── Normal verification state ── */
                <>
                  {/* Transaction summary */}
                  <div className="wp-summary">
                    <div className="wp-summary-row">
                      <span className="wp-summary-label">Amount</span>
                      <span className="wp-summary-value wp-summary-amount">
                        {pendingValues?.withdrawAmount} {selected}
                      </span>
                    </div>
                    <div className="wp-summary-row">
                      <span className="wp-summary-label">You receive</span>
                      <span className="wp-summary-value wp-summary-receive">
                        {pendingValues?.totalAmount?.toFixed?.(6) ?? pendingValues?.totalAmount} {selected}
                      </span>
                    </div>
                    <div className="wp-summary-row">
                      <span className="wp-summary-label">Address</span>
                      <span className="wp-summary-value wp-summary-address">
                        {pendingValues?.withdrawAdress
                          ? `${String(pendingValues.withdrawAdress).slice(0, 8)}...${String(pendingValues.withdrawAdress).slice(-6)}`
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="wp-field-section">
                    <label className="wp-label" htmlFor="wp-password-input">
                      <i className="fas fa-lock wp-label-icon" />
                      Withdrawal Password
                    </label>
                    <div className="wp-input-wrapper">
                      <input
                        id="wp-password-input"
                        ref={passwordInputRef}
                        type={passwordVisible ? "text" : "password"}
                        className={`wp-input${passwordError ? " wp-input-error" : ""}`}
                        placeholder="Enter withdrawal password"
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (passwordError) setPasswordError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handlePasswordConfirm()}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="wp-eye-btn"
                        onClick={() => setPasswordVisible((v) => !v)}
                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                      >
                        <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`} />
                      </button>
                    </div>

                    {passwordError && passwordError !== "no_password_set" && (
                      <div className="wp-error-msg">
                        <i className="fas fa-exclamation-circle" />
                        {passwordError}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="wp-actions">
                    <button className="wp-cancel-btn" onClick={handlePasswordModalClose} disabled={isVerifying}>
                      Cancel
                    </button>
                    <button
                      className="wp-confirm-btn"
                      onClick={handlePasswordConfirm}
                      disabled={isVerifying || !passwordInput.trim()}
                    >
                      {isVerifying ? (
                        <>
                          <i className="fas fa-spinner fa-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check" />
                          Confirm Withdrawal
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}

      <style>{`
        /* ── Root ── */
        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
        }

        /* ── Top bar ── */
        .withdraw-container .header {
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          background: #0e0f14;
          border-bottom: 1px solid #1e1f26;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .withdraw-container .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .withdraw-container .back-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #15161c;
          border: 1px solid #2a2a2e;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .withdraw-container .back-arrow:hover { background: #2a2a2e; border-color: #fd4b4e; color: #fd4b4e; }
        .withdraw-container .page-title {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .withdraw-container .header-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #15161c;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #aaa !important;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .withdraw-container .header-icon:hover { border-color: #fd4b4e; color: #fd4b4e !important; }

        /* ── Content card ── */
        .withdraw-container .content-card {
          background: #0e0f14;
          padding: 20px 16px 100px;
          min-height: calc(100vh - 56px);
        }
        .withdraw-container .withdraw-content { width: 100%; }
        .withdraw-container .form-section { display: flex; flex-direction: column; gap: 16px; }

        /* ── Labels ── */
        .withdraw-container .input-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        /* ── Generic select trigger (currency & network) ── */
        .withdraw-container .currency-select-trigger,
        .withdraw-container .network-select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          min-height: 52px;
        }
        .withdraw-container .currency-select-trigger:hover,
        .withdraw-container .network-select-trigger:hover {
          background: #1a1b24;
          border-color: #2a2a35;
        }

        /* ── Selected state inside trigger ── */
        .withdraw-container .selected-currency,
        .withdraw-container .selected-network {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .withdraw-container .currency-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }
        .withdraw-container .currency-icon img { width: 100%; height: 100%; object-fit: cover; }
        .withdraw-container .currency-text {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .withdraw-container .currency-rate {
          font-size: 11px;
          color: #555;
          margin-left: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .withdraw-container .rate-loading { font-size: 11px; color: #555; }
        .withdraw-container .placeholder { font-size: 14px; color: #444; }
        .withdraw-container .dropdown-arrow { color: #555; font-size: 12px; flex-shrink: 0; transition: transform 0.2s; }

        /* ── Dropdowns ── */
        .withdraw-container .currency-dropdown,
        .withdraw-container .network-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #1a1b24;
          border: 1px solid #2a2a35;
          border-radius: 14px;
          overflow: hidden;
          z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          max-height: 240px;
          overflow-y: auto;
        }
        .withdraw-container .currency-option,
        .withdraw-container .network-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid #1e1f26;
        }
        .withdraw-container .currency-option:last-child,
        .withdraw-container .network-option:last-child { border-bottom: none; }
        .withdraw-container .currency-option:hover,
        .withdraw-container .network-option:hover { background: #22232e; }
        .withdraw-container .currency-rate-small { font-size: 11px; color: #555; margin-left: auto; }
        .withdraw-container .rate-loading-small { font-size: 11px; color: #555; margin-left: auto; }
        .withdraw-container .network-icon { font-size: 14px; color: #fd4b4e; flex-shrink: 0; }
        .withdraw-container .network-icon-small { font-size: 12px; color: #fd4b4e; flex-shrink: 0; }
        .withdraw-container .network-text { font-size: 14px; font-weight: 600; color: #e8e8e8; }
        .withdraw-container .no-options { padding: 16px; text-align: center; color: #555; font-size: 13px; }

        /* needed so dropdown is positioned relative to wrapper */
        .withdraw-container .custom-select-wrapper { position: relative; }

        /* ── Info box (min withdrawal) ── */
        .withdraw-container .info-box {
          background: rgba(38,161,123,0.08);
          border: 1px solid rgba(38,161,123,0.2);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .withdraw-container .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .withdraw-container .info-label { font-size: 12px; color: #26a17b; font-weight: 500; }
        .withdraw-container .info-value { font-size: 12px; color: #26a17b; font-weight: 600; }

        /* ── Inputs (via FieldFormItem) ── */
        .withdraw-container .input-wrapper { position: relative; }
        .withdraw-container .input-wrapper input,
        .withdraw-container .input-wrapper textarea {
          width: 100%;
          padding: 14px 16px;
          background: #15161c !important;
          border: 1px solid #1e1f26 !important;
          border-radius: 14px !important;
          color: #fff !important;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .withdraw-container .input-wrapper input::placeholder,
        .withdraw-container .input-wrapper textarea::placeholder { color: #444; }
        .withdraw-container .input-wrapper input:focus,
        .withdraw-container .input-wrapper textarea:focus {
          border-color: #fd4b4e !important;
          background: #1a1b24 !important;
        }
        /* FieldFormItem wraps with its own divs — target any input inside input-field */
        .withdraw-container .input-field input,
        .withdraw-container .input-field textarea {
          width: 100%;
          padding: 14px 16px !important;
          background: #15161c !important;
          border: 1px solid #1e1f26 !important;
          border-radius: 14px !important;
          color: #fff !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: border-color 0.2s;
          box-sizing: border-box;
          box-shadow: none !important;
        }
        .withdraw-container .input-field input::placeholder,
        .withdraw-container .input-field textarea::placeholder { color: #444 !important; }
        .withdraw-container .input-field input:focus,
        .withdraw-container .input-field textarea:focus {
          border-color: #fd4b4e !important;
          background: #1a1b24 !important;
        }
        /* Remove default form error red border from FieldFormItem */
        .withdraw-container .input-field .is-invalid,
        .withdraw-container .input-field input.is-invalid {
          border-color: #fd4b4e !important;
        }
        .withdraw-container .input-field .invalid-feedback {
          font-size: 11px !important;
          color: #fd4b4e !important;
          margin-top: 5px;
        }

        /* ── Balance info ── */
        .withdraw-container .balance-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding: 0 2px;
        }
        .withdraw-container .balance-text { font-size: 12px; color: #555; padding-bottom: 12px; }
        .withdraw-container .balance-amount { color: #e8e8e8; font-weight: 600; }
        .withdraw-container .usd-value { font-size: 12px; color: #555; }

        /* ── Fee section ── */
        .withdraw-container .fee-section {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .withdraw-container .fee-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .withdraw-container .fee-label { font-size: 13px; color: #666; }
        .withdraw-container .fee-value { font-size: 13px; color: #e8e8e8; font-weight: 600; text-align: right; }
        .withdraw-container .fee-usd { color: #555; font-weight: 400; font-size: 12px; }
        .withdraw-container .receive-amount { color: #26a17b; }
        .withdraw-container .receive-usd { color: #26a17b; opacity: 0.7; font-weight: 400; }

        /* ── Notice section ── */
        .withdraw-container .notice-section {
          background: rgba(253,75,78,0.05);
          border: 1px solid rgba(253,75,78,0.12);
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .withdraw-container .notice-title {
          font-size: 13px;
          font-weight: 700;
          color: #fd4b4e;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .withdraw-container .notice-title::before {
          content: '⚠';
          font-size: 13px;
        }
        .withdraw-container .notice-content { display: flex; flex-direction: column; gap: 6px; }
        .withdraw-container .notice-item {
          font-size: 12px;
          color: #888;
          line-height: 1.55;
          padding-left: 2px;
        }

        /* ── Submit button ── */
        .withdraw-container .withdraw-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          background: #fd4b4e;
          color: #fff;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .withdraw-container .withdraw-button:hover:not(:disabled) { opacity: 0.88; }
        .withdraw-container .withdraw-button:active:not(:disabled) { transform: scale(0.98); }
        .withdraw-container .withdraw-button:disabled {
          background: #2a2a2e;
          color: #555;
          cursor: not-allowed;
        }

        /* ── Scrollbar ── */
        .withdraw-container .currency-dropdown::-webkit-scrollbar,
        .withdraw-container .network-dropdown::-webkit-scrollbar { width: 4px; }
        .withdraw-container .currency-dropdown::-webkit-scrollbar-track { background: transparent; }
        .withdraw-container .currency-dropdown::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 2px; }

        /* ── Withdrawal Password Modal ── */
        .wp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.82);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: wpFadeIn 0.22s ease;
        }
        @keyframes wpFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .wp-modal {
          background: #13141a;
          border: 1px solid #1e1f26;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 480px;
          padding: 0 0 32px;
          animation: wpSlideUp 0.28s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
        }
        @keyframes wpSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* Warning variant of shield */
        .wp-shield-warn {
          background: rgba(255,152,0,0.12) !important;
          border-color: rgba(255,152,0,0.25) !important;
          color: #FF9800 !important;
        }

        /* Header */
        .wp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid #1e1f26;
        }
        .wp-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wp-shield-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(253,75,78,0.12);
          border: 1px solid rgba(253,75,78,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 18px;
          flex-shrink: 0;
        }
        .wp-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
        }
        .wp-subtitle {
          font-size: 12px;
          color: #555;
          margin-top: 2px;
        }
        .wp-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e1f26;
          border: none;
          color: #666;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .wp-close-btn:hover { background: #2a2a2e; color: #fd4b4e; }

        /* ── No-password state ── */
        .wp-no-password {
          padding: 20px 20px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .wp-no-password-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: rgba(255,152,0,0.1);
          border: 1.5px solid rgba(255,152,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #FF9800;
          margin-bottom: 14px;
        }
        .wp-no-password-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
        }
        .wp-no-password-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 300px;
        }
        .wp-no-password-steps {
          width: 100%;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          text-align: left;
        }
        .wp-step {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wp-step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(253,75,78,0.15);
          border: 1px solid rgba(253,75,78,0.3);
          color: #fd4b4e;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wp-step-text {
          font-size: 13px;
          color: #888;
          line-height: 1.4;
        }
        .wp-step-text strong { color: #e8e8e8; font-weight: 600; }

        /* Go-to-settings button */
        .wp-goto-btn {
          flex: 2;
          padding: 14px;
          background: #FF9800;
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .wp-goto-btn:hover { background: #e68900; }
        .wp-goto-btn:active { transform: scale(0.98); }

        /* Summary */
        .wp-summary {
          margin: 16px 20px;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .wp-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .wp-summary-label {
          font-size: 12px;
          color: #555;
          font-weight: 500;
        }
        .wp-summary-value {
          font-size: 13px;
          font-weight: 700;
          color: #e8e8e8;
          text-align: right;
        }
        .wp-summary-amount { color: #fff; font-size: 14px; }
        .wp-summary-receive { color: #26a17b; }
        .wp-summary-address {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #aaa;
          font-weight: 400;
        }

        /* Password field */
        .wp-field-section {
          padding: 0 20px;
          margin-bottom: 8px;
        }
        .wp-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .wp-label-icon { color: #fd4b4e; font-size: 11px; }
        .wp-input-wrapper {
          position: relative;
        }
        .wp-input {
          width: 100%;
          padding: 14px 48px 14px 16px;
          background: #15161c;
          border: 1.5px solid #1e1f26;
          border-radius: 14px;
          color: #fff;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
          letter-spacing: 2px;
        }
        .wp-input::placeholder { letter-spacing: 0; color: #444; }
        .wp-input:focus {
          border-color: #fd4b4e;
          background: #1a1b24;
        }
        .wp-input-error {
          border-color: #fd4b4e !important;
          background: rgba(253,75,78,0.05) !important;
        }
        .wp-eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #555;
          font-size: 14px;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wp-eye-btn:hover { color: #aaa; }

        /* Error message */
        .wp-error-msg {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          padding: 10px 12px;
          background: rgba(253,75,78,0.08);
          border: 1px solid rgba(253,75,78,0.2);
          border-radius: 10px;
          font-size: 12.5px;
          color: #fd4b4e;
          font-weight: 500;
          animation: wpShake 0.35s ease;
        }
        @keyframes wpShake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }

        /* Actions */
        .wp-actions {
          display: flex;
          gap: 10px;
          padding: 16px 20px 0;
        }
        .wp-cancel-btn {
          flex: 1;
          padding: 14px;
          background: #15161c;
          border: 1.5px solid #2a2a2e;
          border-radius: 14px;
          color: #888;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .wp-cancel-btn:hover:not(:disabled) { border-color: #fd4b4e; color: #fd4b4e; }
        .wp-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .wp-confirm-btn {
          flex: 2;
          padding: 14px;
          background: #fd4b4e;
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
        }
        .wp-confirm-btn:hover:not(:disabled) { background: #e8393c; }
        .wp-confirm-btn:active:not(:disabled) { transform: scale(0.98); }
        .wp-confirm-btn:disabled { background: #2a2a2e; color: #555; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default Withdraw;