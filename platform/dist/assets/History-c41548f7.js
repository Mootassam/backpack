import{y as w,p as r,u as k,T as v,V as j,j as a,q as s}from"./index-e08889f7.js";import{u as T}from"./useDispatch-aefee968.js";function S(){const g=T(),h=w(),[n,y]=r.useState("all"),[l,C]=r.useState("all"),[p,D]=r.useState("all"),d=k(v.selectRows);r.useEffect(()=>{g(j.doFetch())},[g]);const x=(e,o,i)=>{const t={icon:"fa-exchange-alt",typeText:s("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:o==="in"?"#4caf50":"#fd4b4e"};switch(e){case"deposit":t.icon="fa-arrow-down",t.typeText=s("pages.history.transactionTypes.deposit"),t.iconClass="deposit",t.color="#4caf50",t.amountColor="#4caf50";break;case"withdraw":t.icon="fa-arrow-up",t.typeText=s("pages.history.transactionTypes.withdrawal"),t.iconClass="withdraw",t.color="#fd4b4e",t.amountColor="#fd4b4e";break;case"convert_in":t.icon="fa-exchange-alt",t.typeText=i?s("pages.history.transactionTypes.convertedFrom",i):s("pages.history.transactionTypes.conversionIn"),t.iconClass="convert-in",t.color="#9C27B0",t.amountColor="#4caf50";break;case"convert_out":t.icon="fa-exchange-alt",t.typeText=i?s("pages.history.transactionTypes.convertedTo",i):s("pages.history.transactionTypes.conversionOut"),t.iconClass="convert-out",t.color="#9C27B0",t.amountColor="#fd4b4e";break;case"stacking":t.icon="fa-coins",t.typeText=s("pages.history.transactionTypes.stakedAmount"),t.iconClass="stacking",t.color="#FF9800",t.amountColor="#FFB74D";break;case"staking_reward":t.icon="fa-gift",t.typeText=s("pages.history.transactionTypes.stakingRewards"),t.iconClass="staking_reward",t.color="#4caf50",t.amountColor="#4caf50";break;default:t.icon="fa-exchange-alt",t.typeText=s("pages.history.transactionTypes.transaction"),t.iconClass="default",t.color="#627EEA",t.amountColor="#627EEA"}return t},u=r.useMemo(()=>d?d.filter(e=>{if(n!=="all"&&!(n==="deposits"?e.type==="deposit"||e.direction==="in":n==="withdrawals"?e.type==="withdraw"||e.direction==="out":n==="profits"?e.type.includes("profit")||e.direction==="in"&&e.type!=="deposit":n==="losses"?e.type.includes("loss")||e.direction==="out"&&e.type!=="withdraw":n==="conversions"?e.type.includes("convert"):n==="stacking"?e.type==="stacking":!0)||l!=="all"&&e.status!==l)return!1;if(p!=="all"){const o=new Date,i=new Date(e.dateTransaction);switch(p){case"today":return i>=new Date(o.getFullYear(),o.getMonth(),o.getDate());case"week":const t=new Date(o);return t.setDate(o.getDate()-7),i>=t;case"month":return i>=new Date(o.getFullYear(),o.getMonth(),1);case"year":return i>=new Date(o.getFullYear(),0,1);default:return!0}}return!0}):[],[d,n,l,p]),m=e=>{const o=new Date(e),i=new Date,t=o.toDateString()===i.toDateString(),c=new Date(i);c.setDate(i.getDate()-1);const f=o.toDateString()===c.toDateString();return t?s("pages.history.dateFormats.today",o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):f?s("pages.history.dateFormats.yesterday",o.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):o.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},b=()=>h.goBack();return a.jsxs("div",{className:"history-page",children:[a.jsxs("div",{className:"top-header",children:[a.jsx("div",{className:"back-button",onClick:b,children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("h1",{className:"page-title",children:s("pages.history.title")}),a.jsx("div",{className:"header-placeholder"})]}),a.jsxs("div",{className:"content-card",children:[a.jsx("div",{className:"filter-options",children:[{key:"all",label:s("pages.history.filters.all")},{key:"deposits",label:s("pages.history.filters.deposits")},{key:"withdrawals",label:s("pages.history.filters.withdrawals")},{key:"profits",label:s("pages.history.filters.profits")},{key:"losses",label:s("pages.history.filters.losses")},{key:"conversions",label:s("pages.history.filters.conversions")},{key:"stacking",label:s("pages.history.filters.stacking")}].map(({key:e,label:o})=>a.jsx("button",{className:`filter-chip ${n===e?"active":""}`,onClick:()=>y(e),children:o},e))}),a.jsx("div",{className:"transaction-list",children:u.length>0?u.map(e=>{const{icon:o,typeText:i,iconClass:t,amountColor:c,color:f}=x(e.type,e.direction,e.relatedAsset);return a.jsxs("div",{className:"transaction-item",children:[a.jsxs("div",{className:"tx-left",children:[a.jsx("div",{className:"tx-icon",style:{backgroundColor:f},children:a.jsx("i",{className:`fas ${o}`})}),a.jsxs("div",{className:"tx-info",children:[a.jsx("div",{className:"tx-type",children:i}),a.jsx("div",{className:"tx-date",children:m(e.dateTransaction)})]})]}),a.jsxs("div",{className:"tx-right",children:[a.jsxs("div",{className:"tx-amount",style:{color:c},children:[e.direction==="in"?"+":"-",e.amount.toFixed(5)," ",e.asset]}),a.jsx("div",{className:`tx-status status-${e.status}`,children:s(`pages.history.status.${e.status}`)})]})]},e.id)}):a.jsxs("div",{className:"empty-state",children:[a.jsx("i",{className:"fas fa-receipt empty-icon"}),a.jsx("div",{className:"empty-title",children:s("pages.history.emptyState.title")}),a.jsx("div",{className:"empty-text",children:s("pages.history.emptyState.description")})]})})]}),a.jsx("style",{children:`
        /* ====== Page Layout ====== */
        .history-page {
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
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header-placeholder {
          width: 32px;
        }

        /* ====== Content Card ====== */
        .content-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        /* ====== Filters ====== */
        .filter-options {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid #2a2a2e;
          scrollbar-width: none;
        }
        .filter-options::-webkit-scrollbar {
          display: none;
        }
        .filter-chip {
          padding: 6px 12px;
          border-radius: 16px;
          border: 1px solid #2a2a2e;
          background: #1e1e24;
          color: #aaaaaa;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-chip.active {
          background: #fd4b4e;
          color: #fff;
          border-color: #fd4b4e;
        }

        /* ====== Transactions ====== */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #1e1e24;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .transaction-item:hover {
          background: #2a2a2e;
        }

        .tx-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tx-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #fff;
        }
        .tx-info {
          display: flex;
          flex-direction: column;
        }
        .tx-type {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .tx-date {
          font-size: 11px;
          color: #aaaaaa;
        }

        .tx-right {
          text-align: right;
        }
        .tx-amount {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .tx-status {
          font-size: 10px;
          color: #4caf50;
        }
        .tx-status.status-pending {
          color: #fd4b4e;
        }
        .tx-status.status-canceled {
          color: #fd4b4e;
        }

        /* ====== Empty state ====== */
        .empty-state {
          text-align: center;
          padding: 32px 16px;
          color: #aaaaaa;
        }
        .empty-icon {
          font-size: 40px;
          color: #2a2a2e;
          margin-bottom: 12px;
        }
        .empty-title {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .empty-text {
          font-size: 13px;
          color: #aaaaaa;
        }
      `})]})}export{S as default};
