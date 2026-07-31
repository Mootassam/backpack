import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsService from "src/modules/assets/assetsService";
import { i18n } from "../../../i18n";

interface TickerData {
  s: string;
  c: string;
  P: string;
}

interface Asset {
  id?: string;
  _id?: string;
  symbol: string;
  coinName: string;
  amount: string;
  status?: string;
}

// ── localStorage price cache helpers ────────────────────────────────────────
const LS_KEY = "wallet_prices_v1";

function readPriceCache(): Record<string, TickerData> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writePriceCache(prices: Record<string, TickerData>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(prices));
  } catch {
    // storage full — silently skip
  }
}
// ────────────────────────────────────────────────────────────────────────────

function Wallet() {
  const dispatch = useDispatch();
  const location = useLocation();
  const listAssets = useSelector(assetsListSelectors.selectRows);

  // Layer 1: initialise from localStorage — zero-delay on return visits
  const [marketData, setMarketData] = useState<Record<string, TickerData>>(readPriceCache);
  const [isPricesReady, setIsPricesReady] = useState(() => {
    const cached = readPriceCache();
    return Object.keys(cached).length > 0;
  });

  const ws = useRef<WebSocket | null>(null);
  const lastWsUpdate = useRef(0);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveCacheTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quickActions = useMemo(() => [
    { path: "/deposit",    icon: "fas fa-wallet",          name: i18n("pages.wallet.quickActions.deposit")  },
    { path: "/withdraw",   icon: "fas fa-money-bill-wave", name: i18n("pages.wallet.quickActions.withdraw") },
    { path: "/history",    icon: "fas fa-history",         name: i18n("pages.wallet.quickActions.history")  },
    { path: "/conversion", icon: "fas fa-exchange-alt",    name: i18n("pages.wallet.quickActions.convert")  },
    { path: "/stacking",   icon: "fas fa-coins",           name: i18n("pages.wallet.quickActions.staking")  },
  ], []);

  const formatAmount = useCallback((amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "0";
    if (num % 1 === 0) return num.toString();
    return num.toFixed(8).replace(/\.?0+$/, "");
  }, []);

  // ── Fetch assets on mount ──────────────────────────────────────────────────
  useEffect(() => {
    dispatch(assetsActions.doFetch());
  }, [dispatch]);

  // ── Layer 2: REST fetch from server (Redis-cached, ~150ms) ─────────────────
  // Runs once on mount, in parallel with the assets fetch.
  // Returns in ~5ms on cache hit, ~150ms on miss — far faster than WebSocket setup.
  useEffect(() => {
    let cancelled = false;

    assetsService.prices()
      .then((res) => {
        if (cancelled) return;
        const prices = res?.data as Record<string, { c: string; P: string }> | undefined;
        if (!prices || !Object.keys(prices).length) return;

        setMarketData((prev) => {
          const merged: Record<string, TickerData> = { ...prev };
          Object.entries(prices).forEach(([sym, p]) => {
            merged[sym] = { s: sym, c: p.c, P: p.P };
          });
          writePriceCache(merged);
          return merged;
        });
        setIsPricesReady(true);
      })
      .catch(() => {
        // Server unavailable — WebSocket will cover it
        if (!cancelled) setIsPricesReady(true);
      });

    return () => { cancelled = true; };
  }, []);

  // ── Layer 3: WebSocket for live tick updates ────────────────────────────────
  // Starts after assets are known so we subscribe only to relevant streams.
  // Throttled writes every 500ms; also throttle-saves to localStorage.
  useEffect(() => {
    if (!listAssets.length) return;

    const nonUsdt = (listAssets as Asset[])
      .filter((a) => a.symbol !== "USDT")
      .map((a) => `${a.symbol.toLowerCase()}usdt`);

    if (!nonUsdt.length) {
      setIsPricesReady(true);
      return;
    }

    let isMounted = true;

    const connect = () => {
      if (!isMounted) return;
      if (ws.current) {
        ws.current.onclose = null;
        ws.current.close();
        ws.current = null;
      }

      const streams = nonUsdt.map((s) => `${s}@ticker`).join("/");
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}`
      );
      ws.current = socket;

      socket.onmessage = (event) => {
        if (!isMounted) return;

        const now = Date.now();
        if (now - lastWsUpdate.current < 500) return; // 500ms throttle
        lastWsUpdate.current = now;

        try {
          const msg = JSON.parse(event.data);
          const ticker: TickerData = msg.data ?? msg;
          if (!ticker?.s) return;

          setMarketData((prev) => {
            const next = { ...prev, [ticker.s]: ticker };

            // Debounce localStorage saves — max once per 5s
            if (saveCacheTimer.current) clearTimeout(saveCacheTimer.current);
            saveCacheTimer.current = setTimeout(() => writePriceCache(next), 5000);

            return next;
          });
          setIsPricesReady(true);
        } catch {
          // ignore malformed frames
        }
      };

      socket.onerror = () => { if (isMounted) setIsPricesReady(true); };
      socket.onclose = () => {
        if (isMounted) reconnectTimer.current = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (saveCacheTimer.current) clearTimeout(saveCacheTimer.current);
      if (ws.current) {
        ws.current.onclose = null;
        ws.current.close();
        ws.current = null;
      }
    };
  }, [listAssets]);

  // ── Portfolio calculations ─────────────────────────────────────────────────
  const { assetValues, totalValue, portfolioChange } = useMemo(() => {
    if (!listAssets.length) {
      return { assetValues: [] as { value: number; change: number; isPositive: boolean }[], totalValue: 0, portfolioChange: 0 };
    }

    let totalCurrent = 0;
    let totalPrevious = 0;

    const values = (listAssets as Asset[]).map((asset) => {
      const amount = parseFloat(asset.amount || "0");

      if (asset.symbol === "USDT") {
        totalCurrent += amount;
        totalPrevious += amount;
        return { value: amount, change: 0, isPositive: true };
      }

      const ticker = marketData[`${asset.symbol}USDT`];
      const price  = parseFloat(ticker?.c || "0");
      const change = parseFloat(ticker?.P || "0");
      const value  = amount * price;
      const prev   = change !== -100 ? value / (1 + change / 100) : 0;

      totalCurrent  += value;
      totalPrevious += prev;

      return { value, change, isPositive: change >= 0 };
    });

    const pct = totalPrevious > 0
      ? ((totalCurrent - totalPrevious) / totalPrevious) * 100
      : 0;

    return { assetValues: values, totalValue: totalCurrent, portfolioChange: pct };
  }, [listAssets, marketData]);

  // ── Loading states ─────────────────────────────────────────────────────────
  // Show assets immediately once the DB response arrives.
  // Only show USD-value shimmer until prices are ready.
  const isAssetsEmpty  = listAssets.length === 0;
  const hasNonUsdt     = (listAssets as Asset[]).some((a) => a.symbol !== "USDT");
  const isPricesLoading = hasNonUsdt && !isPricesReady;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="wallet-page">
      <div className="wallet-container">
        {/* Header */}
        <div className="top-header">
          <h1 className="page-title">{i18n("pages.wallet.myAssets")}</h1>
        </div>

        {/* Content Card */}
        <div className="content-card">
          {/* Total balance */}
          <div className="balance-section">
            <div className="balance-label">{i18n("pages.wallet.totalPortfolioValue")}</div>
            {isPricesLoading ? (
              <div className="balance-placeholder">
                <div className="placeholder-line shimmer" style={{ width: "120px", height: "28px", marginBottom: "6px" }} />
                <div className="placeholder-line shimmer" style={{ width: "80px", height: "14px" }} />
              </div>
            ) : (
              <>
                <div className="balance-amount">
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`balance-change ${portfolioChange >= 0 ? "positive" : "negative"}`}>
                  {portfolioChange >= 0 ? "+" : ""}
                  {portfolioChange.toFixed(2)}%
                </div>
              </>
            )}
          </div>

          {/* Quick actions */}
          <div className="quick-actions">
            {quickActions.map((item) => (
              <Link
                to={item.path}
                className={`action-btn remove_blue ${location.pathname === item.path ? "active" : ""}`}
                key={item.path}
              >
                <div className="action-circle">
                  <i className={item.icon} />
                </div>
                <span className="action-text">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Assets list header */}
          <div className="assets-header">
            <div className="assets-title">{i18n("pages.wallet.myAssets")}</div>
            <div className="assets-manage">{i18n("pages.wallet.manage")}</div>
          </div>

          {/* Asset rows — show immediately once assets load, shimmer only USD column */}
          <div className="asset-list">
            {isAssetsEmpty ? (
              <div className="no-assets">{i18n("pages.wallet.noAssets")}</div>
            ) : (
              (listAssets as Asset[]).map((asset, index) => {
                const { value, change, isPositive } = assetValues[index] ?? { value: 0, change: 0, isPositive: true };

                return (
                  <Link
                    to={`/wallets/${asset.id ?? asset._id}`}
                    className="remove_blue"
                    key={asset.id ?? asset._id}
                  >
                    <div className="wallet-asset-item">
                      <div className="wallet-asset-info">
                        <div className="wallet-asset-icon">
                          <img
                            src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${asset.symbol}.png`}
                            width={32}
                            height={32}
                            loading="lazy"
                            alt={asset.symbol}
                          />
                        </div>
                        <div className="wallet-asset-details">
                          <div className="wallet-asset-name">{asset.coinName}</div>
                          <div className="wallet-asset-amount">
                            {formatAmount(asset.amount)}&nbsp;{asset.symbol}
                          </div>
                        </div>
                      </div>

                      {/* USD value — shimmer only this column while prices load */}
                      <div className="wallet-asset-value">
                        {isPricesLoading && asset.symbol !== "USDT" ? (
                          <>
                            <div className="placeholder-line shimmer" style={{ width: "70px", height: "14px", marginBottom: "4px" }} />
                            <div className="placeholder-line shimmer" style={{ width: "50px", height: "12px" }} />
                          </>
                        ) : (
                          <>
                            <div className="wallet-value-amount">
                              ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className={`wallet-value-change ${isPositive ? "positive" : "negative"}`}>
                              {isPositive && asset.symbol !== "USDT" ? "+" : ""}
                              {asset.symbol !== "USDT" ? change.toFixed(2) : "0.00"}%
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>

      <style>{`
        .wallet-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .wallet-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .top-header {
          padding: 16px 20px 12px;
          text-align: center;
          background-color: #0e0f14;
        }

        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 20px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        /* Balance */
        .balance-section { text-align: center; margin-bottom: 20px; }
        .balance-label   { color: #888; font-size: 13px; margin-bottom: 6px; }
        .balance-amount  { color: #ffffff; font-size: 28px; font-weight: 700; }
        .balance-change  { font-size: 13px; font-weight: 500; margin-top: 4px; }
        .balance-change.positive { color: #4caf50; }
        .balance-change.negative { color: #F41112; }
        .balance-placeholder { margin-top: 8px; }

        /* Quick actions */
        .quick-actions {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #2a2a2e;
        }
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: inherit;
        }
        .action-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F41112;
          font-size: 18px;
          transition: background-color 0.2s;
        }
        .action-btn.active .action-circle,
        .action-circle:hover { background-color: #2a2a2e; }
        .action-text { font-size: 11px; color: #ccc; font-weight: 500; }

        /* Assets header */
        .assets-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .assets-title  { color: #ffffff; font-size: 14px; font-weight: 600; }
        .assets-manage { color: #F41112; font-size: 13px; cursor: pointer; }

        /* Asset list */
        .asset-list { min-height: 200px; margin-bottom: 58px; }

        .wallet-asset-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #2a2a2e;
        }
        .wallet-asset-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .wallet-asset-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          background: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wallet-asset-name   { color: #ffffff; font-weight: 600; font-size: 14px; margin-bottom: 3px; }
        .wallet-asset-amount { color: #888; font-size: 12px; }
        .wallet-asset-value  { text-align: right; min-width: 80px; }
        .wallet-value-amount { color: #ffffff; font-size: 14px; font-weight: 600; margin-bottom: 3px; }
        .wallet-value-change { font-size: 12px; }
        .wallet-value-change.positive { color: #4caf50; }
        .wallet-value-change.negative { color: #F41112; }

        .no-assets { text-align: center; color: #888; padding: 40px 0; }

        /* Shimmer skeleton */
        .shimmer {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(to right, #2a2a2e 8%, #333 18%, #2a2a2e 33%);
          background-size: 800px 104px;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0%   { background-position: -468px 0; }
          100% { background-position:  468px 0; }
        }
        .placeholder-line { border-radius: 4px; }

        a.remove_blue { text-decoration: none; color: inherit; }
      `}</style>
    </div>
  );
}

export default Wallet;
