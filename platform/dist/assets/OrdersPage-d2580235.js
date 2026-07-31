import{u as L,k as l,n as d,E as p,H as v,j as e}from"./index-9fb4ec24.js";import{u as y}from"./useDispatch-09756e97.js";function E(){const m=L(),[a,r]=l.useState("ALL"),[o,u]=l.useState(""),[c,t]=l.useState(!1),f=d(p.selectRows);d(p.selectLoading);const h=d(p.selectCount),g=y(),b=[{id:1,pair:"BTC/USDT",action:"BUY",date:"08/23",time:"02:20:08",status:"COMPLETED",orderPrice:"117065.0000",orderAmount:"0.000901",filled:"100%",total:"105.48",type:"LIMIT"},{id:2,pair:"ETH/USDT",action:"SELL",date:"08/24",time:"14:35:22",status:"PENDING",orderPrice:"2850.50",orderAmount:"1.25",filled:"35%",total:"3563.13",type:"LIMIT"},{id:3,pair:"SOL/USDT",action:"BUY",date:"08/24",time:"09:15:47",status:"PARTIALLY_FILLED",orderPrice:"102.75",orderAmount:"15.50",filled:"75%",total:"1194.56",type:"MARKET"},{id:4,pair:"XRP/USDT",action:"SELL",date:"08/22",time:"18:42:11",status:"CANCELLED",orderPrice:"0.5875",orderAmount:"500",filled:"0%",total:"293.75",type:"LIMIT"},{id:5,pair:"ADA/USDT",action:"BUY",date:"08/21",time:"11:23:34",status:"COMPLETED",orderPrice:"0.4650",orderAmount:"1000",filled:"100%",total:"465.00",type:"MARKET"},{id:6,pair:"BTC/USDT",action:"SELL",date:"08/20",time:"16:55:09",status:"COMPLETED",orderPrice:"48920.00",orderAmount:"0.005",filled:"100%",total:"244.60",type:"LIMIT"}];l.useEffect(()=>{g(v.doFetch())},[]),b.filter(s=>{const n=a==="ALL"||s.status===a||a==="OPEN"&&(s.status==="PENDING"||s.status==="PARTIALLY_FILLED"),N=s.pair.toLowerCase().includes(o.toLowerCase())||s.type.toLowerCase().includes(o.toLowerCase());return n&&N});const i=(s,n=2)=>Number(s).toLocaleString(void 0,{minimumFractionDigits:n,maximumFractionDigits:n}),x=s=>{switch(s){case"COMPLETED":return"#00C076";case"PENDING":return"#F3BA2F";case"PARTIALLY_FILLED":return"#FF6838";case"CANCELLED":return"#AAAAAA";default:return"#FFFFFF"}},j=s=>s==="BUY"?"#00C076":"#FF6838";return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"page-header",children:[e.jsx("button",{className:"back-btn",onClick:()=>m.goBack(),children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("span",{className:"page-title",children:"Orders"}),e.jsx("div",{style:{width:36}})]}),e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Search by pair or type...",value:o,onChange:s=>u(s.target.value)})]}),e.jsxs("div",{className:"filters-container",children:[e.jsxs("div",{className:"filters-header",onClick:()=>t(!c),children:[e.jsxs("span",{children:["Filter: ",a==="ALL"?"All Orders":a]}),e.jsx("i",{className:`fas fa-chevron-${c?"up":"down"}`})]}),c&&e.jsxs("div",{className:"filters-menu",children:[e.jsx("button",{className:a==="ALL"?"active":"",onClick:()=>{r("ALL"),t(!1)},children:"All Orders"}),e.jsx("button",{className:a==="OPEN"?"active":"",onClick:()=>{r("OPEN"),t(!1)},children:"Open"}),e.jsx("button",{className:a==="COMPLETED"?"active":"",onClick:()=>{r("COMPLETED"),t(!1)},children:"Completed"}),e.jsx("button",{className:a==="CANCELLED"?"active":"",onClick:()=>{r("CANCELLED"),t(!1)},children:"Cancelled"})]})]}),e.jsx("div",{className:"orders-list",children:h>0?f.map(s=>e.jsxs("div",{className:"order-card",children:[e.jsxs("div",{className:"order-card-header",children:[e.jsxs("div",{className:"pair-action",children:[e.jsx("span",{className:"pair",children:s.tradingPair}),e.jsx("span",{className:"action-badge",style:{color:j(s.direction)},children:s.direction})]}),e.jsxs("div",{className:"date-time",children:[e.jsx("span",{className:"date",children:s.commissionTime?new Date(s.commissionTime).toLocaleDateString():""}),e.jsx("span",{className:"time",children:s.commissionTime?new Date(s.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Type"}),e.jsx("span",{className:"value",children:s.orderType})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Status"}),e.jsx("span",{className:"value",style:{color:x(s.status)},children:s.status})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Price"}),e.jsxs("span",{className:"value",children:[i(s.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Amount"}),e.jsx("span",{className:"value",children:s.orderQuantity})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Total (Entrusted)"}),e.jsxs("span",{className:"value total",children:[i(s.entrustedValue)," USDT"]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Transaction Quantity"}),e.jsx("span",{className:"value",children:s.transactionQuantity??"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Transaction Value"}),e.jsx("span",{className:"value",children:s.transactionValue?i(s.transactionValue):"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Closing Price"}),e.jsx("span",{className:"value",children:s.closingPrice?i(s.closingPrice,4):"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Handling Fee"}),e.jsx("span",{className:"value",children:s.handlingFee?i(s.handlingFee,4):"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Closing Time"}),e.jsx("span",{className:"value",children:s.closingTime?new Date(s.closingTime).toLocaleString():"-"})]})]}),e.jsx("div",{className:"order-card-footer",children:e.jsx("span",{className:"status-badge",style:{color:x(s.status)},children:s.status})})]},s.id)):e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-clipboard-list"}),e.jsx("p",{children:"No orders found"}),e.jsx("span",{children:"Try adjusting your filters or search term"})]})}),e.jsx("style",{children:`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .container {
          max-width: 400px;
          margin: 0 auto;
          background: #0e0f14;
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #ffffff;
        }

        /* ── Page header ─────────────────────────────────────────────── */
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px 10px;
        }
        .back-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #15161c;
          color: #ccc;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .back-btn:hover { background: #1e1f26; color: #fff; }
        .page-title {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
        }

        /* ── Search ─────────────────────────────────────────────────── */
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 16px 16px 0;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 12px;
          padding: 11px 14px;
        }
        .search-box i {
          color: #555;
          font-size: 14px;
          flex-shrink: 0;
        }
        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e8e8e8;
          font-size: 14px;
        }
        .search-box input::placeholder { color: #555; }

        /* ── Filter dropdown ─────────────────────────────────────────── */
        .filters-container {
          margin: 10px 16px 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #1e1f26;
        }
        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #15161c;
          padding: 12px 14px;
          cursor: pointer;
          font-size: 13px;
          color: #aaa;
          user-select: none;
          transition: background 0.15s;
        }
        .filters-header:hover { background: #1a1b22; }
        .filters-header i { font-size: 12px; }

        .filters-menu {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px 14px;
          background: #0e0f14;
          border-top: 1px solid #1e1f26;
        }
        .filters-menu button {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid #2a2a2e;
          background: transparent;
          color: #888;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .filters-menu button:hover { border-color: #555; color: #ccc; }
        .filters-menu button.active {
          background: rgba(244, 17, 18,0.12);
          border-color: #F41112;
          color: #F41112;
          font-weight: 600;
        }

        /* ── Orders list ─────────────────────────────────────────────── */
        .orders-list {
          margin: 14px 16px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Order card ──────────────────────────────────────────────── */
        .order-card {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.15s;
        }
        .order-card:hover { border-color: #2a2a2e; }

        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 16px 11px;
          border-bottom: 1px solid #1e1f26;
        }
        .pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pair {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .action-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          letter-spacing: 0.4px;
        }
        .date-time {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }
        .date {
          font-size: 12px;
          color: #888;
        }
        .time {
          font-size: 11px;
          color: #555;
        }

        /* ── Detail rows ─────────────────────────────────────────────── */
        .order-details {
          padding: 10px 16px 4px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 13px;
        }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #666; }
        .value { color: #ccc; font-weight: 500; }
        .value.total { color: #fff; font-weight: 700; }

        /* ── Card footer ─────────────────────────────────────────────── */
        .order-card-footer {
          padding: 10px 16px 12px;
          border-top: 1px solid #1e1f26;
          display: flex;
          justify-content: flex-end;
        }
        .status-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
        }

        /* ── Empty state ─────────────────────────────────────────────── */
        .no-orders {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 60px 24px;
          color: #555;
          text-align: center;
        }
        .no-orders i {
          font-size: 40px;
          color: #2a2a2e;
        }
        .no-orders p {
          font-size: 16px;
          color: #888;
          font-weight: 600;
        }
        .no-orders span {
          font-size: 13px;
          color: #555;
        }
      `})]})}export{E as default};
