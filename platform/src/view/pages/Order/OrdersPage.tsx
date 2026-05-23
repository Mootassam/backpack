import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import spotListSelctors from "src/modules/spot/list/spotListSelectors";
import sportListActions from "src/modules/spot/list/spotListActions";
import sportFormActions from "src/modules/spot/form/spotFormActions";
function OrdersPage() {
  const history = useHistory();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const listspot = useSelector(spotListSelctors.selectRows);
  const listLoading =useSelector(spotListSelctors.selectLoading)
  const count = useSelector(spotListSelctors.selectCount)
  const dispatch = useDispatch();
  // Sample orders data
  const orders = [
    {
      id: 1,
      pair: "BTC/USDT",
      action: "BUY",
      date: "08/23",
      time: "02:20:08",
      status: "COMPLETED",
      orderPrice: "117065.0000",
      orderAmount: "0.000901",
      filled: "100%",
      total: "105.48",
      type: "LIMIT"
    },
    {
      id: 2,
      pair: "ETH/USDT",
      action: "SELL",
      date: "08/24",
      time: "14:35:22",
      status: "PENDING",
      orderPrice: "2850.50",
      orderAmount: "1.25",
      filled: "35%",
      total: "3563.13",
      type: "LIMIT"
    },
    {
      id: 3,
      pair: "SOL/USDT",
      action: "BUY",
      date: "08/24",
      time: "09:15:47",
      status: "PARTIALLY_FILLED",
      orderPrice: "102.75",
      orderAmount: "15.50",
      filled: "75%",
      total: "1194.56",
      type: "MARKET"
    },
    {
      id: 4,
      pair: "XRP/USDT",
      action: "SELL",
      date: "08/22",
      time: "18:42:11",
      status: "CANCELLED",
      orderPrice: "0.5875",
      orderAmount: "500",
      filled: "0%",
      total: "293.75",
      type: "LIMIT"
    },
    {
      id: 5,
      pair: "ADA/USDT",
      action: "BUY",
      date: "08/21",
      time: "11:23:34",
      status: "COMPLETED",
      orderPrice: "0.4650",
      orderAmount: "1000",
      filled: "100%",
      total: "465.00",
      type: "MARKET"
    },
    {
      id: 6,
      pair: "BTC/USDT",
      action: "SELL",
      date: "08/20",
      time: "16:55:09",
      status: "COMPLETED",
      orderPrice: "48920.00",
      orderAmount: "0.005",
      filled: "100%",
      total: "244.60",
      type: "LIMIT"
    }
  ];



   useEffect(() => {
    dispatch(sportListActions.doFetch());
  }, []);
  // Filter orders based on active filter and search term
  const filteredOrders = orders.filter(order => {
    const matchesFilter = 
      activeFilter === "ALL" || 
      order.status === activeFilter ||
      (activeFilter === "OPEN" && (order.status === "PENDING" || order.status === "PARTIALLY_FILLED"));
    
    const matchesSearch = 
      order.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Format number with commas
  const formatNumber = (num, decimals = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "COMPLETED": return "#00C076";
      case "PENDING": return "#F3BA2F";
      case "PARTIALLY_FILLED": return "#FF6838";
      case "CANCELLED": return "#AAAAAA";
      default: return "#FFFFFF";
    }
  };

  // Get action color
  const getActionColor = (action) => {
    return action === "BUY" ? "#00C076" : "#FF6838";
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left" />
        </button>
        <span className="page-title">Orders</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Search Box */}
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Search by pair or type..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="filters-container">
        <div className="filters-header" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span>Filter: {activeFilter === "ALL" ? "All Orders" : activeFilter}</span>
          <i className={`fas fa-chevron-${isFilterOpen ? "up" : "down"}`}></i>
        </div>
        
        {isFilterOpen && (
          <div className="filters-menu">
            <button 
              className={activeFilter === "ALL" ? "active" : ""}
              onClick={() => {
                setActiveFilter("ALL");
                setIsFilterOpen(false);
              }}
            >
              All Orders
            </button>
            <button 
              className={activeFilter === "OPEN" ? "active" : ""}
              onClick={() => {
                setActiveFilter("OPEN");
                setIsFilterOpen(false);
              }}
            >
              Open
            </button>
            <button 
              className={activeFilter === "COMPLETED" ? "active" : ""}
              onClick={() => {
                setActiveFilter("COMPLETED");
                setIsFilterOpen(false);
              }}
            >
              Completed
            </button>
            <button 
              className={activeFilter === "CANCELLED" ? "active" : ""}
              onClick={() => {
                setActiveFilter("CANCELLED");
                setIsFilterOpen(false);
              }}
            >
              Cancelled
            </button>
          </div>
        )}
      </div>

      {/* Orders List - Mobile Cards */}
      <div className="orders-list">
  {count > 0  ? (
    listspot.map(order => (
      <div key={order.id} className="order-card">
        {/* Header */}
        <div className="order-card-header">
          <div className="pair-action">
            <span className="pair">{order.tradingPair}</span>
            <span
              className="action-badge"
              style={{ color: getActionColor(order.direction) }}
            >
              {order.direction}
            </span>
          </div>
          <div className="date-time">
            <span className="date">
              {order.commissionTime
                ? new Date(order.commissionTime).toLocaleDateString()
                : ""}
            </span>
            <span className="time">
              {order.commissionTime
                ? new Date(order.commissionTime).toLocaleTimeString()
                : ""}
            </span>
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <div className="detail-row">
            <span className="label">Type</span>
            <span className="value">{order.orderType}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status</span>
            <span
              className="value"
              style={{ color: getStatusColor(order.status) }}
            >
              {order.status}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Price</span>
            <span className="value">
              {formatNumber(order.commissionPrice, 4)} USDT
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Amount</span>
            <span className="value">{order.orderQuantity}</span>
          </div>

          <div className="detail-row">
            <span className="label">Total (Entrusted)</span>
            <span className="value total">
              {formatNumber(order.entrustedValue)} USDT
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Transaction Quantity</span>
            <span className="value">{order.transactionQuantity ?? "-"}</span>
          </div>

          <div className="detail-row">
            <span className="label">Transaction Value</span>
            <span className="value">
              {order.transactionValue
                ? formatNumber(order.transactionValue)
                : "-"}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Closing Price</span>
            <span className="value">
              {order.closingPrice ? formatNumber(order.closingPrice, 4) : "-"}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Handling Fee</span>
            <span className="value">
              {order.handlingFee ? formatNumber(order.handlingFee, 4) : "-"}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Closing Time</span>
            <span className="value">
              {order.closingTime
                ? new Date(order.closingTime).toLocaleString()
                : "-"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="order-card-footer">
          <span
            className="status-badge"
            style={{ color: getStatusColor(order.status) }}
          >
            {order.status}
          </span>
        </div>
      </div>
    ))
  ) : (
    <div className="no-orders">
      <i className="fas fa-clipboard-list"></i>
      <p>No orders found</p>
      <span>Try adjusting your filters or search term</span>
    </div>
  )}
</div>


      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .container {
          max-width: 400px;
          margin: 0 auto;
          background: #0e0f14;
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #ffffff;
        }

        /* ── Page header ─────────────────────────────────────────────── */
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px 10px;
        }
        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #15161c;
          color: #ccc;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .back-btn:hover { background: #1e1f26; color: #fff; }
        .page-title {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
        }

        /* ── Search ─────────────────────────────────────────────────── */
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 16px 16px 0;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 12px;
          padding: 11px 14px;
        }
        .search-box i {
          color: #555;
          font-size: 14px;
          flex-shrink: 0;
        }
        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e8e8e8;
          font-size: 14px;
        }
        .search-box input::placeholder { color: #555; }

        /* ── Filter dropdown ─────────────────────────────────────────── */
        .filters-container {
          margin: 10px 16px 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #1e1f26;
        }
        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #15161c;
          padding: 12px 14px;
          cursor: pointer;
          font-size: 13px;
          color: #aaa;
          user-select: none;
          transition: background 0.15s;
        }
        .filters-header:hover { background: #1a1b22; }
        .filters-header i { font-size: 12px; }

        .filters-menu {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px 14px;
          background: #0e0f14;
          border-top: 1px solid #1e1f26;
        }
        .filters-menu button {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid #2a2a2e;
          background: transparent;
          color: #888;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .filters-menu button:hover { border-color: #555; color: #ccc; }
        .filters-menu button.active {
          background: rgba(253,75,78,0.12);
          border-color: #fd4b4e;
          color: #fd4b4e;
          font-weight: 600;
        }

        /* ── Orders list ─────────────────────────────────────────────── */
        .orders-list {
          margin: 14px 16px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Order card ──────────────────────────────────────────────── */
        .order-card {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.15s;
        }
        .order-card:hover { border-color: #2a2a2e; }

        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 16px 11px;
          border-bottom: 1px solid #1e1f26;
        }
        .pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pair {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .action-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          letter-spacing: 0.4px;
        }
        .date-time {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }
        .date {
          font-size: 12px;
          color: #888;
        }
        .time {
          font-size: 11px;
          color: #555;
        }

        /* ── Detail rows ─────────────────────────────────────────────── */
        .order-details {
          padding: 10px 16px 4px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 13px;
        }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #666; }
        .value { color: #ccc; font-weight: 500; }
        .value.total { color: #fff; font-weight: 700; }

        /* ── Card footer ─────────────────────────────────────────────── */
        .order-card-footer {
          padding: 10px 16px 12px;
          border-top: 1px solid #1e1f26;
          display: flex;
          justify-content: flex-end;
        }
        .status-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
        }

        /* ── Empty state ─────────────────────────────────────────────── */
        .no-orders {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 60px 24px;
          color: #555;
          text-align: center;
        }
        .no-orders i {
          font-size: 40px;
          color: #2a2a2e;
        }
        .no-orders p {
          font-size: 16px;
          color: #888;
          font-weight: 600;
        }
        .no-orders span {
          font-size: 13px;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default OrdersPage;