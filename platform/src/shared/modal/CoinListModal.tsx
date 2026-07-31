import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { i18n } from "../../i18n";

interface BinanceTicker {
  s: string;
  c: string;
  P: string;
  v: string;
  p: string;
}

interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
}

interface CoinListSidebarProps {
  selectedCoin: string;
  onSelectCoin: (symbol: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CoinListSidebar: React.FC<CoinListSidebarProps> = ({
  selectedCoin,
  onSelectCoin,
  isOpen,
  onClose,
}) => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  // --- Data fetching & WebSocket (unchanged) ---
  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        setIsLoading(true);
        const { default: axios } = await import("axios");
        const response = await axios.get("https://api.binance.us/api/v3/ticker/24hr");
        const usdtPairs = response.data
          .filter(
            (item: any) =>
              item.symbol.endsWith("USDT") &&
              !item.symbol.includes("UP") &&
              !item.symbol.includes("DOWN") &&
              !item.symbol.includes("BEAR") &&
              !item.symbol.includes("BULL")
          )
          .sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 100);

        const formattedData: { [key: string]: CryptoData } = {};
        usdtPairs.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);
          const volumeNum = Number(item.volume);
          let volumeFormatted = volumeNum.toFixed(0);
          if (volumeNum >= 1e9) volumeFormatted = (volumeNum / 1e9).toFixed(1) + "B";
          else if (volumeNum >= 1e6) volumeFormatted = (volumeNum / 1e6).toFixed(1) + "M";

          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: Number(item.lastPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: Number(item.lastPrice) < 1 ? 6 : 4,
            }),
            change: item.priceChange,
            changePercent,
            volume: item.volume,
            volumeFormatted,
            isPositive,
          };
        });
        setCryptoData(formattedData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchAllPrices();
  }, []);

  useEffect(() => {
    if (!isOpen) return; // only connect when visible
    ws.current = new WebSocket("wss://stream.binance.us:9443/ws/!ticker@arr");
    ws.current.onmessage = (event) => {
      const data: BinanceTicker[] = JSON.parse(event.data);
      setCryptoData((prevData) => {
        const newData = { ...prevData };
        data.forEach((ticker) => {
          if (newData[ticker.s]) {
            const isPositive = !ticker.P.startsWith("-");
            const changePercent = Math.abs(Number(ticker.P)).toFixed(2);
            const volumeNum = Number(ticker.v);
            let volumeFormatted = volumeNum.toFixed(0);
            if (volumeNum >= 1e9) volumeFormatted = (volumeNum / 1e9).toFixed(1) + "B";
            else if (volumeNum >= 1e6) volumeFormatted = (volumeNum / 1e6).toFixed(1) + "M";

            newData[ticker.s] = {
              ...newData[ticker.s],
              price: Number(ticker.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(ticker.c) < 1 ? 6 : 4,
              }),
              change: ticker.p,
              changePercent,
              volume: ticker.v,
              volumeFormatted,
              isPositive,
            };
          }
        });
        return newData;
      });
    };
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [isOpen]);

  // --- Filtering & sorting ---
  const filteredCoins = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);
    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(term) ||
          coin.symbol.toLowerCase().includes(term)
      );
    }

    switch (activeTab) {
      case "Gainers":
        return filtered
          .filter((c) => c.isPositive)
          .sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
      case "Losers":
        return filtered
          .filter((c) => !c.isPositive)
          .sort((a, b) => Number(a.changePercent) - Number(b.changePercent));
      case "Favorites":
        return filtered
          .filter((c) => ["BTCUSDT", "ETHUSDT", "BNBUSDT"].includes(c.symbol))
          .sort((a, b) => Number(b.volume) - Number(a.volume));
      default:
        return filtered.sort((a, b) => Number(b.volume) - Number(a.volume));
    }
  }, [cryptoData, searchTerm, activeTab]);

  const handleCoinSelect = (coin: CryptoData) => {
    onSelectCoin(coin.symbol);
    onClose(); // optionally close on selection
  };

  // Don't render anything when closed
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay – clicking it closes the sidebar */}
      <div className="sidebar-overlay" onClick={onClose} />

      <div className="coin-sidebar-fixed">
        {/* Header with close button */}
        <div className="sidebar-header">
          <h3 className="sidebar-title">{i18n("components.coinListModal.title")}</h3>
          <button className="sidebar-close-btn" onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <div className="search-box">
            <i className="fas fa-search search-icon" />
            <input
              type="text"
              placeholder={i18n("components.coinListModal.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="sidebar-tabs">
          {["All", "Gainers", "Losers", "Favorites"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Coin list */}
        <div className="sidebar-list">
          {isLoading ? (
            <div className="loading-state">
              <i className="fas fa-spinner fa-spin" />
              <p>{i18n("components.coinListModal.loading")}</p>
            </div>
          ) : filteredCoins.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search" />
              <p>{i18n("components.coinListModal.noResults")}</p>
            </div>
          ) : (
            filteredCoins.map((coin) => (
              <div
                key={coin.symbol}
                className={`coin-row ${selectedCoin === coin.symbol ? "selected" : ""}`}
                onClick={() => handleCoinSelect(coin)}
              >
                <div className="coin-left">
                  <div className="coin-icon-wrap">
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                        coin.name.split("/")[0]
                      }.png`}
                      alt={coin.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        ((e.target as HTMLElement).nextSibling as HTMLElement).style.display = "flex";
                      }}
                    />
                    <i className="fas fa-coins fallback-icon" style={{ display: "none" }} />
                  </div>
                  <div className="coin-meta">
                    <span className="coin-symbol">{coin.symbol}</span>
                    <span className="coin-name">{coin.name}</span>
                  </div>
                </div>
                <div className="coin-right">
                  <span className="coin-price">${coin.price}</span>
                  <span className={`coin-change ${coin.isPositive ? "positive" : "negative"}`}>
                    {coin.isPositive ? "+" : ""}
                    {coin.change}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick select */}
        <div className="quick-select-section">
          <div className="section-label">{i18n("components.coinListModal.popular")}</div>
          <div className="quick-select-chips">
            <button className="chip" onClick={() => setSearchTerm("BTC")}>BTC</button>
            <button className="chip" onClick={() => setSearchTerm("ETH")}>ETH</button>
            <button className="chip" onClick={() => setSearchTerm("BNB")}>BNB</button>
            <button className="chip" onClick={() => setSearchTerm("SOL")}>SOL</button>
          </div>
        </div>
      </div>

      <style>{`
        /* Overlay */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 99;
          transition: opacity 0.3s ease;
        }

        /* Fixed sidebar panel */
        .coin-sidebar-fixed {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          z-index: 100;
          background: #15161c;
          border-right: 1px solid #2a2a2e;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
          animation: slideInLeft 0.25s ease-out;
              z-index: 1003;
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .sidebar-header {
          padding: 14px 16px;
          border-bottom: 1px solid #2a2a2e;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .sidebar-title {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .sidebar-close-btn {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }

        .sidebar-close-btn:hover {
          color: #F41112;
        }

        .sidebar-search {
          padding: 10px 12px;
          border-bottom: 1px solid #2a2a2e;
          flex-shrink: 0;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          color: #aaaaaa;
          font-size: 13px;
        }

        .search-box input {
          width: 100%;
          padding: 8px 32px 8px 30px;
          background: #2a2a2e;
          border: none;
          border-radius: 8px;
          color: #ffffff;
          font-size: 12px;
          outline: none;
        }

        .clear-btn {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          color: #aaaaaa;
          cursor: pointer;
          font-size: 12px;
          padding: 2px;
        }
        .clear-btn:hover {
          color: #F41112;
        }

        .sidebar-tabs {
          display: flex;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid #2a2a2e;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .tab-btn {
          background: #2a2a2e;
          border: none;
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 11px;
          color: #aaaaaa;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .tab-btn.active {
          background: #F41112;
          color: #ffffff;
        }

        .sidebar-list {
          flex: 1;
          overflow-y: auto;
          padding: 6px 0;
        }

        .loading-state,
        .no-results {
          text-align: center;
          padding: 30px;
          color: #aaaaaa;
          font-size: 13px;
        }

        .loading-state i,
        .no-results i {
          font-size: 24px;
          margin-bottom: 8px;
          display: block;
        }

        .coin-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid #2a2a2e;
        }

        .coin-row:hover {
          background: rgba(244, 17, 18, 0.06);
        }

        .coin-row.selected {
          background: rgba(244, 17, 18, 0.1);
          border-left: 3px solid #F41112;
          padding-left: 13px;
        }

        .coin-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .coin-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .coin-icon-wrap img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .fallback-icon {
          color: #aaaaaa;
          font-size: 14px;
        }

        .coin-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .coin-symbol {
          font-weight: 700;
          font-size: 13px;
          color: #ffffff;
          white-space: nowrap;
        }

        .coin-name {
          font-size: 11px;
          color: #aaaaaa;
        }

        .coin-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .coin-price {
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
        }

        .coin-change {
          font-size: 11px;
          font-weight: 600;
        }

        .coin-change.positive {
          color: #4caf50;
        }

        .coin-change.negative {
          color: #F41112;
        }

        .quick-select-section {
          padding: 12px;
          border-top: 1px solid #2a2a2e;
          flex-shrink: 0;
        }

        .section-label {
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 8px;
        }

        .quick-select-chips {
          display: flex;
          gap: 8px;
        }

        .chip {
          padding: 6px 12px;
          background: #2a2a2e;
          border: none;
          border-radius: 16px;
          color: #ffffff;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .chip:hover {
          background: #F41112;
        }
      `}</style>
    </>
  );
};

export default CoinListSidebar;