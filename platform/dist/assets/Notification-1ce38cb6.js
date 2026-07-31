import{w as t,u as y,n as c,z as r,k as l,A as b,j as e,ab as k}from"./index-9fb4ec24.js";import{D as j}from"./Dates-de0b2d39.js";import{u as v}from"./useDispatch-09756e97.js";import"./v4-4a60fe23.js";const f={deposit:{icon:"fas fa-arrow-down",title:t("pages.notification.types.deposit.title"),getMessage:i=>t("pages.notification.types.deposit.message",i.message)},withdraw:{icon:"fas fa-arrow-up",title:t("pages.notification.types.withdraw.title"),getMessage:i=>t("pages.notification.types.withdraw.message",i.message)},staking:{icon:"fas fa-coins",title:t("pages.notification.types.staking.title"),getMessage:i=>t("pages.notification.types.staking.message",i.message)},kyc:{icon:"fas fa-id-card",title:t("pages.notification.types.kyc.title"),getMessage:i=>i.message||t("pages.notification.types.kyc.defaultMessage")},commission:{icon:"fas fa-hand-holding-dollar",title:t("pages.notification.types.commission.title"),getMessage:i=>t("pages.notification.types.commission.message",i.message)},futures:{icon:"fas fa-chart-line",title:t("pages.notification.types.futures.title"),getMessage:i=>t("pages.notification.types.futures.message",i.message)},accountActivated:{icon:"fas fa-user-check",title:t("pages.notification.types.accountActivated.title"),getMessage:i=>t("pages.notification.types.accountActivated.message",i.message)},custom:{icon:"fas fa-bell",title:t("pages.notification.types.custom.title"),getMessage:i=>i.message||t("pages.notification.types.custom.defaultMessage")},cancel_deposit:{icon:"fas fa-ban",title:t("pages.notification.types.cancelDeposit.title"),getMessage:i=>t("pages.notification.types.cancelDeposit.message",i.message)},cancel_withdraw:{icon:"fas fa-ban",title:t("pages.notification.types.cancelWithdraw.title"),getMessage:i=>t("pages.notification.types.cancelWithdraw.message",i.message)},cancel_activated:{icon:"fas fa-user-slash",title:t("pages.notification.types.cancelActivated.title"),getMessage:()=>t("pages.notification.types.cancelActivated.message")}};function z(){const i=v(),d=y(),o=c(r.selectRows),p=c(r.selectLoading),[s,g]=l.useState("all");l.useEffect(()=>{const a=s==="all"?"":s;i(b.doFetch(a))},[i,s]);const m=a=>{i(k.doUpdate(a.id)),a.type==="accountActivated"&&(window.location.href="/profile")},x=a=>{g(a)},h=()=>d.goBack(),u=[{key:"all",label:t("pages.notification.filters.all")},{key:"unread",label:t("pages.notification.filters.unread")},{key:"read",label:t("pages.notification.filters.read")}];return e.jsxs("div",{className:"notification-page",children:[e.jsxs("div",{className:"notification-container",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:h,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:t("pages.notification.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"content-card",children:[e.jsx("div",{className:"filter-tabs",children:u.map(a=>e.jsx("button",{className:`filter-tab ${s===a.key?"active":""}`,onClick:()=>x(a.key),children:a.label},a.key))}),e.jsx("div",{className:"notification-content-area",children:p?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"spinner"}),e.jsx("span",{children:t("pages.notification.loading")})]}):(o==null?void 0:o.length)>0?e.jsx("div",{className:"notification-list",children:o.map(a=>{const n=f[a.type]||f.custom;return e.jsxs("div",{className:`notification-item ${a.status==="unread"?"unread":""}`,onClick:()=>m(a),children:[e.jsx("div",{className:"notification-icon",children:e.jsx("i",{className:n.icon})}),e.jsxs("div",{className:"notification-body",children:[e.jsx("div",{className:"notification-title",children:n.title}),e.jsx("div",{className:"notification-message",children:n.getMessage(a)}),e.jsx("div",{className:"notification-time",children:j.Monthago(a.createdAt)})]}),a.status==="unread"&&e.jsx("div",{className:"unread-dot"})]},a.id)})}):e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-bell-slash"})}),e.jsx("div",{className:"empty-title",children:t("pages.notification.emptyState.title")}),e.jsx("div",{className:"empty-message",children:s==="all"?t("pages.notification.emptyState.noNotifications"):t("pages.notification.emptyState.noFilteredNotifications",s)})]})})]})]}),e.jsx("style",{children:`
        /* Page background */
        .notification-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        /* Centered container */
        .notification-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* Header */
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

        /* Card with rounded top corners */
        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        /* Filter tabs */
        .filter-tabs {
          display: flex;
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .filter-tab {
          flex: 1;
          padding: 8px 12px;
          text-align: center;
          border: none;
          background: transparent;
          color: #888888;
          font-size: 13px;
          font-weight: 500;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        .filter-tab.active {
          background-color: #F41112;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(244, 17, 18, 0.3);
        }

        /* Notification list area */
        .notification-content-area {
          min-height: 200px;
        }

        /* Loading */
        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px;
          color: #aaaaaa;
          font-size: 14px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #F41112;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Notification item */
        .notification-item {
          display: flex;
          align-items: center;
          padding: 14px 12px;
          margin-bottom: 8px;
          background-color: #0e0f14;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .notification-item.unread {
          background-color: #1a1c22;
          border-left: 3px solid #F41112;
        }

        .notification-item:hover {
          background-color: #1e2027;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #15161c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F41112;
          font-size: 16px;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .notification-body {
          flex: 1;
        }

        .notification-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .notification-message {
          color: #aaaaaa;
          font-size: 13px;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .notification-time {
          color: #666666;
          font-size: 11px;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #F41112;
          margin-left: 8px;
          flex-shrink: 0;
        }

        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          color: #888888;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          color: #F41112;
        }

        .empty-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .empty-message {
          font-size: 14px;
          line-height: 1.4;
        }
      `})]})}export{z as default};
