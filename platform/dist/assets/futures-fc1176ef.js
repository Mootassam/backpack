import{p as o,I as q,J as ye,j as e,K as je,M as ve,q as a,u as U,E as pe,N as H,F as fe}from"./index-07486408.js";import{C as we}from"./CoinListModal-6fc85c4d.js";import{F as ke}from"./FuturesChart-a30d5bf4.js";import{u as Ne}from"./useDispatch-69f3e435.js";const De=({isOpen:s,onClose:f,direction:d,dispatch:x,listAssets:C,selectedCoin:k,marketPrice:F,availableBalance:i,setOpeningOrders:z})=>{const[N,G]=o.useState("30"),[Y,X]=o.useState("10"),[v,m]=o.useState("2"),[u,$]=o.useState(30),[h,y]=o.useState("configuring"),[L,O]=o.useState(0),[D,S]=o.useState(null),[R,W]=o.useState(""),[I,M]=o.useState(null),[Q,P]=o.useState(""),[J,K]=o.useState(!1),[g,Z]=o.useState(null),B=[{duration:"30",payout:"10"},{duration:"60",payout:"20"},{duration:"90",payout:"30"},{duration:"120",payout:"40"}],le=["1","2","5","10","20","50"],te=(r,l)=>{G(r),X(l)};o.useEffect(()=>(s?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[s]),o.useEffect(()=>{x(q.doFetch())},[x]),o.useEffect(()=>{u<30?W("Minimum amount is 30 USDT"):u>i?W("Insufficient balance"):W("")},[u,i]),o.useEffect(()=>{let r=null;return h==="in-progress"&&(L>0?r=setInterval(()=>{O(l=>l-1)},1e3):(async()=>await re())()),()=>{r&&clearInterval(r)}},[h,L]);const oe=async()=>{if(!(!d||u<30||u>i)){K(!0);try{const r=await ce();if(!r||!r.id){K(!1);return}Z({futuresAmount:u,contractDuration:N,futuresStatus:d==="up"?"long":"short",openPositionPrice:parseFloat(F||"0")||0,closePositionPrice:null,leverage:parseInt(v,10),openPositionTime:new Date,closePositionTime:null}),z(c=>[...c,{id:I,futuresAmount:u,contractDuration:N,futuresStatus:d==="up"?"long":"short",openPositionPrice:parseFloat(F||"0")||0,closePositionPrice:null,leverage:parseInt(v,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const l=parseInt(N,10)||0;O(l),y("in-progress")}catch(r){console.error("startTrade error",r)}finally{K(!1)}}},re=async()=>{if(z([]),!I){S("loss"),P(`-${u.toFixed(2)} USDT`),y("completed");return}try{const r=await x(ye.doFind(I)),l=r&&r.payload?r.payload:r;if(!l){S("loss"),P(`-${u.toFixed(2)} USDT`),y("completed");return}if(Z({...g,closePositionPrice:l.closePositionPrice,closePositionTime:l.closePositionTime,profitAndLossAmount:l.profitAndLossAmount}),l.control==="profit"){S("win");const c=Number(l.profitAndLossAmount??j(u,v,Y));P(`+${Number.isFinite(c)?c.toFixed(2):"0.00"} USDT`)}else{S("loss");const c=Number(l.futuresAmount??u);P(`-${Number.isFinite(c)?c.toFixed(2):u.toFixed(2)} USDT`)}y("completed"),x(q.doFetchPending())}catch(r){console.error("completeTrade error",r),S("loss"),P(`-${u.toFixed(2)} USDT`),y("completed")}},ce=async()=>{const r=parseFloat(F||"0")||0,l={futuresStatus:d==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(v,10),control:"loss",operate:"low",futureCoin:k.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:r,contractDuration:N,futuresAmount:u};try{const c=await x(ve.doCreate(l)),w=c&&c.id?c:c&&c.payload?c.payload:null;return w&&w.id?(M(w.id),w):(console.warn("Create did not return created record"),null)}catch(c){return console.error("create error",c),null}},se=()=>{y("configuring"),z([]),S(null),O(0),M(null),P(""),Z(null),$(30),X("10"),G("30")},j=(r,l,c)=>{const w=Number.isFinite(r)?r:0,ne=parseInt(l,10)||0,ie=parseInt(c,10)||0;return w*ne*ie/100},V=()=>{if(h!=="in-progress")return 0;const r=parseInt(N,10)||1;return(r-L)/r*100},E=r=>{const l=Math.floor(r/60),c=r%60;return`${l.toString().padStart(2,"0")}:${c.toString().padStart(2,"0")}`},ee=r=>r?new Date(r).toLocaleTimeString():"-",A=r=>{const l=parseInt(r.target.value,10)||0;$(l)};if(!s)return null;const ae=e.jsxs("div",{className:"modal-overlay",onClick:f,children:[e.jsxs("div",{className:`modal-container ${d==="up"?"up-theme":"down-theme"}`,onClick:r=>r.stopPropagation(),children:[e.jsx("div",{className:"fm-handle"}),e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${k.split("USDT")[0]}.png`,style:{width:34,height:34},alt:k,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:k.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:f,children:"×"})]}),h!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${d==="up"?"#26a17b":"#fd4b4e"} ${V()}%, #1e1f26 ${V()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:E(L)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),h==="completed"&&D&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`trade-result-badge ${D}`,children:[e.jsx("i",{className:`fas ${D==="win"?"fa-check-circle":"fa-times-circle"}`}),D==="win"?"Trade Won!":"Trade Lost"]}),e.jsx("div",{className:`pnl-display ${D}`,children:Q})]}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Amount"}),e.jsxs("span",{children:[g.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Duration"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Direction"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus==="long"?"▲ LONG":"▼ SHORT"})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage"}),e.jsxs("span",{children:[g.leverage,"×"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Price"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Price"}),e.jsxs("span",{children:[g.closePositionPrice?Number(g.closePositionPrice).toFixed(4):"—"," ",g.closePositionPrice?"USDT":""]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time"}),e.jsx("span",{children:ee(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time"}),e.jsx("span",{children:ee(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[h==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:f,children:"Keep Buying"}),h==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:f,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:se,children:"New Trade"})]})]})]}),h==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${d}-indicator`,children:d==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:B.map(r=>e.jsxs("button",{className:`option-btn ${N===r.duration?"selected":""}`,onClick:()=>te(r.duration,r.payout),children:[r.duration,"s (",r.payout,"%)"]},r.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:le.map(r=>e.jsxs("button",{className:`option-btn ${v===r?"selected":""}`,onClick:()=>m(r),children:[r,"×"]},r))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>$(r=>Math.max(1,r-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:u,onChange:A,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>$(r=>r+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",i," USDT"]}),R&&e.jsx("div",{className:"error-message",children:R})]}),e.jsxs("div",{className:"profit-info",children:["Projected profit: ",e.jsxs("span",{children:[j(u,v,Y).toFixed(2)," USDT"]})]}),e.jsx("button",{className:"confirm-btn",onClick:oe,disabled:!d||u<30||u>i||J,children:J?"Creating…":u>i?"Insufficient Balance":d==="up"?"▲ Confirm Long":"▼ Confirm Short"})]})]})]}),e.jsx("style",{children:`
        /* ── Overlay ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 100000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* ── Sheet container ── */
        .modal-container {
          background: #15161c;
          width: 100%;
          max-width: 400px;
          border-radius: 24px 24px 0 0;
          border: 1px solid #1e1f26;
          border-bottom: none;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          overflow: hidden;
          max-height: 92vh;
          overflow-y: auto;
          animation: fmSlideUp 0.36s cubic-bezier(0.32,0.72,0,1) both;
          scrollbar-width: none;
        }
        .modal-container::-webkit-scrollbar { display: none; }

        @keyframes fmSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* direction accent line */
        .up-theme   { border-top: 3px solid #26a17b; }
        .down-theme { border-top: 3px solid #fd4b4e; }

        /* ── Drag handle ── */
        .fm-handle {
          width: 40px; height: 4px;
          background: #2a2a2e;
          border-radius: 2px;
          margin: 14px auto 0;
        }

        /* ── Header ── */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px 12px;
          border-bottom: 1px solid #1e1f26;
        }
        .pair-info { display: flex; align-items: center; gap: 10px; }
        .pair-icon {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pair-name { font-size: 16px; font-weight: 700; color: #fff; }
        .close-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #1e1f26;
          border: none;
          color: #888;
          font-size: 18px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
          line-height: 1;
        }
        .close-btn:hover { background: #2a2a2e; color: #fff; }

        /* ── Direction banner ── */
        .direction-indicator {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 20px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.3px;
        }
        .up-indicator   { background: rgba(38,161,123,0.10); color: #26a17b; }
        .down-indicator { background: rgba(253,75,78,0.10);  color: #fd4b4e; }
        .direction-indicator::before {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          font-size: 11px;
        }
        .up-indicator::before   { content: "\\f062"; } /* fa-arrow-up   */
        .down-indicator::before { content: "\\f063"; } /* fa-arrow-down */

        /* ── Configuring form ── */
        .modal-content { padding: 18px 20px 24px; display: flex; flex-direction: column; gap: 20px; }

        .section { display: flex; flex-direction: column; gap: 10px; }
        .section-title {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 11px; font-weight: 600; color: #888;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        /* ── Pill option buttons ── */
        .options-container { display: flex; gap: 8px; flex-wrap: wrap; }
        .option-btn {
          flex: 1; min-width: 64px;
          padding: 9px 6px;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 10px;
          color: #888;
          font-size: 12px; font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: border-color 0.18s, color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .option-btn:hover { border-color: #2a2a35; color: #ccc; }

        /* UP theme selected */
        .up-theme .option-btn.selected {
          background: rgba(38,161,123,0.12);
          border-color: #26a17b;
          color: #26a17b;
        }
        /* DOWN theme selected */
        .down-theme .option-btn.selected {
          background: rgba(253,75,78,0.12);
          border-color: #fd4b4e;
          color: #fd4b4e;
        }

        /* ── Amount control ── */
        .amount-control {
          display: flex; align-items: center;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 12px;
          overflow: hidden;
        }
        .amount-btn {
          width: 46px; height: 48px;
          background: none; border: none;
          color: #888; font-size: 22px;
          cursor: pointer; flex-shrink: 0;
          transition: color 0.15s, background 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .amount-btn:hover { background: #1e1f26; color: #fff; }
        .amount-inputs {
          flex: 1; background: none; border: none;
          color: #fff; font-size: 18px; font-weight: 700;
          text-align: center; outline: none; padding: 0;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }

        .balance-info { font-size: 12px; color: #555; text-align: right; }
        .error-message { font-size: 11px; color: #fd4b4e !important; margin-top: 4px; }

        /* ── Projected profit box ── */
        .profit-info {
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px; color: #888;
          text-align: center;
        }
        .up-theme   .profit-info span { color: #26a17b; font-weight: 700; }
        .down-theme .profit-info span { color: #fd4b4e; font-weight: 700; }

        /* ── Confirm button ── */
        .confirm-btn {
          width: 100%; padding: 15px;
          border: none; border-radius: 14px;
          font-size: 15px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.2px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .up-theme   .confirm-btn { background: #26a17b; color: #fff; }
        .down-theme .confirm-btn { background: #fd4b4e; color: #fff; }
        .confirm-btn:hover:not(:disabled) { opacity: 0.88; }
        .confirm-btn:active:not(:disabled) { transform: scale(0.98); }
        .confirm-btn:disabled { background: #1e1f26; color: #444; cursor: not-allowed; }

        /* ── In-progress / completed view ── */
        .trade-progress-section { padding: 20px 20px 28px; text-align: center; }

        .progress-container { display: flex; justify-content: center; margin-bottom: 20px; }
        .circular-progress {
          width: 140px; height: 140px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 1s linear;
        }
        .progress-inner {
          width: 116px; height: 116px;
          border-radius: 50%;
          background: #15161c;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border: 2px solid #1e1f26;
        }
        .progress-time { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -1px; }
        .progress-label { font-size: 11px; color: #555; margin-top: 2px; }

        /* ── Trade result badge ── */
        .trade-result-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 15px; font-weight: 700;
          margin-bottom: 16px;
        }
        .trade-result-badge.win  { background: rgba(38,161,123,0.14); color: #26a17b; }
        .trade-result-badge.loss { background: rgba(253,75,78,0.14);  color: #fd4b4e; }

        .pnl-display {
          font-size: 28px; font-weight: 800; letter-spacing: -0.5px;
          margin-bottom: 18px;
        }
        .pnl-display.win  { color: #26a17b; }
        .pnl-display.loss { color: #fd4b4e; }

        /* ── Trade details card ── */
        .trade-details {
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          margin: 0 0 18px;
          text-align: left;
          display: flex; flex-direction: column; gap: 10px;
        }
        .trade-details-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px;
        }
        .trade-details-row span:first-child { color: #555; }
        .trade-details-row span:last-child  { color: #e8e8e8; font-weight: 600; }

        .up-text   { color: #26a17b !important; }
        .down-text { color: #fd4b4e !important; }

        /* ── Action buttons ── */
        .trade-actions { display: flex; gap: 10px; }
        .trade-action-btn {
          flex: 1; padding: 14px;
          border: none; border-radius: 14px;
          font-size: 14px; font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .trade-action-btn:active { transform: scale(0.97); }
        .trade-action-btn.primary   { background: #fd4b4e; color: #fff; }
        .trade-action-btn.secondary { background: #1e1f26; color: #aaa; border: 1px solid #2a2a2e; }
        .trade-action-btn.secondary:hover { background: #2a2a2e; color: #fff; }

        .up-theme   .trade-action-btn.keep-buying { background: #26a17b; color: #fff; }
        .down-theme .trade-action-btn.keep-buying { background: #fd4b4e; color: #fff; }
        .trade-action-btn.keep-buying { width: 100%; }
        .trade-action-btn:hover:not(.secondary) { opacity: 0.88; }
      `})]});return je.createPortal(ae,document.body)};function Se(s){const{countFutures:f,futuretLoading:d,listFutures:x,handleOpenOrderModal:C,formatNumber:k,formatDateTime:F}=s;return e.jsxs("div",{className:"orders-container",children:[f>0&&!d&&(x==null?void 0:x.map(i=>{var z;return e.jsxs("div",{className:"order-card",onClick:()=>C(i),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:i.futureCoin||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${i.futuresStatus==="long"?"buy":"sell"}`,children:i.futuresStatus==="long"?a("pages.futures.actions.buyUp"):a("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${i.finalized?"closed":"open"}`,children:["● ",i.finalized?a("pages.futures.orderDetails.closed"):a("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",i.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:k((z=i==null?void 0:i.openPositionPrice)==null?void 0:z.toString(),(i==null?void 0:i.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:F(i.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:a("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[i.leverage,"x"]})]})]})]},i.id)})),x.length===0&&!d&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:a("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
                .order-status {
                    font-size: 12px;
                    margin-bottom: 12px;
                }
                
                .order-status.open {
                    color: #00C076;
                }
                
                .order-status.closed {
                    color: #777;
                }
            `})]})}function $e(){const s=Ne(),f=U(pe.selectRows);U(pe.selectLoading);const d=U(H.selectRows),x=U(H.pendingRows),C=U(H.pendingcount),k=U(H.pendingLoading),F=U(H.selectLoading),i=U(H.selectCount),[z,N]=o.useState(!1),[G,Y]=o.useState(null),[X,v]=o.useState(!1),[m,u]=o.useState("BTCUSDT"),[$,h]=o.useState("0"),[y,L]=o.useState("0"),[O,D]=o.useState("0"),[S,R]=o.useState("0"),[W,I]=o.useState("0"),[M,Q]=o.useState("openOrders"),[P,J]=o.useState(null),[K,g]=o.useState(!1),[Z,B]=o.useState(!0),[le,te]=o.useState(!0),[oe,re]=o.useState(0),[ce,se]=o.useState([]),j=o.useRef(null),V=o.useRef(m),E=o.useRef(),ee=o.useCallback((t,n=2)=>{if(t==null)return"0.00";const p=typeof t=="string"?parseFloat(t):t;return isNaN(p)?"0.00":p.toFixed(n)},[]),A=o.useCallback((t,n=2)=>{if(t==null)return"0.00";const p=typeof t=="string"?parseFloat(t):t;return isNaN(p)?"0.00":p.toLocaleString(void 0,{minimumFractionDigits:n,maximumFractionDigits:n})},[]),ae=o.useCallback(t=>{if(t==null)return"0";const n=typeof t=="string"?parseFloat(t):t;return isNaN(n)?"0":n>=1e9?(n/1e9).toFixed(2)+a("pages.marketDetail.volume.billion"):n>=1e6?(n/1e6).toFixed(2)+a("pages.marketDetail.volume.million"):A(n,0)},[A]),r=o.useCallback(t=>{if(!t)return a("pages.assetsDetail.status.pending");try{const n=new Date(t);if(isNaN(n.getTime()))return t;const p=new Date;return n.toDateString()===p.toDateString()?a("pages.history.dateFormats.today",n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):a("pages.history.dateFormats.yesterday",n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(n){return console.error("Error formatting date:",n,t),t}},[]),l=o.useCallback(t=>{if(!t)return a("pages.assetsDetail.status.pending");try{const n=new Date(t);return isNaN(n.getTime())?t:`${n.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(n){return console.error("Error formatting date:",n,t),t}},[]),c=o.useCallback(()=>{if((f==null?void 0:f.length)>0){const t=f.find(n=>n.symbol==="USDT");re((t==null?void 0:t.amount)||0)}},[f]),w=o.useMemo(()=>M==="openOrders"?{count:C,loading:k,list:Array.isArray(x)?x:[]}:{count:i,loading:F,list:Array.isArray(d)?d:[]},[M,C,k,x,i,F,d]);o.useEffect(()=>{let t=!0;return(async()=>{if(m)try{B(!0);const p=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${m}`);if(!p.ok)throw new Error("Failed to fetch ticker data");const b=await p.json();t&&(h(b.lastPrice||"0"),L(b.priceChangePercent||"0"),D(b.highPrice||"0"),R(b.lowPrice||"0"),I(b.volume||"0"),B(!1))}catch(p){console.error("Error fetching initial data:",p),t&&B(!1)}})(),()=>{t=!1}},[m]),o.useEffect(()=>{if(!m)return;let t=!0;V.current=m;const n=()=>{j.current&&j.current.close(),E.current&&clearTimeout(E.current);try{j.current=new WebSocket(`wss://stream.binance.com:9443/ws/${m.toLowerCase()}@ticker`),j.current.onopen=()=>{},j.current.onmessage=p=>{if(t)try{const b=JSON.parse(p.data);b.s===V.current&&t&&(h(b.c||"0"),L(b.P||"0"),D(b.h||"0"),R(b.l||"0"),I(b.v||"0"))}catch(b){console.error("Error parsing WebSocket message:",b)}},j.current.onerror=p=>console.error("Ticker WebSocket error:",p),j.current.onclose=p=>{m===V.current&&t&&(E.current=setTimeout(n,2e3))}}catch(p){console.error("WebSocket connection error:",p)}};return n(),()=>{t=!1,j.current&&j.current.close(),E.current&&clearTimeout(E.current)}},[m]),o.useEffect(()=>{const t=setTimeout(()=>te(!1),1500);return()=>clearTimeout(t)},[]),o.useEffect(()=>{let t=!0;return(async()=>{try{await Promise.all([s(q.doFetchPending()),s(fe.doFetch())])}catch(p){t&&console.error("Error fetching data:",p)}})(),()=>{t=!1}},[s]),o.useEffect(()=>{c()},[c]);const ne=o.useCallback(()=>v(!0),[]),ie=o.useCallback(()=>v(!1),[]),me=o.useCallback(t=>{B(!0),h("0"),L("0"),D("0"),R("0"),I("0"),u(t),v(!1)},[]),de=o.useCallback(t=>{s(fe.doFetch()),Y(t),N(!0)},[s]),xe=o.useCallback(()=>{N(!1),Y(null)},[]),ge=o.useCallback(t=>{J(t),g(!0)},[]),be=o.useCallback(()=>{g(!1),J(null)},[]),ue=o.useCallback(t=>{t==="openOrders"?(Q("openOrders"),s(q.doFetchPending())):(Q("recentOrders"),s(q.doFetch()))},[s]),_=o.useCallback(({width:t="100%",height:n="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:n}}),[]),he=o.useMemo(()=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${m.split("USDT")[0]}.png`,[m]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:he,style:{width:30,height:30},alt:m,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:m}),e.jsx("div",{className:"market-change",style:{color:y!=null&&y.startsWith("-")?"#fd4b4e":"#4caf50"},children:y!=="0"?`${y}%`:e.jsx(_,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:ne,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:$!=="0"?`$${A($)}`:e.jsx(_,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[a("pages.marketDetail.stats.high"),":"," ",O!=="0"?`$${A(O)}`:e.jsx(_,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[a("pages.marketDetail.stats.volume"),":"," ",W!=="0"?`${ae(W)} ${m.replace("USDT","")}`:e.jsx(_,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[a("pages.marketDetail.stats.low"),":"," ",S!=="0"?`$${A(S)}`:e.jsx(_,{width:"80px",height:"12px"})]})]})]}),e.jsx(ke,{symbol:m}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>de("up"),children:a("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>de("down"),children:a("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${M==="openOrders"?"active":""}`,onClick:()=>ue("openOrders"),children:[a("pages.futures.tabs.openOrders")," (",C||0,")"]}),e.jsxs("div",{className:`tab ${M==="recentOrders"?"active":""}`,onClick:()=>ue("recentOrders"),children:[a("pages.futures.tabs.recentOrders")," (",i||0,")"]})]}),e.jsx(Se,{countFutures:w.count,futuretLoading:w.loading,listFutures:w.list,handleOpenOrderModal:ge,formatNumber:A,formatDateTime:r}),K&&P&&e.jsx(Pe,{selectedOrder:P,onClose:be,formatDateTimeDetailed:l,safeToFixed:ee}),e.jsx(De,{isOpen:z,onClose:xe,direction:G,dispatch:s,listAssets:f,selectedCoin:m,marketPrice:$,availableBalance:oe,setOpeningOrders:se}),e.jsx(we,{isOpen:X,onClose:ie,onSelectCoin:me}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #0e0f14;
          color: #ffffff;
          min-height: 100vh;
        }

        /* Header Section */
        .header {
          background-color: #0e0f14;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .market-info {
          display: flex;
          align-items: center;
        }
        
        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f3ba2f;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .market-icon i {
          color: #000;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
          color: #ffffff;
        }
        
        .market-change {
          font-size: 14px;
          font-weight: bold;
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #ffffff;
        }
        
        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #aaaaaa;
          flex-wrap: wrap;
        }
        
        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }
        
        .additional-actions {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }
        
        /* Chart Container */
        .chart-container {
          height: 480px;
          background-color: #15161c;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .chart-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10;
          color: #aaaaaa;
        }
        
        .chart-controls {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 5px;
          z-index: 5;
        }
        
        .chart-timeframe {
          background-color: #2a2a2e;
          color: #aaaaaa;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
        }
        
        /* Action Buttons */
        .future-action-buttons {
          display: flex;
          gap: 15px;
          margin: 15px;
        }
        
        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 10px;
          color: #ffffff;
          transition: background-color 0.2s;
        }
        
        .buy-button {
          background-color: #4caf50;
        }
        
        .buy-button:hover {
          background-color: #3e8e41;
        }
        
        .sell-button {
          background-color: #fd4b4e;
        }
        
        .sell-button:hover {
          background-color: #e04345;
        }
        
        /* Section Tabs */
        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2a2a2e;
        }
        
        .tab {
          padding: 10px 15px;
          cursor: pointer;
          color: #aaaaaa;
          font-size: 14px;
          position: relative;
          flex: 1;
          text-align: center;
          transition: color 0.2s;
        }
        
        .tab.active {
          color: #ffffff;
          font-weight: bold;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #4caf50;
        }
        
        /* Orders Container */
        .orders-container {
          margin: 15px;
        }
        
        .order-card {
          background-color: #15161c;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .order-card.loading {
          cursor: default;
        }
        
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .order-pair {
          font-weight: bold;
          font-size: 16px;
          color: #ffffff;
        }
        
        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .order-direction.buy {
          background-color: rgba(76, 175, 80, 0.2);
          color: #4caf50;
        }
        
        .order-direction.sell {
          background-color: rgba(253, 75, 78, 0.2);
          color: #fd4b4e;
        }
        
        .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #4caf50;
        }
        
        .order-status.closed {
          color: #aaaaaa;
        }
        
        .order-details {
          border-top: 1px solid #2a2a2e;
          padding-top: 12px;
        }
        
        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .order-label {
          color: #aaaaaa;
        }
        
        .order-value {
          font-weight: 500;
          color: #ffffff;
        }
        
        .order-value.buy {
          color: #4caf50;
        }
        
        .order-value.sell {
          color: #fd4b4e;
        }
        
        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #aaaaaa;
        }
        
        .no-orders i {
          font-size: 24px;
          margin-bottom: 10px;
          opacity: 0.5;
        }
        
        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2a2a2e;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        /* Modal Overlay */
        .modal-overlays {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background-color: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2e;
        }
        
        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
        }
        
        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2a2a2e;
          gap: 10px;
        }
        
        .modal-button {
          background-color: #2a2a2e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .modal-button:hover {
          background-color: #3a3a3e;
        }
        
        .close-order-button {
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .close-order-button:hover {
          background-color: #e04345;
        }
        
        /* Order Detail Sections */
        .order-detail-section {
          margin-bottom: 20px;
        }
        
        .order-detail-section h3 {
          font-size: 14px;
          color: #aaaaaa;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .detail-pair {
          font-weight: bold;
          font-size: 18px;
          color: #ffffff;
        }
        
        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .detail-direction.buy {
          background-color: rgba(76, 175, 80, 0.2);
          color: #4caf50;
        }
        
        .detail-direction.sell {
          background-color: rgba(253, 75, 78, 0.2);
          color: #fd4b4e;
        }
        
        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .detail-status.open {
          color: #4caf50;
        }
        
        .detail-status.closed {
          color: #aaaaaa;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .detail-label {
          color: #aaaaaa;
        }
        
        .detail-value {
          font-weight: 500;
          color: #ffffff;
        }
        
        .detail-value.profit {
          color: #4caf50;
        }
        
        .detail-value.loss {
          color: #fd4b4e;
        }

        /* Allow modal scrolling for small screens */
        .modal-content {
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: none;
        }
      `})]})}const Pe=({selectedOrder:s,onClose:f,formatDateTimeDetailed:d,safeToFixed:x})=>e.jsx("div",{className:"modal-overlays",onClick:f,children:e.jsxs("div",{className:"modal-content",onClick:C=>C.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:a("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:f,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:s.symbol||s.pair}),e.jsx("span",{className:`detail-direction ${s.futuresStatus==="long"||s.direction==="BUY UP"?"buy":"sell"}`,children:s.futuresStatus==="long"?a("pages.futures.actions.buyUp"):s.futuresStatus==="short"?a("pages.futures.actions.buyDown"):s.direction})]}),e.jsxs("div",{className:`detail-status ${s.finalized?"closed":"open"}`,children:["●"," ",s.finalized?a("pages.futures.orderDetails.closed"):a("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(T,{label:a("pages.futures.orderDetails.futuresAmount"),value:`${s.futuresAmount||s.investment} USDT`}),s.contractDuration&&e.jsx(T,{label:a("pages.futures.orderDetails.contractDuration"),value:`${s.contractDuration} ${a("pages.futures.orderDetails.seconds")}`}),e.jsx(T,{label:a("pages.futures.orderDetails.futuresStatus"),value:s.closePositionTime?a("pages.futures.orderDetails.completed"):a("pages.futures.orderDetails.open")}),e.jsx(T,{label:a("pages.futures.orderDetails.openPositionPrice"),value:s.openPositionPrice||s.openPrice}),e.jsx(T,{label:a("pages.futures.orderDetails.openPositionTime"),value:d(s.openPositionTime||s.openTime)}),s.closePositionPrice&&e.jsx(T,{label:a("pages.futures.orderDetails.closePositionPrice"),value:s.closePositionPrice}),s.closePositionTime&&e.jsx(T,{label:a("pages.futures.orderDetails.closePositionTime"),value:d(s.closePositionTime)}),e.jsx(T,{label:a("pages.futures.orderDetails.profitLossAmount"),value:s.profitAndLossAmount||s.pnl?`${x(s.profitAndLossAmount||s.pnl,2)} USDT`:"__",className:s.control==="profit"?"profit":"loss"}),e.jsx(T,{label:a("pages.futures.orderDetails.leverage"),value:`${s.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:f,children:a("pages.futures.orderDetails.done")})})]})}),T=({label:s,value:f,className:d=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:s}),e.jsx("span",{className:`detail-value ${d}`,children:f})]});export{$e as default};
