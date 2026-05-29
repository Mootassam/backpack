import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";

declare global {
  interface Window {
    $crisp: any[];
  }
}

const CRISP_WEBSITE_ID = "ab42b4d9-6c25-43e7-9e5a-13da903a28f3";

function LiveChat() {
  const history = useHistory();
  const hideCrispWidget = useRef<(() => void) | null>(null);

  // Hide any floating Crisp widget that might already be on screen
  useEffect(() => {
    if (window.$crisp) {
      try {
        window.$crisp.push(["do", "chat:hide"]);
      } catch (_) {}
    }
    hideCrispWidget.current = () => {
      if (window.$crisp) {
        try {
          window.$crisp.push(["do", "chat:hide"]);
        } catch (_) {}
      }
    };
    return () => {
      hideCrispWidget.current?.();
    };
  }, []);

  return (
    <div className="livechat-page">
      {/* Header */}
      <div className="livechat-header">
        <button className="livechat-back-btn" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left" />
        </button>
        <span className="livechat-title">
          {i18n("pages.profile.menu.customerSupport")}
        </span>
        <div className="livechat-header-spacer" />
      </div>

      {/* Crisp chat embedded as a full iframe */}
      <div className="livechat-iframe-wrap">
        <iframe
          src={`https://go.crisp.chat/chat/embed/?website_id=${CRISP_WEBSITE_ID}`}
          title="Customer Support"
          className="livechat-iframe"
          allow="microphone; camera"
          style={{ border: "none" }}
        />
      </div>

      <style>{`
        .livechat-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Header ─────────────────────────────────────────── */
        .livechat-header {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          background-color: #15161c;
          border-bottom: 1px solid #1e1f28;
          flex-shrink: 0;
          gap: 12px;
        }

        .livechat-back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #0e0f14;
          color: #ffffff;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
        }

        .livechat-back-btn:hover {
          background: rgba(253, 75, 78, 0.15);
          color: #fd4b4e;
        }

        .livechat-title {
          flex: 1;
          text-align: center;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.2px;
        }

        .livechat-header-spacer {
          width: 36px;
          flex-shrink: 0;
        }

        /* ── Iframe wrapper ──────────────────────────────────── */
        .livechat-iframe-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .livechat-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          background: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default LiveChat;
