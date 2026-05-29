import React from 'react';
import { useHistory } from 'react-router-dom';
import { getLanguages, getLanguageCode, i18n } from '../../i18n';
import actions from 'src/modules/layout/layoutActions';

function I18nSelect() {
  const history = useHistory();

  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  return (
    <div className="i18n-container">
      <div className="lang-page-header">
        <button className="lang-back-btn" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left" />
        </button>
        <span className="lang-page-title">{i18n('pages.language.selectLanguage')}</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="language-header">
        <i className="fas fa-language"></i>
        <h2>{i18n('pages.language.selectLanguage')}</h2>
        <p>{i18n('pages.language.choosePreferred')}</p>
      </div>

      <div className="languages-grid">
        {getLanguages().map((language) => (
          <div
            key={language.id}
            onClick={() => doChangeLanguage(language.id)}
            className={`language-card ${
              getLanguageCode() === language.id ? 'active' : ''
            }`}
          >
            <div className="language-flag">
              <span className="lang-code">{language.id.toUpperCase().slice(0, 2)}</span>
            </div>
            <div className="language-info">
              <span className="language-name">{language.label}</span>
              <span className="language-native">
                {language.nativeName || language.label}
              </span>
            </div>
            {getLanguageCode() === language.id && (
              <div className="selected-indicator">
                <i className="fas fa-check"></i>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .i18n-container {
          max-width: 400px;
          margin: 0 auto;
          background: #0e0f14;
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #ffffff;
        }

        /* ── Page header (back arrow + title) ────────────────────────── */
        .lang-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px 4px;
        }
        .lang-back-btn {
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
        .lang-back-btn:hover { background: #1e1f26; color: #fff; }
        .lang-page-title {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
        }

        /* ── Decorative header (icon + subtitle) ─────────────────────── */
        .language-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 36px 24px 28px;
          text-align: center;
        }
        .language-header i {
          font-size: 36px;
          color: #fd4b4e;
          margin-bottom: 14px;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(253,75,78,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .language-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .language-header p {
          font-size: 13px;
          color: #666;
        }

        /* ── Grid ────────────────────────────────────────────────────── */
        .languages-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0 16px;
        }

        /* ── Language card ───────────────────────────────────────────── */
        .language-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          user-select: none;
        }
        .language-card:hover {
          background: #1a1b22;
          border-color: #2a2a2e;
        }
        .language-card.active {
          border-color: #fd4b4e;
          background: rgba(253,75,78,0.06);
        }

        /* ── Flag ────────────────────────────────────────────────────── */
        .language-flag {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: #1e1f26;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #2a2a2e;
        }
        .lang-code {
          font-size: 11px;
          font-weight: 700;
          color: #aaa;
          letter-spacing: 0.5px;
          user-select: none;
        }
        .language-card.active .lang-code {
          color: #fd4b4e;
        }

        /* ── Language info ───────────────────────────────────────────── */
        .language-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
          min-width: 0;
        }
        .language-name {
          font-size: 15px;
          font-weight: 600;
          color: #e8e8e8;
        }
        .language-native {
          font-size: 12px;
          color: #666;
        }
        .language-card.active .language-name { color: #fff; }
        .language-card.active .language-native { color: #fd4b4e; }

        /* ── Check indicator ─────────────────────────────────────────── */
        .selected-indicator {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #fd4b4e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .selected-indicator i {
          font-size: 12px;
          color: #fff;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

export default I18nSelect;