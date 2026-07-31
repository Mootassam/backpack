import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { i18n } from "../../../i18n";

function Termeofuse() {
    const history = useHistory();

    const handleBackClick = () => {
        history.goBack();
    };

    return (
        <>
            <div className="terms-page">
                <div className="terms-container">
                    {/* Header */}
                    <div className="top-header">
                        <div className="back-button" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left" />
                        </div>
                        <h1 className="page-title">{i18n("pages.termsOfUse.title")}</h1>
                        <div className="header-placeholder" />
                    </div>

                    {/* Content Card */}
                    <div className="content-card">
                        {/* Hero Section */}
                        <div className="hero-section">
                            <div className="hero-title">{i18n("pages.termsOfUse.hero.title")}</div>
                        </div>

                        {/* Agreement Section */}
                        <div className="section">
                            <div className="item-title">
                                <i className="fas fa-handshake item-icon" />
                                {i18n("pages.termsOfUse.agreement.title")}
                            </div>
                            <div className="item-content">
                                {i18n("pages.termsOfUse.agreement.content")}
                            </div>
                        </div>

                        {/* Risk Warning Section */}
                        <div className="warning-section">
                            <div className="warning-title">
                                <i className="fas fa-exclamation-triangle" />
                                {i18n("pages.termsOfUse.riskWarning.title")}
                            </div>
                            <div className="warning-content">
                                {i18n("pages.termsOfUse.riskWarning.content")}
                            </div>
                        </div>

                        {/* About Services */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.aboutServices.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-info-circle item-icon" />
                                    {i18n("pages.termsOfUse.aboutServices.aboutBackpack .title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.aboutServices.aboutBackpack .content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-user-check item-icon" />
                                    {i18n("pages.termsOfUse.aboutServices.eligibility.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.aboutServices.eligibility.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-comments item-icon" />
                                    {i18n("pages.termsOfUse.aboutServices.communication.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.aboutServices.communication.content")}
                                </div>
                            </div>
                        </div>

                        {/* Services Section */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.services.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-exchange-alt item-icon" />
                                    {i18n("pages.termsOfUse.services.servicesProvided.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.services.servicesProvided.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-money-bill-wave item-icon" />
                                    {i18n("pages.termsOfUse.services.fees.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.services.fees.content")}
                                </div>
                            </div>
                        </div>

                        {/* Account Management */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.accountManagement.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-user-circle item-icon" />
                                    {i18n("pages.termsOfUse.accountManagement.accountCreation.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.accountManagement.accountCreation.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-id-card item-icon" />
                                    {i18n("pages.termsOfUse.accountManagement.identityVerification.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.accountManagement.identityVerification.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-folder item-icon" />
                                    {i18n("pages.termsOfUse.accountManagement.accountRecords.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.accountManagement.accountRecords.content")}
                                </div>
                            </div>
                        </div>

                        {/* Transactions */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.transactions.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-wallet item-icon" />
                                    {i18n("pages.termsOfUse.transactions.sufficientBalance.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.transactions.sufficientBalance.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-ban item-icon" />
                                    {i18n("pages.termsOfUse.transactions.transactionCancellation.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.transactions.transactionCancellation.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-user-shield item-icon" />
                                    {i18n("pages.termsOfUse.transactions.unauthorizedTransactions.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.transactions.unauthorizedTransactions.content")}
                                </div>
                            </div>
                        </div>

                        {/* Digital Assets */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.digitalAssets.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-coins item-icon" />
                                    {i18n("pages.termsOfUse.digitalAssets.supportedAssets.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.digitalAssets.supportedAssets.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-code-branch item-icon" />
                                    {i18n("pages.termsOfUse.digitalAssets.forksAirdrops.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.digitalAssets.forksAirdrops.content")}
                                </div>
                            </div>
                        </div>

                        {/* Account Security */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.accountSecurity.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-lock item-icon" />
                                    {i18n("pages.termsOfUse.accountSecurity.securityRequirements.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.accountSecurity.securityRequirements.content")}
                                </div>
                            </div>
                        </div>

                        {/* Privacy */}
                        <div className="section">
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-user-secret item-icon" />
                                    {i18n("pages.termsOfUse.privacy.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.privacy.content")}
                                </div>
                            </div>
                        </div>

                        {/* Termination */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.termination.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-power-off item-icon" />
                                    {i18n("pages.termsOfUse.termination.terminationSuspension.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.termination.terminationSuspension.content")}
                                </div>
                            </div>
                        </div>

                        {/* Prohibited Use */}
                        <div className="warning-section">
                            <div className="warning-title">
                                <i className="fas fa-ban" />
                                {i18n("pages.termsOfUse.prohibitedUse.title")}
                            </div>
                            <div className="warning-content">
                                {i18n("pages.termsOfUse.prohibitedUse.content")}
                            </div>
                        </div>

                        {/* Liability */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.termsOfUse.liability.title")}</div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-balance-scale item-icon" />
                                    {i18n("pages.termsOfUse.liability.liability.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.liability.liability.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-copyright item-icon" />
                                    {i18n("pages.termsOfUse.liability.intellectualProperty.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.liability.intellectualProperty.content")}
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="item-title">
                                    <i className="fas fa-shield-alt item-icon" />
                                    {i18n("pages.termsOfUse.liability.indemnity.title")}
                                </div>
                                <div className="item-content">
                                    {i18n("pages.termsOfUse.liability.indemnity.content")}
                                </div>
                            </div>
                        </div>

                        {/* Important Notice */}
                        <div className="notice-section">
                            <div className="notice-title">
                                <i className="fas fa-file-contract" />
                                {i18n("pages.termsOfUse.importantNotice.title")}
                            </div>
                            <div className="notice-content">
                                {i18n("pages.termsOfUse.importantNotice.content")}
                            </div>
                        </div>

                        {/* Action Cards */}
                        <div className="action-cards">
                            <Link to="/security-tips" className="remove_blue">
                                <div className="action-card">
                                    <i className="fas fa-shield-alt action-icon" />
                                    <div className="action-title">{i18n("pages.termsOfUse.actionCards.security.title")}</div>
                                    <div className="action-description">{i18n("pages.termsOfUse.actionCards.security.description")}</div>
                                </div>
                            </Link>
                            <Link to="/faq-center" className="remove_blue">
                                <div className="action-card">
                                    <i className="fas fa-question-circle action-icon" />
                                    <div className="action-title">{i18n("pages.termsOfUse.actionCards.helpCenter.title")}</div>
                                    <div className="action-description">{i18n("pages.termsOfUse.actionCards.helpCenter.description")}</div>
                                </div>
                            </Link>
                            <Link to="/privacy-portal" className="remove_blue">
                                <div className="action-card">
                                    <i className="fas fa-user-shield action-icon" />
                                    <div className="action-title">{i18n("pages.termsOfUse.actionCards.privacyPolicy.title")}</div>
                                    <div className="action-description">{i18n("pages.termsOfUse.actionCards.privacyPolicy.description")}</div>
                                </div>
                            </Link>
                            <Link to="/approval" className="remove_blue">
                                <div className="action-card">
                                    <i className="fas fa-gavel action-icon" />
                                    <div className="action-title">{i18n("pages.termsOfUse.actionCards.legal.title")}</div>
                                    <div className="action-description">{i18n("pages.termsOfUse.actionCards.legal.description")}</div>
                                </div>
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="footer">
                            {i18n("pages.termsOfUse.footer.copyright")}
                            <br />
                            {i18n("pages.termsOfUse.footer.lastUpdated")}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                /* Overall page */
                .terms-page {
                    min-height: 100vh;
                    background-color: #0e0f14;
                    display: flex;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                }

                .terms-container {
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

                /* Content card */
                .content-card {
                    background-color: #15161c;
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                    padding: 24px 20px 32px;
                    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
                    flex: 1;
                }

                /* Hero */
                .hero-section {
                    text-align: center;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #2a2a2e;
                    margin-bottom: 20px;
                }

                .hero-title {
                    color: #ffffff;
                    font-size: 20px;
                    font-weight: 700;
                }

                /* Generic section */
                .section {
                    margin-bottom: 24px;
                }

                .section-title {
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #2a2a2e;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .section-title i {
                    color: #F41112;
                    font-size: 18px;
                }

                /* Content items */
                .content-item {
                    margin-bottom: 16px;
                }

                .item-title {
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .item-icon {
                    color: #F41112;
                    font-size: 16px;
                    width: 20px;
                    text-align: center;
                }

                .item-content {
                    color: #cccccc;
                    font-size: 14px;
                    line-height: 1.6;
                }

                /* Warning section */
                .warning-section {
                    background-color: rgba(244, 17, 18, 0.08);
                    border-left: 3px solid #F41112;
                    border-radius: 10px;
                    padding: 16px;
                    margin-bottom: 24px;
                }

                .warning-title {
                    color: #F41112;
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .warning-content {
                    color: #dddddd;
                    font-size: 14px;
                    line-height: 1.5;
                }

                /* Notice section */
                .notice-section {
                    background-color: #0e0f14;
                    border-radius: 10px;
                    padding: 16px;
                    margin-bottom: 24px;
                }

                .notice-title {
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .notice-content {
                    color: #cccccc;
                    font-size: 14px;
                    line-height: 1.5;
                }

                /* Action cards grid */
                .action-cards {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 24px;
                    margin-bottom: 24px;
                }

                .action-card {
                    background-color: #0e0f14;
                    border-radius: 12px;
                    padding: 16px 14px;
                    text-align: center;
                    transition: background-color 0.2s;
                }

                .action-card:hover {
                    background-color: #1a1c22;
                }

                .action-icon {
                    font-size: 24px;
                    color: #F41112;
                    margin-bottom: 8px;
                }

                .action-title {
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 6px;
                }

                .action-description {
                    color: #888888;
                    font-size: 12px;
                    line-height: 1.4;
                }

                /* Footer */
                .footer {
                    text-align: center;
                    color: #888888;
                    font-size: 12px;
                    margin-top: 16px;
                    line-height: 1.6;
                }

                /* Keep links clean */
                a.remove_blue {
                    text-decoration: none;
                    color: inherit;
                }
            `}</style>
        </>
    )
}

export default Termeofuse