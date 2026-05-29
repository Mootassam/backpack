import{p as r,j as e,q as m,_ as z}from"./index-54206aa9.js";const D=({selectedCoin:k,onSelectCoin:P,isOpen:u,onClose:h})=>{const[y,j]=r.useState({}),[p,d]=r.useState(""),[g,C]=r.useState("All"),[L,v]=r.useState(!0),b=r.useRef(null);r.useEffect(()=>{(async()=>{try{v(!0);const{default:t}=await z(()=>import("./index-54206aa9.js").then(a=>a.i),["assets/index-54206aa9.js","assets/index-aaf7381f.css"]),o=(await t.get("https://api.binance.us/api/v3/ticker/24hr")).data.filter(a=>a.symbol.endsWith("USDT")&&!a.symbol.includes("UP")&&!a.symbol.includes("DOWN")&&!a.symbol.includes("BEAR")&&!a.symbol.includes("BULL")).sort((a,c)=>parseFloat(c.quoteVolume)-parseFloat(a.quoteVolume)).slice(0,100),n={};o.forEach(a=>{const c=a.symbol,l=c.replace("USDT",""),f=!a.priceChangePercent.startsWith("-"),F=Math.abs(Number(a.priceChangePercent)).toFixed(2),x=Number(a.volume);let N=x.toFixed(0);x>=1e9?N=(x/1e9).toFixed(1)+"B":x>=1e6&&(N=(x/1e6).toFixed(1)+"M"),n[c]={symbol:c,name:`${l}/USDT`,price:Number(a.lastPrice).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(a.lastPrice)<1?6:4}),change:a.priceChange,changePercent:F,volume:a.volume,volumeFormatted:N,isPositive:f}}),j(n),v(!1)}catch{v(!1)}})()},[]),r.useEffect(()=>{if(u)return b.current=new WebSocket("wss://stream.binance.us:9443/ws/!ticker@arr"),b.current.onmessage=s=>{const t=JSON.parse(s.data);j(i=>{const o={...i};return t.forEach(n=>{if(o[n.s]){const a=!n.P.startsWith("-"),c=Math.abs(Number(n.P)).toFixed(2),l=Number(n.v);let f=l.toFixed(0);l>=1e9?f=(l/1e9).toFixed(1)+"B":l>=1e6&&(f=(l/1e6).toFixed(1)+"M"),o[n.s]={...o[n.s],price:Number(n.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(n.c)<1?6:4}),change:n.p,changePercent:c,volume:n.v,volumeFormatted:f,isPositive:a}}}),o})},()=>{b.current&&b.current.close()}},[u]);const w=r.useMemo(()=>{const s=Object.values(y);if(s.length===0)return[];let t=s;if(p){const i=p.toLowerCase();t=t.filter(o=>o.name.toLowerCase().includes(i)||o.symbol.toLowerCase().includes(i))}switch(g){case"Gainers":return t.filter(i=>i.isPositive).sort((i,o)=>Number(o.changePercent)-Number(i.changePercent));case"Losers":return t.filter(i=>!i.isPositive).sort((i,o)=>Number(i.changePercent)-Number(o.changePercent));case"Favorites":return t.filter(i=>["BTCUSDT","ETHUSDT","BNBUSDT"].includes(i.symbol)).sort((i,o)=>Number(o.volume)-Number(i.volume));default:return t.sort((i,o)=>Number(o.volume)-Number(i.volume))}},[y,p,g]),S=s=>{P(s.symbol),h()};return u?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sidebar-overlay",onClick:h}),e.jsxs("div",{className:"coin-sidebar-fixed",children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("h3",{className:"sidebar-title",children:m("components.coinListModal.title")}),e.jsx("button",{className:"sidebar-close-btn",onClick:h,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"sidebar-search",children:e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:m("components.coinListModal.search.placeholder"),value:p,onChange:s=>d(s.target.value)}),p&&e.jsx("button",{className:"clear-btn",onClick:()=>d(""),children:e.jsx("i",{className:"fas fa-times"})})]})}),e.jsx("div",{className:"sidebar-tabs",children:["All","Gainers","Losers","Favorites"].map(s=>e.jsx("button",{className:`tab-btn ${g===s?"active":""}`,onClick:()=>C(s),children:s},s))}),e.jsx("div",{className:"sidebar-list",children:L?e.jsxs("div",{className:"loading-state",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:m("components.coinListModal.loading")})]}):w.length===0?e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("p",{children:m("components.coinListModal.noResults")})]}):w.map(s=>e.jsxs("div",{className:`coin-row ${k===s.symbol?"selected":""}`,onClick:()=>S(s),children:[e.jsxs("div",{className:"coin-left",children:[e.jsxs("div",{className:"coin-icon-wrap",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s.name.split("/")[0]}.png`,alt:s.name,onError:t=>{t.target.style.display="none",t.target.nextSibling.style.display="flex"}}),e.jsx("i",{className:"fas fa-coins fallback-icon",style:{display:"none"}})]}),e.jsxs("div",{className:"coin-meta",children:[e.jsx("span",{className:"coin-symbol",children:s.symbol}),e.jsx("span",{className:"coin-name",children:s.name})]})]}),e.jsxs("div",{className:"coin-right",children:[e.jsxs("span",{className:"coin-price",children:["$",s.price]}),e.jsxs("span",{className:`coin-change ${s.isPositive?"positive":"negative"}`,children:[s.isPositive?"+":"",s.change,"%"]})]})]},s.symbol))}),e.jsxs("div",{className:"quick-select-section",children:[e.jsx("div",{className:"section-label",children:m("components.coinListModal.popular")}),e.jsxs("div",{className:"quick-select-chips",children:[e.jsx("button",{className:"chip",onClick:()=>d("BTC"),children:"BTC"}),e.jsx("button",{className:"chip",onClick:()=>d("ETH"),children:"ETH"}),e.jsx("button",{className:"chip",onClick:()=>d("BNB"),children:"BNB"}),e.jsx("button",{className:"chip",onClick:()=>d("SOL"),children:"SOL"})]})]})]}),e.jsx("style",{children:`
        /* Overlay */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 99;
          transition: opacity 0.3s ease;
        }

        /* Fixed sidebar panel */
        .coin-sidebar-fixed {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          z-index: 100;
          background: #15161c;
          border-right: 1px solid #2a2a2e;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
          animation: slideInLeft 0.25s ease-out;
              z-index: 1003;
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .sidebar-header {
          padding: 14px 16px;
          border-bottom: 1px solid #2a2a2e;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .sidebar-title {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .sidebar-close-btn {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }

        .sidebar-close-btn:hover {
          color: #fd4b4e;
        }

        .sidebar-search {
          padding: 10px 12px;
          border-bottom: 1px solid #2a2a2e;
          flex-shrink: 0;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          color: #aaaaaa;
          font-size: 13px;
        }

        .search-box input {
          width: 100%;
          padding: 8px 32px 8px 30px;
          background: #2a2a2e;
          border: none;
          border-radius: 8px;
          color: #ffffff;
          font-size: 12px;
          outline: none;
        }

        .clear-btn {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          color: #aaaaaa;
          cursor: pointer;
          font-size: 12px;
          padding: 2px;
        }
        .clear-btn:hover {
          color: #fd4b4e;
        }

        .sidebar-tabs {
          display: flex;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid #2a2a2e;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .tab-btn {
          background: #2a2a2e;
          border: none;
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 11px;
          color: #aaaaaa;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .tab-btn.active {
          background: #fd4b4e;
          color: #ffffff;
        }

        .sidebar-list {
          flex: 1;
          overflow-y: auto;
          padding: 6px 0;
        }

        .loading-state,
        .no-results {
          text-align: center;
          padding: 30px;
          color: #aaaaaa;
          font-size: 13px;
        }

        .loading-state i,
        .no-results i {
          font-size: 24px;
          margin-bottom: 8px;
          display: block;
        }

        .coin-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.2s;
          border-bottom: 1px solid #2a2a2e;
        }

        .coin-row:hover {
          background: rgba(253, 75, 78, 0.06);
        }

        .coin-row.selected {
          background: rgba(253, 75, 78, 0.1);
          border-left: 3px solid #fd4b4e;
          padding-left: 13px;
        }

        .coin-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .coin-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .coin-icon-wrap img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .fallback-icon {
          color: #aaaaaa;
          font-size: 14px;
        }

        .coin-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .coin-symbol {
          font-weight: 700;
          font-size: 13px;
          color: #ffffff;
          white-space: nowrap;
        }

        .coin-name {
          font-size: 11px;
          color: #aaaaaa;
        }

        .coin-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .coin-price {
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
        }

        .coin-change {
          font-size: 11px;
          font-weight: 600;
        }

        .coin-change.positive {
          color: #4caf50;
        }

        .coin-change.negative {
          color: #fd4b4e;
        }

        .quick-select-section {
          padding: 12px;
          border-top: 1px solid #2a2a2e;
          flex-shrink: 0;
        }

        .section-label {
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 8px;
        }

        .quick-select-chips {
          display: flex;
          gap: 8px;
        }

        .chip {
          padding: 6px 12px;
          background: #2a2a2e;
          border: none;
          border-radius: 16px;
          color: #ffffff;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .chip:hover {
          background: #fd4b4e;
        }
      `})]}):null};export{D as C};
