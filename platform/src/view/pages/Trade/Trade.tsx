import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import spotListSelectors from "src/modules/spot/list/spotListSelectors";
import spotListActions from "src/modules/spot/list/spotListActions";
import spotFormActions from "src/modules/spot/form/spotFormActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const safeParse = (v: any): number => {
  if (v === null || v === undefined || v === "") return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

const generateOrderNo = (): string => {
  const t = Date.now().toString(36);
  const r = Math.floor(Math.random() * 1e6).toString(36);
  return `ORD-${t}-${r}`.toUpperCase();
};

// ─── Component ────────────────────────────────────────────────────────────────

function Trade() {
  const dispatch = useDispatch();
  const listspot = useSelector(spotListSelectors.selectRows) || [];
  const listAssets = useSelector(assetsListSelectors.selectRows) || [];

  // Market data
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [orderBook, setOrderBook] = useState<{ asks: { price: string; amount: string }[]; bids: { price: string; amount: string }[] }>({ asks: [], bids: [] });

  // Form state
  const [orderType, setOrderType] = useState("LIMIT");
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [amountInUSDT, setAmountInUSDT] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [errorMessage, setErrorMessage] = useState("");
  const [placing, setPlacing] = useState(false);

  // UI state
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // cleared on first WS tick

  // WebSocket refs
  const tickerWs = useRef<WebSocket | null>(null);
  const depthWs = useRef<WebSocket | null>(null);
  const tickerThrottle = useRef(0);
  const depthThrottle = useRef(0);

  // ── On mount ───────────────────────────────────────────────────────────────

  useEffect(() => {
    dispatch(assetsActions.doFetch());
    dispatch(spotListActions.doFetcPending());
  }, [dispatch]);

  // ── Balances ───────────────────────────────────────────────────────────────

  const balances = useMemo(() => {
    if (!Array.isArray(listAssets)) return {} as Record<string, number>;
    return (listAssets as any[]).reduce<Record<string, number>>((acc, item) => {
      acc[item.symbol] = Number(item.amount) || 0;
      return acc;
    }, {});
  }, [listAssets]);

  const baseSymbol = useMemo(() => selectedCoin.replace("USDT", ""), [selectedCoin]);

  const currentBalance = useMemo(
    () => (activeTab === "buy" ? balances["USDT"] ?? 0 : balances[baseSymbol] ?? 0),
    [activeTab, baseSymbol, balances]
  );

  // ── Price sync helpers ─────────────────────────────────────────────────────

  const syncUSDTFromQty = useCallback(
    (qty: string, priceOverride?: string) => {
      const q = safeParse(qty);
      const p = safeParse(priceOverride ?? price);
      if (Number.isFinite(q) && Number.isFinite(p)) {
        setAmountInUSDT((q * p).toFixed(2));
      } else {
        setAmountInUSDT("");
      }
    },
    [price]
  );

  const syncQtyFromUSDT = useCallback(
    (usdt: string) => {
      const u = safeParse(usdt);
      const p = safeParse(price);
      if (Number.isFinite(u) && Number.isFinite(p) && p > 0) {
        setQuantity((u / p).toFixed(8));
      } else {
        setQuantity("");
      }
    },
    [price]
  );

  // ── Sync price when market price arrives ──────────────────────────────────

  useEffect(() => {
    if (marketPrice && marketPrice !== "0") {
      setPrice(marketPrice);
      if (quantity) syncUSDTFromQty(quantity, marketPrice);
    }
  }, [marketPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Ticker WebSocket ───────────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;

    if (tickerWs.current) {
      tickerWs.current.onclose = null;
      try { tickerWs.current.close(); } catch { /* ignore */ }
      tickerWs.current = null;
    }

    const sym = selectedCoin.toLowerCase();
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${sym}@ticker`);
    tickerWs.current = socket;

    socket.onmessage = (event) => {
      if (!isMounted) return;
      const now = performance.now();
      if (now - tickerThrottle.current < 180) return;
      tickerThrottle.current = now;

      try {
        const d = JSON.parse(event.data);
        if (d.c !== undefined) setMarketPrice(d.c);
        if (d.P !== undefined) setPriceChangePercent(d.P);
        // Clear loading state as soon as the first real price arrives
        setIsLoading(false);
      } catch { /* ignore */ }
    };

    socket.onerror = () => {
      if (isMounted) setIsLoading(false);
    };

    return () => {
      isMounted = false;
      if (tickerWs.current) {
        tickerWs.current.onclose = null;
        try { tickerWs.current.close(); } catch { /* ignore */ }
        tickerWs.current = null;
      }
    };
  }, [selectedCoin]);

  // ── Depth WebSocket ────────────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;

    if (depthWs.current) {
      depthWs.current.onclose = null;
      try { depthWs.current.close(); } catch { /* ignore */ }
      depthWs.current = null;
    }

    const sym = selectedCoin.toLowerCase();
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${sym}@depth20@100ms`);
    depthWs.current = socket;

    socket.onmessage = (event) => {
      if (!isMounted) return;
      const now = performance.now();
      if (now - depthThrottle.current < 180) return;
      depthThrottle.current = now;

      try {
        const d = JSON.parse(event.data);
        const asks = (d.asks || []).slice(0, 5).map((a: string[]) => ({ price: a[0], amount: a[1] }));
        const bids = (d.bids || []).slice(0, 5).map((b: string[]) => ({ price: b[0], amount: b[1] }));
        setOrderBook({ asks, bids });
      } catch { /* ignore */ }
    };

    return () => {
      isMounted = false;
      if (depthWs.current) {
        depthWs.current.onclose = null;
        try { depthWs.current.close(); } catch { /* ignore */ }
        depthWs.current = null;
      }
    };
  }, [selectedCoin]);

  // ── Max depth amount (for bar widths) ─────────────────────────────────────

  const maxAmount = useMemo(() => {
    const all = [
      ...orderBook.asks.map((it) => safeParse(it.amount)),
      ...orderBook.bids.map((it) => safeParse(it.amount)),
    ].filter(Number.isFinite);
    return Math.max(...(all as number[]), 1);
  }, [orderBook]);

  // ── Format helper ──────────────────────────────────────────────────────────

  const fmt = useCallback((num: any, decimals = 2) => {
    const n = Number(num);
    if (!Number.isFinite(n)) return (0).toFixed(decimals);
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  // ── Form handlers ──────────────────────────────────────────────────────────

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setQuantity(v);
      syncUSDTFromQty(v);
    },
    [syncUSDTFromQty]
  );

  const handleUSDTChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setAmountInUSDT(v);
      syncQtyFromUSDT(v);
    },
    [syncQtyFromUSDT]
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setPrice(v);
      const q = safeParse(quantity);
      if (Number.isFinite(q)) setAmountInUSDT((q * Number(v)).toFixed(2));
    },
    [quantity]
  );

  const handlePercentage = useCallback(
    (pct: number) => {
      if (activeTab === "buy") {
        const spend = currentBalance * pct;
        setAmountInUSDT(spend.toFixed(2));
        syncQtyFromUSDT(spend.toString());
      } else {
        const sell = currentBalance * pct;
        setQuantity(sell.toFixed(8));
        syncUSDTFromQty(sell.toString());
      }
    },
    [activeTab, currentBalance, syncQtyFromUSDT, syncUSDTFromQty]
  );

  const handleIncPrice = useCallback(() => {
    const p = safeParse(price);
    setPrice((Number.isFinite(p) ? p + 1 : safeParse(marketPrice) || 0).toString());
  }, [price, marketPrice]);

  const handleDecPrice = useCallback(() => {
    const p = safeParse(price);
    if (Number.isFinite(p)) setPrice(Math.max(0.0001, p - 1).toString());
  }, [price]);

  const handleOrderBookClick = useCallback(
    (clickPrice: string) => {
      if (orderType === "LIMIT") setPrice(clickPrice);
    },
    [orderType]
  );

  const handleSelectCoin = useCallback((coin: string) => {
    if (!coin) return;
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
    setIsLoading(true);
    setQuantity("");
    setAmountInUSDT("");
  }, []);

  // ── Place order ────────────────────────────────────────────────────────────

  const handlePlaceOrder = useCallback(async () => {
    setErrorMessage("");
    if (placing) return;

    const q = safeParse(quantity);
    const p = orderType === "MARKET" ? safeParse(marketPrice) : safeParse(price);

    if (!Number.isFinite(q) || q <= 0) {
      setErrorMessage(i18n("pages.trade.errors.invalidQuantity"));
      return;
    }
    if (!Number.isFinite(p) || p <= 0) {
      setErrorMessage(i18n("pages.trade.errors.invalidPrice"));
      return;
    }

    if (activeTab === "buy" && p * q > currentBalance) {
      setErrorMessage(i18n("pages.trade.errors.insufficientUSDT", fmt(currentBalance, 2)));
      return;
    }
    if (activeTab === "sell" && q > currentBalance) {
      setErrorMessage(i18n("pages.trade.errors.insufficientCoin", fmt(currentBalance, 6), baseSymbol));
      return;
    }

    setPlacing(true);
    try {
      const total = p * q;
      dispatch(
        spotFormActions.doCreate({
          orderNo: generateOrderNo(),
          orderType: orderType.toLowerCase(),
          tradingPair: selectedCoin.replace("USDT", "/USDT"),
          status: orderType === "MARKET" ? "completed" : "pending",
          direction: activeTab.toUpperCase(),
          delegateType: orderType,
          delegateState: orderType === "MARKET" ? "Filled" : "Pending",
          orderQuantity: q,
          commissionPrice: p,
          entrustedValue: total,
          transactionQuantity: orderType === "MARKET" ? q : 0,
          transactionValue: orderType === "MARKET" ? total : 0,
          closingPrice: orderType === "MARKET" ? p : 0,
          handlingFee: orderType === "MARKET" ? total * 0.001 : 0,
          commissionTime: new Date().toISOString(),
          closingTime: orderType === "MARKET" ? new Date().toISOString() : null,
        })
      );
      setQuantity("");
      setAmountInUSDT("");
    } catch {
      setErrorMessage(i18n("pages.trade.errors.failedOrder"));
    } finally {
      setPlacing(false);
    }
  }, [placing, quantity, orderType, marketPrice, price, activeTab, currentBalance, baseSymbol, selectedCoin, dispatch, fmt]);

  const cancelOrder = useCallback((id: string, order: any) => {
    dispatch(spotFormActions.doUpdate(id, { ...order, status: "canceled" }));
  }, [dispatch]);

  // ── Order list (memoized to avoid re-render when form changes) ─────────────

  const ordersList = useMemo(() => {
    if (!listspot.length) {
      return (
        <div className="empty-orders">
          <div className="empty-icon"><i className="fas fa-clipboard-list" /></div>
          <div className="empty-text">{i18n("pages.trade.openOrders.noOrders")}</div>
          <div className="empty-subtext">{i18n("pages.trade.openOrders.noOrdersSubtext")}</div>
        </div>
      );
    }
    return (
      <div className="orders-list">
        {(listspot as any[]).map((order) => {
          const status = String(order.status ?? "").toLowerCase();
          const isPending = status === "pending" || status === "partially filled";
          return (
            <div key={order.id ?? order.orderNo} className="order-item">
              <div className="order-main-info">
                <div className="order-pair-action">
                  <span className="order-pair">{order.tradingPair}</span>
                  <span className={`order-action ${String(order.direction ?? "").toLowerCase()}`}>
                    {order.direction}
                  </span>
                  <span className="order-type-badge">{order.orderType}</span>
                </div>
                <div className="order-date">
                  {order.commissionTime ? new Date(order.commissionTime).toLocaleDateString() : ""}
                  <span className="order-time">
                    {order.commissionTime ? new Date(order.commissionTime).toLocaleTimeString() : ""}
                  </span>
                </div>
              </div>
              <div className="order-details">
                <div className="order-detail">
                  <span className="detail-label">{i18n("pages.trade.openOrders.status")}</span>
                  <span className={`order-status ${status}`}>{order.status}</span>
                </div>
                <div className="order-detail">
                  <span className="detail-label">{i18n("pages.trade.openOrders.price")}</span>
                  <span className="order-price-value">{fmt(order.commissionPrice, 4)} USDT</span>
                </div>
                <div className="order-detail">
                  <span className="detail-label">{i18n("pages.trade.openOrders.amount")}</span>
                  <span className="order-amount-value">
                    {order.orderQuantity} {order.tradingPair?.split("/")[0]}
                  </span>
                </div>
                <div className="order-detail">
                  <span className="detail-label">{i18n("pages.trade.openOrders.total")}</span>
                  <span className="order-total">{fmt(order.entrustedValue)} USDT</span>
                </div>
              </div>
              <div className="order-actions">
                {isPending ? (
                  <button className="cancel-order-btn" onClick={() => cancelOrder(order.id, order)}>
                    {i18n("pages.trade.openOrders.cancel")}
                  </button>
                ) : (
                  <div className="completed-indicator">
                    <i className="fas fa-check-circle" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [listspot, fmt, cancelOrder]);

  // ── Render ────────────────────────────────────────────────────────────────

  const priceIsUp = !String(priceChangePercent).startsWith("-");

  return (
    <div className="container">
      {/* Header */}
      <div className="trade-header">
        <div className="trade-header-top">
          <div className="trade-page-title">{i18n("pages.trade.title")}</div>
        </div>
        <div className="market-info">
          {isLoading
            ? <div className="skel skel-name" />
            : <div className="market-name">{selectedCoin.replace("USDT", "/USDT")}</div>}
          <div className="coin-select-icon" onClick={() => setIsCoinModalOpen(true)}>
            <i className="fas fa-chevron-down" />
          </div>
          {isLoading
            ? <div className="skel skel-pct" />
            : (
              <div className="market-change" style={{ color: priceIsUp ? "#00C076" : "#FF6838" }}>
                {priceIsUp ? "+" : ""}{priceChangePercent}%
              </div>
            )}
        </div>
      </div>

      {/* Main */}
      <div className="main-content">
        <div className="trading-layout">
          {/* Trade form */}
          <div className="trade-form">
            {/* Buy / Sell tabs */}
            <div className="buy-sell-tabs">
              {isLoading ? <div className="skel" style={{ height: 38, borderRadius: 10 }} /> : (
                <>
                  <div
                    role="tab"
                    className={`buy-tab ${activeTab === "buy" ? "active" : ""}`}
                    onClick={() => setActiveTab("buy")}
                  >
                    {i18n("pages.trade.buy")}
                  </div>
                  <div
                    role="tab"
                    className={`sell-tab ${activeTab === "sell" ? "active" : ""}`}
                    onClick={() => setActiveTab("sell")}
                  >
                    {i18n("pages.trade.sell")}
                  </div>
                </>
              )}
            </div>

            {/* Order type */}
            <div className="order-type">
              <div className="order-type-label">{i18n("pages.trade.orderType")}</div>
              {isLoading ? <div className="skel" style={{ height: 40, borderRadius: 8 }} /> : (
                <select
                  className="order-type-select"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="LIMIT">{i18n("pages.trade.limit")}</option>
                  <option value="MARKET">{i18n("pages.trade.market")}</option>
                </select>
              )}
            </div>

            {/* Price (limit only) */}
            {orderType === "LIMIT" && (
              <div className="input-group">
                <div className="input-label">{i18n("pages.trade.price")}</div>
                {isLoading ? <div className="skel" style={{ height: 40, borderRadius: 8 }} /> : (
                  <div className="input-with-buttons">
                    <input className="value-input" value={price} onChange={handlePriceChange} inputMode="decimal" />
                    <div className="value-buttons">
                      <button className="value-button" onClick={handleIncPrice}>+</button>
                      <button className="value-button" onClick={handleDecPrice}>-</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="input-group">
              <div className="input-label">{i18n("pages.trade.amount")} ({baseSymbol})</div>
              {isLoading ? <div className="skel" style={{ height: 40, borderRadius: 8 }} /> : (
                <div className="input-with-buttons">
                  <input
                    className="value-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="0.0"
                    inputMode="decimal"
                  />
                </div>
              )}
            </div>

            {/* USDT amount */}
            <div className="input-group">
              <div className="input-label">{i18n("pages.trade.amount")} (USDT)</div>
              {isLoading ? <div className="skel" style={{ height: 40, borderRadius: 8 }} /> : (
                <input
                  className="value-input"
                  value={amountInUSDT}
                  onChange={handleUSDTChange}
                  placeholder="0.0"
                  inputMode="decimal"
                  style={{ background: "#2a2a2e", borderRadius: 8, padding: "8px 10px", width: "100%" }}
                />
              )}
            </div>

            {/* % quick-select */}
            {!isLoading && (
              <div className="pct-row">
                {[0.25, 0.5, 0.75, 1].map((pct) => (
                  <button key={pct} className="pct-btn" onClick={() => handlePercentage(pct)}>
                    {pct * 100}%
                  </button>
                ))}
              </div>
            )}

            {/* Balance */}
            {!isLoading && (
              <div className="balance-info">
                {i18n("pages.trade.available")}: {fmt(currentBalance, activeTab === "buy" ? 2 : 6)}{" "}
                {activeTab === "buy" ? "USDT" : baseSymbol}
              </div>
            )}

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {isLoading ? <div className="skel" style={{ height: 44, borderRadius: 10 }} /> : (
              <button
                className={`action-button ${activeTab === "buy" ? "buy-button" : "sell-button"}`}
                onClick={handlePlaceOrder}
                disabled={placing}
              >
                {placing
                  ? i18n("pages.trade.placing")
                  : `${activeTab === "buy" ? i18n("pages.trade.buy") : i18n("pages.trade.sell")} ${baseSymbol}`}
              </button>
            )}
          </div>

          {/* Order book */}
          <div className="order-book">
            <div className="order-book-header">
              <span>{i18n("pages.trade.orderBook.price")}</span>
              <span>{i18n("pages.trade.orderBook.amount")} ({baseSymbol})</span>
            </div>

            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`sa${i}`} className="skel" style={{ height: 20, marginBottom: 6, borderRadius: 4 }} />
                ))}
                <div className="skel" style={{ height: 28, margin: "10px 0", borderRadius: 6 }} />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`sb${i}`} className="skel" style={{ height: 20, marginBottom: 6, borderRadius: 4 }} />
                ))}
              </>
            ) : (
              <>
                {orderBook.asks.map((ask, i) => {
                  const pct = Math.min(100, (safeParse(ask.amount) / maxAmount) * 100);
                  return (
                    <div key={`ask${i}`} className="order-book-row ask-row" onClick={() => handleOrderBookClick(ask.price)}>
                      <div className="depth-bar ask-depth" style={{ width: `${pct}%` }} />
                      <div className="order-price">{fmt(ask.price, 4)}</div>
                      <div className="order-amount">{fmt(ask.amount, 4)}</div>
                    </div>
                  );
                })}
                <div className="order-book-row current-price-row">
                  <div className="current-price" style={{ color: priceIsUp ? "#4caf50" : "#F41112" }}>
                    ${fmt(marketPrice, 2)}
                  </div>
                </div>
                {orderBook.bids.map((bid, i) => {
                  const pct = Math.min(100, (safeParse(bid.amount) / maxAmount) * 100);
                  return (
                    <div key={`bid${i}`} className="order-book-row bid-row" onClick={() => handleOrderBookClick(bid.price)}>
                      <div className="depth-bar bid-depth" style={{ width: `${pct}%` }} />
                      <div className="order-price">{fmt(bid.price, 4)}</div>
                      <div className="order-amount">{fmt(bid.amount, 4)}</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Open orders */}
        <div className="open-orders">
          <div className="open-orders-header">
            <div className="open-orders-title">{i18n("pages.trade.openOrders.title")}</div>
            <div className="orders-filter">
              <Link to="/ordersPage" className="remove_blue">
                <i className="fas fa-list" />
              </Link>
            </div>
          </div>
          {ordersList}
        </div>
      </div>

      {/* Coin modal */}
      <CoinListModal
        isOpen={isCoinModalOpen}
        selectedCoin={selectedCoin}
        onClose={() => setIsCoinModalOpen(false)}
        onSelectCoin={handleSelectCoin}
      />

      <style>{`
        .container {
          background-color: #0e0f14;
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Header */
        .trade-header {
          background-color: #0e0f14;
          padding: 10px 16px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2a2a2e;
          width: 100%;
          max-width: 400px;
        }

        .trade-header-top {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 6px;
        }

        .trade-page-title { font-size: 16px; font-weight: 700; color: #fff; text-align: center; }

        .market-info { display: flex; align-items: center; justify-content: center; gap: 8px; }

        .market-name { font-weight: 700; font-size: 14px; color: #fff; }

        .coin-select-icon { color: #F41112; font-size: 13px; cursor: pointer; transition: color 0.2s; }
        .coin-select-icon:hover { color: #F64141; }

        .market-change { font-size: 12px; font-weight: 600; }

        /* Skeleton */
        .skel {
          background: linear-gradient(90deg, #2a2a2e 25%, #333 50%, #2a2a2e 75%);
          background-size: 200% 100%;
          animation: skelAnim 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 10px;
          display: block;
        }
        @keyframes skelAnim { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .skel-name { width: 90px; height: 18px; }
        .skel-pct  { width: 50px; height: 14px; }

        /* Main */
        .main-content {
          width: 100%;
          max-width: 400px;
          padding: 10px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trading-layout { display: flex; gap: 10px; align-items: flex-start; }

        .trade-form, .order-book {
          flex: 1;
          min-width: 0;
          background-color: #15161c;
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .order-book { overflow-y: auto; max-height: 420px; }

        /* Buy/Sell tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 12px;
          background-color: #2a2a2e;
          border-radius: 10px;
          overflow: hidden;
        }

        .buy-tab, .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          color: #aaaaaa;
        }
        .buy-tab.active  { background-color: #4caf50; color: #fff; }
        .sell-tab.active { background-color: #F41112; color: #fff; }

        /* Order type */
        .order-type { margin-bottom: 12px; }
        .order-type-label { font-size: 11px; color: #aaa; margin-bottom: 4px; }
        .order-type-select {
          width: 100%;
          background-color: #2a2a2e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 13px;
          outline: none;
          cursor: pointer;
        }

        /* Inputs */
        .input-group { margin-bottom: 10px; }
        .input-label { display: block; font-size: 11px; color: #aaa; margin-bottom: 4px; }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #2a2a2e;
          border-radius: 8px;
          padding: 2px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 13px;
          padding: 8px 10px;
          outline: none;
          width: 100%;
        }

        .value-buttons { display: flex; gap: 4px; margin-right: 4px; }
        .value-button {
          background-color: #1e1e24;
          color: #fff;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          transition: background-color 0.2s;
        }
        .value-button:hover { background-color: #F41112; }

        /* % quick-select */
        .pct-row { display: flex; gap: 4px; margin-bottom: 8px; }
        .pct-btn {
          flex: 1;
          background: #2a2a2e;
          border: none;
          color: #aaa;
          border-radius: 6px;
          padding: 4px 0;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .pct-btn:hover { background: #F41112; color: #fff; }

        .balance-info { font-size: 12px; color: #aaa; margin: 8px 0; text-align: center; }

        /* Action button */
        .action-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          color: #fff;
          margin-top: 4px;
        }
        .buy-button  { background-color: #4caf50; }
        .buy-button:hover:not(:disabled)  { background-color: #43a047; }
        .sell-button { background-color: #F41112; }
        .sell-button:hover:not(:disabled) { background-color: #AD1111; }
        .action-button:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Order book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          padding: 0 4px 6px;
          font-size: 11px;
          color: #aaa;
          border-bottom: 1px solid #2a2a2e;
          margin-bottom: 6px;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 4px;
          font-size: 12px;
          cursor: pointer;
          position: relative;
          z-index: 1;
          border-radius: 6px;
          transition: background-color 0.15s;
        }
        .order-book-row:hover { background-color: rgba(244, 17, 18,0.08); }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.2;
          z-index: -1;
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        .ask-depth { right: 0; background-color: #F41112; }
        .bid-depth { left:  0; background-color: #4caf50; }

        .order-price, .order-amount { flex: 1; z-index: 2; font-size: 12px; }
        .order-amount { text-align: right; }
        .ask-row .order-price { color: #F41112; }
        .bid-row .order-price { color: #4caf50; }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #2a2a2e;
          border-bottom: 1px solid #2a2a2e;
        }
        .current-price { font-weight: 700; font-size: 14px; }

        /* Open orders */
        .open-orders {
          background-color: #15161c;
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .open-orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .open-orders-title { font-size: 15px; font-weight: 700; color: #F41112; }

        .orders-filter a { color: #aaa; font-size: 18px; transition: color 0.2s; }
        .orders-filter a:hover { color: #F41112; }

        .order-item {
          background-color: #2a2a2e;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .order-main-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .order-pair-action { display: flex; align-items: center; gap: 8px; }
        .order-pair { font-weight: 700; font-size: 14px; color: #fff; }

        .order-action {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 700;
        }
        .order-action.buy  { background: rgba(76,175,80,0.2);  color: #4caf50; }
        .order-action.sell { background: rgba(244, 17, 18,0.2);  color: #F41112; }

        .order-type-badge { font-size: 10px; color: #aaa; background: #15161c; padding: 2px 6px; border-radius: 6px; }

        .order-date  { font-size: 11px; color: #aaa; }
        .order-time  { color: #777; margin-left: 4px; }

        .order-details { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
        .order-detail  { display: flex; justify-content: space-between; align-items: center; }
        .detail-label  { font-size: 11px; color: #aaa; }

        .order-status { font-size: 11px; font-weight: 700; }
        .order-status.completed       { color: #4caf50; }
        .order-status.canceled        { color: #F41112; }
        .order-status.pending         { color: #f3ba2f; }
        .order-status.partially-filled { color: #ff6838; }

        .order-price-value, .order-amount-value, .order-total { font-size: 12px; font-weight: 700; color: #fff; }

        .order-actions { display: flex; justify-content: flex-end; }

        .cancel-order-btn {
          background: #F41112;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .cancel-order-btn:hover { background: #AD1111; }

        .completed-indicator { color: #4caf50; font-size: 18px; }

        .empty-orders { text-align: center; padding: 28px 0; }
        .empty-icon   { font-size: 30px; color: #2a2a2e; margin-bottom: 10px; }
        .empty-text   { color: #aaa; font-size: 14px; margin-bottom: 4px; }
        .empty-subtext { color: #777; font-size: 12px; }

        .error-message {
          background: rgba(244, 17, 18,0.15);
          color: #F41112;
          padding: 8px;
          border-radius: 8px;
          margin: 8px 0;
          font-size: 13px;
          text-align: center;
        }

        a.remove_blue { text-decoration: none; color: inherit; }
      `}</style>
    </div>
  );
}

export default Trade;
