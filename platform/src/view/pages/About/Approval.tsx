import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";

function Approval() {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div className="approval-page">
      <div className="approval-container">
        {/* Header */}
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.profile.menu.msbApproval")}</h1>
          <div className="header-placeholder"></div>
        </div>

        {/* Card */}
        <div className="content-card">
          <img
            src="/images/certif.png"
            alt="Certificate"
            className="certificate-image"
          />
        </div>
      </div>

      <style>{`
        .approval-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .approval-container {
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
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .certificate-image {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}

export default Approval;