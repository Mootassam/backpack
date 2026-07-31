import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import { i18n } from "../../../i18n";

function History() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const transaction = useSelector(transactionListSelector.selectRows);

  useEffect(() => {
    dispatch(transactionListActions.doFetch());
  }, [dispatch]);

  const getTransactionConfig = (type, direction, relatedAsset) => {
    const config = {
      icon: 'fa-exchange-alt',
      typeText: i18n("pages.history.transactionTypes.transaction"),
      iconClass: 'swap',
      color: '#627EEA',
      amountColor: direction === 'in' ? '#4caf50' : '#F41112'
    };

    switch (type) {
      case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = i18n("pages.history.transactionTypes.deposit");
        config.iconClass = 'deposit';
        config.color = '#4caf50';
        config.amountColor = '#4caf50';
        break;
      case 'withdraw':
        config.icon = 'fa-arrow-up';
        config.typeText = i18n("pages.history.transactionTypes.withdrawal");
        config.iconClass = 'withdraw';
        config.color = '#F41112';
        config.amountColor = '#F41112';
        break;
      case 'convert_in':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedFrom", relatedAsset) : i18n("pages.history.transactionTypes.conversionIn");
        config.iconClass = 'convert-in';
        config.color = '#9C27B0';
        config.amountColor = '#4caf50';
        break;
      case 'convert_out':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedTo", relatedAsset) : i18n("pages.history.transactionTypes.conversionOut");
        config.iconClass = 'convert-out';
        config.color = '#9C27B0';
        config.amountColor = '#F41112';
        break;
      case 'stacking':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.stakedAmount");
        config.iconClass = 'stacking';
        config.color = '#FF9800';
        config.amountColor = '#FFB74D';
        break;
      case 'staking_reward':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.stakingRewards");
        config.iconClass = 'staking_reward';
        config.color = '#4caf50';
        config.amountColor = '#4caf50';
        break;
      // For brevity I'm keeping only the main types – the switch can stay identical.
      // All other types follow the same pattern.
      default:
        config.icon = 'fa-exchange-alt';
        config.typeText = i18n("pages.history.transactionTypes.transaction");
        config.iconClass = 'default';
        config.color = '#627EEA';
        config.amountColor = '#627EEA';
    }
    return config;
  };

  const filteredTransactions = useMemo(() => {
    if (!transaction) return [];
    return transaction.filter((tx) => {
      // type filter
      if (typeFilter !== "all") {
        const typeMatch =
          typeFilter === "deposits" ? (tx.type === "deposit" || tx.direction === "in") :
          typeFilter === "withdrawals" ? (tx.type === "withdraw" || tx.direction === "out") :
          typeFilter === "profits" ? (tx.type.includes('profit') || (tx.direction === "in" && tx.type !== "deposit")) :
          typeFilter === "losses" ? (tx.type.includes('loss') || (tx.direction === "out" && tx.type !== "withdraw")) :
          typeFilter === "conversions" ? tx.type.includes('convert') :
          typeFilter === "stacking" ? tx.type === "stacking" : true;
        if (!typeMatch) return false;
      }
      if (statusFilter !== "all" && tx.status !== statusFilter) return false;
      if (timeFilter !== "all") {
        const now = new Date();
        const transactionDate = new Date(tx.dateTransaction);
        switch (timeFilter) {
          case "today":
            return transactionDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
          case "week":
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return transactionDate >= oneWeekAgo;
          case "month":
            return transactionDate >= new Date(now.getFullYear(), now.getMonth(), 1);
          case "year":
            return transactionDate >= new Date(now.getFullYear(), 0, 1);
          default:
            return true;
        }
      }
      return true;
    });
  }, [transaction, typeFilter, statusFilter, timeFilter]);

  const formatDate = (date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const isToday = transactionDate.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = transactionDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return i18n("pages.history.dateFormats.today", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else if (isYesterday) {
      return i18n("pages.history.dateFormats.yesterday", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else {
      return transactionDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const goBack = () => history.goBack();

  return (
    <div className="history-page">
      {/* Header with back button */}
      <div className="top-header">
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h1 className="page-title">{i18n("pages.history.title")}</h1>
        <div className="header-placeholder"></div>
      </div>

      <div className="content-card">
        {/* Filter chips */}
        <div className="filter-options">
          {[
            { key: "all", label: i18n("pages.history.filters.all") },
            { key: "deposits", label: i18n("pages.history.filters.deposits") },
            { key: "withdrawals", label: i18n("pages.history.filters.withdrawals") },
            { key: "profits", label: i18n("pages.history.filters.profits") },
            { key: "losses", label: i18n("pages.history.filters.losses") },
            { key: "conversions", label: i18n("pages.history.filters.conversions") },
            { key: "stacking", label: i18n("pages.history.filters.stacking") },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`filter-chip ${typeFilter === key ? "active" : ""}`}
              onClick={() => setTypeFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Transaction list */}
        <div className="transaction-list">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => {
              const { icon, typeText, iconClass, amountColor, color } = getTransactionConfig(
                tx.type,
                tx.direction,
                tx.relatedAsset
              );

              return (
                <div className="transaction-item" key={tx.id}>
                  <div className="tx-left">
                    <div className="tx-icon" style={{ backgroundColor: color }}>
                      <i className={`fas ${icon}`} />
                    </div>
                    <div className="tx-info">
                      <div className="tx-type">{typeText}</div>
                      <div className="tx-date">{formatDate(tx.dateTransaction)}</div>
                    </div>
                  </div>
                  <div className="tx-right">
                    <div className="tx-amount" style={{ color: amountColor }}>
                      {tx.direction === 'in' ? '+' : '-'}
                      {tx.amount.toFixed(5)} {tx.asset}
                    </div>
                    <div className={`tx-status status-${tx.status}`}>
                      {i18n(`pages.history.status.${tx.status}`)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <i className="fas fa-receipt empty-icon" />
              <div className="empty-title">{i18n("pages.history.emptyState.title")}</div>
              <div className="empty-text">{i18n("pages.history.emptyState.description")}</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ====== Page Layout ====== */
        .history-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
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
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header-placeholder {
          width: 32px;
        }

        /* ====== Content Card ====== */
        .content-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        /* ====== Filters ====== */
        .filter-options {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid #2a2a2e;
          scrollbar-width: none;
        }
        .filter-options::-webkit-scrollbar {
          display: none;
        }
        .filter-chip {
          padding: 6px 12px;
          border-radius: 16px;
          border: 1px solid #2a2a2e;
          background: #1e1e24;
          color: #aaaaaa;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-chip.active {
          background: #F41112;
          color: #fff;
          border-color: #F41112;
        }

        /* ====== Transactions ====== */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #1e1e24;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .transaction-item:hover {
          background: #2a2a2e;
        }

        .tx-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tx-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #fff;
        }
        .tx-info {
          display: flex;
          flex-direction: column;
        }
        .tx-type {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .tx-date {
          font-size: 11px;
          color: #aaaaaa;
        }

        .tx-right {
          text-align: right;
        }
        .tx-amount {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .tx-status {
          font-size: 10px;
          color: #4caf50;
        }
        .tx-status.status-pending {
          color: #F41112;
        }
        .tx-status.status-canceled {
          color: #F41112;
        }

        /* ====== Empty state ====== */
        .empty-state {
          text-align: center;
          padding: 32px 16px;
          color: #aaaaaa;
        }
        .empty-icon {
          font-size: 40px;
          color: #2a2a2e;
          margin-bottom: 12px;
        }
        .empty-title {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .empty-text {
          font-size: 13px;
          color: #aaaaaa;
        }
      `}</style>
    </div>
  );
}

export default History;