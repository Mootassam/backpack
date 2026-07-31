import axios from "axios";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BinanceTicker {
  s: string; // symbol
  c: string; // last price
  P: string; // price change percent
  v: string; // base volume
  p: string; // price change
  q: string; // quote volume
}

interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  volumeFormatted: string;
  isPositive: boolean;
  quoteVolume: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatVolume(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  return n.toFixed(0);
}

function formatPrice(price: string): string {
  const n = Number(price);
  if (isNaN(n)) return "0.00";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: n < 1 ? 6 : 4,
  });
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TARGET_PAIRS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT",
  "ADAUSDT", "DOGEUSDT", "DOTUSDT", "LTCUSDT", "LINKUSDT",
  "BCHUSDT", "TRXUSDT", "MATICUSDT", "FILUSDT", "TONUSDT",
  "EOSUSDT", "ZECUSDT", "DASHUSDT", "XMRUSDT", "YFIUSDT",
  "SHIBUSDT", "USDCUSDT", "TRUMPUSDT",
];

// Combined-stream URL — one connection, all pairs
const WS_STREAMS = TARGET_PAIRS.map((p) => `${p.toLowerCase()}@ticker`).join("/");
const WS_URL = `wss://stream.binance.com:9443/stream?streams=${WS_STREAMS}`;

// ─── Component ────────────────────────────────────────────────────────────────

const Market: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [iconErrors, setIconErrors] = useState<Record<string, boolean>>({});

  const ws = useRef<WebSocket | null>(null);
  const mountedRef = useRef(true);
  const wsThrottleRef = useRef(0);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttempts = useRef(0);
  const cancelRef = useRef<any>(null);

  // ── Initial batch REST fetch ───────────────────────────────────────────────

  useEffect(() => {
    mountedRef.current = true;

    const fetchPrices = async () => {
      const source = axios.CancelToken.source();
      cancelRef.current = source;
      try {
        const symbolsParam = TARGET_PAIRS.map((s) => `"${s}"`).join(",");
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbolsParam}]`;

        const res = await axios.get(url, {
          cancelToken: source.token,
          timeout: 6000,
        });

        if (!mountedRef.current) return;

        const map: Record<string, CryptoData> = {};

        (res.data as any[]).forEach((item) => {
          const sym = item.symbol as string;
          const base = sym.replace("USDT", "");
          const pct = parseFloat(item.priceChangePercent);
          map[sym] = {
            symbol: sym,
            name: `${base}/USDT`,
            price: formatPrice(item.lastPrice),
            changePercent: Math.abs(pct).toFixed(2),
            volumeFormatted: formatVolume(Number(item.volume)),
            isPositive: pct >= 0,
            quoteVolume: parseFloat(item.quoteVolume),
          };
        });

        // Fill placeholders for any missing pairs
        TARGET_PAIRS.forEach((sym) => {
          if (!map[sym]) {
            const base = sym.replace("USDT", "");
            map[sym] = {
              symbol: sym,
              name: `${base}/USDT`,
              price: "0.00",
              changePercent: "0.00",
              volumeFormatted: "0",
              isPositive: true,
              quoteVolume: 0,
            };
          }
        });

        setCryptoData(map);
        setIsLoading(false);
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        if (!mountedRef.current) return;

        // Show placeholders even on error — WS will fill in real data
        const fallback: Record<string, CryptoData> = {};
        TARGET_PAIRS.forEach((sym) => {
          const base = sym.replace("USDT", "");
          fallback[sym] = {
            symbol: sym,
            name: `${base}/USDT`,
            price: "—",
            changePercent: "—",
            volumeFormatted: "—",
            isPositive: true,
            quoteVolume: 0,
          };
        });
        setCryptoData(fallback);
        setIsLoading(false);
      }
    };

    fetchPrices();

    return () => {
      mountedRef.current = false;
      cancelRef.current?.cancel("unmounted");
    };
  }, []);

  // ── WebSocket — combined stream, 200 ms throttle ──────────────────────────

  useEffect(() => {
    mountedRef.current = true;
    reconnectAttempts.current = 0;

    const connect = () => {
      if (!mountedRef.current) return;

      const socket = new WebSocket(WS_URL);
      ws.current = socket;

      socket.onmessage = (event) => {
        if (!mountedRef.current) return;

        const now = performance.now();
        if (now - wsThrottleRef.current < 200) return;
        wsThrottleRef.current = now;

        try {
          const msg = JSON.parse(event.data);
          // Combined-stream format: { stream, data }
          const ticker: BinanceTicker = msg.data ?? msg;
          if (!ticker?.s || !TARGET_PAIRS.includes(ticker.s)) return;

          const pct = parseFloat(ticker.P);
          setCryptoData((prev) => {
            const existing = prev[ticker.s];
            if (!existing) return prev;
            return {
              ...prev,
              [ticker.s]: {
                ...existing,
                price: formatPrice(ticker.c),
                changePercent: Math.abs(pct).toFixed(2),
                volumeFormatted: formatVolume(Number(ticker.v)),
                isPositive: pct >= 0,
                quoteVolume: parseFloat(ticker.q),
              },
            };
          });
        } catch { /* ignore malformed */ }
      };

      socket.onerror = () => { /* ignore */ };

      socket.onclose = () => {
        if (!mountedRef.current) return;
        if (reconnectAttempts.current >= 8) return;
        const delay = 1500 * Math.pow(1.5, reconnectAttempts.current);
        reconnectAttempts.current++;
        reconnectTimer.current = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (ws.current) {
        ws.current.onclose = null;
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  // ── Search + ordered list ─────────────────────────────────────────────────

  const filteredCrypto = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return TARGET_PAIRS.reduce<CryptoData[]>((acc, sym) => {
      const item = cryptoData[sym];
      if (!item) return acc;
      if (lower && !item.name.toLowerCase().includes(lower) && !sym.toLowerCase().includes(lower)) return acc;
      acc.push(item);
      return acc;
    }, []);
  }, [cryptoData, searchTerm]);

  const handleIconError = useCallback((sym: string) => {
    setIconErrors((prev) => ({ ...prev, [sym]: true }));
  }, []);

  const clearSearch = useCallback(() => setSearchTerm(""), []);

  // ── Loading skeleton row ──────────────────────────────────────────────────

  const SkeletonRow = useCallback(({ pair }: { pair: string }) => {
    const base = pair.replace("USDT", "");
    return (
      <div className="table-row" key={pair}>
        <div className="pair-col">
          <div className="crypto-icon skeleton-circle shimmer" />
          <span className="shimmer-text shimmer" style={{ width: 70, height: 14 }} />
        </div>
        <div className="price-col">
          <div className="shimmer-text shimmer" style={{ width: 80, height: 15, marginLeft: "auto" }} />
        </div>
        <div className="change-col">
          <div className="shimmer-text shimmer" style={{ width: 52, height: 24, marginLeft: "auto" }} />
        </div>
      </div>
    );
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="market-page">
      <div className="market-container">
        {/* Header */}
        <div className="market-top-header">
          <div className="header-placeholder" />
          <h1 className="market-page-title">{i18n("pages.market.title")}</h1>
          <div className="header-placeholder" />
        </div>

        {/* Search */}
        <div className="market-search-wrapper">
          <div className="search-bar">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder={i18n("pages.market.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={clearSearch}
                aria-label={i18n("pages.market.search.clear")}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="market-content-card">
          <div className="table-header">
            <div className="pair-col">{i18n("pages.market.tableHeaders.pair")}</div>
            <div className="price-col">{i18n("pages.market.tableHeaders.latestPrice")}</div>
            <div className="change-col">{i18n("pages.market.tableHeaders.change24h")}</div>
          </div>

          {isLoading ? (
            TARGET_PAIRS.map((pair) => <SkeletonRow key={pair} pair={pair} />)
          ) : filteredCrypto.length > 0 ? (
            filteredCrypto.map((crypto) => {
              const base = crypto.name.split("/")[0];
              return (
                <Link
                  key={crypto.symbol}
                  to={`/market/detail/${crypto.symbol}`}
                  className="remove_blue"
                >
                  <div className="table-row">
                    <div className="pair-col">
                      <div className="crypto-icon">
                        {iconErrors[base] ? (
                          <span className="icon-fallback">{base.substring(0, 2)}</span>
                        ) : (
                          <img
                            src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${base}.png`}
                            width={25}
                            height={25}
                            loading="lazy"
                            alt={base}
                            onError={() => handleIconError(base)}
                          />
                        )}
                      </div>
                      <span>{crypto.name}</span>
                    </div>
                    <div className="price-col">
                      <div className="crypto-price">${crypto.price}</div>
                    </div>
                    <div className="change-col">
                      <span className={`change-badge ${crypto.isPositive ? "change-positive" : "change-negative"}`}>
                        {crypto.isPositive ? "+" : ""}{crypto.changePercent}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="no-results">{i18n("pages.market.noResults")}</div>
          )}
        </div>
      </div>

      <style>{`
        .market-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding-bottom: 20px;
        }

        .market-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .market-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px 12px;
          background-color: #0e0f14;
        }

        .market-page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .header-placeholder { width: 32px; }

        .market-search-wrapper {
          padding: 0 20px 16px;
          background-color: #0e0f14;
        }

        .search-bar {
          background: #15161c;
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          border: 1px solid #2a2a2e;
          transition: border-color 0.2s;
        }
        .search-bar:focus-within { border-color: #F41112; }
        .search-bar i { margin-right: 10px; color: #aaaaaa; font-size: 14px; }
        .search-bar input {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 14px;
          width: 100%;
          outline: none;
        }
        .search-bar input::placeholder { color: #666666; }

        .clear-search {
          background: none;
          border: none;
          color: #aaaaaa;
          cursor: pointer;
          font-size: 18px;
          padding: 0 5px;
          line-height: 1;
        }

        .market-content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        .table-header {
          display: flex;
          color: #aaaaaa;
          font-size: 12px;
          font-weight: 500;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
          margin-bottom: 8px;
        }

        .table-row {
          display: flex;
          align-items: center;
          padding: 10px 8px;
          border-bottom: 1px solid #2a2a2e;
          border-radius: 8px;
          margin: 0 -8px;
          transition: background-color 0.15s;
        }
        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background-color: rgba(244, 17, 18, 0.05); }

        .pair-col {
          flex: 2;
          display: flex;
          align-items: center;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
        }

        .price-col {
          flex: 2;
          text-align: right;
          margin-right: 15px;
        }

        .change-col {
          flex: 1;
          text-align: right;
        }

        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .crypto-icon img { border-radius: 50%; }

        .icon-fallback {
          font-size: 13px;
          font-weight: 700;
          color: #F41112;
        }

        .crypto-price {
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
        }

        .change-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }

        .change-positive { background-color: rgba(76, 175, 80, 0.15); color: #4caf50; }
        .change-negative { background-color: rgba(244, 17, 18, 0.15); color: #F41112; }

        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #aaaaaa;
          font-size: 14px;
        }

        a.remove_blue { text-decoration: none; color: inherit; }

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

        .skeleton-circle {
          width: 32px;
          height: 32px;
          border-radius: 50% !important;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .shimmer-text {
          display: inline-block;
          border-radius: 4px;
        }

        @media (max-width: 380px) {
          .crypto-icon { width: 28px; height: 28px; margin-right: 8px; }
          .crypto-price { font-size: 14px; }
        }
      `}</style>
    </div>
  );
};

export default Market;
