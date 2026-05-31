import{y as t,j as o,q as e,L as s}from"./index-3bb87590.js";function r(){const i=t(),a=()=>i.goBack();return o.jsxs("div",{className:"password-page",children:[o.jsxs("div",{className:"password-container",children:[o.jsxs("div",{className:"top-header",children:[o.jsx("div",{className:"back-button",onClick:a,children:o.jsx("i",{className:"fas fa-arrow-left"})}),o.jsx("h1",{className:"page-title",children:e("pages.passwordType.title")}),o.jsx("div",{className:"header-placeholder"})]}),o.jsxs("div",{className:"content-card",children:[o.jsx("h2",{className:"card-title",children:e("pages.passwordType.cardTitle")}),o.jsxs("div",{className:"password-options",children:[o.jsxs(s,{to:"/loginpassword",className:"password-option remove_blue",children:[o.jsx("div",{className:"option-icon",children:o.jsx("i",{className:"fas fa-key"})}),o.jsxs("div",{className:"option-content",children:[o.jsx("div",{className:"option-title",children:e("pages.passwordType.options.login.title")}),o.jsx("div",{className:"option-desc",children:e("pages.passwordType.options.login.description")})]}),o.jsx("div",{className:"option-arrow",children:o.jsx("i",{className:"fas fa-chevron-right"})})]}),o.jsxs(s,{to:"/withdrawPassword",className:"password-option remove_blue",children:[o.jsx("div",{className:"option-icon",children:o.jsx("i",{className:"fas fa-lock"})}),o.jsxs("div",{className:"option-content",children:[o.jsx("div",{className:"option-title",children:e("pages.passwordType.options.withdrawal.title")}),o.jsx("div",{className:"option-desc",children:e("pages.passwordType.options.withdrawal.description")})]}),o.jsx("div",{className:"option-arrow",children:o.jsx("i",{className:"fas fa-chevron-right"})})]})]})]})]}),o.jsx("style",{children:`
        .password-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .password-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

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

        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        .card-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #2a2a2e;
        }

        .password-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .password-option {
          display: flex;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 14px;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .password-option:hover {
          background-color: #1a1c22;
        }

        .option-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #15161c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 16px;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .option-content {
          flex: 1;
        }

        .option-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .option-desc {
          color: #888888;
          font-size: 12px;
          line-height: 1.4;
        }

        .option-arrow {
          color: #666666;
          font-size: 14px;
          margin-left: 8px;
        }

        .remove_blue {
          color: inherit;
        }
      `})]})}export{r as default};
