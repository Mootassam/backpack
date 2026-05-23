import React from "react";
import { Link, useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";

function Typepassword() {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div className="password-page">
      <div className="password-container">
        {/* Header */}
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.passwordType.title")}</h1>
          <div className="header-placeholder"></div>
        </div>

        {/* Card */}
        <div className="content-card">
          <h2 className="card-title">{i18n("pages.passwordType.cardTitle")}</h2>
          <div className="password-options">
            <Link to="/loginpassword" className="password-option remove_blue">
              <div className="option-icon">
                <i className="fas fa-key" />
              </div>
              <div className="option-content">
                <div className="option-title">
                  {i18n("pages.passwordType.options.login.title")}
                </div>
                <div className="option-desc">
                  {i18n("pages.passwordType.options.login.description")}
                </div>
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </Link>
            <Link to="/withdrawPassword" className="password-option remove_blue">
              <div className="option-icon">
                <i className="fas fa-lock" />
              </div>
              <div className="option-content">
                <div className="option-title">
                  {i18n("pages.passwordType.options.withdrawal.title")}
                </div>
                <div className="option-desc">
                  {i18n("pages.passwordType.options.withdrawal.description")}
                </div>
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .password-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .password-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

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

        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        .card-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #2a2a2e;
        }

        .password-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .password-option {
          display: flex;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 14px;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .password-option:hover {
          background-color: #1a1c22;
        }

        .option-icon {
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

        .option-content {
          flex: 1;
        }

        .option-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .option-desc {
          color: #888888;
          font-size: 12px;
          line-height: 1.4;
        }

        .option-arrow {
          color: #666666;
          font-size: 14px;
          margin-left: 8px;
        }

        .remove_blue {
          color: inherit;
        }
      `}</style>
    </div>
  );
}

export default Typepassword;