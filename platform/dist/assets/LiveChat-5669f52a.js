import{y as s,p as r,j as e,q as c}from"./index-54206aa9.js";const o="16e0fdfd-ed8a-418a-be26-4d29f29d6727";function n(){const i=s(),a=r.useRef(null);return r.useEffect(()=>{if(window.$crisp)try{window.$crisp.push(["do","chat:hide"])}catch{}return a.current=()=>{if(window.$crisp)try{window.$crisp.push(["do","chat:hide"])}catch{}},()=>{var t;(t=a.current)==null||t.call(a)}},[]),e.jsxs("div",{className:"livechat-page",children:[e.jsxs("div",{className:"livechat-header",children:[e.jsx("button",{className:"livechat-back-btn",onClick:()=>i.goBack(),children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("span",{className:"livechat-title",children:c("pages.profile.menu.customerSupport")}),e.jsx("div",{className:"livechat-header-spacer"})]}),e.jsx("div",{className:"livechat-iframe-wrap",children:e.jsx("iframe",{src:`https://go.crisp.chat/chat/embed/?website_id=${o}`,title:"Customer Support",className:"livechat-iframe",allow:"microphone; camera",style:{border:"none"}})}),e.jsx("style",{children:`
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
      `})]})}export{n as default};
