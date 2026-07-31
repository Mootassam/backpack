import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import FuturesChart from "../Futures/FuturesChart";
import { i18n } from "../../../i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Trade {
  t: number;  // trade id
  p: string;  // price
  q: string;  // quantity
  T: number;  // trade time
  m: boolean; // is buyer market maker (seller-initiated = red)
}

interface MarketStats {
  price: string | null;
  changePercent: string | null;
  high: string | null;
  low: string | null;
  volume: string | null;
}

// ─── Reducer — batch all market stats into one state update ──────────────────

type StatsAction =
  | { type: "TICKER"; payload: Partial<MarketStats> }
  | { type: "RESET" };

function statsReducer(state: MarketStats, action: StatsAction): MarketStats {
  switch (action.type) {
    case "TICKER":
      return { ...state, ...action.payload };
    case "RESET":
      return { price: null, changePercent: null, high: null, low: null, volume: null };
    default:
      return state;
  }
}

const INITIAL_STATS: MarketStats = {
  price: null,
  changePercent: null,
  high: null,
  low: null,
  volume: null,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MAX_RECONNECTS = 8;
const RECONNECT_BASE_MS = 1500;

function useWebSocket(
  url: string,
  onMessage: (event: MessageEvent) => void,
  enabled: boolean
) {
  const wsRef = useRef<WebSocket | null>(null);
  const attemptsRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    mountedRef.current = true;
    attemptsRef.current = 0;

    const connect = () => {
      if (!mountedRef.current) return;
      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.onmessage = onMessage;

      socket.onclose = () => {
        if (!mountedRef.current) return;
        if (attemptsRef.current >= MAX_RECONNECTS) return;
        const delay = RECONNECT_BASE_MS * Math.pow(1.5, attemptsRef.current);
        attemptsRef.current++;
        timerRef.current = setTimeout(connect, delay);
      };

      socket.onerror = () => { /* silently ignore */ };
    };

    connect();

    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // Intentionally omitting `onMessage` from deps — caller should memoize it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enabled]);
}

// ─── Component ────────────────────────────────────────────────────────────────

function MarketDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [stats, dispatchStats] = useReducer(statsReducer, INITIAL_STATS);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(id || "BTCUSDT");
  const [isLoading, setIsLoading] = useState(true);

  const tickerThrottleRef = useRef(0);
  const tradeThrottleRef = useRef(0);

  // ── Sync URL param → state ─────────────────────────────────────────────────

  useEffect(() => {
    if (id && id !== selectedCoin) {
      setSelectedCoin(id);
      dispatchStats({ type: "RESET" });
      setRecentTrades([]);
      setIsLoading(true);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Initial REST fetch (shows data before WS connects) ────────────────────

  useEffect(() => {
    let cancelled = false;

    const fetchInitial = async () => {
      try {
        const [tickerRes, tradesRes] = await Promise.all([
          axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`),
          axios.get(`https://api.binance.com/api/v3/trades?symbol=${selectedCoin}&limit=10`),
        ]);

        if (cancelled) return;

        const t = tickerRes.data;
        dispatchStats({
          type: "TICKER",
          payload: {
            price: t.lastPrice,
            changePercent: t.priceChangePercent,
            high: t.highPrice,
            low: t.lowPrice,
            volume: t.volume,
          },
        });
        setRecentTrades(tradesRes.data.slice(0, 10));
        setIsLoading(false);
      } catch {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchInitial();
    return () => { cancelled = true; };
  }, [selectedCoin]);

  // ── Ticker WebSocket — 150 ms throttle, single dispatch ───────────────────

  const tickerUrl = `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`;

  const handleTickerMessage = useCallback((event: MessageEvent) => {
    const now = performance.now();
    if (now - tickerThrottleRef.current < 150) return;
    tickerThrottleRef.current = now;

    try {
      const d = JSON.parse(event.data);
      dispatchStats({
        type: "TICKER",
        payload: {
          price: d.c,
          changePercent: d.P,
          high: d.h,
          low: d.l,
          volume: d.v,
        },
      });
    } catch { /* ignore */ }
  }, []); // stable — dispatchStats from useReducer is always stable

  useWebSocket(tickerUrl, handleTickerMessage, !isLoading || stats.price !== null);

  // ── Trade WebSocket — 250 ms throttle, keep last 10 ──────────────────────

  const tradeUrl = `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`;

  const handleTradeMessage = useCallback((event: MessageEvent) => {
    const now = performance.now();
    if (now - tradeThrottleRef.current < 250) return;
    tradeThrottleRef.current = now;

    try {
      const d = JSON.parse(event.data);
      setRecentTrades((prev) => [
        { t: d.t, p: d.p, q: d.q, T: d.T, m: d.m },
        ...prev.slice(0, 9),
      ]);
    } catch { /* ignore */ }
  }, []);

  useWebSocket(tradeUrl, handleTradeMessage, !isLoading || recentTrades.length > 0);

  // ── Formatters ────────────────────────────────────────────────────────────

  const formatNumber = useCallback((num: string, decimals = 2) =>
    Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }), []);

  const formatVolume = useCallback((vol: string) => {
    const n = Number(vol);
    if (n >= 1e9) return (n / 1e9).toFixed(2) + i18n("pages.marketDetail.volume.billion");
    if (n >= 1e6) return (n / 1e6).toFixed(2) + i18n("pages.marketDetail.volume.million");
    return formatNumber(vol, 0);
  }, [formatNumber]);

  const goBack = useCallback(() => history.goBack(), [history]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const isPriceUp = stats.changePercent !== null && !stats.changePercent.startsWith("-");
  const baseSymbol = selectedCoin.replace("USDT", "");

  // ── Skeleton helper ───────────────────────────────────────────────────────

  const Skeleton = ({ w, h }: { w: string; h: string }) => (
    <div className="skeleton" style={{ width: w, height: h }} />
  );

  // ── Memo sections ─────────────────────────────────────────────────────────

  const headerSection = useMemo(() => (
    <div className="header-top">
      <div className="back-button" onClick={goBack}>
        <i className="fas fa-arrow-left" />
      </div>
      <div className="market-info">
        <div className="market-icon">
          <img
            src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${baseSymbol}.png`}
            width={30}
            height={30}
            loading="lazy"
            alt={baseSymbol}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div className="market-name">{selectedCoin}</div>
        <div className="market-change" style={{ color: isPriceUp ? "#4caf50" : "#F41112" }}>
          {stats.changePercent !== null
            ? `${stats.changePercent}%`
            : <Skeleton w="50px" h="16px" />}
        </div>
      </div>
      <div style={{ width: 24 }} />
    </div>
  ), [baseSymbol, selectedCoin, isPriceUp, stats.changePercent, goBack]); // eslint-disable-line react-hooks/exhaustive-deps

  const statsBar = useMemo(() => (
    <div className="market-stats">
      <span>
        {i18n("pages.marketDetail.stats.high")}:{" "}
        {stats.high !== null ? `$${formatNumber(stats.high)}` : <Skeleton w="70px" h="12px" />}
      </span>
      <span>
        {i18n("pages.marketDetail.stats.volume")}:{" "}
        {stats.volume !== null ? `${formatVolume(stats.volume)} ${baseSymbol}` : <Skeleton w="70px" h="12px" />}
      </span>
      <span>
        {i18n("pages.marketDetail.stats.low")}:{" "}
        {stats.low !== null ? `$${formatNumber(stats.low)}` : <Skeleton w="70px" h="12px" />}
      </span>
    </div>
  ), [stats.high, stats.volume, stats.low, baseSymbol, formatNumber, formatVolume]); // eslint-disable-line react-hooks/exhaustive-deps

  const tradesSection = useMemo(() => {
    if (!recentTrades.length) {
      return Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="trade-row">
          <div className="trade-price"><Skeleton w="60px" h="14px" /></div>
          <div className="trade-amount"><Skeleton w="50px" h="14px" /></div>
          <div className="trade-time"><Skeleton w="40px" h="14px" /></div>
        </div>
      ));
    }
    return recentTrades.map((trade, index) => (
      <div key={`${trade.t}-${index}`} className={`trade-row ${trade.m ? "sell-trade" : "buy-trade"}`}>
        <div className="trade-price">{formatNumber(trade.p)}</div>
        <div className="trade-amount">{Number(trade.q).toFixed(4)}</div>
        <div className="trade-time">{new Date(trade.T).toLocaleTimeString()}</div>
      </div>
    ));
  }, [recentTrades, formatNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="md-container">
      {/* Header */}
      <div className="header">
        {headerSection}
        <div className="market-price" style={{ color: isPriceUp ? "#4caf50" : "#F41112" }}>
          {stats.price !== null
            ? `$${formatNumber(stats.price)}`
            : <Skeleton w="120px" h="28px" />}
        </div>
        {statsBar}
      </div>

      {/* Real-time chart */}
      <FuturesChart symbol={selectedCoin} />

      {/* Action buttons */}
      <div className="action-buttons">
        <Link to="/trade" className="remove_blue action-button buy-button">
          {i18n("pages.marketDetail.actions.buy")}
        </Link>
        <Link to="/trade" className="remove_blue action-button sell-button">
          {i18n("pages.marketDetail.actions.sell")}
        </Link>
      </div>

      {/* Recent trades */}
      <div className="section-title">{i18n("pages.marketDetail.recentTrades.title")}</div>
      <div className="recent-trades">
        <div className="trades-header">
          <span>{i18n("pages.marketDetail.recentTrades.price")}</span>
          <span>{i18n("pages.marketDetail.recentTrades.amount")}</span>
          <span>{i18n("pages.marketDetail.recentTrades.time")}</span>
        </div>
        {tradesSection}
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .md-container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #0e0f14;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          background-color: #0e0f14;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2a2a2e;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .back-button {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
          transition: color 0.2s;
        }
        .back-button:hover { color: #fff; }

        .market-info { display: flex; align-items: center; gap: 8px; }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #15161c;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .market-name { font-weight: 700; font-size: 16px; }

        .market-change {
          font-size: 13px;
          font-weight: 700;
          min-height: 16px;
          display: flex;
          align-items: center;
        }

        .market-price {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
          min-height: 28px;
          display: flex;
          align-items: center;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #aaaaaa;
          flex-wrap: wrap;
          gap: 4px;
        }

        .market-stats span {
          display: flex;
          align-items: center;
          gap: 4px;
          min-height: 14px;
        }

        /* Skeleton */
        .skeleton {
          background: linear-gradient(90deg, #2a2a2e 25%, #3a3a3e 50%, #2a2a2e 75%);
          background-size: 200% 100%;
          animation: skeletonAnim 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }
        @keyframes skeletonAnim {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 10px;
          margin: 15px;
        }

        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }
        .action-button:hover { opacity: 0.85; }
        .buy-button  { background-color: #4caf50; color: white; }
        .sell-button { background-color: #F41112; color: white; }

        a.remove_blue { text-decoration: none; color: inherit; display: block; }

        /* Recent trades */
        .section-title {
          font-size: 15px;
          font-weight: 700;
          margin: 16px 15px 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        .recent-trades {
          margin: 0 15px;
          max-height: 300px;
          overflow-y: auto;
        }

        .trades-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 11px;
          color: #888888;
          position: sticky;
          top: 0;
          background-color: #0e0f14;
          padding: 4px 0;
          z-index: 5;
        }

        .trade-row {
          display: flex;
          justify-content: space-between;
          padding: 7px 0;
          font-size: 12px;
          border-bottom: 1px solid #1e1e24;
          align-items: center;
          min-height: 30px;
        }

        .trade-price  { flex: 1; }
        .trade-amount { flex: 1; text-align: right; }
        .trade-time   { flex: 1; text-align: right; color: #888888; font-size: 11px; }

        .buy-trade  .trade-price { color: #4caf50; }
        .sell-trade .trade-price { color: #F41112; }
      `}</style>
    </div>
  );
}

export default React.memo(MarketDetail);
