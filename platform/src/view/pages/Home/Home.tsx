import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import News from "./News";
import Header from "src/view/shared/Header/Header";
import { i18n } from "../../../i18n";

// Add interface for cryptocurrency data
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

interface QuickActionItem {
  path: string;
  icon: string;
  name: string;
}

function Home() {
  const dispatch = useDispatch();
  const [coincategory, setCoinCategory] = useState("");
  const [response, setResponse] = useState([]);
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [coins, setCoins] = useState();
  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);

  // State for real-time crypto data
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>(
    {}
  );
  const ws = useRef<WebSocket | null>(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: i18n("pages.home.notifications.btcAlert"),
      message: i18n("pages.home.notifications.btcReached"),
      time: i18n("pages.home.notifications.fiveMinAgo"),
      unread: true,
    },
    {
      id: 2,
      title: i18n("pages.home.notifications.depositSuccess"),
      message: i18n("pages.home.notifications.depositConfirmed"),
      time: i18n("pages.home.notifications.oneHourAgo"),
      unread: true,
    },
    {
      id: 3,
      title: i18n("pages.home.notifications.securityUpdate"),
      message: i18n("pages.home.notifications.newSecurityFeatures"),
      time: i18n("pages.home.notifications.twoHoursAgo"),
      unread: false,
    },
    {
      id: 4,
      title: i18n("pages.home.notifications.marketNews"),
      message: i18n("pages.home.notifications.ethUpgrade"),
      time: i18n("pages.home.notifications.fiveHoursAgo"),
      unread: false,
    },
  ];

  useEffect(() => {
    const data = {
      id: 1,
      page: 1,
      size: 5,
    };
    dispatch(productListActions.doFindNews(data));
  }, []);

  // WebSocket connection for real-time data
  useEffect(() => {
    // Top 4 cryptocurrencies by market cap
    const topSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];

    // Setup WebSocket for real-time updates
    const streams = topSymbols
      .map((symbol) => `${symbol.toLowerCase()}@ticker`)
      .join("/");
    ws.current = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.current.onopen = () => {
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data);
        const data = response.data;

        if (data && data.s) {
          const symbol = data.s;
          const isPositive = !data.P.startsWith("-");
          const changePercent = Math.abs(Number(data.P)).toFixed(2);

          // Format volume
          const volumeNum = Number(data.v);
          let volumeFormatted = volumeNum.toFixed(0);
          if (volumeNum >= 1000000000) {
            volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
          } else if (volumeNum >= 1000000) {
            volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
          }

          setCryptoData((prev) => ({
            ...prev,
            [symbol]: {
              symbol,
              name: `${symbol.replace("USDT", "")}/USDT`,
              price: Number(data.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(data.c) < 1 ? 6 : 4,
              }),
              change: data.p,
              changePercent: changePercent,
              volume: data.v,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive,
            },
          }));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error: Event) => {
      console.error("Home WebSocket error:", error);
    };

    ws.current.onclose = () => {
      // Try to reconnect after a delay
      setTimeout(() => {
        if (ws.current === null) {
          // Reconnect logic if needed
        }
      }, 5000);
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const [activeItem, setActiveItem] = useState<string>("/security-tips");

  const handleItemClick = (path: string) => {
    setActiveItem(path);
  };

  // New Quick Access data
  const quickAccessItems = [
    {
      path: "/security-tips",
      icon: "fas fa-shield-alt",
      name: i18n("pages.home.quickAccess.security"),
    },
    {
      path: "/faq-center",
      icon: "fas fa-question-circle",
      name: i18n("pages.home.quickAccess.faqCenter"),
    },
    {
      icon: "fas fa-gift",
      path: "/invitation",
      name: i18n("pages.home.quickAccess.invitation"),
    },
    {
      path: "/stacking",
      icon: "fas fa-coins ",
      name: i18n("pages.home.quickAccess.staking"),
    },
  ];

  // Define the top 4 cryptocurrencies we want to display
  const topCryptos = [
    {
      symbol: "BTCUSDT",
      icon: "fab fa-btc",
      color: "#000",
      bgColor: "#F3BA2F",
    },
    {
      symbol: "ETHUSDT",
      icon: "fab fa-ethereum",
      color: "#fff",
      bgColor: "#627EEA",
    },
    {
      symbol: "BNBUSDT",
      icon: "fas fa-coins",
      color: "#000",
      bgColor: "#F3BA2F",
    },
    {
      symbol: "SOLUSDT",
      icon: "fas fa-sun",
      color: "#000",
      bgColor: "#00FFA3",
    },
  ];

  return (
    <div className="container home-page">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <div className="home-hero">
        <div className="home-hero-media__video-overlay">
          <video
            className="home-hero-media__video"
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="home-hero-media__grid" />
          <div className="home-hero-media__gradient" />
        </div>
        <div className="home-hero__content">
          <div className="home-hero__badge">
            <img src="/images/logo.png" alt="Backpack  Exchange" />
            <span>FxPro <br />Exchange</span>
          </div>
          <h1 className="home-hero__title">
            Trade Crypto
            <br />
            Like a Pro
          </h1>
          <p className="home-hero__subtitle">
            {i18n("pages.home.hero.subtitle")}
          </p>
          <Link to="/market" className="home-hero__cta remove_blue">
            {i18n("pages.home.hero.cta")}
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="quick-access card-style">
        <div className="section-header">
          <h2 className="section-title">{i18n("pages.home.quickAccess.title")}</h2>
          <Link to="/deposit" className="deposit-header-button remove_blue">
            <div className="deposit-header-icon">
              <i className="fas fa-wallet" />
            </div>
            <span className="deposit-header-text">{i18n("pages.home.quickAccess.deposit")}</span>
          </Link>
        </div>
        <div className="access-grid">
          {quickAccessItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className="access-card remove_blue"
            >
              <div className="access-icon">
                <i className={item.icon} />
              </div>
              <span className="access-text">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Favorites Section */}
      <div className="favorites-header card-style">
        <div className="favorites-title">{i18n("pages.home.popularCryptos")}</div>
        <Link to="/market" className="see-all remove_blue">
          {i18n("pages.home.seeAll")} →
        </Link>
      </div>

      {/* Market List with Real-time Data */}
      <div className="market-list" style={{ padding: "0 15px" }}>
        {topCryptos.map((crypto) => {
          const data = cryptoData[crypto.symbol];
          const displayName = crypto.symbol.replace("USDT", "/USDT");

          return (
            <Link
              to={`/market/detail/${crypto.symbol}`}
              key={crypto.symbol}
              className="market-item remove_blue"
            >
              <div className="crypto-info">
                <div
                  className="crypto-icon"
                  style={{ backgroundColor: crypto.bgColor }}
                >
                  <img
                    src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${displayName?.split("/")[0]}.png`}
                    className={crypto.icon}
                    style={{ width: 40 }}
                  />
                </div>
                <div>
                  <div className="crypto-name">{displayName}</div>
                  <div className="crypto-volume">
                    {i18n("pages.home.volume")}: {data ? data.volumeFormatted : i18n("pages.home.loading")}
                  </div>
                </div>
              </div>
              <div className="price-info">
                <div className="price">
                  {data ? `$${data.price}` : i18n("pages.home.loading")}
                </div>
                <div
                  className={`change ${data ? (data.isPositive ? "positive" : "negative") : ""}`}
                >
                  {data
                    ? `${data.isPositive ? "+" : ""}${data.changePercent}%`
                    : i18n("pages.home.loading")}
                </div>
              </div>
              <div className="chart">
                <i
                  className="fas fa-chart-line"
                  style={{
                    color: data
                      ? data.isPositive
                        ? "#4caf50"
                        : "#F41112"
                      : "#aaaaaa",
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* News Section */}
      <News topic={selectNews} loading={selectloadingNews} />

      {/* Unified CSS – consistent with Profile page style */}
      <style>{`
        /* ===== GLOBAL RESET & BASE ===== */
        .home-page {
          min-height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        /* ===== CARDS (matching profile's content-card) ===== */
        .card-style {
          background-color: #15161c;
          border-radius: 24px;
          padding: 20px;
          margin: 16px 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* ===== HERO ===== */
        .home-hero {
          position: relative;
          margin: 0 -5px 16px;
          min-height: 320px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #0a0b0f;
        }
        .home-hero-media__video-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .home-hero-media__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .home-hero-media__grid {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.15));
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.15));
        }
        .home-hero-media__gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 90% at 15% 20%, rgba(244, 17, 18, 0.35) 0%, rgba(244, 17, 18, 0) 55%),
            radial-gradient(100% 80% at 90% 100%, rgba(244, 17, 18, 0.18) 0%, rgba(244, 17, 18, 0) 60%),
            linear-gradient(160deg, rgba(10, 11, 15, 0.75) 0%, rgba(20, 21, 28, 0.45) 55%, rgba(10, 11, 15, 0.75) 100%);
        }
        .home-hero__content {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 36px 24px 32px;
          text-align: center;
        }
        .home-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(244, 17, 18, 0.12);
          border: 1px solid rgba(244, 17, 18, 0.35);
          border-radius: 999px;
          padding: 6px 14px 6px 6px;
          margin-bottom: 18px;
        }
        .home-hero__badge img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }
        .home-hero__badge span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #ffffff;
          line-height: 1.15;
          text-align: left;
        }
        .home-hero__title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 10px;
          letter-spacing: -0.3px;
        }
        .home-hero__subtitle {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.55;
          margin: 0 auto 24px;
          max-width: 300px;
        }
        .home-hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F41112;
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 700;
          padding: 13px 26px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(244, 17, 18, 0.35);
          transition: background-color 0.2s, transform 0.15s;
        }
        .home-hero__cta:hover {
          background: #AD1111;
          transform: translateY(-2px);
        }
        @media (max-width: 350px) {
          .home-hero__title {
            font-size: 24px;
          }
        }

        /* ===== QUICK ACCESS ===== */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
          width: fit-content;
        }
        .access-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .access-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 14px 8px;
          transition: transform 0.2s, background-color 0.2s;
          text-align: center;
        }
        .access-card:hover {
          transform: translateY(-3px);
          background-color: rgba(244, 17, 18, 0.08);
        }
        .access-icon {
          font-size: 22px;
          color: #F41112;
          margin-bottom: 8px;
        }
        .access-text {
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.3;
        }

        /* Deposit button */
        .deposit-header-button {
          display: flex;
          align-items: center;
          background: #F41112;
          border-radius: 10px;
          padding: 8px 16px;
          transition: background-color 0.2s;
          box-shadow: 0 2px 8px rgba(244, 17, 18, 0.3);
        }
        .deposit-header-button:hover {
          background-color: #AD1111;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 17, 18, 0.4);
        }
        .deposit-header-icon {
          font-size: 14px;
          color: #ffffff;
          margin-right: 6px;
        }
        .deposit-header-text {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }

        /* ===== FAVORITES HEADER ===== */
        .favorites-header.card-style {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
        }
        .favorites-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .see-all {
          font-size: 13px;
          color: #F41112;
          font-weight: 500;
        }

        /* ===== MARKET LIST ===== */
        .market-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #15161c;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 10px;
          transition: background-color 0.2s;
        }
        .market-item:hover {
          background-color: rgba(244, 17, 18, 0.05);
        }
        .crypto-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .crypto-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .crypto-name {
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
        }
        .crypto-volume {
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 2px;
        }
        .price-info {
          text-align: right;
        }
        .price {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }
        .change {
          font-size: 12px;
          margin-top: 2px;
        }
        .change.positive {
          color: #4caf50;
        }
        .change.negative {
          color: #F41112;
        }
        .chart i {
          font-size: 18px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 480px) {
          .access-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          .access-card {
            padding: 10px 5px;
          }
          .access-icon {
            font-size: 20px;
          }
          .access-text {
            font-size: 11px;
          }
          .card-style {
            margin: 12px 10px;
            padding: 16px;
          }
          .market-item {
            padding: 12px 14px;
          }
        }

        @media (max-width: 350px) {
          .access-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;