import{u as V,E as me,F as xe,p as t,G as be,H as ge,q as o,I as H,j as e,L as fe}from"./index-54206aa9.js";import{C as he}from"./CoinListModal-b1aa10c5.js";import{u as ye}from"./useDispatch-aee37e04.js";const i=c=>{if(c==null||c==="")return NaN;const y=Number(c);return Number.isFinite(y)?y:NaN},ke=()=>{const c=Date.now().toString(36),y=Math.floor(Math.random()*1e6).toString(36);return`ORD-${c}-${y}`.toUpperCase()};function we(){const c=ye(),y=V(me.selectRows)||[],R=V(xe.selectRows)||[],[m,J]=t.useState("BTCUSDT"),[x,G]=t.useState("0"),[I,X]=t.useState("0"),[C,Y]=t.useState({asks:[],bids:[]}),[n,Z]=t.useState("LIMIT"),[p,T]=t.useState("0"),[v,w]=t.useState(""),[ee,N]=t.useState(""),[l,$]=t.useState("buy"),[E,S]=t.useState(""),[D,B]=t.useState(!1),[re,P]=t.useState(!1),[u,A]=t.useState(!0),b=t.useRef(null),g=t.useRef(null),K=t.useRef(0),Q=t.useRef(0);t.useEffect(()=>{c(be.doFetch()),c(ge.doFetcPending())},[c]);const L=t.useMemo(()=>Array.isArray(R)?R.reduce((r,s)=>(r[s.symbol]=Number(s.amount)||0,r),{}):{},[R]),k=t.useMemo(()=>m.replace("USDT",""),[m]),f=t.useMemo(()=>l==="buy"?L.USDT??0:L[k]??0,[l,k,L]),F=t.useCallback((r,s)=>{const a=i(r),h=i(s??p);Number.isFinite(a)&&Number.isFinite(h)?N((a*h).toFixed(2)):N("")},[p]),O=t.useCallback(r=>{const s=i(r),a=i(p);Number.isFinite(s)&&Number.isFinite(a)&&a>0?w((s/a).toFixed(8)):w("")},[p]);t.useEffect(()=>{x&&x!=="0"&&(T(x),v&&F(v,x))},[x]),t.useEffect(()=>{let r=!0;if(b.current){b.current.onclose=null;try{b.current.close()}catch{}b.current=null}const s=m.toLowerCase(),a=new WebSocket(`wss://stream.binance.com:9443/ws/${s}@ticker`);return b.current=a,a.onmessage=h=>{if(!r)return;const z=performance.now();if(!(z-K.current<180)){K.current=z;try{const j=JSON.parse(h.data);j.c!==void 0&&G(j.c),j.P!==void 0&&X(j.P),A(!1)}catch{}}},a.onerror=()=>{r&&A(!1)},()=>{if(r=!1,b.current){b.current.onclose=null;try{b.current.close()}catch{}b.current=null}}},[m]),t.useEffect(()=>{let r=!0;if(g.current){g.current.onclose=null;try{g.current.close()}catch{}g.current=null}const s=m.toLowerCase(),a=new WebSocket(`wss://stream.binance.com:9443/ws/${s}@depth20@100ms`);return g.current=a,a.onmessage=h=>{if(!r)return;const z=performance.now();if(!(z-Q.current<180)){Q.current=z;try{const j=JSON.parse(h.data),pe=(j.asks||[]).slice(0,5).map(M=>({price:M[0],amount:M[1]})),ue=(j.bids||[]).slice(0,5).map(M=>({price:M[0],amount:M[1]}));Y({asks:pe,bids:ue})}catch{}}},()=>{if(r=!1,g.current){g.current.onclose=null;try{g.current.close()}catch{}g.current=null}}},[m]);const q=t.useMemo(()=>{const r=[...C.asks.map(s=>i(s.amount)),...C.bids.map(s=>i(s.amount))].filter(Number.isFinite);return Math.max(...r,1)},[C]),d=t.useCallback((r,s=2)=>{const a=Number(r);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s}):0 .toFixed(s)},[]),se=t.useCallback(r=>{const s=r.target.value;w(s),F(s)},[F]),te=t.useCallback(r=>{const s=r.target.value;N(s),O(s)},[O]),ae=t.useCallback(r=>{const s=r.target.value;T(s);const a=i(v);Number.isFinite(a)&&N((a*Number(s)).toFixed(2))},[v]),oe=t.useCallback(r=>{if(l==="buy"){const s=f*r;N(s.toFixed(2)),O(s.toString())}else{const s=f*r;w(s.toFixed(8)),F(s.toString())}},[l,f,O,F]),ne=t.useCallback(()=>{const r=i(p);T((Number.isFinite(r)?r+1:i(x)||0).toString())},[p,x]),ie=t.useCallback(()=>{const r=i(p);Number.isFinite(r)&&T(Math.max(1e-4,r-1).toString())},[p]),W=t.useCallback(r=>{n==="LIMIT"&&T(r)},[n]),ce=t.useCallback(r=>{r&&(J(r),P(!1),A(!0),w(""),N(""))},[]),le=t.useCallback(async()=>{if(S(""),D)return;const r=i(v),s=i(n==="MARKET"?x:p);if(!Number.isFinite(r)||r<=0){S(o("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(s)||s<=0){S(o("pages.trade.errors.invalidPrice"));return}if(l==="buy"&&s*r>f){S(o("pages.trade.errors.insufficientUSDT",d(f,2)));return}if(l==="sell"&&r>f){S(o("pages.trade.errors.insufficientCoin",d(f,6),k));return}B(!0);try{const a=s*r;c(H.doCreate({orderNo:ke(),orderType:n.toLowerCase(),tradingPair:m.replace("USDT","/USDT"),status:n==="MARKET"?"completed":"pending",direction:l.toUpperCase(),delegateType:n,delegateState:n==="MARKET"?"Filled":"Pending",orderQuantity:r,commissionPrice:s,entrustedValue:a,transactionQuantity:n==="MARKET"?r:0,transactionValue:n==="MARKET"?a:0,closingPrice:n==="MARKET"?s:0,handlingFee:n==="MARKET"?a*.001:0,commissionTime:new Date().toISOString(),closingTime:n==="MARKET"?new Date().toISOString():null})),w(""),N("")}catch{S(o("pages.trade.errors.failedOrder"))}finally{B(!1)}},[D,v,n,x,p,l,f,k,m,c,d]),_=t.useCallback((r,s)=>{c(H.doUpdate(r,{...s,status:"canceled"}))},[c]),de=t.useMemo(()=>y.length?e.jsx("div",{className:"orders-list",children:y.map(r=>{var h;const s=String(r.status??"").toLowerCase(),a=s==="pending"||s==="partially filled";return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:r.tradingPair}),e.jsx("span",{className:`order-action ${String(r.direction??"").toLowerCase()}`,children:r.direction}),e.jsx("span",{className:"order-type-badge",children:r.orderType})]}),e.jsxs("div",{className:"order-date",children:[r.commissionTime?new Date(r.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:r.commissionTime?new Date(r.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.status")}),e.jsx("span",{className:`order-status ${s}`,children:r.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.price")}),e.jsxs("span",{className:"order-price-value",children:[d(r.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.amount")}),e.jsxs("span",{className:"order-amount-value",children:[r.orderQuantity," ",(h=r.tradingPair)==null?void 0:h.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.total")}),e.jsxs("span",{className:"order-total",children:[d(r.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:a?e.jsx("button",{className:"cancel-order-btn",onClick:()=>_(r.id,r),children:o("pages.trade.openOrders.cancel")}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},r.id??r.orderNo)})}):e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"empty-text",children:o("pages.trade.openOrders.noOrders")}),e.jsx("div",{className:"empty-subtext",children:o("pages.trade.openOrders.noOrdersSubtext")})]}),[y,d,_]),U=!String(I).startsWith("-");return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"trade-header",children:[e.jsx("div",{className:"trade-header-top",children:e.jsx("div",{className:"trade-page-title",children:o("pages.trade.title")})}),e.jsxs("div",{className:"market-info",children:[u?e.jsx("div",{className:"skel skel-name"}):e.jsx("div",{className:"market-name",children:m.replace("USDT","/USDT")}),e.jsx("div",{className:"coin-select-icon",onClick:()=>P(!0),children:e.jsx("i",{className:"fas fa-chevron-down"})}),u?e.jsx("div",{className:"skel skel-pct"}):e.jsxs("div",{className:"market-change",style:{color:U?"#00C076":"#FF6838"},children:[U?"+":"",I,"%"]})]})]}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsx("div",{className:"buy-sell-tabs",children:u?e.jsx("div",{className:"skel",style:{height:38,borderRadius:10}}):e.jsxs(e.Fragment,{children:[e.jsx("div",{role:"tab",className:`buy-tab ${l==="buy"?"active":""}`,onClick:()=>$("buy"),children:o("pages.trade.buy")}),e.jsx("div",{role:"tab",className:`sell-tab ${l==="sell"?"active":""}`,onClick:()=>$("sell"),children:o("pages.trade.sell")})]})}),e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:o("pages.trade.orderType")}),u?e.jsx("div",{className:"skel",style:{height:40,borderRadius:8}}):e.jsxs("select",{className:"order-type-select",value:n,onChange:r=>Z(r.target.value),children:[e.jsx("option",{value:"LIMIT",children:o("pages.trade.limit")}),e.jsx("option",{value:"MARKET",children:o("pages.trade.market")})]})]}),n==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:o("pages.trade.price")}),u?e.jsx("div",{className:"skel",style:{height:40,borderRadius:8}}):e.jsxs("div",{className:"input-with-buttons",children:[e.jsx("input",{className:"value-input",value:p,onChange:ae,inputMode:"decimal"}),e.jsxs("div",{className:"value-buttons",children:[e.jsx("button",{className:"value-button",onClick:ne,children:"+"}),e.jsx("button",{className:"value-button",onClick:ie,children:"-"})]})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[o("pages.trade.amount")," (",k,")"]}),u?e.jsx("div",{className:"skel",style:{height:40,borderRadius:8}}):e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:v,onChange:se,placeholder:"0.0",inputMode:"decimal"})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[o("pages.trade.amount")," (USDT)"]}),u?e.jsx("div",{className:"skel",style:{height:40,borderRadius:8}}):e.jsx("input",{className:"value-input",value:ee,onChange:te,placeholder:"0.0",inputMode:"decimal",style:{background:"#2a2a2e",borderRadius:8,padding:"8px 10px",width:"100%"}})]}),!u&&e.jsx("div",{className:"pct-row",children:[.25,.5,.75,1].map(r=>e.jsxs("button",{className:"pct-btn",onClick:()=>oe(r),children:[r*100,"%"]},r))}),!u&&e.jsxs("div",{className:"balance-info",children:[o("pages.trade.available"),": ",d(f,l==="buy"?2:6)," ",l==="buy"?"USDT":k]}),E&&e.jsx("div",{className:"error-message",children:E}),u?e.jsx("div",{className:"skel",style:{height:44,borderRadius:10}}):e.jsx("button",{className:`action-button ${l==="buy"?"buy-button":"sell-button"}`,onClick:le,disabled:D,children:D?o("pages.trade.placing"):`${l==="buy"?o("pages.trade.buy"):o("pages.trade.sell")} ${k}`})]}),e.jsxs("div",{className:"order-book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:o("pages.trade.orderBook.price")}),e.jsxs("span",{children:[o("pages.trade.orderBook.amount")," (",k,")"]})]}),u?e.jsxs(e.Fragment,{children:[Array.from({length:5}).map((r,s)=>e.jsx("div",{className:"skel",style:{height:20,marginBottom:6,borderRadius:4}},`sa${s}`)),e.jsx("div",{className:"skel",style:{height:28,margin:"10px 0",borderRadius:6}}),Array.from({length:5}).map((r,s)=>e.jsx("div",{className:"skel",style:{height:20,marginBottom:6,borderRadius:4}},`sb${s}`))]}):e.jsxs(e.Fragment,{children:[C.asks.map((r,s)=>{const a=Math.min(100,i(r.amount)/q*100);return e.jsxs("div",{className:"order-book-row ask-row",onClick:()=>W(r.price),children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${a}%`}}),e.jsx("div",{className:"order-price",children:d(r.price,4)}),e.jsx("div",{className:"order-amount",children:d(r.amount,4)})]},`ask${s}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",style:{color:U?"#4caf50":"#fd4b4e"},children:["$",d(x,2)]})}),C.bids.map((r,s)=>{const a=Math.min(100,i(r.amount)/q*100);return e.jsxs("div",{className:"order-book-row bid-row",onClick:()=>W(r.price),children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${a}%`}}),e.jsx("div",{className:"order-price",children:d(r.price,4)}),e.jsx("div",{className:"order-amount",children:d(r.amount,4)})]},`bid${s}`)})]})]})]}),e.jsxs("div",{className:"open-orders",children:[e.jsxs("div",{className:"open-orders-header",children:[e.jsx("div",{className:"open-orders-title",children:o("pages.trade.openOrders.title")}),e.jsx("div",{className:"orders-filter",children:e.jsx(fe,{to:"/ordersPage",className:"remove_blue",children:e.jsx("i",{className:"fas fa-list"})})})]}),de]})]}),e.jsx(he,{isOpen:re,selectedCoin:m,onClose:()=>P(!1),onSelectCoin:ce}),e.jsx("style",{children:`
        .container {
          background-color: #0e0f14;
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Header */
        .trade-header {
          background-color: #0e0f14;
          padding: 10px 16px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2a2a2e;
          width: 100%;
          max-width: 400px;
        }

        .trade-header-top {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 6px;
        }

        .trade-page-title { font-size: 16px; font-weight: 700; color: #fff; text-align: center; }

        .market-info { display: flex; align-items: center; justify-content: center; gap: 8px; }

        .market-name { font-weight: 700; font-size: 14px; color: #fff; }

        .coin-select-icon { color: #fd4b4e; font-size: 13px; cursor: pointer; transition: color 0.2s; }
        .coin-select-icon:hover { color: #ff6b6d; }

        .market-change { font-size: 12px; font-weight: 600; }

        /* Skeleton */
        .skel {
          background: linear-gradient(90deg, #2a2a2e 25%, #333 50%, #2a2a2e 75%);
          background-size: 200% 100%;
          animation: skelAnim 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 10px;
          display: block;
        }
        @keyframes skelAnim { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .skel-name { width: 90px; height: 18px; }
        .skel-pct  { width: 50px; height: 14px; }

        /* Main */
        .main-content {
          width: 100%;
          max-width: 400px;
          padding: 10px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trading-layout { display: flex; gap: 10px; align-items: flex-start; }

        .trade-form, .order-book {
          flex: 1;
          min-width: 0;
          background-color: #15161c;
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .order-book { overflow-y: auto; max-height: 420px; }

        /* Buy/Sell tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 12px;
          background-color: #2a2a2e;
          border-radius: 10px;
          overflow: hidden;
        }

        .buy-tab, .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          color: #aaaaaa;
        }
        .buy-tab.active  { background-color: #4caf50; color: #fff; }
        .sell-tab.active { background-color: #fd4b4e; color: #fff; }

        /* Order type */
        .order-type { margin-bottom: 12px; }
        .order-type-label { font-size: 11px; color: #aaa; margin-bottom: 4px; }
        .order-type-select {
          width: 100%;
          background-color: #2a2a2e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 13px;
          outline: none;
          cursor: pointer;
        }

        /* Inputs */
        .input-group { margin-bottom: 10px; }
        .input-label { display: block; font-size: 11px; color: #aaa; margin-bottom: 4px; }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #2a2a2e;
          border-radius: 8px;
          padding: 2px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 13px;
          padding: 8px 10px;
          outline: none;
          width: 100%;
        }

        .value-buttons { display: flex; gap: 4px; margin-right: 4px; }
        .value-button {
          background-color: #1e1e24;
          color: #fff;
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          transition: background-color 0.2s;
        }
        .value-button:hover { background-color: #fd4b4e; }

        /* % quick-select */
        .pct-row { display: flex; gap: 4px; margin-bottom: 8px; }
        .pct-btn {
          flex: 1;
          background: #2a2a2e;
          border: none;
          color: #aaa;
          border-radius: 6px;
          padding: 4px 0;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .pct-btn:hover { background: #fd4b4e; color: #fff; }

        .balance-info { font-size: 12px; color: #aaa; margin: 8px 0; text-align: center; }

        /* Action button */
        .action-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          color: #fff;
          margin-top: 4px;
        }
        .buy-button  { background-color: #4caf50; }
        .buy-button:hover:not(:disabled)  { background-color: #43a047; }
        .sell-button { background-color: #fd4b4e; }
        .sell-button:hover:not(:disabled) { background-color: #e04345; }
        .action-button:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Order book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          padding: 0 4px 6px;
          font-size: 11px;
          color: #aaa;
          border-bottom: 1px solid #2a2a2e;
          margin-bottom: 6px;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 4px;
          font-size: 12px;
          cursor: pointer;
          position: relative;
          z-index: 1;
          border-radius: 6px;
          transition: background-color 0.15s;
        }
        .order-book-row:hover { background-color: rgba(253,75,78,0.08); }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.2;
          z-index: -1;
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        .ask-depth { right: 0; background-color: #fd4b4e; }
        .bid-depth { left:  0; background-color: #4caf50; }

        .order-price, .order-amount { flex: 1; z-index: 2; font-size: 12px; }
        .order-amount { text-align: right; }
        .ask-row .order-price { color: #fd4b4e; }
        .bid-row .order-price { color: #4caf50; }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #2a2a2e;
          border-bottom: 1px solid #2a2a2e;
        }
        .current-price { font-weight: 700; font-size: 14px; }

        /* Open orders */
        .open-orders {
          background-color: #15161c;
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .open-orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .open-orders-title { font-size: 15px; font-weight: 700; color: #fd4b4e; }

        .orders-filter a { color: #aaa; font-size: 18px; transition: color 0.2s; }
        .orders-filter a:hover { color: #fd4b4e; }

        .order-item {
          background-color: #2a2a2e;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .order-main-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .order-pair-action { display: flex; align-items: center; gap: 8px; }
        .order-pair { font-weight: 700; font-size: 14px; color: #fff; }

        .order-action {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 700;
        }
        .order-action.buy  { background: rgba(76,175,80,0.2);  color: #4caf50; }
        .order-action.sell { background: rgba(253,75,78,0.2);  color: #fd4b4e; }

        .order-type-badge { font-size: 10px; color: #aaa; background: #15161c; padding: 2px 6px; border-radius: 6px; }

        .order-date  { font-size: 11px; color: #aaa; }
        .order-time  { color: #777; margin-left: 4px; }

        .order-details { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
        .order-detail  { display: flex; justify-content: space-between; align-items: center; }
        .detail-label  { font-size: 11px; color: #aaa; }

        .order-status { font-size: 11px; font-weight: 700; }
        .order-status.completed       { color: #4caf50; }
        .order-status.canceled        { color: #fd4b4e; }
        .order-status.pending         { color: #f3ba2f; }
        .order-status.partially-filled { color: #ff6838; }

        .order-price-value, .order-amount-value, .order-total { font-size: 12px; font-weight: 700; color: #fff; }

        .order-actions { display: flex; justify-content: flex-end; }

        .cancel-order-btn {
          background: #fd4b4e;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .cancel-order-btn:hover { background: #e04345; }

        .completed-indicator { color: #4caf50; font-size: 18px; }

        .empty-orders { text-align: center; padding: 28px 0; }
        .empty-icon   { font-size: 30px; color: #2a2a2e; margin-bottom: 10px; }
        .empty-text   { color: #aaa; font-size: 14px; margin-bottom: 4px; }
        .empty-subtext { color: #777; font-size: 12px; }

        .error-message {
          background: rgba(253,75,78,0.15);
          color: #fd4b4e;
          padding: 8px;
          border-radius: 8px;
          margin: 8px 0;
          font-size: 13px;
          text-align: center;
        }

        a.remove_blue { text-decoration: none; color: inherit; }
      `})]})}export{we as default};
