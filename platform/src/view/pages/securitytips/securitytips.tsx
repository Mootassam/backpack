import React from 'react'
import { i18n } from '../../../i18n'

function SecurityTips() {

  const handleBackClick = () => {
    window.history.back();
  };
  
  return (
    <div className="security-page">
      {/* Header Section – same style as Profile & News pages */}
      <div className="top-header">
        <div className="back-button" onClick={handleBackClick}>
          <i className="fas fa-arrow-left" />
        </div>
        <h1 className="page-title">{i18n("pages.securityTips.title")}</h1>
        <div className="header-placeholder" />
      </div>

      {/* Main Content */}
      <div className="content-card">
        {/* Security Tips */}
        <div className="security-tips">
          <div className="section-title">{i18n("pages.securityTips.essentialTips")}</div>
          
          {/* Password Security */}
          <div className="tip-category">
            <div className="category-title">
              <i className="fas fa-key category-icon" />
              {i18n("pages.securityTips.categories.passwordSecurity")}
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.strongPasswords.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.strongPasswords.description")}
                </div>
              </div>
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.enable2FA.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.enable2FA.description")}
                </div>
              </div>
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.changePasswords.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.changePasswords.description")}
                </div>
              </div>
            </div>
          </div>

          {/* Device Security */}
          <div className="tip-category">
            <div className="category-title">
              <i className="fas fa-mobile-alt category-icon" />
              {i18n("pages.securityTips.categories.deviceSecurity")}
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.softwareUpdated.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.softwareUpdated.description")}
                </div>
              </div>
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.antivirus.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.antivirus.description")}
                </div>
              </div>
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.publicWifi.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.publicWifi.description")}
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="tip-category">
            <div className="category-title">
              <i className="fas fa-user-shield category-icon" />
              {i18n("pages.securityTips.categories.accountSecurity")}
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.loginNotifications.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.loginNotifications.description")}
                </div>
              </div>
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.reviewActivity.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.reviewActivity.description")}
                </div>
              </div>
            </div>
            <div className="tip-item">
              <i className="fas fa-check-circle tip-icon" />
              <div className="tip-content">
                <div className="tip-title">{i18n("pages.securityTips.tips.whitelisting.title")}</div>
                <div className="tip-description">
                  {i18n("pages.securityTips.tips.whitelisting.description")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="action-cards">
          <div className="action-card">
            <i className="fas fa-shield-alt action-icon" />
            <div className="action-title">{i18n("pages.securityTips.actions.enable2FA")}</div>
            <div className="action-description">{i18n("pages.securityTips.actions.enable2FADesc")}</div>
          </div>
          <div className="action-card">
            <i className="fas fa-list-ul action-icon" />
            <div className="action-title">{i18n("pages.securityTips.actions.activityLog")}</div>
            <div className="action-description">{i18n("pages.securityTips.actions.activityLogDesc")}</div>
          </div>
          <div className="action-card">
            <i className="fas fa-wrench action-icon" />
            <div className="action-title">{i18n("pages.securityTips.actions.settings")}</div>
            <div className="action-description">{i18n("pages.securityTips.actions.settingsDesc")}</div>
          </div>
          <div className="action-card">
            <i className="fas fa-history action-icon" />
            <div className="action-title">{i18n("pages.securityTips.actions.backupCodes")}</div>
            <div className="action-description">{i18n("pages.securityTips.actions.backupCodesDesc")}</div>
          </div>
        </div>

        {/* Emergency Section */}
        <div className="emergency-section">
          <div className="emergency-title">
            <i className="fas fa-exclamation-triangle" />
            {i18n("pages.securityTips.emergency.title")}
          </div>
          <ul className="emergency-list">
            <li className="emergency-item">
              <i className="fas fa-phone emergency-icon" />
              <div className="emergency-content">
                <div className="emergency-text">
                  {i18n("pages.securityTips.emergency.unauthorizedAccess")}
                </div>
              </div>
            </li>
            <li className="emergency-item">
              <i className="fas fa-ban emergency-icon" />
              <div className="emergency-content">
                <div className="emergency-text">
                  {i18n("pages.securityTips.emergency.lostDevice")}
                </div>
              </div>
            </li>
            <li className="emergency-item">
              <i className="fas fa-lock emergency-icon" />
              <div className="emergency-content">
                <div className="emergency-text">
                  {i18n("pages.securityTips.emergency.phishing")}
                </div>
              </div>
            </li>
          </ul>
          <div className="emergency-contact">
            <div className="contact-title">{i18n("pages.securityTips.emergency.supportTitle")}</div>
            <div className="contact-info">{i18n("pages.securityTips.emergency.supportEmail")}</div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="resources-section">
          <div className="section-title">{i18n("pages.securityTips.resources.title")}</div>
          <div className="resource-item">
            <div className="resource-icon">
              <i className="fas fa-book" />
            </div>
            <div className="resource-content">
              <div className="resource-title">{i18n("pages.securityTips.resources.securityGuide")}</div>
              <a href="#" className="resource-link">
                {i18n("pages.securityTips.resources.securityGuideLink")}
              </a>
            </div>
          </div>
          <div className="resource-item">
            <div className="resource-icon">
              <i className="fas fa-graduation-cap" />
            </div>
            <div className="resource-content">
              <div className="resource-title">{i18n("pages.securityTips.resources.learningCenter")}</div>
              <a href="#" className="resource-link">
                {i18n("pages.securityTips.resources.learningCenterLink")}
              </a>
            </div>
          </div>
          <div className="resource-item">
            <div className="resource-icon">
              <i className="fas fa-question-circle" />
            </div>
            <div className="resource-content">
              <div className="resource-title">{i18n("pages.securityTips.resources.faq")}</div>
              <a href="#" className="resource-link">
                {i18n("pages.securityTips.resources.faqLink")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ===== GLOBAL PAGE ===== */
        .security-page {
          min-height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ===== TOP HEADER (identical to Profile/News) ===== */
        .top-header {
          width: 100%;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px 12px;
          background-color: #0e0f14;
          position: sticky;
          top: 0;
          z-index: 100;
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

        /* ===== CONTENT CARD ===== */
        .content-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        /* ===== SECTION TITLES ===== */
        .section-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
          margin-top: 20px;
        }
        .section-title:first-child {
          margin-top: 0;
        }

        /* ===== TIP CATEGORY ===== */
        .tip-category {
          margin-bottom: 20px;
        }
        .category-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .category-icon {
          color: #fd4b4e;
          font-size: 16px;
          width: 24px;
          text-align: center;
        }

        /* ===== TIP ITEMS ===== */
        .tip-item {
          display: flex;
          gap: 10px;
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 8px;
        }
        .tip-icon {
          color: #4caf50;
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .tip-content {
          flex: 1;
        }
        .tip-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .tip-description {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.4;
        }

        /* ===== ACTION CARDS ===== */
        .action-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 20px;
        }
        .action-card {
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: background-color 0.2s;
        }
        .action-card:hover {
          background-color: rgba(253, 75, 78, 0.08);
        }
        .action-icon {
          color: #fd4b4e;
          font-size: 24px;
          margin-bottom: 8px;
        }
        .action-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .action-description {
          color: #aaaaaa;
          font-size: 12px;
          line-height: 1.3;
        }

        /* ===== EMERGENCY SECTION ===== */
        .emergency-section {
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 16px;
          margin-top: 20px;
        }
        .emergency-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fd4b4e;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .emergency-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
        }
        .emergency-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #2a2a2e;
        }
        .emergency-item:last-child {
          border-bottom: none;
        }
        .emergency-icon {
          color: #fd4b4e;
          font-size: 16px;
          width: 24px;
          text-align: center;
        }
        .emergency-text {
          color: #ffffff;
          font-size: 14px;
        }
        .emergency-contact {
          margin-top: 12px;
        }
        .contact-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .contact-info {
          color: #fd4b4e;
          font-size: 14px;
        }

        /* ===== RESOURCES SECTION ===== */
        .resources-section {
          margin-top: 20px;
        }
        .resource-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
        }
        .resource-icon {
          color: #fd4b4e;
          font-size: 20px;
          width: 32px;
          text-align: center;
        }
        .resource-content {
          flex: 1;
        }
        .resource-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .resource-link {
          color: #fd4b4e;
          text-decoration: none;
          font-size: 13px;
        }
        .resource-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default SecurityTips