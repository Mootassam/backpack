import{q as i,v as b,u as d,n as N,af as j,p as n,ag as y,ab as k,j as e,L as x}from"./index-07486408.js";import{u as w}from"./useDispatch-69f3e435.js";const S=[{icon:"fas fa-wallet",path:"/withdrawaddress",name:i("pages.profile.menu.withdrawalAddress"),requiresKyc:!0},{icon:"fas fa-lock",path:"/passwordtype",name:i("pages.profile.menu.password"),requiresKyc:!1},{icon:"fas fa-bell",path:"/notification",name:i("pages.profile.menu.notifications"),requiresKyc:!1},{icon:"fas fa-gift",path:"/invitation",name:i("pages.profile.menu.myInvitation"),requiresKyc:!0},{icon:"fas fa-language",path:"/language",name:i("pages.profile.menu.language"),requiresKyc:!1},{path:"/terms-of-use",icon:"fas fa-file-contract",name:i("pages.profile.menu.termsOfUse")},{path:"/privacy-portal",icon:"fas fa-user-shield",name:i("pages.profile.menu.privacyPortal")},{icon:"fas fa-info-circle",path:"/about",name:i("pages.profile.menu.aboutUs"),requiresKyc:!1},{icon:"fas fa-file-contract",path:"/approval",name:i("pages.profile.menu.msbApproval"),requiresKyc:!1},{icon:"fas fa-headset",path:"/LiveChat",name:i("pages.profile.menu.customerSupport"),requiresKyc:!1},{icon:"fab fa-google-play",path:"/Playstore",name:i("pages.profile.menu.downloadApp"),requiresKyc:!1,external:!0}],o={PENDING:"pending",SUCCESS:"success",UNVERIFIED:"unverified"};function E(){var p;const l=w(),m=b(),a=d(N.selectCurrentUser),f=d(j.selectRows),t=n.useMemo(()=>{var s;return((s=f[0])==null?void 0:s.status)===o.PENDING?o.PENDING:a!=null&&a.kyc?o.SUCCESS:o.UNVERIFIED},[f,a==null?void 0:a.kyc]),r=n.useMemo(()=>({user:a}),[a]);n.useEffect(()=>{l(y.doFetch(r,r))},[l,r]);const g=n.useCallback(()=>{l(k.doSignout())},[l]),h=n.useMemo(()=>S.map(s=>({...s,disabled:s.requiresKyc&&!(a!=null&&a.kyc)})),[a==null?void 0:a.kyc]),u=n.useCallback(s=>{const c=e.jsxs("li",{className:`profile-settings-item ${s.disabled?"disabled":""}`,children:[e.jsxs("div",{className:"profile-settings-info",children:[e.jsx("div",{className:"profile-settings-icon",children:e.jsx("i",{className:s.icon})}),e.jsx("div",{className:"profile-settings-name",children:s.name})]}),e.jsx("div",{className:"profile-settings-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]});return s.disabled?e.jsx("div",{children:c},s.name):s.external?e.jsx("a",{href:s.path,target:"_blank",rel:"noopener noreferrer",className:"remove_blue",children:c},s.name):e.jsx(x,{to:s.path,className:"remove_blue",children:c},s.name)},[]),v=()=>m.goBack();return e.jsxs("div",{className:"profile-page",children:[t===o.UNVERIFIED&&e.jsx("div",{className:"popup-overlay",children:e.jsxs("div",{className:"popup-card",children:[e.jsx("div",{className:"alert-icon",children:e.jsx("i",{className:"fas fa-exclamation-triangle"})}),e.jsx("div",{className:"alert-title",children:i("pages.profile.verification.alert.title")}),e.jsx("div",{className:"alert-desc",children:i("pages.profile.verification.alert.description")}),e.jsx(x,{to:"/proof",className:"remove_blue",children:e.jsx("button",{className:"verify-now-button",children:i("pages.profile.verification.alert.verifyNow")})})]})}),e.jsxs("div",{className:"profile-container",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:v,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:i("pages.profile.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"content-card",children:[t===o.PENDING&&e.jsxs("div",{className:"verification-status",children:[e.jsx("div",{className:"status-icon",children:e.jsx("i",{className:"fas fa-clock"})}),e.jsx("div",{className:"status-title",children:i("pages.profile.verification.pending.title")}),e.jsx("div",{className:"status-desc",children:i("pages.profile.verification.pending.description")})]}),e.jsxs("div",{className:"profile-profile-header",children:[e.jsx("div",{className:"profile-profile-avatar",children:e.jsx("i",{className:"fas fa-user"})}),e.jsxs("div",{className:"profile-profile-info",children:[e.jsx("div",{className:"profile-profile-name",children:(p=a==null?void 0:a.email)==null?void 0:p.split("@")[0]}),e.jsx("div",{className:t===o.SUCCESS?"profile-profile-status":"profile-not-status",children:t===o.SUCCESS?i("pages.profile.status.verified"):i("pages.profile.status.unverified")})]})]}),e.jsxs("div",{className:"profile-info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.accountInfo.title")}),e.jsxs("div",{className:"profile-info-item",children:[e.jsx("div",{className:"profile-info-label",children:i("pages.profile.accountInfo.email")}),e.jsx("div",{className:"profile-info-value",children:a==null?void 0:a.email})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsx("div",{className:"profile-info-label",children:i("pages.profile.accountInfo.creditScore")}),e.jsx("div",{className:"profile-info-value",children:a==null?void 0:a.score})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsx("div",{className:"profile-info-label",children:i("pages.profile.accountInfo.invitationCode")}),e.jsx("div",{className:"profile-info-value",children:e.jsx("span",{className:"profile-invite-code",children:a!=null&&a.kyc?a==null?void 0:a.refcode:"******"})})]})]}),t===o.PENDING&&e.jsxs("div",{className:"info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.pendingVerifications.title")}),e.jsxs("div",{className:"verification-item",children:[e.jsx("div",{className:"verification-icon",children:e.jsx("i",{className:"fas fa-id-card"})}),e.jsxs("div",{className:"verification-info",children:[e.jsx("div",{className:"verification-name",children:i("pages.profile.pendingVerifications.identity.title")}),e.jsx("div",{className:"verification-desc",children:i("pages.profile.pendingVerifications.identity.description")})]}),e.jsx("div",{className:"verification-status-badge",children:i("pages.profile.pendingVerifications.status.pending")})]}),e.jsxs("div",{className:"verification-item",children:[e.jsx("div",{className:"verification-icon",children:e.jsx("i",{className:"fas fa-home"})}),e.jsxs("div",{className:"verification-info",children:[e.jsx("div",{className:"verification-name",children:i("pages.profile.pendingVerifications.address.title")}),e.jsx("div",{className:"verification-desc",children:i("pages.profile.pendingVerifications.address.description")})]}),e.jsx("div",{className:"verification-status-badge",children:i("pages.profile.pendingVerifications.status.pending")})]})]}),t===o.SUCCESS&&e.jsxs("div",{className:"profile-info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.approvedVerifications.title")}),e.jsxs("div",{className:"profile-verification-badge",children:[e.jsx("div",{className:"profile-badge-icon",children:e.jsx("i",{className:"fas fa-id-card"})}),e.jsxs("div",{className:"profile-badge-info",children:[e.jsx("div",{className:"profile-badge-title",children:i("pages.profile.approvedVerifications.identity.title")}),e.jsx("div",{className:"profile-badge-desc",children:i("pages.profile.approvedVerifications.status.completed")})]})]}),e.jsxs("div",{className:"profile-verification-badge",children:[e.jsx("div",{className:"profile-badge-icon",children:e.jsx("i",{className:"fas fa-shield-alt"})}),e.jsxs("div",{className:"profile-badge-info",children:[e.jsx("div",{className:"profile-badge-title",children:i("pages.profile.approvedVerifications.address.title")}),e.jsx("div",{className:"profile-badge-desc",children:i("pages.profile.approvedVerifications.status.completed")})]})]})]}),e.jsxs("div",{className:"profile-info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.settings")}),e.jsxs("ul",{className:"profile-settings-list",children:[h.map(u),e.jsxs("li",{className:"profile-settings-item",onClick:g,children:[e.jsxs("div",{className:"profile-settings-info",children:[e.jsx("div",{className:"profile-settings-icon",children:e.jsx("i",{className:"fas fa-sign-out-alt"})}),e.jsx("div",{className:"profile-settings-name",children:i("pages.profile.menu.logout")})]}),e.jsx("div",{className:"profile-settings-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})]})]})]})]}),e.jsx("style",{children:`
        /* Solid dark background */
        .profile-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding: 0 0 20px 0;
        }

        .profile-container {
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

        .verification-status {
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          text-align: center;
        }

        .status-icon {
          font-size: 28px;
          color: #fd4b4e;
          margin-bottom: 8px;
        }

        .status-title {
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 6px;
        }

        .status-desc {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.4;
        }

        .profile-profile-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .profile-profile-avatar {
          width: 48px;
          height: 48px;
          background-color: #0e0f14;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 22px;
        }

        .profile-profile-name {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
        }

        .profile-profile-status {
          color: #4caf50;
          font-size: 13px;
          margin-top: 4px;
        }

        .profile-not-status {
          color: #fd4b4e;
          font-size: 13px;
          margin-top: 4px;
        }

        .profile-info-section {
          margin-bottom: 20px;
        }

        .profile-section-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        .profile-info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #2a2a2e;
        }

        .profile-info-item:last-child {
          border-bottom: none;
        }

        .profile-info-label {
          color: #aaaaaa;
          font-size: 13px;
        }

        .profile-info-value {
          color: #ffffff;
          font-size: 13px;
          word-break: break-all;
        }

        .profile-invite-code {
          background-color: #0e0f14;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
        }

        .verification-item {
          display: flex;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
          gap: 12px;
        }

        .verification-icon {
          color: #fd4b4e;
          font-size: 20px;
          width: 36px;
          text-align: center;
        }

        .verification-info {
          flex: 1;
        }

        .verification-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
        }

        .verification-desc {
          color: #aaaaaa;
          font-size: 12px;
        }

        .verification-status-badge {
          background-color: rgba(253, 75, 78, 0.15);
          color: #fd4b4e;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
        }

        .profile-verification-badge {
          display: flex;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
          gap: 12px;
        }

        .profile-badge-icon {
          color: #4caf50;
          font-size: 20px;
        }

        .profile-badge-title {
          color: #ffffff;
          font-size: 14px;
        }

        .profile-badge-desc {
          color: #4caf50;
          font-size: 12px;
        }

        .profile-settings-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .profile-settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #2a2a2e;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .profile-settings-item:last-child {
          border-bottom: none;
        }

        .profile-settings-item:hover {
          background-color: rgba(253, 75, 78, 0.05);
        }

        .profile-settings-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-settings-icon {
          color: #fd4b4e;
          font-size: 16px;
          width: 28px;
          text-align: center;
        }

        .profile-settings-name {
          color: #ffffff;
          font-size: 14px;
        }

        .profile-settings-arrow {
          color: #888888;
          font-size: 14px;
        }

        .profile-settings-item.disabled {
          opacity: 0.4;
          pointer-events: none;
        }

        .profile-settings-item.disabled .profile-settings-icon {
          color: #888888;
        }

        .profile-settings-item.disabled .profile-settings-name {
          color: #888888;
        }

        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-card {
          background-color: #15161c;
          border-radius: 16px;
          padding: 30px 24px;
          text-align: center;
          max-width: 360px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
        }

        .popup-card .alert-icon {
          font-size: 36px;
          color: #fd4b4e;
          margin-bottom: 16px;
        }

        .popup-card .alert-title {
          color: #ffffff;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 12px;
        }

        .popup-card .alert-desc {
          color: #aaaaaa;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .verify-now-button {
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 12px 32px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
        }

        .verify-now-button:hover {
          background-color: #e04345;
        }
      `})]})}export{E as default};
