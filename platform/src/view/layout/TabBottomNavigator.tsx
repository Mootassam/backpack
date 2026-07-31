import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

interface TabItem {
  icon: string;
  path: string;
  name: string;
}

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs: TabItem[] = [
    {
      icon: "fas fa-home",
      path: "/",
      name: i18n("components.bottomNav.home"),
    },
    {
      icon: "fas fa-chart-line",
      path: "/market",
      name: i18n("components.bottomNav.market"),
    },
    {
      icon: "fas fa-exchange-alt",
      path: "/trade",
      name: i18n("components.bottomNav.spot"),
    },
    {
      icon: "fas fa-chart-bar",
      path: "/futures",
      name: i18n("components.bottomNav.futures"),
    },
    {
      icon: "fas fa-wallet",
      path: "/wallets",
      name: i18n("components.bottomNav.wallets"),
    },
  ];

  return (
    <>
      <div className="bottom-nav-wrapper">
        <div className="bottom-nav">
          {tabs.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
            >
              <i className={`${item.icon} nav-icon`} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /* Fixed wrapper to center the bottom nav */
        .bottom-nav-wrapper {
          position: fixed;
          max-width:400px; 
          margin:auto;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 1000;
          pointer-events: none; /* allow clicks to pass through except on the nav itself */
        }

        .bottom-nav {
          pointer-events: auto;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          background-color: #15161c;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 8px 12px 10px;
          border-top: 1px solid #2a2a2e;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.4);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          color: #888888;
          text-decoration: none;
          font-size: 11px;
          padding: 4px 12px;
          border-radius: 12px;
          transition: color 0.2s, background-color 0.2s;
        }

        .nav-item .nav-icon {
          font-size: 18px;
        }

        .nav-item span {
          font-size: 10px;
          font-weight: 500;
        }

        .nav-item.active {
          color: #F41112;
          background-color: rgba(244, 17, 18, 0.1);
        }

        /* Keep links clean */
        a.nav-item:hover {
          color: #ffffff;
        }

        a.nav-item.active:hover {
          color: #F41112;
        }
      `}</style>
    </>
  );
}

export default TabBottomNavigator;