import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; // added for back navigation
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import SingleItem from "./SingleItem";

// Define filter options in a constant to avoid recreation on each render
const FILTER_OPTIONS = [
  { key: "news", coin: 0, label: "All" },
  { key: "bitcoin", coin: 1, label: "Bitcoin" },
  { key: "ethereum", coin: 1027, label: "Ethereum" },
  { key: "Usdt", coin: 825, label: "Usdt" },
  { key: "BNB", coin: 1839, label: "BNB" },
  { key: "Solona", coin: 5426, label: "Solona" },
  { key: "USDC", coin: 3408, label: "USDC" },
  { key: "XRP", coin: 52, label: "XRP" },
  { key: "toncoin", coin: 11419, label: "TonCoin" },
];

// Loading placeholder component
const NewsPlaceholder = () => (
  <div className="news-placeholder">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="news-item-placeholder">
        <div className="placeholder-image shimmer"></div>
        <div className="placeholder-content">
          <div className="placeholder-line shimmer" style={{ width: '80%', height: '16px', marginBottom: '8px' }}></div>
          <div className="placeholder-line shimmer" style={{ width: '60%', height: '14px', marginBottom: '12px' }}></div>
          <div className="placeholder-line shimmer" style={{ width: '40%', height: '12px' }}></div>
        </div>
      </div>
    ))}
  </div>
);

function News() {
  const dispatch = useDispatch();
  const history = useHistory(); // for back navigation
  const [newselected, setNewSelected] = useState("news");

  // Select data from Redux store
  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);
  const record = useSelector(selector.selectRows);

  // Memoized filter option to prevent unnecessary recalculations
  const filterOptions = useMemo(() => FILTER_OPTIONS, []);

  // Memoized event handler to prevent unnecessary re-renders of filter buttons
  const handleFilterClick = useCallback((item, coin) => {
    setNewSelected(item);
    const data = {
      id: coin,
      page: 1,
      size: 30
    }
    dispatch(productListActions.doFindNews(data));
  }, [dispatch]);

  // Memoized fetch function with useCallback
  const fetchCoins = useCallback(() => {
    dispatch(productListActions.doFetch());
    const data = {
      id: 1,
      page: 1,
      size: 60
    }
    dispatch(productListActions.doFindNews(data));
  }, [dispatch]);

  // Fetch data on component mount
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const goBack = () => history.goBack();

  return (
    <div className="news-page">
      {/* Back Arrow Header – matching Profile's top-header */}
      <div className="top-header">
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h1 className="page-title">Crypto News</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* News Filters */}
      <div className="news-filters">
        {filterOptions.map((filter) => (
          <button
            key={filter.key}
            className={`filter-button ${newselected === filter.key ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.key, filter.coin)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="news-list">
        <div className="news-section-title">Latest News</div>

        {/* Show loading placeholders while data is loading */}
        {selectloadingNews ? (
          <NewsPlaceholder />
        ) : (
          <SingleItem topic={selectNews} loading={selectloadingNews} />
        )}
      </div>

      <style>{`
        /* ===== GLOBAL ===== */
        .news-page {
          min-height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        /* ===== TOP HEADER ===== */
        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        .back-button:hover {
          background-color: rgba(244, 17, 18, 0.15);
        }
        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header-placeholder {
          width: 32px;
        }

        /* ===== FILTERS ===== */
        .news-filters {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 8px;
          padding: 12px 15px;
          margin-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        .news-filters::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .filter-button {
          flex-shrink: 0;
          background-color: #15161c;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #aaaaaa;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .filter-button.active {
          background-color: #F41112;
          color: #ffffff;
        }
        .filter-button:hover:not(.active) {
          background-color: rgba(244, 17, 18, 0.15);
          color: #ffffff;
        }

        /* ===== NEWS LIST ===== */
        .news-list {
          padding: 0 15px;
        }
        .news-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        /* ===== PLACEHOLDERS ===== */
        .news-placeholder {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .news-item-placeholder {
          display: flex;
          gap: 12px;
          background-color: #15161c;
          border-radius: 12px;
          padding: 12px;
        }
        .placeholder-image {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          background-color: #2a2a2e;
          flex-shrink: 0;
        }
        .placeholder-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .placeholder-line {
          background-color: #2a2a2e;
          border-radius: 4px;
        }
        .shimmer {
          background: linear-gradient(90deg, #2a2a2e 25%, #3a3a3e 50%, #2a2a2e 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

// Use React.memo to prevent unnecessary re-renders if props don't change
export default React.memo(News);