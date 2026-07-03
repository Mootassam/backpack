import{q as i,y as P,u as N,n as R,ah as q,p as o,ai as D,ad as j,aj as y,aa as K,a5 as M,ak as F,j as e,L as k}from"./index-58d25818.js";import{F as w}from"./fileUploader-de4668a2.js";import{u as L}from"./useDispatch-a18d5675.js";import"./v4-4a60fe23.js";const _=[{icon:"fas fa-lock",path:"/passwordtype",name:i("pages.profile.menu.password"),requiresKyc:!1},{icon:"fas fa-bell",path:"/notification",name:i("pages.profile.menu.notifications"),requiresKyc:!1},{icon:"fas fa-gift",path:"/invitation",name:i("pages.profile.menu.myInvitation"),requiresKyc:!0},{icon:"fas fa-language",path:"/language",name:i("pages.profile.menu.language"),requiresKyc:!1},{path:"/terms-of-use",icon:"fas fa-file-contract",name:i("pages.profile.menu.termsOfUse")},{path:"/privacy-portal",icon:"fas fa-user-shield",name:i("pages.profile.menu.privacyPortal")},{icon:"fas fa-info-circle",path:"/about",name:i("pages.profile.menu.aboutUs"),requiresKyc:!1},{icon:"fas fa-file-contract",path:"/approval",name:i("pages.profile.menu.msbApproval"),requiresKyc:!1},{icon:"fas fa-headset",path:"/LiveChat",name:i("pages.profile.menu.customerSupport"),requiresKyc:!1},{icon:"fab fa-google-play",path:"/Playstore",name:i("pages.profile.menu.downloadApp"),requiresKyc:!1,external:!0}],t={PENDING:"pending",SUCCESS:"success",UNVERIFIED:"unverified"};function H(){var h,u,v;const l=L(),S=P(),a=N(R.selectCurrentUser),x=N(q.selectRows),c=o.useRef(null),[f,g]=o.useState(!1),n=o.useMemo(()=>{var s;return((s=x[0])==null?void 0:s.status)===t.PENDING?t.PENDING:a!=null&&a.kyc?t.SUCCESS:t.UNVERIFIED},[x,a==null?void 0:a.kyc]),p=o.useMemo(()=>({user:a}),[a]);o.useEffect(()=>{l(D.doFetch(p,p))},[l,p]);const z=o.useCallback(()=>{l(j.doSignout())},[l]),C=o.useCallback(()=>{var s;f||(s=c.current)==null||s.click()},[f]),I=o.useCallback(async s=>{var b;const r=(b=s.target.files)==null?void 0:b[0];if(r){c.current&&(c.current.value="");try{g(!0),w.validate(r,{storage:y.values.userAvatarsProfiles,image:!0});const d=await w.upload(r,{storage:y.values.userAvatarsProfiles,image:!0});await K.updateProfile({avatars:[d]}),await l(j.doRefreshCurrentUser()),M.success(i("auth.profile.success"))}catch(d){F.showMessage(d)}finally{g(!1)}}},[l]),E=o.useMemo(()=>_.map(s=>({...s,disabled:s.requiresKyc&&!(a!=null&&a.kyc)})),[a==null?void 0:a.kyc]),V=o.useCallback(s=>{const r=e.jsxs("li",{className:`profile-settings-item ${s.disabled?"disabled":""}`,children:[e.jsxs("div",{className:"profile-settings-info",children:[e.jsx("div",{className:"profile-settings-icon",children:e.jsx("i",{className:s.icon})}),e.jsx("div",{className:"profile-settings-name",children:s.name})]}),e.jsx("div",{className:"profile-settings-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]});return s.disabled?e.jsx("div",{children:r},s.name):s.external?e.jsx("a",{href:s.path,target:"_blank",rel:"noopener noreferrer",className:"remove_blue",children:r},s.name):e.jsx(k,{to:s.path,className:"remove_blue",children:r},s.name)},[]),A=()=>S.goBack(),m=(u=(h=a==null?void 0:a.avatars)==null?void 0:h[0])==null?void 0:u.downloadUrl;return e.jsxs("div",{className:"profile-page",children:[n===t.UNVERIFIED&&e.jsx("div",{className:"popup-overlay",children:e.jsxs("div",{className:"popup-card",children:[e.jsx("div",{className:"alert-icon",children:e.jsx("i",{className:"fas fa-exclamation-triangle"})}),e.jsx("div",{className:"alert-title",children:i("pages.profile.verification.alert.title")}),e.jsx("div",{className:"alert-desc",children:i("pages.profile.verification.alert.description")}),e.jsx(k,{to:"/proof",className:"remove_blue",children:e.jsx("button",{className:"verify-now-button",children:i("pages.profile.verification.alert.verifyNow")})})]})}),e.jsxs("div",{className:"profile-container",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:A,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:i("pages.profile.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"content-card",children:[n===t.PENDING&&e.jsxs("div",{className:"verification-status",children:[e.jsx("div",{className:"status-icon",children:e.jsx("i",{className:"fas fa-clock"})}),e.jsx("div",{className:"status-title",children:i("pages.profile.verification.pending.title")}),e.jsx("div",{className:"status-desc",children:i("pages.profile.verification.pending.description")})]}),e.jsxs("div",{className:"profile-profile-header",children:[e.jsxs("div",{className:"profile-profile-avatar",onClick:C,title:"Change photo",children:[f?e.jsx("i",{className:"fas fa-spinner fa-spin",style:{color:"#fd4b4e",fontSize:22}}):m?e.jsx("img",{src:m,alt:"avatar",className:"avatar-photo"}):e.jsx("i",{className:"fas fa-user"}),!f&&e.jsx("div",{className:"avatar-edit-badge",children:e.jsx("i",{className:"fas fa-camera"})}),e.jsx("input",{ref:c,type:"file",accept:"image/*",style:{display:"none"},onChange:I})]}),e.jsxs("div",{className:"profile-profile-info",children:[e.jsx("div",{className:"profile-profile-name",children:(v=a==null?void 0:a.email)==null?void 0:v.split("@")[0]}),e.jsx("div",{className:n===t.SUCCESS?"profile-profile-status":"profile-not-status",children:n===t.SUCCESS?i("pages.profile.status.verified"):i("pages.profile.status.unverified")})]})]}),e.jsxs("div",{className:"profile-info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.accountInfo.title")}),e.jsxs("div",{className:"profile-info-item",children:[e.jsx("div",{className:"profile-info-label",children:i("pages.profile.accountInfo.email")}),e.jsx("div",{className:"profile-info-value",children:a==null?void 0:a.email})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsx("div",{className:"profile-info-label",children:i("pages.profile.accountInfo.creditScore")}),e.jsx("div",{className:"profile-info-value",children:a==null?void 0:a.score})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsx("div",{className:"profile-info-label",children:i("pages.profile.accountInfo.invitationCode")}),e.jsx("div",{className:"profile-info-value",children:e.jsx("span",{className:"profile-invite-code",children:a!=null&&a.kyc?a==null?void 0:a.refcode:"******"})})]})]}),n===t.PENDING&&e.jsxs("div",{className:"info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.pendingVerifications.title")}),e.jsxs("div",{className:"verification-item",children:[e.jsx("div",{className:"verification-icon",children:e.jsx("i",{className:"fas fa-id-card"})}),e.jsxs("div",{className:"verification-info",children:[e.jsx("div",{className:"verification-name",children:i("pages.profile.pendingVerifications.identity.title")}),e.jsx("div",{className:"verification-desc",children:i("pages.profile.pendingVerifications.identity.description")})]}),e.jsx("div",{className:"verification-status-badge",children:i("pages.profile.pendingVerifications.status.pending")})]}),e.jsxs("div",{className:"verification-item",children:[e.jsx("div",{className:"verification-icon",children:e.jsx("i",{className:"fas fa-home"})}),e.jsxs("div",{className:"verification-info",children:[e.jsx("div",{className:"verification-name",children:i("pages.profile.pendingVerifications.address.title")}),e.jsx("div",{className:"verification-desc",children:i("pages.profile.pendingVerifications.address.description")})]}),e.jsx("div",{className:"verification-status-badge",children:i("pages.profile.pendingVerifications.status.pending")})]})]}),n===t.SUCCESS&&e.jsxs("div",{className:"profile-info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.approvedVerifications.title")}),e.jsxs("div",{className:"profile-verification-badge",children:[e.jsx("div",{className:"profile-badge-icon",children:e.jsx("i",{className:"fas fa-id-card"})}),e.jsxs("div",{className:"profile-badge-info",children:[e.jsx("div",{className:"profile-badge-title",children:i("pages.profile.approvedVerifications.identity.title")}),e.jsx("div",{className:"profile-badge-desc",children:i("pages.profile.approvedVerifications.status.completed")})]})]}),e.jsxs("div",{className:"profile-verification-badge",children:[e.jsx("div",{className:"profile-badge-icon",children:e.jsx("i",{className:"fas fa-shield-alt"})}),e.jsxs("div",{className:"profile-badge-info",children:[e.jsx("div",{className:"profile-badge-title",children:i("pages.profile.approvedVerifications.address.title")}),e.jsx("div",{className:"profile-badge-desc",children:i("pages.profile.approvedVerifications.status.completed")})]})]})]}),e.jsxs("div",{className:"profile-info-section",children:[e.jsx("div",{className:"profile-section-title",children:i("pages.profile.settings")}),e.jsxs("ul",{className:"profile-settings-list",children:[E.map(V),e.jsxs("li",{className:"profile-settings-item",onClick:z,children:[e.jsxs("div",{className:"profile-settings-info",children:[e.jsx("div",{className:"profile-settings-icon",children:e.jsx("i",{className:"fas fa-sign-out-alt"})}),e.jsx("div",{className:"profile-settings-name",children:i("pages.profile.menu.logout")})]}),e.jsx("div",{className:"profile-settings-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})]})]})]})]}),e.jsx("style",{children:`
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

        /* Avatar circle — now clickable with camera badge */
        .profile-profile-avatar {
          position: relative;
          width: 56px;
          height: 56px;
          background-color: #0e0f14;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 22px;
          cursor: pointer;
          flex-shrink: 0;
          border: 2px solid #2a2a2e;
          overflow: visible;
          transition: border-color 0.2s;
        }

        .profile-profile-avatar:hover {
          border-color: #fd4b4e;
        }

        .avatar-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .avatar-edit-badge {
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: 20px;
          height: 20px;
          background-color: #fd4b4e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: #fff;
          border: 2px solid #15161c;
          pointer-events: none;
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
      `})]})}export{H as default};
