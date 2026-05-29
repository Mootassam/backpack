import{P as C,u as R,F as E,p as i,q as m,G as _,Q as O,j as e,L as S}from"./index-52cad42e.js";import{u as V}from"./useDispatch-a8300b64.js";const D="wallet_prices_v1";function F(){try{const p=localStorage.getItem(D);return p?JSON.parse(p):{}}catch{return{}}}function A(p){try{localStorage.setItem(D,JSON.stringify(p))}catch{}}function J(){const p=V(),P=C(),d=R(E.selectRows),[j,y]=i.useState(F),[z,h]=i.useState(()=>{const t=F();return Object.keys(t).length>0}),u=i.useRef(null),N=i.useRef(0),v=i.useRef(null),f=i.useRef(null),T=i.useMemo(()=>[{path:"/deposit",icon:"fas fa-wallet",name:m("pages.wallet.quickActions.deposit")},{path:"/withdraw",icon:"fas fa-money-bill-wave",name:m("pages.wallet.quickActions.withdraw")},{path:"/history",icon:"fas fa-history",name:m("pages.wallet.quickActions.history")},{path:"/conversion",icon:"fas fa-exchange-alt",name:m("pages.wallet.quickActions.convert")},{path:"/stacking",icon:"fas fa-coins",name:m("pages.wallet.quickActions.staking")}],[]),U=i.useCallback(t=>{const a=parseFloat(t);return isNaN(a)?"0":a%1===0?a.toString():a.toFixed(8).replace(/\.?0+$/,"")},[]);i.useEffect(()=>{p(_.doFetch())},[p]),i.useEffect(()=>{let t=!1;return O.prices().then(a=>{if(t)return;const c=a==null?void 0:a.data;!c||!Object.keys(c).length||(y(o=>{const s={...o};return Object.entries(c).forEach(([l,n])=>{s[l]={s:l,c:n.c,P:n.P}}),A(s),s}),h(!0))}).catch(()=>{t||h(!0)}),()=>{t=!0}},[]),i.useEffect(()=>{if(!d.length)return;const t=d.filter(o=>o.symbol!=="USDT").map(o=>`${o.symbol.toLowerCase()}usdt`);if(!t.length){h(!0);return}let a=!0;const c=()=>{if(!a)return;u.current&&(u.current.onclose=null,u.current.close(),u.current=null);const o=t.map(l=>`${l}@ticker`).join("/"),s=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${o}`);u.current=s,s.onmessage=l=>{if(!a)return;const n=Date.now();if(!(n-N.current<500)){N.current=n;try{const g=JSON.parse(l.data),r=g.data??g;if(!(r!=null&&r.s))return;y(x=>{const b={...x,[r.s]:r};return f.current&&clearTimeout(f.current),f.current=setTimeout(()=>A(b),5e3),b}),h(!0)}catch{}}},s.onerror=()=>{a&&h(!0)},s.onclose=()=>{a&&(v.current=setTimeout(c,3e3))}};return c(),()=>{a=!1,v.current&&clearTimeout(v.current),f.current&&clearTimeout(f.current),u.current&&(u.current.onclose=null,u.current.close(),u.current=null)}},[d]);const{assetValues:$,totalValue:L,portfolioChange:w}=i.useMemo(()=>{if(!d.length)return{assetValues:[],totalValue:0,portfolioChange:0};let t=0,a=0;const c=d.map(s=>{const l=parseFloat(s.amount||"0");if(s.symbol==="USDT")return t+=l,a+=l,{value:l,change:0,isPositive:!0};const n=j[`${s.symbol}USDT`],g=parseFloat((n==null?void 0:n.c)||"0"),r=parseFloat((n==null?void 0:n.P)||"0"),x=l*g,b=r!==-100?x/(1+r/100):0;return t+=x,a+=b,{value:x,change:r,isPositive:r>=0}}),o=a>0?(t-a)/a*100:0;return{assetValues:c,totalValue:t,portfolioChange:o}},[d,j]),q=d.length===0,k=d.some(t=>t.symbol!=="USDT")&&!z;return e.jsxs("div",{className:"wallet-page",children:[e.jsxs("div",{className:"wallet-container",children:[e.jsx("div",{className:"top-header",children:e.jsx("h1",{className:"page-title",children:m("pages.wallet.myAssets")})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"balance-section",children:[e.jsx("div",{className:"balance-label",children:m("pages.wallet.totalPortfolioValue")}),k?e.jsxs("div",{className:"balance-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"120px",height:"28px",marginBottom:"6px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"14px"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"balance-amount",children:["$",L.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`balance-change ${w>=0?"positive":"negative"}`,children:[w>=0?"+":"",w.toFixed(2),"%"]})]})]}),e.jsx("div",{className:"quick-actions",children:T.map(t=>e.jsxs(S,{to:t.path,className:`action-btn remove_blue ${P.pathname===t.path?"active":""}`,children:[e.jsx("div",{className:"action-circle",children:e.jsx("i",{className:t.icon})}),e.jsx("span",{className:"action-text",children:t.name})]},t.path))}),e.jsxs("div",{className:"assets-header",children:[e.jsx("div",{className:"assets-title",children:m("pages.wallet.myAssets")}),e.jsx("div",{className:"assets-manage",children:m("pages.wallet.manage")})]}),e.jsx("div",{className:"asset-list",children:q?e.jsx("div",{className:"no-assets",children:m("pages.wallet.noAssets")}):d.map((t,a)=>{const{value:c,change:o,isPositive:s}=$[a]??{value:0,change:0,isPositive:!0};return e.jsx(S,{to:`/wallets/${t.id??t._id}`,className:"remove_blue",children:e.jsxs("div",{className:"wallet-asset-item",children:[e.jsxs("div",{className:"wallet-asset-info",children:[e.jsx("div",{className:"wallet-asset-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.symbol}.png`,width:32,height:32,loading:"lazy",alt:t.symbol})}),e.jsxs("div",{className:"wallet-asset-details",children:[e.jsx("div",{className:"wallet-asset-name",children:t.coinName}),e.jsxs("div",{className:"wallet-asset-amount",children:[U(t.amount)," ",t.symbol]})]})]}),e.jsx("div",{className:"wallet-asset-value",children:k&&t.symbol!=="USDT"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"14px",marginBottom:"4px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wallet-value-amount",children:["$",c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-value-change ${s?"positive":"negative"}`,children:[s&&t.symbol!=="USDT"?"+":"",t.symbol!=="USDT"?o.toFixed(2):"0.00","%"]})]})})]})},t.id??t._id)})})]})]}),e.jsx("style",{children:`
        .wallet-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .wallet-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .top-header {
          padding: 16px 20px 12px;
          text-align: center;
          background-color: #0e0f14;
        }

        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 20px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        /* Balance */
        .balance-section { text-align: center; margin-bottom: 20px; }
        .balance-label   { color: #888; font-size: 13px; margin-bottom: 6px; }
        .balance-amount  { color: #ffffff; font-size: 28px; font-weight: 700; }
        .balance-change  { font-size: 13px; font-weight: 500; margin-top: 4px; }
        .balance-change.positive { color: #4caf50; }
        .balance-change.negative { color: #fd4b4e; }
        .balance-placeholder { margin-top: 8px; }

        /* Quick actions */
        .quick-actions {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #2a2a2e;
        }
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: inherit;
        }
        .action-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 18px;
          transition: background-color 0.2s;
        }
        .action-btn.active .action-circle,
        .action-circle:hover { background-color: #2a2a2e; }
        .action-text { font-size: 11px; color: #ccc; font-weight: 500; }

        /* Assets header */
        .assets-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .assets-title  { color: #ffffff; font-size: 14px; font-weight: 600; }
        .assets-manage { color: #fd4b4e; font-size: 13px; cursor: pointer; }

        /* Asset list */
        .asset-list { min-height: 200px; margin-bottom: 58px; }

        .wallet-asset-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #2a2a2e;
        }
        .wallet-asset-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .wallet-asset-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          background: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wallet-asset-name   { color: #ffffff; font-weight: 600; font-size: 14px; margin-bottom: 3px; }
        .wallet-asset-amount { color: #888; font-size: 12px; }
        .wallet-asset-value  { text-align: right; min-width: 80px; }
        .wallet-value-amount { color: #ffffff; font-size: 14px; font-weight: 600; margin-bottom: 3px; }
        .wallet-value-change { font-size: 12px; }
        .wallet-value-change.positive { color: #4caf50; }
        .wallet-value-change.negative { color: #fd4b4e; }

        .no-assets { text-align: center; color: #888; padding: 40px 0; }

        /* Shimmer skeleton */
        .shimmer {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(to right, #2a2a2e 8%, #333 18%, #2a2a2e 33%);
          background-size: 800px 104px;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0%   { background-position: -468px 0; }
          100% { background-position:  468px 0; }
        }
        .placeholder-line { border-radius: 4px; }

        a.remove_blue { text-decoration: none; color: inherit; }
      `})]})}export{J as default};
