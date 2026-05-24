import{k as L,v as A,S as F,p as a,q as o,j as e,L as S,x as R}from"./index-07486408.js";import{F as _}from"./FuturesChart-a30d5bf4.js";function B(p,c){switch(c.type){case"TICKER":return{...p,...c.payload};case"RESET":return{price:null,changePercent:null,high:null,low:null,volume:null};default:return p}}const U={price:null,changePercent:null,high:null,low:null,volume:null},q=8,O=1500;function C(p,c,s){const l=a.useRef(null),d=a.useRef(0),x=a.useRef(null),r=a.useRef(!0);a.useEffect(()=>{if(!s)return;r.current=!0,d.current=0;const k=()=>{if(!r.current)return;const h=new WebSocket(p);l.current=h,h.onmessage=c,h.onclose=()=>{if(!r.current||d.current>=q)return;const f=O*Math.pow(1.5,d.current);d.current++,x.current=setTimeout(k,f)},h.onerror=()=>{}};return k(),()=>{r.current=!1,x.current&&clearTimeout(x.current),l.current&&(l.current.onclose=null,l.current.close(),l.current=null)}},[p,s])}function K(){const p=A(),{id:c}=F(),[s,l]=a.useReducer(B,U),[d,x]=a.useState([]),[r,k]=a.useState(c||"BTCUSDT"),[h,f]=a.useState(!0),j=a.useRef(0),v=a.useRef(0);a.useEffect(()=>{c&&c!==r&&(k(c),l({type:"RESET"}),x([]),f(!0))},[c]),a.useEffect(()=>{let t=!1;return(async()=>{try{const[i,w]=await Promise.all([R.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${r}`),R.get(`https://api.binance.com/api/v3/trades?symbol=${r}&limit=10`)]);if(t)return;const b=i.data;l({type:"TICKER",payload:{price:b.lastPrice,changePercent:b.priceChangePercent,high:b.highPrice,low:b.lowPrice,volume:b.volume}}),x(w.data.slice(0,10)),f(!1)}catch{t||f(!1)}})(),()=>{t=!0}},[r]);const D=`wss://stream.binance.com:9443/ws/${r.toLowerCase()}@ticker`,E=a.useCallback(t=>{const n=performance.now();if(!(n-j.current<150)){j.current=n;try{const i=JSON.parse(t.data);l({type:"TICKER",payload:{price:i.c,changePercent:i.P,high:i.h,low:i.l,volume:i.v}})}catch{}}},[]);C(D,E,!h||s.price!==null);const $=`wss://stream.binance.com:9443/ws/${r.toLowerCase()}@trade`,P=a.useCallback(t=>{const n=performance.now();if(!(n-v.current<250)){v.current=n;try{const i=JSON.parse(t.data);x(w=>[{t:i.t,p:i.p,q:i.q,T:i.T,m:i.m},...w.slice(0,9)])}catch{}}},[]);C($,P,!h||d.length>0);const m=a.useCallback((t,n=2)=>Number(t).toLocaleString(void 0,{minimumFractionDigits:n,maximumFractionDigits:n}),[]),N=a.useCallback(t=>{const n=Number(t);return n>=1e9?(n/1e9).toFixed(2)+o("pages.marketDetail.volume.billion"):n>=1e6?(n/1e6).toFixed(2)+o("pages.marketDetail.volume.million"):m(t,0)},[m]),T=a.useCallback(()=>p.goBack(),[p]),y=s.changePercent!==null&&!s.changePercent.startsWith("-"),g=r.replace("USDT",""),u=({w:t,h:n})=>e.jsx("div",{className:"skeleton",style:{width:t,height:n}}),z=a.useMemo(()=>e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"back-button",onClick:T,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${g}.png`,width:30,height:30,loading:"lazy",alt:g,onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:r}),e.jsx("div",{className:"market-change",style:{color:y?"#4caf50":"#fd4b4e"},children:s.changePercent!==null?`${s.changePercent}%`:e.jsx(u,{w:"50px",h:"16px"})})]}),e.jsx("div",{style:{width:24}})]}),[g,r,y,s.changePercent,T]),M=a.useMemo(()=>e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[o("pages.marketDetail.stats.high"),":"," ",s.high!==null?`$${m(s.high)}`:e.jsx(u,{w:"70px",h:"12px"})]}),e.jsxs("span",{children:[o("pages.marketDetail.stats.volume"),":"," ",s.volume!==null?`${N(s.volume)} ${g}`:e.jsx(u,{w:"70px",h:"12px"})]}),e.jsxs("span",{children:[o("pages.marketDetail.stats.low"),":"," ",s.low!==null?`$${m(s.low)}`:e.jsx(u,{w:"70px",h:"12px"})]})]}),[s.high,s.volume,s.low,g,m,N]),I=a.useMemo(()=>d.length?d.map((t,n)=>e.jsxs("div",{className:`trade-row ${t.m?"sell-trade":"buy-trade"}`,children:[e.jsx("div",{className:"trade-price",children:m(t.p)}),e.jsx("div",{className:"trade-amount",children:Number(t.q).toFixed(4)}),e.jsx("div",{className:"trade-time",children:new Date(t.T).toLocaleTimeString()})]},`${t.t}-${n}`)):Array.from({length:5}).map((t,n)=>e.jsxs("div",{className:"trade-row",children:[e.jsx("div",{className:"trade-price",children:e.jsx(u,{w:"60px",h:"14px"})}),e.jsx("div",{className:"trade-amount",children:e.jsx(u,{w:"50px",h:"14px"})}),e.jsx("div",{className:"trade-time",children:e.jsx(u,{w:"40px",h:"14px"})})]},n)),[d,m]);return e.jsxs("div",{className:"md-container",children:[e.jsxs("div",{className:"header",children:[z,e.jsx("div",{className:"market-price",style:{color:y?"#4caf50":"#fd4b4e"},children:s.price!==null?`$${m(s.price)}`:e.jsx(u,{w:"120px",h:"28px"})}),M]}),e.jsx(_,{symbol:r}),e.jsxs("div",{className:"action-buttons",children:[e.jsx(S,{to:"/trade",className:"remove_blue action-button buy-button",children:o("pages.marketDetail.actions.buy")}),e.jsx(S,{to:"/trade",className:"remove_blue action-button sell-button",children:o("pages.marketDetail.actions.sell")})]}),e.jsx("div",{className:"section-title",children:o("pages.marketDetail.recentTrades.title")}),e.jsxs("div",{className:"recent-trades",children:[e.jsxs("div",{className:"trades-header",children:[e.jsx("span",{children:o("pages.marketDetail.recentTrades.price")}),e.jsx("span",{children:o("pages.marketDetail.recentTrades.amount")}),e.jsx("span",{children:o("pages.marketDetail.recentTrades.time")})]}),I]}),e.jsx("style",{children:`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .md-container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #0e0f14;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          background-color: #0e0f14;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2a2a2e;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .back-button {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
          transition: color 0.2s;
        }
        .back-button:hover { color: #fff; }

        .market-info { display: flex; align-items: center; gap: 8px; }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #15161c;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .market-name { font-weight: 700; font-size: 16px; }

        .market-change {
          font-size: 13px;
          font-weight: 700;
          min-height: 16px;
          display: flex;
          align-items: center;
        }

        .market-price {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
          min-height: 28px;
          display: flex;
          align-items: center;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #aaaaaa;
          flex-wrap: wrap;
          gap: 4px;
        }

        .market-stats span {
          display: flex;
          align-items: center;
          gap: 4px;
          min-height: 14px;
        }

        /* Skeleton */
        .skeleton {
          background: linear-gradient(90deg, #2a2a2e 25%, #3a3a3e 50%, #2a2a2e 75%);
          background-size: 200% 100%;
          animation: skeletonAnim 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }
        @keyframes skeletonAnim {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 10px;
          margin: 15px;
        }

        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }
        .action-button:hover { opacity: 0.85; }
        .buy-button  { background-color: #4caf50; color: white; }
        .sell-button { background-color: #fd4b4e; color: white; }

        a.remove_blue { text-decoration: none; color: inherit; display: block; }

        /* Recent trades */
        .section-title {
          font-size: 15px;
          font-weight: 700;
          margin: 16px 15px 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        .recent-trades {
          margin: 0 15px;
          max-height: 300px;
          overflow-y: auto;
        }

        .trades-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 11px;
          color: #888888;
          position: sticky;
          top: 0;
          background-color: #0e0f14;
          padding: 4px 0;
          z-index: 5;
        }

        .trade-row {
          display: flex;
          justify-content: space-between;
          padding: 7px 0;
          font-size: 12px;
          border-bottom: 1px solid #1e1e24;
          align-items: center;
          min-height: 30px;
        }

        .trade-price  { flex: 1; }
        .trade-amount { flex: 1; text-align: right; }
        .trade-time   { flex: 1; text-align: right; color: #888888; font-size: 11px; }

        .buy-trade  .trade-price { color: #4caf50; }
        .sell-trade .trade-price { color: #fd4b4e; }
      `})]})}const H=L.memo(K);export{H as default};
