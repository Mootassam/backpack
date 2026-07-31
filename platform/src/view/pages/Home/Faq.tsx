import React, { useState, useEffect, useRef } from 'react';
import { i18n } from '../../../i18n';

// Define TypeScript interfaces
interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  icon: string;
  category: string;
}

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
  isExternal?: boolean;
}

const Faq: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const notificationRef = useRef<HTMLDivElement>(null);

  // FAQ Data
  const faqData: FAQItem[] = [
    {
      id: '1',
      question: i18n('pages.faq.questions.howToCreateAccount'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.goToWebsite')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.clickSignUp')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.enterDetails')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.verifyEmail')}
          </div>
        </div>
      ),
      icon: 'fa-user-plus',
      category: 'getting-started'
    },
    {
      id: '2',
      question: i18n('pages.faq.questions.howToCompleteVerification'),
      answer: i18n('pages.faq.answers.verificationProcess'),
      icon: 'fa-id-card',
      category: 'getting-started'
    },
    {
      id: '3',
      question: i18n('pages.faq.questions.howToBuyCrypto'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.completeVerification')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.clickBuyCrypto')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.selectCoinAndPayment')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.confirmTransaction')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.cryptoInWallet')}
          </div>
        </div>
      ),
      icon: 'fa-shopping-cart',
      category: 'getting-started'
    },
    {
      id: '4',
      question: i18n('pages.faq.questions.howToTrade'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.goToTradeMarkets')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.pickTradingPair')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.placeOrders')}
          </div>
        </div>
      ),
      icon: 'fa-chart-line',
      category: 'managing-account'
    },
    {
      id: '5',
      question: i18n('pages.faq.questions.howToSendReceive'),
      answer: (
        <>
          <strong>{i18n('pages.faq.labels.toReceive')}</strong> {i18n('pages.faq.steps.receiveCrypto')}
          <br />
          <br />
          <strong>{i18n('pages.faq.labels.toSend')}</strong> {i18n('pages.faq.steps.sendCrypto')}
        </>
      ),
      icon: 'fa-wallet',
      category: 'managing-account'
    },
    {
      id: '6',
      question: i18n('pages.faq.questions.howToBecomeP2PMerchant'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.applyP2P')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.meetCriteria')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.createOffers')}
          </div>
        </div>
      ),
      icon: 'fa-store',
      category: 'managing-account'
    },
    {
      id: '7',
      question: i18n('pages.faq.questions.howStakingWorks'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.goToStaking')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.pickStakingPlan')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.selectAmount')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.confirmStaking')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.rewardsProcessed')}
          </div>
        </div>
      ),
      icon: 'fa-coins',
      category: 'managing-account'
    }
  ];

  const futuresData: FAQItem[] = [
    {
      id: 'f1',
      question: i18n('pages.faq.futures.whatAreFutures'),
      answer: i18n('pages.faq.futures.futuresExplanation'),
      icon: 'fa-file-contract',
      category: 'futures'
    },
    {
      id: 'f2',
      question: i18n('pages.faq.futures.whatIsLeverage'),
      answer: i18n('pages.faq.futures.leverageExplanation'),
      icon: 'fa-arrows-alt-h',
      category: 'futures'
    },
    {
      id: 'f3',
      question: i18n('pages.faq.futures.longShortPositions'),
      answer: (
        <>
          <strong>{i18n('pages.faq.futures.long')}</strong> {i18n('pages.faq.futures.longExplanation')}
          <br />
          <strong>{i18n('pages.faq.futures.short')}</strong> {i18n('pages.faq.futures.shortExplanation')}
        </>
      ),
      icon: 'fa-long-arrow-alt-up',
      category: 'futures'
    },
    {
      id: 'f4',
      question: i18n('pages.faq.futures.marginLiquidation'),
      answer: i18n('pages.faq.futures.marginExplanation'),
      icon: 'fa-exclamation-triangle',
      category: 'futures'
    },
    {
      id: 'f5',
      question: i18n('pages.faq.futures.fundingRate'),
      answer: i18n('pages.faq.futures.fundingRateExplanation'),
      icon: 'fa-percentage',
      category: 'futures'
    },
    {
      id: 'f6',
      question: i18n('pages.faq.futures.profitLossCalculation'),
      answer: i18n('pages.faq.futures.profitLossExplanation'),
      icon: 'fa-calculator',
      category: 'futures'
    }
  ];

  const actionCards: ActionCard[] = [
    {
      id: 'ac1',
      title: i18n('pages.faq.actionCards.contactSupport'),
      description: i18n('pages.faq.actionCards.getHelp'),
      icon: 'fa-headset',
      link: '/liveChat',
      isExternal: false
    },
    {
      id: 'ac4',
      title: i18n('pages.faq.actionCards.community'),
      description: i18n('pages.faq.actionCards.joinDiscussions'),
      icon: 'fa-comments',
      link: 'https://t.me/Backpack exchange_official',
      isExternal: true
    }
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFutures = futuresData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle back button click
  const handleBackClick = () => {
    window.history.back();
  };

  // Handle action card click
  const handleActionCardClick = (card: ActionCard) => {
    if (card.link) {
      if (card.isExternal) {
        window.open(card.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = card.link;
      }
    }
  };

  // Group FAQs by category for display
  const gettingStartedFaqs = filteredFaqs.filter(item => item.category === 'getting-started');
  const managingAccountFaqs = filteredFaqs.filter(item => item.category === 'managing-account');

  return (
    <div className="faq-page">
      {/* Header Section – consistent top-header style */}
      <div className="top-header">
        <div className="back-button" onClick={handleBackClick}>
          <i className="fas fa-arrow-left" />
        </div>
        <h1 className="page-title">{i18n('pages.faq.title')}</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Main content card */}
      <div className="content-card">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-title">{i18n('pages.faq.hero.title')}</div>
          <div className="hero-subtitle">
            {i18n('pages.faq.hero.subtitle')}
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder={i18n('pages.faq.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Getting Started Section */}
        {gettingStartedFaqs.length > 0 && (
          <div className="faq-section">
            <div className="section-title">{i18n('pages.faq.categories.gettingStarted')}</div>
            <div className="faq-category">
              {gettingStartedFaqs.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-question">
                    <i className={`fas ${faq.icon} faq-icon`} />
                    {faq.question}
                  </div>
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Managing Your Account Section */}
        {managingAccountFaqs.length > 0 && (
          <div className="faq-section">
            <div className="section-title">{i18n('pages.faq.categories.managingAccount')}</div>
            <div className="faq-category">
              {managingAccountFaqs.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-question">
                    <i className={`fas ${faq.icon} faq-icon`} />
                    {faq.question}
                  </div>
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Futures Trading Section */}
        {filteredFutures.length > 0 && (
          <div className="futures-section">
            <div className="futures-title">
              <i className="fas fa-chart-bar" />
              {i18n('pages.faq.futures.title')}
            </div>
            {filteredFutures.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className="faq-question">
                  <i className={`fas ${faq.icon} faq-icon`} />
                  {faq.question}
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="benefits-section">
          <div className="benefits-title">
            <i className="fas fa-star" />
            {i18n('pages.faq.benefits.title')}
          </div>
          <ul className="benefits-list">
            <li className="benefit-item">
              <i className="fas fa-shield-alt benefit-icon" />
              <div className="benefit-content">
                <div className="benefit-text">{i18n('pages.faq.benefits.hedge')}</div>
              </div>
            </li>
            <li className="benefit-item">
              <i className="fas fa-rocket benefit-icon" />
              <div className="benefit-content">
                <div className="benefit-text">{i18n('pages.faq.benefits.multiplyProfits')}</div>
              </div>
            </li>
            <li className="benefit-item">
              <i className="fas fa-arrows-alt-v benefit-icon" />
              <div className="benefit-content">
                <div className="benefit-text">{i18n('pages.faq.benefits.tradeBothMarkets')}</div>
              </div>
            </li>
            <li className="benefit-item">
              <i className="fas fa-chess benefit-icon" />
              <div className="benefit-content">
                <div className="benefit-text">{i18n('pages.faq.benefits.advancedStrategies')}</div>
              </div>
            </li>
          </ul>
        </div>

 

        {/* Footer */}
        <div className="footer">
          <br />
   
        </div>
      </div>

      {/* Notification Element */}
      <div
        ref={notificationRef}
        className={`notification ${showNotification ? 'show' : ''}`}
      >
        {notificationMessage}
      </div>

      <style>{`
        /* ===== GLOBAL PAGE ===== */
        .faq-page {
          min-height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ===== TOP HEADER (identical to Profile/News/Security) ===== */
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

        /* ===== HERO SECTION ===== */
        .hero-section {
          text-align: center;
          margin-bottom: 20px;
        }
        .hero-title {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .hero-subtitle {
          font-size: 14px;
          color: #aaaaaa;
          line-height: 1.4;
        }

        /* ===== SEARCH BAR ===== */
        .search-container {
          margin-bottom: 20px;
        }
        .search-bar {
          width: 100%;
          padding: 12px 16px;
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-bar::placeholder {
          color: #888888;
        }
        .search-bar:focus {
          border-color: #F41112;
        }

        /* ===== SECTION TITLES ===== */
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        /* ===== FAQ ITEMS ===== */
        .faq-item {
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 10px;
        }
        .faq-question {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .faq-icon {
          color: #F41112;
          font-size: 16px;
          width: 20px;
          text-align: center;
        }
        .faq-answer {
          color: #aaaaaa;
          font-size: 14px;
          line-height: 1.5;
          padding-left: 30px;
        }

        /* Step list inside answers */
        .step-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .step-items {
          display: flex;
          align-items: baseline;
          gap: 8px;
          color: #ffffff;
          font-size: 14px;
        }
        .step-arrow {
          color: #F41112;
          font-size: 12px;
          margin-top: 3px;
        }

        /* ===== FUTURES SECTION ===== */
        .futures-section {
          margin-top: 20px;
        }
        .futures-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }
        .futures-title i {
          color: #F41112;
        }

        /* ===== BENEFITS SECTION ===== */
        .benefits-section {
          margin-top: 20px;
        }
        .benefits-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }
        .benefits-title i {
          color: #F41112;
        }
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #2a2a2e;
        }
        .benefit-item:last-child {
          border-bottom: none;
        }
        .benefit-icon {
          color: #4caf50;
          font-size: 16px;
          width: 24px;
          text-align: center;
        }
        .benefit-text {
          color: #ffffff;
          font-size: 14px;
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
          text-decoration: none;
          transition: background-color 0.2s;
          display: block;
        }
        .action-card:hover {
          background-color: rgba(244, 17, 18, 0.08);
        }
        .action-icon {
          color: #F41112;
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
        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        /* ===== FOOTER ===== */
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #aaaaaa;
          line-height: 1.5;
        }

        /* ===== NOTIFICATION ===== */
        .notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #F41112;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 200;
        }
        .notification.show {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Faq;