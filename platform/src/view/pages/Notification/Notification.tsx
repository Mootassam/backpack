import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import notificationFormActions from "src/modules/notification/form/notificationFormActions";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import Dates from "src/view/shared/utils/Dates";
import { i18n } from "../../../i18n";

const typeConfig = {
  deposit: {
    icon: "fas fa-arrow-down",
    title: i18n("pages.notification.types.deposit.title"),
    getMessage: (item) => i18n("pages.notification.types.deposit.message", item.message),
  },
  withdraw: {
    icon: "fas fa-arrow-up",
    title: i18n("pages.notification.types.withdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.withdraw.message", item.message),
  },
  staking: {
    icon: "fas fa-coins",
    title: i18n("pages.notification.types.staking.title"),
    getMessage: (item) => i18n("pages.notification.types.staking.message", item.message),
  },
  kyc: {
    icon: "fas fa-id-card",
    title: i18n("pages.notification.types.kyc.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.kyc.defaultMessage"),
  },
  commission: {
    icon: "fas fa-hand-holding-dollar",
    title: i18n("pages.notification.types.commission.title"),
    getMessage: (item) => i18n("pages.notification.types.commission.message", item.message),
  },
  futures: {
    icon: "fas fa-chart-line",
    title: i18n("pages.notification.types.futures.title"),
    getMessage: (item) => i18n("pages.notification.types.futures.message", item.message),
  },
  accountActivated: {
    icon: "fas fa-user-check",
    title: i18n("pages.notification.types.accountActivated.title"),
    getMessage: (item) => i18n("pages.notification.types.accountActivated.message", item.message),
  },
  custom: {
    icon: "fas fa-bell",
    title: i18n("pages.notification.types.custom.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.custom.defaultMessage"),
  },
  cancel_deposit: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelDeposit.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelDeposit.message", item.message),
  },
  cancel_withdraw: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelWithdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelWithdraw.message", item.message),
  },
  cancel_activated: {
    icon: "fas fa-user-slash",
    title: i18n("pages.notification.types.cancelActivated.title"),
    getMessage: () => i18n("pages.notification.types.cancelActivated.message"),
  },
};

function Notification() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allNotification = useSelector(notificationListSelectors.selectRows);
  const loadingNotification = useSelector(notificationListSelectors.selectLoading);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const status = activeFilter === "all" ? "" : activeFilter;
    dispatch(notificationListActions.doFetch(status));
  }, [dispatch, activeFilter]);

  const handleNotificationClick = (item) => {
    dispatch(notificationFormActions.doUpdate(item.id));
    if (item.type === "accountActivated") {
      window.location.href = "/profile";
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const goBack = () => history.goBack();

  const filterTabs = [
    { key: "all", label: i18n("pages.notification.filters.all") },
    { key: "unread", label: i18n("pages.notification.filters.unread") },
    { key: "read", label: i18n("pages.notification.filters.read") },
  ];

  return (
    <div className="notification-page">
      <div className="notification-container">
        {/* Header */}
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.notification.title")}</h1>
          <div className="header-placeholder"></div>
        </div>

        {/* Card */}
        <div className="content-card">
          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`filter-tab ${activeFilter === tab.key ? "active" : ""}`}
                onClick={() => handleFilterChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notification Content */}
          <div className="notification-content-area">
            {loadingNotification ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <span>{i18n("pages.notification.loading")}</span>
              </div>
            ) : allNotification?.length > 0 ? (
              <div className="notification-list">
                {allNotification.map((item) => {
                  const config = typeConfig[item.type] || typeConfig.custom;
                  return (
                    <div
                      key={item.id}
                      className={`notification-item ${item.status === "unread" ? "unread" : ""}`}
                      onClick={() => handleNotificationClick(item)}
                    >
                      <div className="notification-icon">
                        <i className={config.icon} />
                      </div>
                      <div className="notification-body">
                        <div className="notification-title">{config.title}</div>
                        <div className="notification-message">
                          {config.getMessage(item)}
                        </div>
                        <div className="notification-time">
                          {Dates.Monthago(item.createdAt)}
                        </div>
                      </div>
                      {item.status === "unread" && <div className="unread-dot" />}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-bell-slash" />
                </div>
                <div className="empty-title">{i18n("pages.notification.emptyState.title")}</div>
                <div className="empty-message">
                  {activeFilter === "all"
                    ? i18n("pages.notification.emptyState.noNotifications")
                    : i18n("pages.notification.emptyState.noFilteredNotifications", activeFilter)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Page background */
        .notification-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        /* Centered container */
        .notification-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* Header */
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
          background-color: rgba(253, 75, 78, 0.15);
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

        /* Card with rounded top corners */
        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        /* Filter tabs */
        .filter-tabs {
          display: flex;
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .filter-tab {
          flex: 1;
          padding: 8px 12px;
          text-align: center;
          border: none;
          background: transparent;
          color: #888888;
          font-size: 13px;
          font-weight: 500;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        .filter-tab.active {
          background-color: #fd4b4e;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(253, 75, 78, 0.3);
        }

        /* Notification list area */
        .notification-content-area {
          min-height: 200px;
        }

        /* Loading */
        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px;
          color: #aaaaaa;
          font-size: 14px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #fd4b4e;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Notification item */
        .notification-item {
          display: flex;
          align-items: center;
          padding: 14px 12px;
          margin-bottom: 8px;
          background-color: #0e0f14;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .notification-item.unread {
          background-color: #1a1c22;
          border-left: 3px solid #fd4b4e;
        }

        .notification-item:hover {
          background-color: #1e2027;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #15161c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 16px;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .notification-body {
          flex: 1;
        }

        .notification-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .notification-message {
          color: #aaaaaa;
          font-size: 13px;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .notification-time {
          color: #666666;
          font-size: 11px;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #fd4b4e;
          margin-left: 8px;
          flex-shrink: 0;
        }

        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          color: #888888;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          color: #fd4b4e;
        }

        .empty-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .empty-message {
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

export default Notification;