import{j as e,q as t,L as a}from"./index-58d25818.js";function i(){return e.jsxs("div",{className:"ep-root",children:[e.jsxs("div",{className:"ep-bg",children:[e.jsx("div",{className:"ep-float ep-f1",children:e.jsx("i",{className:"fas fa-lock"})}),e.jsx("div",{className:"ep-float ep-f2",children:e.jsx("i",{className:"fab fa-bitcoin"})}),e.jsx("div",{className:"ep-float ep-f3",children:e.jsx("i",{className:"fas fa-shield-alt"})}),e.jsx("div",{className:"ep-float ep-f4",children:e.jsx("i",{className:"fab fa-ethereum"})})]}),e.jsxs("div",{className:"ep-card",children:[e.jsx("div",{className:"ep-icon-wrap ep-icon-403",children:e.jsx("i",{className:"fas fa-ban"})}),e.jsx("div",{className:"ep-code ep-code-403",children:"403"}),e.jsx("h1",{className:"ep-title",children:"Access Denied"}),e.jsx("p",{className:"ep-msg",children:t("errors.403")||"You don't have permission to view this page. Please log in or contact support if you believe this is an error."}),e.jsxs("div",{className:"ep-actions",children:[e.jsxs(a,{to:"/",className:"ep-btn-primary remove_blue",children:[e.jsx("i",{className:"fas fa-home"})," Back to Home"]}),e.jsxs(a,{to:"/support",className:"ep-btn-ghost remove_blue",children:[e.jsx("i",{className:"fas fa-headset"})," Contact Support"]})]})]}),e.jsx("style",{children:`
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
          color: #ff9800;
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
          padding: 40px 28px 36px;
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
        .ep-icon-403 {
          background: rgba(255,152,0,0.12);
          border: 1.5px solid rgba(255,152,0,0.3);
          color: #ff9800;
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
        .ep-code-403 {
          background: linear-gradient(135deg, #ff9800 0%, #ffcc02 100%);
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
          text-decoration: none;
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
        .ep-btn-ghost:hover { border-color: #ff9800; color: #ff9800; }
        a.remove_blue { text-decoration: none; color: inherit; }
      `})]})}export{i as default};
