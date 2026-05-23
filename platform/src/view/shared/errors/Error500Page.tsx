import { Link } from "react-router-dom";

function Error500Page() {
  return (
    <div className="ep-root">
      {/* Floating background icons */}
      <div className="ep-bg">
        <div className="ep-float ep-f1"><i className="fas fa-server" /></div>
        <div className="ep-float ep-f2"><i className="fab fa-bitcoin" /></div>
        <div className="ep-float ep-f3"><i className="fas fa-database" /></div>
        <div className="ep-float ep-f4"><i className="fab fa-ethereum" /></div>
      </div>

      <div className="ep-card">
        {/* Icon */}
        <div className="ep-icon-wrap ep-icon-500">
          <i className="fas fa-server" />
        </div>

        {/* Code */}
        <div className="ep-code ep-code-500">500</div>

        {/* Title */}
        <h1 className="ep-title">Internal Server Error</h1>

        {/* Message */}
        <p className="ep-msg">
          Something went wrong on our end. Our team has been notified
          and is already working to fix it. Please try again in a moment.
        </p>

        {/* Actions */}
        <div className="ep-actions">
          <button className="ep-btn-primary" onClick={() => window.location.reload()}>
            <i className="fas fa-redo" /> Try Again
          </button>
          <Link to="/" className="ep-btn-ghost remove_blue">
            <i className="fas fa-home" /> Back to Home
          </Link>
        </div>

        {/* Status hint */}
        <div className="ep-hint">
          <i className="fas fa-info-circle" />
          If the problem persists, please contact{" "}
          <Link to="/support" className="ep-hint-link remove_blue">support</Link>
        </div>
      </div>

      <style>{`
        .ep-root {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .ep-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .ep-float {
          position: absolute;
          font-size: 48px;
          opacity: 0.04;
          color: #2196f3;
          animation: epFloat 8s ease-in-out infinite;
        }
        .ep-f1 { top: 10%;    left: 8%;   animation-delay: 0s;  animation-duration: 9s;  }
        .ep-f2 { top: 15%;    right: 10%; animation-delay: 2s;  animation-duration: 7s;  }
        .ep-f3 { bottom: 20%; left: 12%;  animation-delay: 1s;  animation-duration: 11s; }
        .ep-f4 { bottom: 15%; right: 8%;  animation-delay: 3s;  animation-duration: 8s;  }
        @keyframes epFloat {
          0%, 100% { transform: translateY(0px)   rotate(0deg); }
          50%       { transform: translateY(-24px) rotate(8deg); }
        }

        .ep-card {
          position: relative;
          z-index: 1;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 24px;
          padding: 40px 28px 32px;
          max-width: 360px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }

        .ep-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin: 0 auto 20px;
        }
        .ep-icon-500 {
          background: rgba(33,150,243,0.12);
          border: 1.5px solid rgba(33,150,243,0.3);
          color: #2196f3;
        }

        .ep-code {
          font-size: 72px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -2px;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ep-code-500 {
          background: linear-gradient(135deg, #2196f3 0%, #64b5f6 100%);
        }

        .ep-title {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .ep-msg {
          color: #666;
          font-size: 13.5px;
          line-height: 1.65;
          margin: 0 0 28px;
        }

        .ep-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .ep-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #fd4b4e;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 0;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s, transform 0.15s;
        }
        .ep-btn-primary:hover { background: #e8393c; transform: translateY(-1px); }
        .ep-btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          border: 1.5px solid #2a2a2e;
          color: #888;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 0;
          border-radius: 12px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .ep-btn-ghost:hover { border-color: #2196f3; color: #2196f3; }

        .ep-hint {
          color: #444;
          font-size: 12px;
          line-height: 1.5;
        }
        .ep-hint i { margin-right: 5px; }
        .ep-hint-link {
          color: #fd4b4e;
          font-weight: 600;
          text-decoration: none;
        }
        .ep-hint-link:hover { text-decoration: underline; }
        a.remove_blue { text-decoration: none; color: inherit; }
      `}</style>
    </div>
  );
}

export default Error500Page;
