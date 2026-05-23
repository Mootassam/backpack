import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { useDispatch, useSelector } from "react-redux";
import assetsFormAction from "src/modules/assets/form/assetsFormActions";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/form/assetsFormSelectors";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import { i18n } from "../../../i18n";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BinanceTicker {
  s: string;
  c: string;
  P: string;
  v: string;
  p: string;
  q: string;
}

interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  isPositive: boolean;
  quoteVolume: number;
  numericPrice: number;
}

// ─── Cache helpers ────────────────────────────────────────────────────────────

const CACHE_KEY = "bp_conversion_data";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function readCache(): Record<string, CryptoData> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data: Record<string, CryptoData>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // ignore quota errors
  }
}

function formatCryptoRow(item: any): CryptoData {
  const symbol = item.symbol as string;
  const baseSymbol = symbol.replace("USDT", "");
  const numericPrice = parseFloat(item.lastPrice ?? item.c ?? "0");
  const changePercent = Math.abs(Number(item.priceChangePercent ?? item.P ?? "0")).toFixed(2);
  const isPositive = !String(item.priceChangePercent ?? item.P ?? "0").startsWith("-");

  return {
    symbol,
    name: `${baseSymbol}/USDT`,
    price: numericPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: numericPrice < 1 ? 6 : 4,
    }),
    changePercent,
    isPositive,
    quoteVolume: parseFloat(item.quoteVolume ?? item.q ?? "0"),
    numericPrice,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

function Conversion() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assetsBalance = useSelector(assetsListSelectors.selectRows);
  const selectModal = useSelector(selector.selectModal);

  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("from");
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [conversionFee, setConversionFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [balances, setBalances] = useState<Record<string, number>>({});

  const ws = useRef<WebSocket | null>(null);
  const pendingWsUpdates = useRef<Map<string, BinanceTicker>>(new Map());
  const wsFlushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const conversionLock = useRef(false);

  // ── Balances from Redux ───────────────────────────────────────────────────

  useEffect(() => {
    dispatch(assetsActions.doFetch());
  }, [dispatch]);

  useEffect(() => {
    if (assetsBalance?.length) {
      const map = (assetsBalance as any[]).reduce<Record<string, number>>((acc, item) => {
        acc[item.symbol] = item.amount;
        return acc;
      }, {});
      setBalances(map);
    }
  }, [assetsBalance]);

  // ── Initial market data (with localStorage cache) ─────────────────────────

  useEffect(() => {
    const load = async () => {
      // Serve from cache instantly while fetching fresh data in background
      const cached = readCache();
      if (cached) {
        setCryptoData(cached);
        setIsLoading(false);
      }

      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/24hr"
        );
        const usdtPairs = (response.data as any[])
          .filter(
            (item) =>
              item.symbol.endsWith("USDT") &&
              !item.symbol.includes("UP") &&
              !item.symbol.includes("DOWN") &&
              !item.symbol.includes("BEAR") &&
              !item.symbol.includes("BULL")
          )
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 200);

        const formattedData: Record<string, CryptoData> = {};
        usdtPairs.forEach((item) => {
          formattedData[item.symbol] = formatCryptoRow(item);
        });

        // Always include USDT itself
        formattedData["USDT"] = {
          symbol: "USDT",
          name: "USDT/USDT",
          price: "1.00",
          changePercent: "0.00",
          isPositive: true,
          quoteVolume: 0,
          numericPrice: 1,
        };

        setCryptoData(formattedData);
        writeCache(formattedData);
        setIsLoading(false);
      } catch {
        if (!cached) setError("Failed to fetch market data. Please try again later.");
        setIsLoading(false);
      }
    };

    load();
  }, []);

  // ── WebSocket — throttled batch updates (400 ms) ──────────────────────────

  useEffect(() => {
    let isMounted = true;

    const flush = () => {
      wsFlushTimer.current = null;
      if (!isMounted || pendingWsUpdates.current.size === 0) return;

      const updates = Array.from(pendingWsUpdates.current.values());
      pendingWsUpdates.current.clear();

      setCryptoData((prev) => {
        const next = { ...prev };
        let changed = false;
        updates.forEach((ticker) => {
          if (next[ticker.s]) {
            next[ticker.s] = formatCryptoRow({
              ...ticker,
              priceChangePercent: ticker.P,
              lastPrice: ticker.c,
            });
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };

    ws.current = new WebSocket(
      "wss://stream.binance.com:9443/ws/!ticker@arr"
    );

    ws.current.onmessage = (event) => {
      if (!isMounted) return;
      const data: BinanceTicker[] = JSON.parse(event.data);
      // Keep only the latest ticker per symbol
      data.forEach((t) => pendingWsUpdates.current.set(t.s, t));

      // Schedule a single flush if not already pending
      if (!wsFlushTimer.current) {
        wsFlushTimer.current = setTimeout(flush, 400);
      }
    };

    ws.current.onerror = () => { /* silently ignore */ };

    return () => {
      isMounted = false;
      if (wsFlushTimer.current) clearTimeout(wsFlushTimer.current);
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  // ── Conversion rate — recalculates when inputs or prices change ───────────

  const calculateConversionRate = useCallback(() => {
    if (conversionLock.current) return;

    const fromPrice =
      fromCurrency === "USDT"
        ? 1
        : cryptoData[`${fromCurrency}USDT`]?.numericPrice ?? 0;
    const toPrice =
      toCurrency === "USDT"
        ? 1
        : cryptoData[`${toCurrency}USDT`]?.numericPrice ?? 0;

    if (!fromPrice || !toPrice) return;

    const rate = fromPrice / toPrice;
    setConversionRate(rate);
    setToAmount(fromAmount * rate);
  }, [fromCurrency, toCurrency, fromAmount, cryptoData]);

  // Re-run only when dependencies actually change — no separate interval needed
  useEffect(() => {
    calculateConversionRate();
  }, [calculateConversionRate]);

  // ── Currency list for modal ───────────────────────────────────────────────

  const availableCurrencies = useMemo(() => {
    const currencies = Object.values(cryptoData).map((item) => {
      const code = item.symbol.replace("USDT", "") || "USDT";
      return { code, name: code, symbol: item.symbol, price: item.numericPrice };
    });
    if (!currencies.find((c) => c.code === "USDT")) {
      currencies.push({ code: "USDT", name: "USDT", symbol: "USDT", price: 1 });
    }
    return currencies;
  }, [cryptoData]);

  const filteredCurrencies = useMemo(
    () =>
      availableCurrencies.filter(
        (c) =>
          c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [availableCurrencies, searchTerm]
  );

  // ── Derived values ────────────────────────────────────────────────────────

  const hasSufficientBalance = useMemo(() => {
    if (!fromCurrency || fromAmount <= 0) return false;
    return fromAmount <= (balances[fromCurrency] ?? 0);
  }, [fromAmount, fromCurrency, balances]);

  const calculateFee = useMemo(() => fromAmount * 0.001, [fromAmount]);
  const calculateFinalAmount = useMemo(() => toAmount - toAmount * 0.001, [toAmount]);

  const fromPrice = fromCurrency === "USDT" ? 1 : (cryptoData[`${fromCurrency}USDT`]?.numericPrice ?? null);
  const toPrice   = toCurrency   === "USDT" ? 1 : (cryptoData[`${toCurrency}USDT`]?.numericPrice   ?? null);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(parseFloat(e.target.value) || 0);
  };

  const handleSetMaxAmount = () => setFromAmount(balances[fromCurrency] ?? 0);

  const selectCurrency = (code: string) => {
    if (modalType === "from") setFromCurrency(code);
    else setToCurrency(code);
    setShowModal(false);
    setSearchTerm("");
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const openConfirmationModal = () => {
    if (!hasSufficientBalance) return;
    setConversionFee(calculateFee);
    setFinalAmount(calculateFinalAmount);
    setShowConfirmationModal(true);
  };

  const handleCloseModal = () => {
    dispatch(assetsFormAction.doClose());
    setFromAmount(1);
    setToAmount(0);
    setFinalAmount(0);
    setConversionFee(0);
    dispatch(assetsActions.doFetch());
  };

  const performConversion = () => {
    if (!hasSufficientBalance) return;
    setIsConverting(true);
    conversionLock.current = true;

    setTimeout(() => {
      dispatch(
        assetsFormAction.doCreate({
          user: currentUser.id,
          fromSymbol: fromCurrency,
          fromAmount,
          toSymbol: toCurrency,
          coinName: toCurrency,
          toAmount: finalAmount.toFixed(8),
          status: "available",
        })
      );
      setBalances((prev) => ({
        ...prev,
        [fromCurrency]: (prev[fromCurrency] ?? 0) - fromAmount,
        [toCurrency]: (prev[toCurrency] ?? 0) + finalAmount,
      }));
      conversionLock.current = false;
      setIsConverting(false);
      setShowConfirmationModal(false);
      setTimeout(() => dispatch(assetsActions.doFetch()), 500);
    }, 1500);
  };

  const handleImageError = (code: string) =>
    setImageErrors((prev) => ({ ...prev, [code]: true }));

  const goBack = () => history.goBack();

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="conversion-page">
        {/* Header */}
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left" />
          </div>
          <h1 className="page-title">{i18n("pages.conversion.title")}</h1>
          <div className="header-placeholder" />
        </div>

        {/* Main card */}
        <div className="conversion-card">
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner" />
              <span>{i18n("pages.conversion.loading")}</span>
            </div>
          )}

          {error && (
            <div className="error-banner">
              <i className="fas fa-exclamation-triangle" /> {error}
            </div>
          )}

          {/* From */}
          <div className="input-section">
            <div className="input-header">
              <span className="input-label">{i18n("pages.conversion.youSend")}</span>
              <div className="balance-row">
                <span className="balance-text">
                  {i18n("pages.conversion.balance")}: {balances[fromCurrency] ?? 0} {fromCurrency}
                </span>
                <button className="max-btn" onClick={handleSetMaxAmount}>
                  {i18n("pages.conversion.max")}
                </button>
              </div>
            </div>
            <div className="input-row">
              <input
                type="number"
                value={fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0.0"
              />
              <div className="coin-selector" onClick={() => openModal("from")}>
                <div className="coin-icon">
                  {imageErrors[fromCurrency] ? (
                    <span className="icon-fallback">{fromCurrency.charAt(0)}</span>
                  ) : (
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${fromCurrency}.png`}
                      alt={fromCurrency}
                      loading="lazy"
                      onError={() => handleImageError(fromCurrency)}
                    />
                  )}
                </div>
                <span className="coin-code">{fromCurrency}</span>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            {fromPrice !== null && (
              <div className="usd-price">
                1 {fromCurrency} = ${fromPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </div>
            )}
            {!hasSufficientBalance && fromAmount > 0 && (
              <div className="insufficient-warning">
                <i className="fas fa-exclamation-circle" /> {i18n("pages.conversion.insufficientBalance")}
              </div>
            )}
          </div>

          {/* Switch */}
          <div className="switch-wrapper">
            <button className="switch-btn" onClick={switchCurrencies}>
              <i className="fas fa-exchange-alt" />
            </button>
          </div>

          {/* To */}
          <div className="input-section">
            <div className="input-header">
              <span className="input-label">{i18n("pages.conversion.youReceive")}</span>
              <span className="balance-text">
                {i18n("pages.conversion.balance")}: {balances[toCurrency] ?? 0} {toCurrency}
              </span>
            </div>
            <div className="input-row">
              <input type="number" value={toAmount.toFixed(8)} readOnly />
              <div className="coin-selector" onClick={() => openModal("to")}>
                <div className="coin-icon">
                  {imageErrors[toCurrency] ? (
                    <span className="icon-fallback">{toCurrency.charAt(0)}</span>
                  ) : (
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${toCurrency}.png`}
                      alt={toCurrency}
                      loading="lazy"
                      onError={() => handleImageError(toCurrency)}
                    />
                  )}
                </div>
                <span className="coin-code">{toCurrency}</span>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            {toPrice !== null && (
              <div className="usd-price">
                1 {toCurrency} = ${toPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </div>
            )}
          </div>

          {/* Conversion info */}
          <div className="conversion-info">
            <div className="info-row">
              <span>{i18n("pages.conversion.estimatedConversion")}</span>
              <span className="rate">
                1 {fromCurrency} = {conversionRate.toFixed(8)} {toCurrency}
              </span>
            </div>
            <div className="info-row">
              <span>USD Value</span>
              <span className="usd-value">
                ${(fromAmount * (fromPrice ?? 0)).toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Convert button */}
          <button
            className={`convert-btn ${hasSufficientBalance && fromAmount > 0 && fromCurrency !== toCurrency ? "" : "disabled"}`}
            onClick={openConfirmationModal}
            disabled={!hasSufficientBalance || fromAmount <= 0 || fromCurrency === toCurrency}
          >
            {fromCurrency === toCurrency
              ? i18n("pages.conversion.selectDifferentCurrencies")
              : !hasSufficientBalance
              ? i18n("pages.conversion.insufficientBalance")
              : i18n("pages.conversion.convertNow")}
          </button>

          <div className="update-notice">
            <i className="fas fa-sync-alt" /> {i18n("pages.conversion.pricesUpdate")}
          </div>
        </div>
      </div>

      {/* Currency selection modal */}
      {showModal && (
        <div className="currency-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="currency-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{i18n("pages.conversion.selectCurrency")}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-search">
              <i className="fas fa-search" />
              <input
                placeholder={i18n("pages.conversion.searchCurrencies")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="modal-list">
              {filteredCurrencies.map((currency) => (
                <li key={currency.code} onClick={() => selectCurrency(currency.code)}>
                  <div className="modal-coin-icon">
                    {imageErrors[currency.code] ? (
                      <span className="icon-fallback">{currency.code.charAt(0)}</span>
                    ) : (
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${currency.code}.png`}
                        alt={currency.code}
                        loading="lazy"
                        onError={() => handleImageError(currency.code)}
                      />
                    )}
                  </div>
                  <div className="modal-coin-info">
                    <span className="coin-code">{currency.code}</span>
                    <span className="coin-name">{currency.name}</span>
                  </div>
                  <div className="modal-coin-right">
                    <span className="coin-price">
                      ${currency.price.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </span>
                    <span className="coin-balance">
                      {i18n("pages.conversion.balance")}: {balances[currency.code] ?? 0}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {selectModal && (
        <SuccessModalComponent
          isOpen={selectModal}
          onClose={handleCloseModal}
          type="convert"
          amount={Number(finalAmount).toFixed(8)}
          coinType={toCurrency}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div
          className="confirmation-overlay"
          onClick={() => !isConverting && setShowConfirmationModal(false)}
        >
          <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{i18n("pages.conversion.confirmConversion")}</h3>
              <button
                className="modal-close"
                onClick={() => !isConverting && setShowConfirmationModal(false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="swap-summary">
                <div className="swap-side">
                  <span className="swap-amount">{fromAmount}</span>
                  <span className="swap-currency">{fromCurrency}</span>
                </div>
                <i className="fas fa-arrow-down swap-arrow" />
                <div className="swap-side">
                  <span className="swap-amount">{finalAmount.toFixed(8)}</span>
                  <span className="swap-currency">{toCurrency}</span>
                </div>
              </div>
              <div className="swap-details">
                <div className="detail-line">
                  <span>{i18n("pages.conversion.exchangeRate")}</span>
                  <span>
                    1 {fromCurrency} = {conversionRate.toFixed(8)} {toCurrency}
                  </span>
                </div>
                <div className="detail-line">
                  <span>{i18n("pages.conversion.networkFee")}</span>
                  <span>
                    {conversionFee.toFixed(8)} {fromCurrency}
                  </span>
                </div>
                <div className="detail-line">
                  <span>{i18n("pages.conversion.estimatedArrival")}</span>
                  <span>{i18n("pages.conversion.arrivalTime")}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="confirm-btn"
                onClick={performConversion}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" />{" "}
                    {i18n("pages.conversion.processingConversion")}
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle" />{" "}
                    {i18n("pages.conversion.confirmConversion")}
                  </>
                )}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmationModal(false)}
                disabled={isConverting}
              >
                {i18n("pages.conversion.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .conversion-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          padding: 16px 20px 12px;
          background-color: #0e0f14;
        }

        .back-button {
          color: #ffffff;
          font-size: 18px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .back-button:hover { background-color: rgba(253, 75, 78, 0.15); }

        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .header-placeholder { width: 32px; }

        /* Main Card */
        .conversion-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 20px 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
          position: relative;
        }

        .loading-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          z-index: 10;
          color: #fff;
          gap: 12px;
        }
        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #2a2a2e;
          border-top-color: #fd4b4e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-banner {
          background: rgba(253,75,78,0.15);
          color: #fd4b4e;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Input sections */
        .input-section { margin-bottom: 16px; }
        .input-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .input-label { font-size: 13px; color: #aaaaaa; font-weight: 500; }
        .balance-row { display: flex; align-items: center; gap: 8px; }
        .balance-text { font-size: 12px; color: #777; }
        .max-btn {
          background: #2a2a2e;
          color: #fd4b4e;
          border: 1px solid #fd4b4e;
          border-radius: 6px;
          padding: 2px 6px;
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s;
        }
        .max-btn:hover { background: #fd4b4e; color: #fff; }

        .input-row {
          display: flex;
          align-items: center;
          background: #2a2a2e;
          border-radius: 10px;
          padding: 4px;
        }
        .input-row input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 16px;
          padding: 10px 12px;
          outline: none;
          font-weight: 600;
        }
        .coin-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #1e1e24;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .coin-selector:hover { background: #fd4b4e; }
        .coin-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a2a2e;
        }
        .coin-icon img { width: 18px; height: 18px; object-fit: contain; }
        .icon-fallback { color: #aaa; font-size: 12px; font-weight: 700; }

        .usd-price { font-size: 12px; color: #aaaaaa; margin-top: 6px; }

        .insufficient-warning {
          color: #fd4b4e;
          font-size: 12px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Switch */
        .switch-wrapper { display: flex; justify-content: center; margin: 12px 0; }
        .switch-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2a2a2e;
          border: none;
          color: #fd4b4e;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .switch-btn:hover { background: #fd4b4e; color: #fff; transform: rotate(180deg); }

        /* Conversion info */
        .conversion-info {
          background: #1e1e24;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 8px;
        }
        .info-row:last-child { margin-bottom: 0; }
        .rate, .usd-value { color: #fff; font-weight: 600; }

        /* Convert button */
        .convert-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #fd4b4e;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .convert-btn:hover:not(.disabled) { background: #e04345; }
        .convert-btn.disabled { background: #2a2a2e; color: #777; cursor: not-allowed; }

        .update-notice { text-align: center; color: #777; font-size: 12px; margin-top: 12px; }

        /* Currency modal */
        .currency-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .currency-modal-content {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #2a2a2e;
        }
        .modal-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: #fff; }
        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .modal-close:hover { color: #fd4b4e; }

        .modal-search {
          display: flex;
          align-items: center;
          background: #2a2a2e;
          margin: 10px 12px;
          border-radius: 8px;
          padding: 8px 12px;
          gap: 8px;
        }
        .modal-search i { color: #aaa; }
        .modal-search input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 14px;
          outline: none;
        }

        .modal-list {
          flex: 1;
          overflow-y: auto;
          list-style: none;
          margin: 0;
          padding: 0 0 12px;
        }
        .modal-list li {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid #2a2a2e;
        }
        .modal-list li:hover { background: rgba(253,75,78,0.06); }

        .modal-coin-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #2a2a2e;
          flex-shrink: 0;
        }
        .modal-coin-icon img { width: 22px; height: 22px; object-fit: contain; }
        .modal-coin-info { flex: 1; display: flex; flex-direction: column; }
        .coin-code { font-size: 14px; font-weight: 600; color: #fff; }
        .coin-name { font-size: 12px; color: #aaaaaa; }
        .modal-coin-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
        .coin-price { font-size: 13px; font-weight: 600; color: #fff; }
        .coin-balance { font-size: 11px; color: #777; }

        /* Confirmation modal */
        .confirmation-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }
        .confirmation-dialog {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
        }
        .modal-body { padding: 0 16px; }
        .swap-summary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 20px 16px;
          background: #1e1e24;
          border-radius: 12px;
          margin: 16px 0;
        }
        .swap-side { display: flex; flex-direction: column; align-items: center; }
        .swap-amount { font-size: 18px; font-weight: 700; color: #fff; }
        .swap-currency { font-size: 12px; color: #fd4b4e; margin-top: 4px; }
        .swap-arrow { color: #fd4b4e; font-size: 18px; }
        .swap-details {
          background: #1e1e24;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .detail-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
          color: #aaaaaa;
        }
        .detail-line:last-child { margin-bottom: 0; }
        .modal-footer {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid #2a2a2e;
        }
        .confirm-btn {
          background: #fd4b4e;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .confirm-btn:hover:not(:disabled) { background: #e04345; }
        .confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .cancel-btn {
          background: transparent;
          border: 1px solid #2a2a2e;
          color: #aaa;
          padding: 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cancel-btn:hover { background: rgba(255,255,255,0.05); }
      `}</style>
    </>
  );
}

export default Conversion;
