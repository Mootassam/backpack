import { Link } from "react-router-dom";

function Error404Page() {
  return (
    <div className="ep-root">
      {/* Floating background icons */}
      <div className="ep-bg">
        <div className="ep-float ep-f1"><i className="fab fa-bitcoin" /></div>
        <div className="ep-float ep-f2"><i className="fab fa-ethereum" /></div>
        <div className="ep-float ep-f3"><i className="fas fa-coins" /></div>
        <div className="ep-float ep-f4"><i className="fas fa-chart-line" /></div>
      </div>

      <div className="ep-card">
        {/* Icon */}
        <div className="ep-icon-wrap ep-icon-404">
          <i className="fas fa-map-signs" />
        </div>

        {/* Code */}
        <div className="ep-code">404</div>

        {/* Title */}
        <h1 className="ep-title">Page Not Found</h1>

        {/* Message */}
        <p className="ep-msg">
          The page you're looking for doesn't exist or has been moved.
          Check the URL and try again.
        </p>

        {/* Actions */}
        <div className="ep-actions">
          <Link to="/" className="ep-btn-primary remove_blue">
            <i className="fas fa-home" /> Back to Home
          </Link>
          <Link to="/market" className="ep-btn-ghost remove_blue">
            Explore Markets
          </Link>
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

        /* Floating background icons */
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
          color: #F41112;
          animation: epFloat 8s ease-in-out infinite;
        }
        .ep-f1 { top: 10%; left: 8%;  animation-delay: 0s;   animation-duration: 9s;  }
        .ep-f2 { top: 15%; right: 10%; animation-delay: 2s;  animation-duration: 7s;  }
        .ep-f3 { bottom: 20%; left: 12%; animation-delay: 1s; animation-duration: 11s; }
        .ep-f4 { bottom: 15%; right: 8%; animation-delay: 3s; animation-duration: 8s;  }
        @keyframes epFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-24px) rotate(8deg); }
        }

        /* Card */
        .ep-card {
          position: relative;
          z-index: 1;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 24px;
          padding: 40px 28px 36px;
          max-width: 360px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }

        /* Icon circle */
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
        .ep-icon-404 {
          background: rgba(244, 17, 18,0.12);
          border: 1.5px solid rgba(244, 17, 18,0.3);
          color: #F41112;
        }
        .ep-icon-403 {
          background: rgba(255,152,0,0.12);
          border: 1.5px solid rgba(255,152,0,0.3);
          color: #ff9800;
        }
        .ep-icon-500 {
          background: rgba(33,150,243,0.12);
          border: 1.5px solid rgba(33,150,243,0.3);
          color: #2196f3;
        }

        /* Error code */
        .ep-code {
          font-size: 72px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #F41112 0%, #F64141 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
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

        /* Buttons */
        .ep-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ep-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #F41112;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 0;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .ep-btn-primary:hover { background: #AD1111; transform: translateY(-1px); }
        .ep-btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
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
        .ep-btn-ghost:hover { border-color: #F41112; color: #F41112; }
        a.remove_blue { text-decoration: none; color: inherit; }
      `}</style>
    </div>
  );
}

export default Error404Page;
