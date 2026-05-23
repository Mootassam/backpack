import { useState, useEffect, useRef, useCallback, useReducer, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import News from "./News";

/* ─────────────────────────── Types ─────────────────────────── */
interface TickerData {
  s: string; // symbol  e.g. "BTCUSDT"
  c: string; // last price
  P: string; // 24h change %
  v: string; // base volume
  h: string; // 24h high
  l: string; // 24h low
}

interface CryptoMeta {
  symbol: string;
  base: string;
}

/* ─────────────────────────── Constants ─────────────────────────── */
const TOP_CRYPTOS: CryptoMeta[] = [
  { symbol: "BTCUSDT", base: "BTC" },
  { symbol: "ETHUSDT", base: "ETH" },
  { symbol: "BNBUSDT", base: "BNB" },
  { symbol: "SOLUSDT", base: "SOL" },
];

const SLIDER_IMAGES = ["/images/1.png", "/images/2.png", "/images/3.png"];

const QUICK_ACTIONS = [
  { path: "/deposit",    icon: "fas fa-download",      name: "Deposit",  color: "#26a17b" },
  { path: "/Withdraw",   icon: "fas fa-upload",         name: "Withdraw", color: "#fd4b4e" },
  { path: "/trade",      icon: "fas fa-chart-line",     name: "Trade",    color: "#2196f3" },
  { path: "/futures",    icon: "fas fa-chart-bar",      name: "Futures",  color: "#9c27b0" },
  { path: "/profile", icon: "fas fa-user",   name: "Profile",  color: "#ff9800" },
];



/* ─────────────────────────── Reducer ─────────────────────────── */
type TickersState = Record<string, TickerData>;
type TickersAction = { type: "UPDATE"; payload: TickerData };

function tickersReducer(state: TickersState, action: TickersAction): TickersState {
  return { ...state, [action.payload.s]: action.payload };
}

/* ─────────────────────────── Helpers ─────────────────────────── */
function fmtVol(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
}

function fmtPrice(p: number): string {
  return p.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: p < 1 ? 4 : 2,
  });
}

/* ═══════════════════════════ Component ═══════════════════════════ */
function Home() {
  const dispatch = useDispatch();
  const selectNews       = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);

  const [tickers, dispatchTicker] = useReducer(tickersReducer, {});
  const [isMarketReady, setIsMarketReady]   = useState(false);
  const [currentSlide, setCurrentSlide]     = useState(0);
  const [iconErrors, setIconErrors]         = useState<Record<string, boolean>>({});

  const ws              = useRef<WebSocket | null>(null);
  const lastUpdateRef   = useRef(0);
  const reconnectTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef      = useRef(0);
  const isReadyRef      = useRef(false);

  /* fetch news */
  useEffect(() => {
    dispatch(productListActions.doFindNews({ id: 1, page: 1, size: 5 }));
  }, [dispatch]);

  /* slider auto-advance */
  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % SLIDER_IMAGES.length), 4500);
    return () => clearInterval(id);
  }, []);

  /* WebSocket — 4 targeted streams only */
  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      if (!isMounted) return;
      if (ws.current) { ws.current.onclose = null; ws.current.close(); ws.current = null; }

      const streams = TOP_CRYPTOS.map((c) => `${c.symbol.toLowerCase()}@ticker`).join("/");
      const socket  = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
      ws.current    = socket;

      socket.onmessage = (event) => {
        if (!isMounted) return;
        const now = Date.now();
        if (now - lastUpdateRef.current < 250) return;
        lastUpdateRef.current = now;
        try {
          const msg = JSON.parse(event.data);
          const t: TickerData = msg.data ?? msg;
          if (t?.s) {
            dispatchTicker({ type: "UPDATE", payload: t });
            if (!isReadyRef.current) { isReadyRef.current = true; setIsMarketReady(true); }
          }
        } catch { /* ignore */ }
      };

      socket.onerror = () => {
        if (isMounted && !isReadyRef.current) { isReadyRef.current = true; setIsMarketReady(true); }
      };

      socket.onclose = () => {
        if (!isMounted) return;
        const delay = Math.min(30000, 3000 * Math.pow(1.5, attemptRef.current));
        attemptRef.current += 1;
        reconnectTimer.current = setTimeout(connect, delay);
      };
    };

    connect();
    return () => {
      isMounted = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (ws.current) { ws.current.onclose = null; ws.current.close(); ws.current = null; }
    };
  }, []);

  const handleIconError = useCallback((base: string) => {
    setIconErrors((prev) => ({ ...prev, [base]: true }));
  }, []);

  /* duplicate items for seamless ticker loop */
  const tickerItems = useMemo(() => {
    const items = TOP_CRYPTOS.map((c) => {
      const t = tickers[c.symbol];
      const price  = t ? parseFloat(t.c) : null;
      const change = t ? parseFloat(t.P) : null;
      return { base: c.base, price, change };
    });
    return [...items, ...items]; // doubled for seamless CSS loop
  }, [tickers]);

  /* ─── JSX ─── */
  return (
    <div className="hp-root">

      {/* ══════════ TICKER STRIP ══════════ */}
      <div className="hp-ticker-bar">
        <div className="hp-ticker-track">
          {tickerItems.map((item, i) => (
            <span className="hp-ticker-item" key={i}>
              <span className="hp-t-sym">{item.base}</span>
              {item.price !== null ? (
                <>
                  <span className="hp-t-price">${fmtPrice(item.price)}</span>
                  <span className={`hp-t-chg ${item.change! >= 0 ? "up" : "dn"}`}>
                    {item.change! >= 0 ? "▲" : "▼"}{Math.abs(item.change!).toFixed(2)}%
                  </span>
                </>
              ) : (
                <span className="hp-t-price" style={{ color: "#333" }}>—</span>
              )}
              <span className="hp-t-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <div className="hp-hero">
        <div className="hp-hero-glow" />



        {/* Tagline */}
        <div className="hp-tagline">
          <div className="hp-live-pill">
            <span className="hp-live-dot" />
            Live Market
          </div>
          <h1 className="hp-h1">
            Your Gateway to<br />
            <span className="hp-accent">Crypto Markets</span>
          </h1>
          <p className="hp-sub">
            Spot · Futures · P2P · Staking &nbsp;|&nbsp; 0.02% maker fee
          </p>
        </div>

        {/* Mini price row */}
        <div className="hp-mini-prices">
          {TOP_CRYPTOS.map((c) => {
            const t = tickers[c.symbol];
            const price  = t ? parseFloat(t.c) : null;
            const change = t ? parseFloat(t.P) : null;
            const up     = change !== null ? change >= 0 : true;
            return (
              <Link to={`/market/detail/${c.symbol}`} className="hp-mini-card remove_blue" key={c.symbol}>
                <div className="hp-mini-icon">
                  {iconErrors[c.base] ? (
                    <span className="hp-fallback">{c.base.slice(0, 2)}</span>
                  ) : (
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${c.base}.png`}
                      width={20} height={20} loading="lazy" alt={c.base}
                      onError={() => handleIconError(c.base)}
                    />
                  )}
                </div>
                <span className="hp-mini-sym">{c.base}</span>
                {price !== null ? (
                  <span className={`hp-mini-chg ${up ? "up" : "dn"}`}>
                    {up ? "+" : ""}{change!.toFixed(2)}%
                  </span>
                ) : (
                  <span className="hp-mini-chg" style={{ color: "#444" }}>—</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ══════════ BODY ══════════ */}
      <div className="hp-body">

        {/* ── Quick Actions ── */}
        <div className="hp-actions-card">
          {QUICK_ACTIONS.map((a) => (
            <Link to={a.path} className="hp-action remove_blue" key={a.path}>
              <div className="hp-action-ring">
                <i className={a.icon} style={{ color: a.color }} />
              </div>
              <span className="hp-action-lbl">{a.name}</span>
            </Link>
          ))}
        </div>

        {/* ── Live Market ── */}
        <div className="hp-row-hdr">
          <span className="hp-row-title">Live Market</span>
          <Link to="/market" className="hp-see-all remove_blue">See All →</Link>
        </div>

        <div className="hp-mkt-grid">
          {TOP_CRYPTOS.map((c) => {
            const t       = tickers[c.symbol];
            const price   = t ? parseFloat(t.c) : 0;
            const change  = t ? parseFloat(t.P) : 0;
            const up      = change >= 0;
            const vol     = t ? parseFloat(t.v) : 0;

            return (
              <Link to={`/market/detail/${c.symbol}`} className="hp-mkt-card remove_blue" key={c.symbol}>
                <div className="hp-mkt-top">
                  <div className="hp-mkt-icon">
                    {iconErrors[c.base] ? (
                      <span className="hp-fallback">{c.base.slice(0, 2)}</span>
                    ) : (
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${c.base}.png`}
                        width={28} height={28} loading="lazy" alt={c.base}
                        onError={() => handleIconError(c.base)}
                      />
                    )}
                  </div>
                  <div className="hp-mkt-names">
                    <span className="hp-mkt-sym">{c.base}</span>
                    <span className="hp-mkt-usdt">/USDT</span>
                  </div>
                  <div className={`hp-mkt-pill ${up ? "up" : "dn"}`}>
                    {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                  </div>
                </div>

                {isMarketReady && t ? (
                  <>
                    <div className="hp-mkt-price">${fmtPrice(price)}</div>
                    <div className="hp-mkt-vol">Vol {fmtVol(vol)}</div>
                  </>
                ) : (
                  <>
                    <div className="hp-sk" style={{ width: "88px", height: "18px", marginBottom: "5px" }} />
                    <div className="hp-sk" style={{ width: "56px", height: "11px" }} />
                  </>
                )}
              </Link>
            );
          })}
        </div>

    

        {/* ── Why Backpack ── */}
        <div className="hp-row-hdr">
          <span className="hp-row-title">Why Choose Us</span>
        </div>

        <div className="hp-why-list">
          {[
            { icon: "fas fa-shield-alt",  color: "#26a17b", title: "Bank-Grade Security",  desc: "Cold storage + 2FA + withdrawal whitelist protection" },
            { icon: "fas fa-bolt",        color: "#f0b90b", title: "Lightning Fast",        desc: "Millisecond execution with real-time order books" },
            { icon: "fas fa-percentage",  color: "#2196f3", title: "Lowest Fees",           desc: "0.02% maker / 0.05% taker — some of the best in the industry" },
            { icon: "fas fa-globe",       color: "#9c27b0", title: "Multi-Chain Support",   desc: "Solana, Ethereum, Bitcoin and more in one platform" },
          ].map((f) => (
            <div className="hp-why-card" key={f.title}>
              <div className="hp-why-icon" style={{ background: `${f.color}18`, borderColor: `${f.color}30` }}>
                <i className={f.icon} style={{ color: f.color }} />
              </div>
              <div>
                <div className="hp-why-title">{f.title}</div>
                <div className="hp-why-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Start Trading Banner ── */}
        <Link to="/trade" className="hp-cta-banner remove_blue">
          <div className="hp-cta-glow" />
          <div>
            <div className="hp-cta-title">Start Trading Now</div>
            <div className="hp-cta-sub">Access 200+ crypto pairs · Zero deposit fees</div>
          </div>
          <div className="hp-cta-arrow">
            <i className="fas fa-arrow-right" />
          </div>
        </Link>

        {/* ── Crypto News ── */}
        <News topic={selectNews} loading={selectloadingNews} />

        <div style={{ height: "32px" }} />
      </div>

      {/* ════════════════════ STYLES ════════════════════ */}
      <style>{`
        /* ── Reset / Base ── */
        .hp-root {
          min-height: 100vh;
          background: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
        }
        a.remove_blue { text-decoration: none; color: inherit; }

        /* ── Ticker ── */
        .hp-ticker-bar {
          background: #0a0b0f;
          border-bottom: 1px solid #1a1b22;
          height: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hp-ticker-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: hpScroll 22s linear infinite;
        }
        @keyframes hpScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hp-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0 18px;
          font-size: 11px;
        }
        .hp-t-sym   { color: #666; font-weight: 700; }
        .hp-t-price { color: #bbb; font-weight: 500; }
        .hp-t-chg.up { color: #26a17b; }
        .hp-t-chg.dn { color: #fd4b4e; }
        .hp-t-dot    { color: #222; margin-left: 10px; }

        /* ── Hero ── */
        .hp-hero {
          position: relative;
          background: linear-gradient(170deg, #12131b 0%, #0e0f14 55%, #180a0b 100%);
          padding: 0 0 20px;
          overflow: hidden;
          max-width: 400px;
          margin: 0 auto;
        }
        .hp-hero-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253,75,78,0.14) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Slider */
        .hp-slider {
          position: relative;
          overflow: hidden;
        }
        .hp-slides {
          display: flex;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
        }
        .hp-slide { min-width: 100%; }
        .hp-slide img { width: 100%; display: block; object-fit: cover; }
        .hp-dots {
          position: absolute;
          bottom: 10px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 2;
        }
        .hp-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.3s;
        }
        .hp-dot.on { width: 20px; border-radius: 4px; background: #fd4b4e; }

        /* Tagline */
        .hp-tagline {
          padding: 18px 18px 0;
        }
        .hp-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(38,161,123,0.12);
          border: 1px solid rgba(38,161,123,0.3);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          color: #26a17b;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: 0.4px;
        }
        .hp-live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #26a17b;
          animation: hpBlink 2s infinite;
        }
        @keyframes hpBlink {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(1.4); }
        }
        .hp-h1 {
          font-size: 27px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }
        .hp-accent {
          background: linear-gradient(90deg, #fd4b4e 0%, #ff8a6e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hp-sub {
          color: #666;
          font-size: 12.5px;
          margin: 0 0 16px;
          letter-spacing: 0.2px;
        }

        /* Mini price row */
        .hp-mini-prices {
          display: flex;
          gap: 8px;
          padding: 0 18px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .hp-mini-prices::-webkit-scrollbar { display: none; }
        .hp-mini-card {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid #1e1f26;
          border-radius: 10px;
          padding: 7px 12px;
          transition: border-color 0.2s;
        }
        .hp-mini-card:hover { border-color: #fd4b4e33; }
        .hp-mini-icon {
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; border-radius: 50%;
        }
        .hp-mini-sym  { color: #ccc; font-size: 12px; font-weight: 700; }
        .hp-mini-chg  { font-size: 11px; font-weight: 700; }
        .hp-mini-chg.up { color: #26a17b; }
        .hp-mini-chg.dn { color: #fd4b4e; }

        /* ── Body ── */
        .hp-body {
          max-width: 400px;
          margin: 0 auto;
          padding: 16px 14px 0;
          box-sizing: border-box;
        }

        /* ── Quick Actions ── */
        .hp-actions-card {
          display: flex;
          justify-content: space-between;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 16px;
          padding: 16px 6px;
          margin-bottom: 22px;
        }
        .hp-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }
        .hp-action-ring {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: #0e0f14;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          transition: background 0.2s, border-color 0.2s;
        }
        .hp-action:hover .hp-action-ring {
          background: #1a1b23;
          border-color: #3a3a42;
        }
        .hp-action-lbl {
          font-size: 10.5px;
          color: #888;
          font-weight: 600;
          text-align: center;
        }

        /* ── Section header row ── */
        .hp-row-hdr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .hp-row-title { color: #fff; font-size: 15px; font-weight: 700; }
        .hp-see-all   { color: #fd4b4e; font-size: 12.5px; font-weight: 600; }

        /* ── Market Grid ── */
        .hp-mkt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .hp-mkt-card {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 12px;
          display: block;
          transition: border-color 0.2s, background 0.2s;
        }
        .hp-mkt-card:hover { background: #1a1b24; border-color: #2a2a35; }
        .hp-mkt-top {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
        }
        .hp-mkt-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #0e0f14;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .hp-mkt-names { flex: 1; min-width: 0; }
        .hp-mkt-sym   { color: #fff; font-size: 13px; font-weight: 700; display: block; line-height: 1.2; }
        .hp-mkt-usdt  { color: #444; font-size: 10px; }
        .hp-mkt-pill  {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 6px;
        }
        .hp-mkt-pill.up { background: rgba(38,161,123,0.15); color: #26a17b; }
        .hp-mkt-pill.dn { background: rgba(253,75,78,0.12);  color: #fd4b4e; }
        .hp-mkt-price { color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .hp-mkt-vol   { color: #444; font-size: 11px; }

        /* ── Trading Products ── */
        .hp-prod-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .hp-prod-card {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 12px;
          display: block;
          transition: border-color 0.2s, background 0.2s;
        }
        .hp-prod-card:hover { background: #1a1b24; border-color: #2a2a35; }
        .hp-prod-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .hp-prod-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(253,75,78,0.1);
          border: 1px solid rgba(253,75,78,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fd4b4e; font-size: 16px;
        }
        .hp-prod-badge {
          font-size: 9px;
          font-weight: 800;
          background: rgba(253,75,78,0.15);
          color: #fd4b4e;
          padding: 2px 7px;
          border-radius: 6px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(253,75,78,0.2);
        }
        .hp-prod-label { color: #fff; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
        .hp-prod-desc  { color: #555; font-size: 11px; line-height: 1.5; }

        /* ── Why section ── */
        .hp-why-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }
        .hp-why-card {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 14px;
        }
        .hp-why-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 10px;
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .hp-why-title { color: #fff; font-size: 13.5px; font-weight: 700; margin-bottom: 3px; }
        .hp-why-desc  { color: #555; font-size: 11.5px; line-height: 1.5; }

        /* ── CTA Banner ── */
        .hp-cta-banner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #1d0708 0%, #2a0b0c 100%);
          border: 1px solid rgba(253,75,78,0.3);
          border-radius: 16px;
          padding: 18px 16px;
          margin-bottom: 24px;
          overflow: hidden;
          gap: 12px;
        }
        .hp-cta-glow {
          position: absolute;
          left: -40px; top: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253,75,78,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .hp-cta-title { color: #fff; font-size: 15px; font-weight: 800; margin-bottom: 3px; }
        .hp-cta-sub   { color: #888; font-size: 11.5px; }
        .hp-cta-arrow {
          flex-shrink: 0;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #fd4b4e;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 14px;
        }

        /* ── Shimmer skeleton ── */
        .hp-sk {
          display: block;
          border-radius: 4px;
          animation: hpShimmer 1.5s infinite linear;
          background: linear-gradient(to right, #2a2a2e 8%, #323236 18%, #2a2a2e 33%);
          background-size: 800px 104px;
        }
        @keyframes hpShimmer {
          0%   { background-position: -468px 0; }
          100% { background-position:  468px 0; }
        }

        /* ── Fallback icon ── */
        .hp-fallback {
          font-size: 9px; font-weight: 800; color: #fd4b4e;
        }

        /* ══════════════════ NEWS STYLES ══════════════════ */
        .crypto-news-container {
          max-width: 400px;
          margin: 0 auto;
        }
        .news-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .news-sections-title {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
        .news-see-all {
          color: #fd4b4e;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
        }
        .news-item-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #15161c;
          border-radius: 14px;
          padding: 12px 12px;
          border: 1px solid #1e1f26;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          overflow: hidden;
        }
        .news-item-card:hover {
          background: #1a1b24;
          border-color: #2a2a35;
        }
        .news-image-placeholder {
          width: 76px;
          height: 68px;
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          background: #2a2a2e;
          display: block;
        }
        .news-content-wrapper {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .news-headline {
          color: #e8e8e8;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.45;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-summary {
          color: #555;
          font-size: 11.5px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-meta-info {
          color: #3a3a42;
          font-size: 10.5px;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}

export default Home;
