import{p as s,j as e,q as u,L as z,A as S}from"./index-54206aa9.js";function y(o){return o>=1e9?(o/1e9).toFixed(1)+"B":o>=1e6?(o/1e6).toFixed(1)+"M":o.toFixed(0)}function U(o){const p=Number(o);return isNaN(p)?"0.00":p.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:p<1?6:4})}const h=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT","ADAUSDT","DOGEUSDT","DOTUSDT","LTCUSDT","LINKUSDT","BCHUSDT","TRXUSDT","MATICUSDT","FILUSDT","TONUSDT","EOSUSDT","ZECUSDT","DASHUSDT","XMRUSDT","YFIUSDT","SHIBUSDT","USDCUSDT","TRUMPUSDT"],M=h.map(o=>`${o.toLowerCase()}@ticker`).join("/"),$=`wss://stream.binance.com:9443/stream?streams=${M}`,A=()=>{const[o,p]=s.useState({}),[f,v]=s.useState(""),[P,T]=s.useState(!0),[R,C]=s.useState({}),x=s.useRef(null),c=s.useRef(!0),j=s.useRef(0),k=s.useRef(null),g=s.useRef(0),w=s.useRef(null);s.useEffect(()=>(c.current=!0,(async()=>{const a=S.CancelToken.source();w.current=a;try{const i=`https://api.binance.com/api/v3/ticker/24hr?symbols=[${h.map(n=>`"${n}"`).join(",")}]`,m=await S.get(i,{cancelToken:a.token,timeout:6e3});if(!c.current)return;const t={};m.data.forEach(n=>{const d=n.symbol,b=d.replace("USDT",""),D=parseFloat(n.priceChangePercent);t[d]={symbol:d,name:`${b}/USDT`,price:U(n.lastPrice),changePercent:Math.abs(D).toFixed(2),volumeFormatted:y(Number(n.volume)),isPositive:D>=0,quoteVolume:parseFloat(n.quoteVolume)}}),h.forEach(n=>{if(!t[n]){const d=n.replace("USDT","");t[n]={symbol:n,name:`${d}/USDT`,price:"0.00",changePercent:"0.00",volumeFormatted:"0",isPositive:!0,quoteVolume:0}}}),p(t),T(!1)}catch(l){if(S.isCancel(l)||!c.current)return;const i={};h.forEach(m=>{const t=m.replace("USDT","");i[m]={symbol:m,name:`${t}/USDT`,price:"—",changePercent:"—",volumeFormatted:"—",isPositive:!0,quoteVolume:0}}),p(i),T(!1)}})(),()=>{var a;c.current=!1,(a=w.current)==null||a.cancel("unmounted")}),[]),s.useEffect(()=>{c.current=!0,g.current=0;const r=()=>{if(!c.current)return;const a=new WebSocket($);x.current=a,a.onmessage=l=>{if(!c.current)return;const i=performance.now();if(!(i-j.current<200)){j.current=i;try{const m=JSON.parse(l.data),t=m.data??m;if(!(t!=null&&t.s)||!h.includes(t.s))return;const n=parseFloat(t.P);p(d=>{const b=d[t.s];return b?{...d,[t.s]:{...b,price:U(t.c),changePercent:Math.abs(n).toFixed(2),volumeFormatted:y(Number(t.v)),isPositive:n>=0,quoteVolume:parseFloat(t.q)}}:d})}catch{}}},a.onerror=()=>{},a.onclose=()=>{if(!c.current||g.current>=8)return;const l=1500*Math.pow(1.5,g.current);g.current++,k.current=setTimeout(r,l)}};return r(),()=>{c.current=!1,k.current&&clearTimeout(k.current),x.current&&(x.current.onclose=null,x.current.close(),x.current=null)}},[]);const N=s.useMemo(()=>{const r=f.toLowerCase();return h.reduce((a,l)=>{const i=o[l];return!i||r&&!i.name.toLowerCase().includes(r)&&!l.toLowerCase().includes(r)||a.push(i),a},[])},[o,f]),F=s.useCallback(r=>{C(a=>({...a,[r]:!0}))},[]),E=s.useCallback(()=>v(""),[]),L=s.useCallback(({pair:r})=>(r.replace("USDT",""),e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"pair-col",children:[e.jsx("div",{className:"crypto-icon skeleton-circle shimmer"}),e.jsx("span",{className:"shimmer-text shimmer",style:{width:70,height:14}})]}),e.jsx("div",{className:"price-col",children:e.jsx("div",{className:"shimmer-text shimmer",style:{width:80,height:15,marginLeft:"auto"}})}),e.jsx("div",{className:"change-col",children:e.jsx("div",{className:"shimmer-text shimmer",style:{width:52,height:24,marginLeft:"auto"}})})]},r)),[]);return e.jsxs("div",{className:"market-page",children:[e.jsxs("div",{className:"market-container",children:[e.jsxs("div",{className:"market-top-header",children:[e.jsx("div",{className:"header-placeholder"}),e.jsx("h1",{className:"market-page-title",children:u("pages.market.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsx("div",{className:"market-search-wrapper",children:e.jsxs("div",{className:"search-bar",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:u("pages.market.search.placeholder"),value:f,onChange:r=>v(r.target.value)}),f&&e.jsx("button",{className:"clear-search",onClick:E,"aria-label":u("pages.market.search.clear"),children:"×"})]})}),e.jsxs("div",{className:"market-content-card",children:[e.jsxs("div",{className:"table-header",children:[e.jsx("div",{className:"pair-col",children:u("pages.market.tableHeaders.pair")}),e.jsx("div",{className:"price-col",children:u("pages.market.tableHeaders.latestPrice")}),e.jsx("div",{className:"change-col",children:u("pages.market.tableHeaders.change24h")})]}),P?h.map(r=>e.jsx(L,{pair:r},r)):N.length>0?N.map(r=>{const a=r.name.split("/")[0];return e.jsx(z,{to:`/market/detail/${r.symbol}`,className:"remove_blue",children:e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"pair-col",children:[e.jsx("div",{className:"crypto-icon",children:R[a]?e.jsx("span",{className:"icon-fallback",children:a.substring(0,2)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a}.png`,width:25,height:25,loading:"lazy",alt:a,onError:()=>F(a)})}),e.jsx("span",{children:r.name})]}),e.jsx("div",{className:"price-col",children:e.jsxs("div",{className:"crypto-price",children:["$",r.price]})}),e.jsx("div",{className:"change-col",children:e.jsxs("span",{className:`change-badge ${r.isPositive?"change-positive":"change-negative"}`,children:[r.isPositive?"+":"",r.changePercent,"%"]})})]})},r.symbol)}):e.jsx("div",{className:"no-results",children:u("pages.market.noResults")})]})]}),e.jsx("style",{children:`
        .market-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding-bottom: 20px;
        }

        .market-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .market-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px 12px;
          background-color: #0e0f14;
        }

        .market-page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .header-placeholder { width: 32px; }

        .market-search-wrapper {
          padding: 0 20px 16px;
          background-color: #0e0f14;
        }

        .search-bar {
          background: #15161c;
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          border: 1px solid #2a2a2e;
          transition: border-color 0.2s;
        }
        .search-bar:focus-within { border-color: #fd4b4e; }
        .search-bar i { margin-right: 10px; color: #aaaaaa; font-size: 14px; }
        .search-bar input {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 14px;
          width: 100%;
          outline: none;
        }
        .search-bar input::placeholder { color: #666666; }

        .clear-search {
          background: none;
          border: none;
          color: #aaaaaa;
          cursor: pointer;
          font-size: 18px;
          padding: 0 5px;
          line-height: 1;
        }

        .market-content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        .table-header {
          display: flex;
          color: #aaaaaa;
          font-size: 12px;
          font-weight: 500;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
          margin-bottom: 8px;
        }

        .table-row {
          display: flex;
          align-items: center;
          padding: 10px 8px;
          border-bottom: 1px solid #2a2a2e;
          border-radius: 8px;
          margin: 0 -8px;
          transition: background-color 0.15s;
        }
        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background-color: rgba(253, 75, 78, 0.05); }

        .pair-col {
          flex: 2;
          display: flex;
          align-items: center;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
        }

        .price-col {
          flex: 2;
          text-align: right;
          margin-right: 15px;
        }

        .change-col {
          flex: 1;
          text-align: right;
        }

        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .crypto-icon img { border-radius: 50%; }

        .icon-fallback {
          font-size: 13px;
          font-weight: 700;
          color: #fd4b4e;
        }

        .crypto-price {
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
        }

        .change-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }

        .change-positive { background-color: rgba(76, 175, 80, 0.15); color: #4caf50; }
        .change-negative { background-color: rgba(253, 75, 78, 0.15); color: #fd4b4e; }

        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #aaaaaa;
          font-size: 14px;
        }

        a.remove_blue { text-decoration: none; color: inherit; }

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

        .skeleton-circle {
          width: 32px;
          height: 32px;
          border-radius: 50% !important;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .shimmer-text {
          display: inline-block;
          border-radius: 4px;
        }

        @media (max-width: 380px) {
          .crypto-icon { width: 28px; height: 28px; margin-right: 8px; }
          .crypto-price { font-size: 14px; }
        }
      `})]})};export{A as default};
