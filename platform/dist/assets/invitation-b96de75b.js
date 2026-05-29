import{v as r,y as R,u as c,n as B,p as x,Q as b,j as e,q as s}from"./index-e08889f7.js";import{D as z}from"./Dates-02803235.js";import{u as G}from"./useDispatch-aefee968.js";import"./v4-4a60fe23.js";const o=i=>i.user.form,A=r([o],i=>i.user),E=r([o],i=>i.member),F=r([o],i=>i.loading),P=r([o],i=>i.reward),O=r([o],i=>i.users),U=r([o],i=>i.listLoading),_=r([o],i=>!!i.initLoading),H=r([o],i=>!!i.saveLoading),d={selectInitLoading:_,selectSaveLoading:H,selectUser:A,listMembers:E,loading:F,reward:P,lisUsers:O,usersLoading:U,selectRaw:o};function X(){const i=G(),S=R(),t=c(B.selectCurrentUser),l=c(d.listMembers),f=c(d.loading),g=c(d.lisUsers),M=c(d.usersLoading),$=c(d.reward),[D,v]=x.useState(!1),[p,u]=x.useState({title:"",members:[],type:""}),[j,N]=x.useState(!1);x.useEffect(()=>{t!=null&&t.refcode&&(i(b.rewardCount()),i(b.doTree(t.refcode)))},[i,t==null?void 0:t.refcode]);const y=async()=>{if(t!=null&&t.refcode)try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(t.refcode);else{const a=document.createElement("textarea");a.value=t.refcode,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a)}N(!0),setTimeout(()=>N(!1),2e3)}catch(a){console.error("Failed to copy:",a)}},m=a=>{const n=`Join Backpack using my referral code: ${t==null?void 0:t.refcode}`,h=window.location.origin;switch(a){case"whatsapp":window.open(`https://wa.me/?text=${encodeURIComponent(n)}`,"_blank");break;case"email":window.open(`mailto:?subject=Join Backpack&body=${encodeURIComponent(n)}`,"_blank");break;case"sms":window.open(`sms:?body=${encodeURIComponent(n)}`,"_blank");break;case"more":navigator.share?navigator.share({title:"Backpack Referral",text:n,url:h}):y();break}},k=(a,n)=>{const h=`${a}${C(a)} Generation ${n==="approved"?"Approved":"Pending"} Members`;u({title:h,members:[],type:n}),v(!0);const L={status:n,refCode:t==null?void 0:t.refcode,level:a};i(b.byLevel(L))},w=()=>{v(!1),u({title:"",members:[],type:""})},C=a=>a===1?"st":a===2?"nd":a===3?"rd":"th",I=a=>`${a}${C(a)} Generation Members`,T=()=>S.goBack();return e.jsxs("div",{className:"invitation-page",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:T,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:s("pages.invitation.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"invite-earn-section",children:[e.jsx("div",{className:"section-heading",children:s("pages.invitation.earnTogether")}),e.jsx("div",{className:"section-description",children:s("pages.invitation.description")}),e.jsx("div",{className:"referral-code-label",children:s("pages.invitation.yourReferralCode")}),e.jsx("div",{className:"referral-code-value",children:(t==null?void 0:t.refcode)||s("pages.invitation.loading")}),e.jsxs("button",{className:"copy-btn",onClick:y,children:[e.jsx("i",{className:"fas fa-copy"}),j?s("pages.invitation.copied"):s("pages.invitation.copyCode")]}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("button",{className:"share-btn",onClick:()=>m("whatsapp"),children:e.jsx("i",{className:"fab fa-whatsapp"})}),e.jsx("button",{className:"share-btn",onClick:()=>m("email"),children:e.jsx("i",{className:"fas fa-envelope"})}),e.jsx("button",{className:"share-btn",onClick:()=>m("sms"),children:e.jsx("i",{className:"fas fa-sms"})}),e.jsx("button",{className:"share-btn",onClick:()=>m("more"),children:e.jsx("i",{className:"fas fa-share-alt"})})]})]}),e.jsx("div",{className:"total-earned-section",children:e.jsxs("div",{className:"total-earned-card",children:[e.jsx("div",{className:"total-earned-label",children:s("pages.invitation.totalEarned")}),e.jsxs("div",{className:"total-earned-amount",children:[$.toFixed(0)," USDT"]}),e.jsx("div",{className:"total-earned-subtitle",children:s("pages.invitation.allTimeCommission")})]})}),e.jsx("div",{className:"section-heading",children:s("pages.invitation.generationMembers")}),e.jsxs("div",{className:"generation-stats-grid",children:[f&&e.jsxs("div",{className:"loading-text",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),s("pages.invitation.loading")]}),!f&&(l==null?void 0:l.map((a,n)=>e.jsxs("div",{className:"generation-stat-item",children:[e.jsxs("div",{className:"generation-stat-title",children:[e.jsx("i",{className:"fas fa-crown"}),I(a==null?void 0:a.level)]}),e.jsxs("div",{className:"generation-stats-details",children:[e.jsxs("div",{className:"generation-stat-detail approved",onClick:()=>k(a.level,"approved"),children:[e.jsx("div",{className:"generation-stat-value",children:(a==null?void 0:a.approvedCount)||0}),e.jsx("div",{className:"generation-stat-label",children:s("pages.invitation.approvedMembers")})]}),e.jsxs("div",{className:"generation-stat-detail pending",onClick:()=>k(a.level,"pending"),children:[e.jsx("div",{className:"generation-stat-value",children:(a==null?void 0:a.pendingCount)||0}),e.jsx("div",{className:"generation-stat-label",children:s("pages.invitation.pendingMembers")})]})]})]},n))),!f&&(l==null?void 0:l.length)===0&&e.jsx("div",{className:"empty-text",style:{textAlign:"center",padding:"20px",color:"#aaaaaa",fontSize:"13px"},children:s("pages.invitation.noGenerationData")})]}),e.jsx("div",{className:"section-heading",children:s("pages.invitation.commissionStructure")}),e.jsxs("div",{className:"commission-grid",children:[e.jsxs("div",{className:"commission-item",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-crown"}),s("pages.invitation.firstGeneration")]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:s("pages.invitation.firstDepositCommission")}),e.jsx("span",{className:"commission-value",children:"15%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:s("pages.invitation.stakingProfitsCommission")}),e.jsx("span",{className:"commission-value",children:"10%"})]})]})]}),e.jsxs("div",{className:"commission-item",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-users"}),s("pages.invitation.secondGeneration")]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:s("pages.invitation.firstDepositCommission")}),e.jsx("span",{className:"commission-value",children:"10%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:s("pages.invitation.stakingProfitsCommission")}),e.jsx("span",{className:"commission-value",children:"7%"})]})]})]}),e.jsxs("div",{className:"commission-item",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-user-friends"}),s("pages.invitation.thirdGeneration")]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:s("pages.invitation.firstDepositCommission")}),e.jsx("span",{className:"commission-value",children:"5%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:s("pages.invitation.stakingProfitsCommission")}),e.jsx("span",{className:"commission-value",children:"4%"})]})]})]})]}),e.jsx("div",{className:"section-heading",children:s("pages.invitation.howItWorks")}),e.jsxs("div",{className:"steps-container",children:[e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"1"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:s("pages.invitation.steps.shareCode.title")}),e.jsx("div",{className:"step-desc",children:s("pages.invitation.steps.shareCode.description")})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"2"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:s("pages.invitation.steps.friendsSignUp.title")}),e.jsx("div",{className:"step-desc",children:s("pages.invitation.steps.friendsSignUp.description")})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"3"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:s("pages.invitation.steps.earnCommissions.title")}),e.jsx("div",{className:"step-desc",children:s("pages.invitation.steps.earnCommissions.description")})]})]})]})]}),D&&e.jsx("div",{className:"modal-overlay",onClick:w,children:e.jsxs("div",{className:"modal-dialog",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{children:p.title}),e.jsx("button",{className:"modal-close",onClick:w,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:M?e.jsxs("div",{className:"modal-loading",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:s("pages.invitation.loadingMembers")})]}):g&&g.length>0?e.jsx("ul",{className:"members-list",children:g.map((a,n)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:a.email}),e.jsx("div",{className:"member-date",children:p.type==="approved"?`${s("pages.invitation.approved")}: ${z.formatDateTime(a.updatedAt||a.createdAt)}`:`${s("pages.invitation.joined")}: ${z.formatDateTime(a.createdAt)}`})]}),e.jsx("div",{className:`member-status ${p.type==="approved"?"approved":"pending"}`,children:p.type})]},n))}):e.jsxs("div",{className:"modal-empty",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:s("pages.invitation.noMembersFound")})]})})]})}),j&&e.jsxs("div",{className:"toast-notification",children:[e.jsx("i",{className:"fas fa-check-circle"}),s("pages.invitation.referralCopied")]}),e.jsx("style",{children:`
        /* ====== Page Layout ====== */
        .invitation-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          padding: 16px 20px 12px;
          background: #0e0f14;
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
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header-placeholder {
          width: 32px;
        }

        /* ====== Main Card ====== */
        .content-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .section-heading {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin: 20px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        .section-description {
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 16px;
        }

        /* ====== Invite Section ====== */
        .invite-earn-section {
          background: #1e1e24;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .referral-code-label {
          font-size: 12px;
          color: #aaaaaa;
          margin: 12px 0 4px;
        }
        .referral-code-value {
          background: #2a2a2e;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          margin-bottom: 8px;
          font-family: monospace;
          letter-spacing: 1px;
        }
        .copy-btn {
          width: 100%;
          padding: 10px;
          border: 1px solid #fd4b4e;
          background: transparent;
          color: #fd4b4e;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .copy-btn:hover {
          background: #fd4b4e;
          color: #fff;
        }

        .share-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 14px;
        }
        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2a2a2e;
          border: none;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .share-btn:hover {
          background: #fd4b4e;
        }

        /* ====== Total Earned ====== */
        .total-earned-section {
          margin-bottom: 16px;
        }
        .total-earned-card {
          background: #1e1e24;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .total-earned-label {
          font-size: 12px;
          color: #aaaaaa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .total-earned-amount {
          font-size: 32px;
          font-weight: 700;
          color: #4caf50;
          margin-bottom: 4px;
        }
        .total-earned-subtitle {
          font-size: 11px;
          color: #666;
        }

        /* ====== Generation Stats ====== */
        .generation-stats-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .generation-stat-item {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }
        .generation-stat-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .generation-stat-title i {
          color: #fd4b4e;
        }
        .generation-stats-details {
          display: flex;
          gap: 12px;
        }
        .generation-stat-detail {
          flex: 1;
          background: #2a2a2e;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .generation-stat-detail:hover {
          background: #3a3a3e;
        }
        .generation-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }
        .generation-stat-detail.approved .generation-stat-value {
          color: #4caf50;
        }
        .generation-stat-detail.pending .generation-stat-value {
          color: #fd4b4e;
        }
        .generation-stat-label {
          font-size: 11px;
          color: #aaaaaa;
          margin-top: 4px;
        }

        /* ====== Commission ====== */
        .commission-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .commission-item {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }
        .commission-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .commission-title i {
          color: #fd4b4e;
        }
        .commission-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .commission-detail {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #aaaaaa;
        }
        .commission-value {
          color: #ffffff;
          font-weight: 600;
        }

        /* ====== How It Works ====== */
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }
        .step-number-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fd4b4e;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-title-text {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .step-desc {
          font-size: 12px;
          color: #aaaaaa;
        }

        /* ====== Modal ====== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-dialog {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #2a2a2e;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 18px;
          cursor: pointer;
        }
        .modal-close:hover {
          color: #fd4b4e;
        }
        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }
        .modal-loading,
        .modal-empty {
          text-align: center;
          padding: 30px;
          color: #aaaaaa;
          font-size: 13px;
        }
        .modal-loading i,
        .modal-empty i {
          font-size: 24px;
          margin-bottom: 8px;
          display: block;
        }

        .members-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .member-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #2a2a2e;
          font-size: 13px;
        }
        .member-email {
          color: #ffffff;
          margin-bottom: 2px;
        }
        .member-date {
          font-size: 11px;
          color: #aaaaaa;
        }
        .member-status {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .member-status.approved {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }
        .member-status.pending {
          background: rgba(253, 75, 78, 0.15);
          color: #fd4b4e;
        }

        /* ====== Toast ====== */
        .toast-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #4caf50;
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          z-index: 1100;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          animation: fadeInUp 0.3s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .loading-text {
          text-align: center;
          color: #aaaaaa;
          font-size: 13px;
          padding: 16px;
        }
        .loading-text i {
          margin-right: 8px;
        }

        .empty-text {
          text-align: center;
          color: #aaaaaa;
          font-size: 13px;
          padding: 16px;
        }
      `})]})}export{X as default};
