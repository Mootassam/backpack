import{v as U,y as Ce,u as B,n as Fe,F as Te,p as n,G as I,j as e,q as t,A as De,X as ae}from"./index-f6bcde00.js";import{S as ze}from"./sucessModal-6f9180fe.js";import{u as Ue}from"./useDispatch-f673bc67.js";const S=a=>a.assets.form,Pe=U([S],a=>a.record),Me=U([S],a=>!!a.initLoading),Ae=U([S],a=>!!a.saveLoading),Ee=U([S],a=>!!a.showModal),Le={selectInitLoading:Me,selectSaveLoading:Ae,selectRecord:Pe,selectModal:Ee,selectRaw:S},ie="bp_conversion_data",Re=5*60*1e3;function $e(){try{const a=localStorage.getItem(ie);if(!a)return null;const{data:g,ts:j}=JSON.parse(a);return Date.now()-j>Re?null:g}catch{return null}}function Be(a){try{localStorage.setItem(ie,JSON.stringify({data:a,ts:Date.now()}))}catch{}}function oe(a){const g=a.symbol,j=g.replace("USDT",""),m=parseFloat(a.lastPrice??a.c??"0"),k=Math.abs(Number(a.priceChangePercent??a.P??"0")).toFixed(2),o=!String(a.priceChangePercent??a.P??"0").startsWith("-");return{symbol:g,name:`${j}/USDT`,price:m.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:m<1?6:4}),changePercent:k,isPositive:o,quoteVolume:parseFloat(a.quoteVolume??a.q??"0"),numericPrice:m}}function Ve(){var se,ne;const a=Ue(),g=Ce(),j=B(Fe.selectCurrentUser),m=B(Te.selectRows),k=B(Le.selectModal),[o,O]=n.useState("USDT"),[i,q]=n.useState("BTC"),[c,P]=n.useState(1),[C,V]=n.useState(0),[W,te]=n.useState(0),[re,F]=n.useState(!1),[ce,le]=n.useState("from"),[T,_]=n.useState(""),[de,M]=n.useState(!0),[H,pe]=n.useState(null),[f,A]=n.useState({}),[me,w]=n.useState(!1),[ue,J]=n.useState(0),[D,G]=n.useState(0),[y,K]=n.useState(!1),[E,fe]=n.useState({}),[h,X]=n.useState({}),b=n.useRef(null),z=n.useRef(new Map),N=n.useRef(null),L=n.useRef(!1);n.useEffect(()=>{a(I.doFetch())},[a]),n.useEffect(()=>{if(m!=null&&m.length){const s=m.reduce((r,d)=>(r[d.symbol]=d.amount,r),{});X(s)}},[m]),n.useEffect(()=>{(async()=>{const r=$e();r&&(A(r),M(!1));try{const u=(await De.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(p=>p.symbol.endsWith("USDT")&&!p.symbol.includes("UP")&&!p.symbol.includes("DOWN")&&!p.symbol.includes("BEAR")&&!p.symbol.includes("BULL")).sort((p,x)=>parseFloat(x.quoteVolume)-parseFloat(p.quoteVolume)).slice(0,200),l={};u.forEach(p=>{l[p.symbol]=oe(p)}),l.USDT={symbol:"USDT",name:"USDT/USDT",price:"1.00",changePercent:"0.00",isPositive:!0,quoteVolume:0,numericPrice:1},A(l),Be(l),M(!1)}catch{r||pe("Failed to fetch market data. Please try again later."),M(!1)}})()},[]),n.useEffect(()=>{let s=!0;const r=()=>{if(N.current=null,!s||z.current.size===0)return;const d=Array.from(z.current.values());z.current.clear(),A(u=>{const l={...u};let p=!1;return d.forEach(x=>{l[x.s]&&(l[x.s]=oe({...x,priceChangePercent:x.P,lastPrice:x.c}),p=!0)}),p?l:u})};return b.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),b.current.onmessage=d=>{if(!s)return;JSON.parse(d.data).forEach(l=>z.current.set(l.s,l)),N.current||(N.current=setTimeout(r,400))},b.current.onerror=()=>{},()=>{s=!1,N.current&&clearTimeout(N.current),b.current&&(b.current.close(),b.current=null)}},[]);const Y=n.useCallback(()=>{var u,l;if(L.current)return;const s=o==="USDT"?1:((u=f[`${o}USDT`])==null?void 0:u.numericPrice)??0,r=i==="USDT"?1:((l=f[`${i}USDT`])==null?void 0:l.numericPrice)??0;if(!s||!r)return;const d=s/r;te(d),V(c*d)},[o,i,c,f]);n.useEffect(()=>{Y()},[Y]);const Q=n.useMemo(()=>{const s=Object.values(f).map(r=>{const d=r.symbol.replace("USDT","")||"USDT";return{code:d,name:d,symbol:r.symbol,price:r.numericPrice}});return s.find(r=>r.code==="USDT")||s.push({code:"USDT",name:"USDT",symbol:"USDT",price:1}),s},[f]),xe=n.useMemo(()=>Q.filter(s=>s.code.toLowerCase().includes(T.toLowerCase())||s.name.toLowerCase().includes(T.toLowerCase())),[Q,T]),v=n.useMemo(()=>!o||c<=0?!1:c<=(h[o]??0),[c,o,h]),ge=n.useMemo(()=>c*.001,[c]),he=n.useMemo(()=>C-C*.001,[C]),R=o==="USDT"?1:((se=f[`${o}USDT`])==null?void 0:se.numericPrice)??null,Z=i==="USDT"?1:((ne=f[`${i}USDT`])==null?void 0:ne.numericPrice)??null,be=s=>{P(parseFloat(s.target.value)||0)},ve=()=>P(h[o]??0),je=s=>{ce==="from"?O(s):q(s),F(!1),_("")},ee=s=>{le(s),F(!0)},we=()=>{O(i),q(o)},ye=()=>{v&&(J(ge),G(he),w(!0))},Ne=()=>{a(ae.doClose()),P(1),V(0),G(0),J(0),a(I.doFetch())},Se=()=>{v&&(K(!0),L.current=!0,setTimeout(()=>{a(ae.doCreate({user:j.id,fromSymbol:o,fromAmount:c,toSymbol:i,coinName:i,toAmount:D.toFixed(8),status:"available"})),X(s=>({...s,[o]:(s[o]??0)-c,[i]:(s[i]??0)+D})),L.current=!1,K(!1),w(!1),setTimeout(()=>a(I.doFetch()),500)},1500))},$=s=>fe(r=>({...r,[s]:!0})),ke=()=>g.goBack();return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"conversion-page",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:ke,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:t("pages.conversion.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"conversion-card",children:[de&&e.jsxs("div",{className:"loading-overlay",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("span",{children:t("pages.conversion.loading")})]}),H&&e.jsxs("div",{className:"error-banner",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"})," ",H]}),e.jsxs("div",{className:"input-section",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("span",{className:"input-label",children:t("pages.conversion.youSend")}),e.jsxs("div",{className:"balance-row",children:[e.jsxs("span",{className:"balance-text",children:[t("pages.conversion.balance"),": ",h[o]??0," ",o]}),e.jsx("button",{className:"max-btn",onClick:ve,children:t("pages.conversion.max")})]})]}),e.jsxs("div",{className:"input-row",children:[e.jsx("input",{type:"number",value:c,onChange:be,placeholder:"0.0"}),e.jsxs("div",{className:"coin-selector",onClick:()=>ee("from"),children:[e.jsx("div",{className:"coin-icon",children:E[o]?e.jsx("span",{className:"icon-fallback",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,alt:o,loading:"lazy",onError:()=>$(o)})}),e.jsx("span",{className:"coin-code",children:o}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),R!==null&&e.jsxs("div",{className:"usd-price",children:["1 ",o," = $",R.toLocaleString("en-US",{maximumFractionDigits:2})]}),!v&&c>0&&e.jsxs("div",{className:"insufficient-warning",children:[e.jsx("i",{className:"fas fa-exclamation-circle"})," ",t("pages.conversion.insufficientBalance")]})]}),e.jsx("div",{className:"switch-wrapper",children:e.jsx("button",{className:"switch-btn",onClick:we,children:e.jsx("i",{className:"fas fa-exchange-alt"})})}),e.jsxs("div",{className:"input-section",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("span",{className:"input-label",children:t("pages.conversion.youReceive")}),e.jsxs("span",{className:"balance-text",children:[t("pages.conversion.balance"),": ",h[i]??0," ",i]})]}),e.jsxs("div",{className:"input-row",children:[e.jsx("input",{type:"number",value:C.toFixed(8),readOnly:!0}),e.jsxs("div",{className:"coin-selector",onClick:()=>ee("to"),children:[e.jsx("div",{className:"coin-icon",children:E[i]?e.jsx("span",{className:"icon-fallback",children:i.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${i}.png`,alt:i,loading:"lazy",onError:()=>$(i)})}),e.jsx("span",{className:"coin-code",children:i}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),Z!==null&&e.jsxs("div",{className:"usd-price",children:["1 ",i," = $",Z.toLocaleString("en-US",{maximumFractionDigits:2})]})]}),e.jsxs("div",{className:"conversion-info",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{children:t("pages.conversion.estimatedConversion")}),e.jsxs("span",{className:"rate",children:["1 ",o," = ",W.toFixed(8)," ",i]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{children:"USD Value"}),e.jsxs("span",{className:"usd-value",children:["$",(c*(R??0)).toLocaleString("en-US",{maximumFractionDigits:2})]})]})]}),e.jsx("button",{className:`convert-btn ${v&&c>0&&o!==i?"":"disabled"}`,onClick:ye,disabled:!v||c<=0||o===i,children:o===i?t("pages.conversion.selectDifferentCurrencies"):v?t("pages.conversion.convertNow"):t("pages.conversion.insufficientBalance")}),e.jsxs("div",{className:"update-notice",children:[e.jsx("i",{className:"fas fa-sync-alt"})," ",t("pages.conversion.pricesUpdate")]})]})]}),re&&e.jsx("div",{className:"currency-modal-overlay",onClick:()=>F(!1),children:e.jsxs("div",{className:"currency-modal-content",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{children:t("pages.conversion.selectCurrency")}),e.jsx("button",{className:"modal-close",onClick:()=>F(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{placeholder:t("pages.conversion.searchCurrencies"),value:T,onChange:s=>_(s.target.value)})]}),e.jsx("ul",{className:"modal-list",children:xe.map(s=>e.jsxs("li",{onClick:()=>je(s.code),children:[e.jsx("div",{className:"modal-coin-icon",children:E[s.code]?e.jsx("span",{className:"icon-fallback",children:s.code.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s.code}.png`,alt:s.code,loading:"lazy",onError:()=>$(s.code)})}),e.jsxs("div",{className:"modal-coin-info",children:[e.jsx("span",{className:"coin-code",children:s.code}),e.jsx("span",{className:"coin-name",children:s.name})]}),e.jsxs("div",{className:"modal-coin-right",children:[e.jsxs("span",{className:"coin-price",children:["$",s.price.toLocaleString("en-US",{maximumFractionDigits:2})]}),e.jsxs("span",{className:"coin-balance",children:[t("pages.conversion.balance"),": ",h[s.code]??0]})]})]},s.code))})]})}),k&&e.jsx(ze,{isOpen:k,onClose:Ne,type:"convert",amount:Number(D).toFixed(8),coinType:i}),me&&e.jsx("div",{className:"confirmation-overlay",onClick:()=>!y&&w(!1),children:e.jsxs("div",{className:"confirmation-dialog",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{children:t("pages.conversion.confirmConversion")}),e.jsx("button",{className:"modal-close",onClick:()=>!y&&w(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"swap-summary",children:[e.jsxs("div",{className:"swap-side",children:[e.jsx("span",{className:"swap-amount",children:c}),e.jsx("span",{className:"swap-currency",children:o})]}),e.jsx("i",{className:"fas fa-arrow-down swap-arrow"}),e.jsxs("div",{className:"swap-side",children:[e.jsx("span",{className:"swap-amount",children:D.toFixed(8)}),e.jsx("span",{className:"swap-currency",children:i})]})]}),e.jsxs("div",{className:"swap-details",children:[e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:t("pages.conversion.exchangeRate")}),e.jsxs("span",{children:["1 ",o," = ",W.toFixed(8)," ",i]})]}),e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:t("pages.conversion.networkFee")}),e.jsxs("span",{children:[ue.toFixed(8)," ",o]})]}),e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:t("pages.conversion.estimatedArrival")}),e.jsx("span",{children:t("pages.conversion.arrivalTime")})]})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{className:"confirm-btn",onClick:Se,disabled:y,children:y?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",t("pages.conversion.processingConversion")]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-check-circle"})," ",t("pages.conversion.confirmConversion")]})}),e.jsx("button",{className:"cancel-btn",onClick:()=>w(!1),disabled:y,children:t("pages.conversion.cancel")})]})]})}),e.jsx("style",{children:`
        .conversion-page {
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
        .back-button:hover { background-color: rgba(253, 75, 78, 0.15); }

        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .header-placeholder { width: 32px; }

        /* Main Card */
        .conversion-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 20px 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
          position: relative;
        }

        .loading-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          z-index: 10;
          color: #fff;
          gap: 12px;
        }
        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #2a2a2e;
          border-top-color: #fd4b4e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-banner {
          background: rgba(253,75,78,0.15);
          color: #fd4b4e;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Input sections */
        .input-section { margin-bottom: 16px; }
        .input-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .input-label { font-size: 13px; color: #aaaaaa; font-weight: 500; }
        .balance-row { display: flex; align-items: center; gap: 8px; }
        .balance-text { font-size: 12px; color: #777; }
        .max-btn {
          background: #2a2a2e;
          color: #fd4b4e;
          border: 1px solid #fd4b4e;
          border-radius: 6px;
          padding: 2px 6px;
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s;
        }
        .max-btn:hover { background: #fd4b4e; color: #fff; }

        .input-row {
          display: flex;
          align-items: center;
          background: #2a2a2e;
          border-radius: 10px;
          padding: 4px;
        }
        .input-row input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 16px;
          padding: 10px 12px;
          outline: none;
          font-weight: 600;
        }
        .coin-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #1e1e24;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .coin-selector:hover { background: #fd4b4e; }
        .coin-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a2a2e;
        }
        .coin-icon img { width: 18px; height: 18px; object-fit: contain; }
        .icon-fallback { color: #aaa; font-size: 12px; font-weight: 700; }

        .usd-price { font-size: 12px; color: #aaaaaa; margin-top: 6px; }

        .insufficient-warning {
          color: #fd4b4e;
          font-size: 12px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Switch */
        .switch-wrapper { display: flex; justify-content: center; margin: 12px 0; }
        .switch-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2a2a2e;
          border: none;
          color: #fd4b4e;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .switch-btn:hover { background: #fd4b4e; color: #fff; transform: rotate(180deg); }

        /* Conversion info */
        .conversion-info {
          background: #1e1e24;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 8px;
        }
        .info-row:last-child { margin-bottom: 0; }
        .rate, .usd-value { color: #fff; font-weight: 600; }

        /* Convert button */
        .convert-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #fd4b4e;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .convert-btn:hover:not(.disabled) { background: #e04345; }
        .convert-btn.disabled { background: #2a2a2e; color: #777; cursor: not-allowed; }

        .update-notice { text-align: center; color: #777; font-size: 12px; margin-top: 12px; }

        /* Currency modal */
        .currency-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .currency-modal-content {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #2a2a2e;
        }
        .modal-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: #fff; }
        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .modal-close:hover { color: #fd4b4e; }

        .modal-search {
          display: flex;
          align-items: center;
          background: #2a2a2e;
          margin: 10px 12px;
          border-radius: 8px;
          padding: 8px 12px;
          gap: 8px;
        }
        .modal-search i { color: #aaa; }
        .modal-search input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 14px;
          outline: none;
        }

        .modal-list {
          flex: 1;
          overflow-y: auto;
          list-style: none;
          margin: 0;
          padding: 0 0 12px;
        }
        .modal-list li {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid #2a2a2e;
        }
        .modal-list li:hover { background: rgba(253,75,78,0.06); }

        .modal-coin-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #2a2a2e;
          flex-shrink: 0;
        }
        .modal-coin-icon img { width: 22px; height: 22px; object-fit: contain; }
        .modal-coin-info { flex: 1; display: flex; flex-direction: column; }
        .coin-code { font-size: 14px; font-weight: 600; color: #fff; }
        .coin-name { font-size: 12px; color: #aaaaaa; }
        .modal-coin-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
        .coin-price { font-size: 13px; font-weight: 600; color: #fff; }
        .coin-balance { font-size: 11px; color: #777; }

        /* Confirmation modal */
        .confirmation-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }
        .confirmation-dialog {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
        }
        .modal-body { padding: 0 16px; }
        .swap-summary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 20px 16px;
          background: #1e1e24;
          border-radius: 12px;
          margin: 16px 0;
        }
        .swap-side { display: flex; flex-direction: column; align-items: center; }
        .swap-amount { font-size: 18px; font-weight: 700; color: #fff; }
        .swap-currency { font-size: 12px; color: #fd4b4e; margin-top: 4px; }
        .swap-arrow { color: #fd4b4e; font-size: 18px; }
        .swap-details {
          background: #1e1e24;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .detail-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
          color: #aaaaaa;
        }
        .detail-line:last-child { margin-bottom: 0; }
        .modal-footer {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid #2a2a2e;
        }
        .confirm-btn {
          background: #fd4b4e;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .confirm-btn:hover:not(:disabled) { background: #e04345; }
        .confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .cancel-btn {
          background: transparent;
          border: 1px solid #2a2a2e;
          color: #aaa;
          padding: 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cancel-btn:hover { background: rgba(255,255,255,0.05); }
      `})]})}export{Ve as default};
