import React from 'react'
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";

function Privacy() {
    const history = useHistory();

    const handleBackClick = () => {
        history.goBack();
    };

    return (
        <>
            <div className="privacy-page">
                <div className="privacy-container">
                    {/* Header */}
                    <div className="top-header">
                        <div className="back-button" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left" />
                        </div>
                        <h1 className="page-title">{i18n("pages.privacy.title")}</h1>
                        <div className="header-placeholder" />
                    </div>

                    {/* Content Card */}
                    <div className="content-card">
                        {/* Hero Section */}
                        <div className="hero-section">
                            <div className="hero-title">{i18n("pages.privacy.hero.title")}</div>
                            <div className="hero-subtitle">
                                {i18n("pages.privacy.hero.subtitle")}
                            </div>
                        </div>

                        {/* Principles Section */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.privacy.principles.title")}</div>
                            <div className="principle-category">
                                <div className="category-title">
                                    <i className="fas fa-shield-alt category-icon" />
                                    {i18n("pages.privacy.principles.corePrinciples")}
                                </div>
                                <div className="principle-item">
                                    <i className="fas fa-eye principle-icon" />
                                    <div className="principle-content">
                                        <div className="principle-title">{i18n("pages.privacy.principles.transparency.title")}</div>
                                        <div className="principle-description">
                                            {i18n("pages.privacy.principles.transparency.description")}
                                        </div>
                                    </div>
                                </div>
                                <div className="principle-item">
                                    <i className="fas fa-balance-scale principle-icon" />
                                    <div className="principle-content">
                                        <div className="principle-title">
                                            {i18n("pages.privacy.principles.accountability.title")}
                                        </div>
                                        <div className="principle-description">
                                            {i18n("pages.privacy.principles.accountability.description")}
                                        </div>
                                    </div>
                                </div>
                                <div className="principle-item">
                                    <i className="fas fa-lock principle-icon" />
                                    <div className="principle-content">
                                        <div className="principle-title">{i18n("pages.privacy.principles.dataSecurity.title")}</div>
                                        <div className="principle-description">
                                            {i18n("pages.privacy.principles.dataSecurity.description")}
                                        </div>
                                    </div>
                                </div>
                                <div className="principle-item">
                                    <i className="fas fa-filter principle-icon" />
                                    <div className="principle-content">
                                        <div className="principle-title">
                                            {i18n("pages.privacy.principles.dataMinimization.title")}
                                        </div>
                                        <div className="principle-description">
                                            {i18n("pages.privacy.principles.dataMinimization.description")}
                                        </div>
                                    </div>
                                </div>
                                <div className="principle-item">
                                    <i className="fas fa-cogs principle-icon" />
                                    <div className="principle-content">
                                        <div className="principle-title">{i18n("pages.privacy.principles.privacyByDesign.title")}</div>
                                        <div className="principle-description">
                                            {i18n("pages.privacy.principles.privacyByDesign.description")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Rights Section */}
                        <div className="section">
                            <div className="section-title">
                                <i className="fas fa-user-check" />
                                {i18n("pages.privacy.userRights.title")}
                            </div>
                            <div className="text-block">
                                {i18n("pages.privacy.userRights.content")}
                            </div>
                            <div className="note-text">
                                {i18n("pages.privacy.userRights.note")}
                            </div>
                        </div>

                        {/* Personal Data Definition */}
                        <div className="section">
                            <div className="section-title">
                                <i className="fas fa-database" />
                                {i18n("pages.privacy.personalData.title")}
                            </div>
                            <div className="text-block">
                                {i18n("pages.privacy.personalData.definition")}
                            </div>
                            <div className="examples-text">
                                {i18n("pages.privacy.personalData.examples")}
                            </div>
                        </div>

                        {/* Data Usage Section */}
                        <div className="section">
                            <div className="section-title">{i18n("pages.privacy.dataUsage.title")}</div>
                            <div className="usage-item">
                                <i className="fas fa-user-cog usage-icon" />
                                <div className="usage-content">
                                    <div className="usage-title">{i18n("pages.privacy.dataUsage.accountManagement.title")}</div>
                                    <div className="usage-description">
                                        {i18n("pages.privacy.dataUsage.accountManagement.description")}
                                    </div>
                                </div>
                            </div>
                            <div className="usage-item">
                                <i className="fas fa-gavel usage-icon" />
                                <div className="usage-content">
                                    <div className="usage-title">{i18n("pages.privacy.dataUsage.legalCompliance.title")}</div>
                                    <div className="usage-description">
                                        {i18n("pages.privacy.dataUsage.legalCompliance.description")}
                                    </div>
                                </div>
                            </div>
                            <div className="usage-item">
                                <i className="fas fa-shield-alt usage-icon" />
                                <div className="usage-content">
                                    <div className="usage-title">{i18n("pages.privacy.dataUsage.securityFraud.title")}</div>
                                    <div className="usage-description">
                                        {i18n("pages.privacy.dataUsage.securityFraud.description")}
                                    </div>
                                </div>
                            </div>
                            <div className="usage-item">
                                <i className="fas fa-headset usage-icon" />
                                <div className="usage-content">
                                    <div className="usage-title">{i18n("pages.privacy.dataUsage.customerSupport.title")}</div>
                                    <div className="usage-description">
                                        {i18n("pages.privacy.dataUsage.customerSupport.description")}
                                    </div>
                                </div>
                            </div>
                            <div className="usage-item">
                                <i className="fas fa-bullhorn usage-icon" />
                                <div className="usage-content">
                                    <div className="usage-title">{i18n("pages.privacy.dataUsage.marketing.title")}</div>
                                    <div className="usage-description">
                                        {i18n("pages.privacy.dataUsage.marketing.description")}
                                    </div>
                                </div>
                            </div>
                            <div className="usage-item">
                                <i className="fas fa-exchange-alt usage-icon" />
                                <div className="usage-content">
                                    <div className="usage-title">{i18n("pages.privacy.dataUsage.transactionProcessing.title")}</div>
                                    <div className="usage-description">
                                        {i18n("pages.privacy.dataUsage.transactionProcessing.description")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Retention Section */}
                        <div className="section">
                            <div className="section-title">
                                <i className="fas fa-history" />
                                {i18n("pages.privacy.dataRetention.title")}
                            </div>
                            <div className="text-block">
                                {i18n("pages.privacy.dataRetention.content")}
                            </div>
                        </div>

                        {/* Data Sharing Section */}
                        <div className="section">
                            <div className="section-title">
                                <i className="fas fa-share-alt" />
                                {i18n("pages.privacy.dataSharing.title")}
                            </div>
                            <div className="text-block">
                                {i18n("pages.privacy.dataSharing.content")}
                            </div>
                        </div>

                        {/* Cookies Section */}
                        <div className="section">
                            <div className="section-title">
                                <i className="fas fa-cookie-bite" />
                                {i18n("pages.privacy.cookies.title")}
                            </div>
                            <div className="text-block">
                                {i18n("pages.privacy.cookies.content")}
                            </div>
                            <a href="#" className="cookies-link">
                                {i18n("pages.privacy.cookies.link")}
                            </a>
                        </div>

                        {/* Action Cards */}
                        <div className="action-cards">
                            <div className="action-card">
                                <i className="fas fa-file-contract action-icon" />
                                <div className="action-title">{i18n("pages.privacy.actionCards.privacyNotice.title")}</div>
                                <div className="action-description">{i18n("pages.privacy.actionCards.privacyNotice.description")}</div>
                            </div>
                            <div className="action-card">
                                <i className="fas fa-user-edit action-icon" />
                                <div className="action-title">{i18n("pages.privacy.actionCards.manageData.title")}</div>
                                <div className="action-description">
                                    {i18n("pages.privacy.actionCards.manageData.description")}
                                </div>
                            </div>
                            <div className="action-card">
                                <i className="fas fa-cookie action-icon" />
                                <div className="action-title">{i18n("pages.privacy.actionCards.cookieSettings.title")}</div>
                                <div className="action-description">
                                    {i18n("pages.privacy.actionCards.cookieSettings.description")}
                                </div>
                            </div>
                            <div className="action-card">
                                <i className="fas fa-question-circle action-icon" />
                                <div className="action-title">{i18n("pages.privacy.actionCards.helpCenter.title")}</div>
                                <div className="action-description">
                                    {i18n("pages.privacy.actionCards.helpCenter.description")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                /* Overall page */
                .privacy-page {
                    min-height: 100vh;
                    background-color: #0e0f14;
                    display: flex;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                }

                .privacy-container {
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
                    padding-bottom: 20px;
                    border-bottom: 1px solid #2a2a2e;
                    margin-bottom: 20px;
                }

                .hero-title {
                    color: #ffffff;
                    font-size: 22px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }

                .hero-subtitle {
                    color: #aaaaaa;
                    font-size: 14px;
                    line-height: 1.5;
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
                    color: #fd4b4e;
                    font-size: 18px;
                }

                /* Text blocks */
                .text-block {
                    color: #cccccc;
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 10px;
                }

                .note-text {
                    color: #fd4b4e;
                    font-size: 13px;
                    font-style: italic;
                    margin-top: 8px;
                }

                .examples-text {
                    color: #888888;
                    font-size: 13px;
                    margin-top: 10px;
                    padding-left: 12px;
                    border-left: 2px solid #fd4b4e;
                }

                /* Principles */
                .principle-category {
                    margin-top: 8px;
                }

                .category-title {
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 500;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .category-icon {
                    color: #fd4b4e;
                    font-size: 16px;
                }

                .principle-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    margin-bottom: 14px;
                    padding-bottom: 14px;
                    border-bottom: 1px solid #2a2a2e;
                }

                .principle-icon {
                    color: #fd4b4e;
                    font-size: 16px;
                    width: 24px;
                    text-align: center;
                    margin-top: 2px;
                }

                .principle-title {
                    color: #ffffff;
                    font-weight: 500;
                    font-size: 14px;
                    margin-bottom: 4px;
                }

                .principle-description {
                    color: #aaaaaa;
                    font-size: 13px;
                    line-height: 1.5;
                }

                /* Usage items */
                .usage-item {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #2a2a2e;
                }

                .usage-icon {
                    color: #fd4b4e;
                    font-size: 18px;
                    width: 24px;
                    text-align: center;
                }

                .usage-title {
                    color: #ffffff;
                    font-weight: 500;
                    font-size: 14px;
                    margin-bottom: 4px;
                }

                .usage-description {
                    color: #aaaaaa;
                    font-size: 13px;
                    line-height: 1.5;
                }

                /* Cookies link */
                .cookies-link {
                    display: inline-block;
                    color: #fd4b4e;
                    text-decoration: none;
                    font-size: 14px;
                    margin-top: 8px;
                    font-weight: 500;
                }

                /* Action cards */
                .action-cards {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 24px;
                }

                .action-card {
                    background-color: #0e0f14;
                    border-radius: 12px;
                    padding: 16px 14px;
                    text-align: center;
                }

                .action-icon {
                    font-size: 24px;
                    color: #fd4b4e;
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
            `}</style>
        </>
    )
}

export default Privacy