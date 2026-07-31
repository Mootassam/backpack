import React, { useEffect, useRef, useState, useCallback } from "react";
import { init, dispose, KLineData } from "klinecharts";

const INDICATORS = ["MA", "EMA", "BOLL", "MACD", "RSI", "WR", "VOL"] as const;
type IndicatorName = (typeof INDICATORS)[number];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;
type TF = (typeof TIMEFRAMES)[number];

const CHART_TYPES = ["candle", "bar", "area"] as const;
type ChartType = (typeof CHART_TYPES)[number];

interface FuturesChartProps {
  symbol?: string;
}

// ── Indicator compat helpers ───────────────────────────────────────────────────
const tryCreateIndicator = (chart: any, name: string, isOverlay: boolean) => {
  const overlayPane = { id: "candle_pane" };
  const oscPane = { id: "osc_pane", height: 140 };
  const pane = isOverlay ? overlayPane : oscPane;
  const attempts = [
    () => chart.createIndicator?.(name, isOverlay, pane),
    () => chart.createIndicator?.({ name }, isOverlay, pane),
    () => chart.createTechnicalIndicator?.(name, isOverlay, pane),
    () => chart.addIndicator?.(name, pane),
    () => chart.addTechnicalIndicator?.(name, isOverlay, pane),
  ];
  for (const fn of attempts) {
    try {
      const res = fn();
      if (res === undefined) return true;
      if (typeof res === "string") return res;
      if (res && "id" in res) return (res as any).id;
      if (res && "indicatorId" in res) return (res as any).indicatorId;
    } catch { /* try next */ }
  }
  return null;
};

const tryRemoveIndicator = (chart: any, nameOrId: string) => {
  const attempts = [
    () => chart.removeIndicator?.({ id: nameOrId }),
    () => chart.removeTechnicalIndicatorByName?.(nameOrId),
    () => chart.removeTechnicalIndicator?.(nameOrId),
    () => chart.removeIndicatorById?.(nameOrId),
    () => chart.removeIndicator?.(nameOrId),
  ];
  for (const fn of attempts) {
    try { fn(); return true; } catch { /* try next */ }
  }
  return false;
};

// ── Component ──────────────────────────────────────────────────────────────────
const FuturesChart: React.FC<FuturesChartProps> = ({ symbol = "BTCUSDT" }) => {
  // STABLE ID — generated once per component instance, NEVER changes.
  // This is the core fix: a symbol-based id causes klinecharts to stack a
  // second chart on the same DOM node whenever the coin changes, because
  // React updates the DOM id BEFORE the cleanup runs, so dispose() can't
  // find the old element and the old chart is never torn down.
  const domId = useRef(`fc-${Math.random().toString(36).slice(2, 9)}`).current;

  const chartRef           = useRef<any>(null);
  const wsRef              = useRef<WebSocket | null>(null);
  const reconnectTimerRef  = useRef<ReturnType<typeof setTimeout>>();
  const reconnectCountRef  = useRef(0);
  const mountedRef         = useRef(true);

  const [activeTf, setActiveTf]               = useState<TF>("1m");
  const [chartType, setChartType]             = useState<ChartType>("candle");
  const [activeIndicators, setActiveIndicators] = useState<Record<string, string | true>>({});
  const [isConnected, setIsConnected]         = useState(false);
  const [isLoading, setIsLoading]             = useState(true);

  // ── Stop WS + cancel any pending reconnect ────────────────────────────────
  const closeWS = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = undefined;
    }
    if (wsRef.current) {
      wsRef.current.onopen    = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror   = null;
      wsRef.current.onclose   = null;
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  // ── Fetch historical candles (abortable) ─────────────────────────────────
  const loadData = useCallback(async (tf: TF, sym: string, signal: AbortSignal) => {
    if (!mountedRef.current) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${tf}&limit=500`,
        { signal }
      );
      if (signal.aborted || !mountedRef.current) return;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw: any[] = await res.json();
      if (signal.aborted || !mountedRef.current) return;

      const data: KLineData[] = raw.map((d) => ({
        timestamp: d[0],
        open:      +d[1],
        high:      +d[2],
        low:       +d[3],
        close:     +d[4],
        volume:    +d[5],
      }));

      const c = chartRef.current;
      if (c?.applyNewData) c.applyNewData(data);
      else if (c?.setData) c.setData(data);

      if (mountedRef.current) setIsLoading(false);
    } catch (e: any) {
      if (e?.name === "AbortError") return; // expected on symbol/tf switch
      console.error("[FuturesChart] loadData:", e);
      if (mountedRef.current) setIsLoading(false);
    }
  }, []);

  // ── Live WebSocket with exponential-backoff reconnect ────────────────────
  const startWS = useCallback((tf: TF, sym: string) => {
    closeWS();
    reconnectCountRef.current = 0;

    const connect = () => {
      if (!mountedRef.current) return;
      const url = `wss://stream.binance.com:9443/ws/${sym.toLowerCase()}@kline_${tf}`;
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!mountedRef.current) return;
          setIsConnected(true);
          reconnectCountRef.current = 0;
        };

        ws.onmessage = (ev) => {
          if (!mountedRef.current) return;
          try {
            const k = JSON.parse(ev.data)?.k;
            if (!k) return;
            const bar: KLineData = {
              timestamp: k.t,
              open:      +k.o,
              high:      +k.h,
              low:       +k.l,
              close:     +k.c,
              volume:    +k.v,
            };
            const c = chartRef.current;
            // updateData: merges into last candle if same timestamp, appends if new
            if (c?.updateData) c.updateData(bar);
            else if (c?.appendData) c.appendData(bar);
          } catch { /* ignore malformed frames */ }
        };

        ws.onerror = () => {};

        ws.onclose = () => {
          if (!mountedRef.current) return;
          setIsConnected(false);
          // Exponential backoff: 1.5 s → 2.25 s → 3.4 s … capped at 30 s
          const delay = Math.min(1500 * Math.pow(1.5, reconnectCountRef.current), 30_000);
          reconnectCountRef.current++;
          reconnectTimerRef.current = setTimeout(connect, delay);
        };
      } catch (e) {
        console.warn("[FuturesChart] WS open failed:", e);
      }
    };

    connect();
  }, [closeWS]);

  // ── Init chart ONCE on mount — dispose on unmount only ───────────────────
  // IMPORTANT: empty deps [] — the chart must never be re-initialized.
  // Re-init is what caused duplicate stacked charts on coin change.
  useEffect(() => {
    mountedRef.current = true;

    const chart = init(domId);
    if (!chart) return;
    chartRef.current = chart;

    chart.setStyles?.({
      candle: {
        type: "candle_solid",
        bar: { upColor: "#0ECB81", downColor: "#F41112", noChangeColor: "#888" },
        priceMark: {
          last: {
            line: { color: "#444", style: "dashed" },
            text: { color: "#fff", backgroundColor: "#444" },
          },
        },
      },
      grid: {
        horizontal: { color: "rgba(255,255,255,0.05)"  },
        vertical:   { color: "rgba(255,255,255,0.025)" },
      },
    });

    const onResize = () => chartRef.current?.resize?.();
    window.addEventListener("resize", onResize);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("resize", onResize);
      closeWS();
      dispose(domId);
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty — init once, never re-init

  // ── Reload data + WS whenever symbol or timeframe changes ─────────────────
  // AbortController cancels the in-flight fetch when the user switches coin
  // quickly so a slow BTC response never overwrites the ETH chart.
  useEffect(() => {
    if (!chartRef.current) return;
    const abort = new AbortController();
    loadData(activeTf, symbol, abort.signal);
    startWS(activeTf, symbol);
    return () => {
      abort.abort();
      closeWS();
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTf, symbol]); // only re-run when these two change

  // ── Apply chart type style ─────────────────────────────────────────────────
  useEffect(() => {
    const c = chartRef.current;
    if (!c) return;
    if (chartType === "candle") {
      c.setStyles?.({ candle: { type: "candle_solid" } });
    } else if (chartType === "bar") {
      c.setStyles?.({ candle: { type: "candle_stroke" } });
    } else {
      c.setStyles?.({
        candle: {
          type: "area",
          area: {
            lineColor: "#0ECB81",
            lineSize: 2,
            gradient: [
              { offset: 0, color: "rgba(14,203,129,0.3)"  },
              { offset: 1, color: "rgba(14,203,129,0.02)" },
            ],
          },
        },
      });
    }
  }, [chartType]);

  // ── Toggle indicator ──────────────────────────────────────────────────────
  const toggleIndicator = useCallback(
    (name: IndicatorName) => {
      const chart = chartRef.current;
      if (!chart) return;
      const exists = activeIndicators[name];
      if (exists) {
        tryRemoveIndicator(chart, typeof exists === "string" ? exists : name);
        setActiveIndicators((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
        return;
      }
      const overlayNames = ["MA", "EMA", "BOLL", "VOL", "BBI", "SMA", "SAR"];
      const res = tryCreateIndicator(chart, name, overlayNames.includes(name));
      setActiveIndicators((prev) => ({
        ...prev,
        [name]: typeof res === "string" ? res : true,
      }));
    },
    [activeIndicators]
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ width: "100%", background: "#0B0E11", color: "#fff", padding: "8px 8px 4px" }}>

      {/* Toolbar: timeframes + live indicator + chart-type selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6, marginBottom: 6 }}>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTf(tf)}
              style={{
                padding:     "5px 9px",
                background:  activeTf === tf ? "#0ECB81" : "transparent",
                color:       activeTf === tf ? "#000" : "#888",
                borderRadius: 5,
                border:      `1px solid ${activeTf === tf ? "#0ECB81" : "rgba(255,255,255,0.1)"}`,
                cursor:      "pointer",
                fontSize:    12,
                fontWeight:  activeTf === tf ? 700 : 400,
                transition:  "all 0.15s",
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Live connection dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                width:           7,
                height:          7,
                borderRadius:    "50%",
                background:      isConnected ? "#0ECB81" : "#555",
                display:         "inline-block",
                boxShadow:       isConnected ? "0 0 6px #0ECB81" : "none",
                transition:      "all 0.3s",
              }}
            />
            <span style={{ fontSize: 10, color: isConnected ? "#0ECB81" : "#555", fontWeight: 600 }}>
              {isConnected ? "LIVE" : "···"}
            </span>
          </div>

          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartType)}
            style={{
              padding:      "5px 8px",
              borderRadius: 5,
              background:   "#15161c",
              color:        "#ccc",
              border:       "1px solid rgba(255,255,255,0.1)",
              fontSize:     12,
              cursor:       "pointer",
            }}
          >
            {CHART_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart canvas — domId is STABLE so this div never gets a new id */}
      <div style={{ position: "relative" }}>
        <div id={domId} style={{ width: "100%", height: 360 }} />

        {isLoading && (
          <div
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     "rgba(11,14,17,0.8)",
              borderRadius:   4,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width:        24,
                  height:       24,
                  border:       "2px solid #333",
                  borderTop:    "2px solid #0ECB81",
                  borderRadius: "50%",
                  animation:    "fc-spin 0.8s linear infinite",
                }}
              />
              <span style={{ fontSize: 12, color: "#888" }}>Loading chart…</span>
            </div>
          </div>
        )}
      </div>

      {/* Indicator toggles */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
        {INDICATORS.map((ind) => (
          <button
            key={ind}
            onClick={() => toggleIndicator(ind)}
            style={{
              padding:      "4px 8px",
              borderRadius: 4,
              background:   activeIndicators[ind] ? "#0ECB81" : "transparent",
              color:        activeIndicators[ind] ? "#000" : "#888",
              border:       `1px solid ${activeIndicators[ind] ? "#0ECB81" : "rgba(255,255,255,0.1)"}`,
              cursor:       "pointer",
              fontSize:     11,
              fontWeight:   activeIndicators[ind] ? 700 : 400,
              transition:   "all 0.15s",
            }}
          >
            {ind}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fc-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FuturesChart;
