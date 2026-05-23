import{j as e,L as d,u as z,k as a,p as R}from"./index-2baf2db5.js";import{p as F}from"./productListSelectors-9dbcef30.js";import{u as C}from"./useDispatch-0c7fde08.js";function L(i){const{topic:p,loading:k}=i;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(d,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),p==null?void 0:p.map((r,u)=>{var x,h;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:r==null?void 0:r.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(x=r==null?void 0:r.meta)==null?void 0:x.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(h=r==null?void 0:r.meta)==null?void 0:h.subtitle})]})]},u)})]})}const g=[{symbol:"BTCUSDT",base:"BTC"},{symbol:"ETHUSDT",base:"ETH"},{symbol:"BNBUSDT",base:"BNB"},{symbol:"SOLUSDT",base:"SOL"}],$=["/images/1.png","/images/2.png","/images/3.png"],D=[{path:"/deposit",icon:"fas fa-download",name:"Deposit",color:"#26a17b"},{path:"/Withdraw",icon:"fas fa-upload",name:"Withdraw",color:"#fd4b4e"},{path:"/trade",icon:"fas fa-chart-line",name:"Trade",color:"#2196f3"},{path:"/futures",icon:"fas fa-chart-bar",name:"Futures",color:"#9c27b0"},{path:"/profile",icon:"fas fa-user",name:"Profile",color:"#ff9800"}];function I(i,p){return{...i,[p.payload.s]:p.payload}}function P(i){return i>=1e9?(i/1e9).toFixed(1)+"B":i>=1e6?(i/1e6).toFixed(1)+"M":i>=1e3?(i/1e3).toFixed(1)+"K":i.toFixed(0)}function T(i){return i.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:i<1?4:2})}function _(){const i=C(),p=z(F.selectNews),k=z(F.selectloadingNews),[r,u]=a.useReducer(I,{}),[x,h]=a.useState(!1),[W,B]=a.useState(0),[y,E]=a.useState({}),c=a.useRef(null),j=a.useRef(0),w=a.useRef(null),v=a.useRef(0),m=a.useRef(!1);a.useEffect(()=>{i(R.doFindNews({id:1,page:1,size:5}))},[i]),a.useEffect(()=>{const t=setInterval(()=>B(s=>(s+1)%$.length),4500);return()=>clearInterval(t)},[]),a.useEffect(()=>{let t=!0;const s=()=>{if(!t)return;c.current&&(c.current.onclose=null,c.current.close(),c.current=null);const l=g.map(n=>`${n.symbol.toLowerCase()}@ticker`).join("/"),o=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${l}`);c.current=o,o.onmessage=n=>{if(!t)return;const b=Date.now();if(!(b-j.current<250)){j.current=b;try{const S=JSON.parse(n.data),f=S.data??S;f!=null&&f.s&&(u({type:"UPDATE",payload:f}),m.current||(m.current=!0,h(!0)))}catch{}}},o.onerror=()=>{t&&!m.current&&(m.current=!0,h(!0))},o.onclose=()=>{if(!t)return;const n=Math.min(3e4,3e3*Math.pow(1.5,v.current));v.current+=1,w.current=setTimeout(s,n)}};return s(),()=>{t=!1,w.current&&clearTimeout(w.current),c.current&&(c.current.onclose=null,c.current.close(),c.current=null)}},[]);const N=a.useCallback(t=>{E(s=>({...s,[t]:!0}))},[]),M=a.useMemo(()=>{const t=g.map(s=>{const l=r[s.symbol],o=l?parseFloat(l.c):null,n=l?parseFloat(l.P):null;return{base:s.base,price:o,change:n}});return[...t,...t]},[r]);return e.jsxs("div",{className:"hp-root",children:[e.jsx("div",{className:"hp-ticker-bar",children:e.jsx("div",{className:"hp-ticker-track",children:M.map((t,s)=>e.jsxs("span",{className:"hp-ticker-item",children:[e.jsx("span",{className:"hp-t-sym",children:t.base}),t.price!==null?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"hp-t-price",children:["$",T(t.price)]}),e.jsxs("span",{className:`hp-t-chg ${t.change>=0?"up":"dn"}`,children:[t.change>=0?"▲":"▼",Math.abs(t.change).toFixed(2),"%"]})]}):e.jsx("span",{className:"hp-t-price",style:{color:"#333"},children:"—"}),e.jsx("span",{className:"hp-t-dot",children:"·"})]},s))})}),e.jsxs("div",{className:"hp-hero",children:[e.jsx("div",{className:"hp-hero-glow"}),e.jsxs("div",{className:"hp-tagline",children:[e.jsxs("div",{className:"hp-live-pill",children:[e.jsx("span",{className:"hp-live-dot"}),"Live Market"]}),e.jsxs("h1",{className:"hp-h1",children:["Your Gateway to",e.jsx("br",{}),e.jsx("span",{className:"hp-accent",children:"Crypto Markets"})]}),e.jsx("p",{className:"hp-sub",children:"Spot · Futures · P2P · Staking  |  0.02% maker fee"})]}),e.jsx("div",{className:"hp-mini-prices",children:g.map(t=>{const s=r[t.symbol],l=s?parseFloat(s.c):null,o=s?parseFloat(s.P):null,n=o!==null?o>=0:!0;return e.jsxs(d,{to:`/market/detail/${t.symbol}`,className:"hp-mini-card remove_blue",children:[e.jsx("div",{className:"hp-mini-icon",children:y[t.base]?e.jsx("span",{className:"hp-fallback",children:t.base.slice(0,2)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.base}.png`,width:20,height:20,loading:"lazy",alt:t.base,onError:()=>N(t.base)})}),e.jsx("span",{className:"hp-mini-sym",children:t.base}),l!==null?e.jsxs("span",{className:`hp-mini-chg ${n?"up":"dn"}`,children:[n?"+":"",o.toFixed(2),"%"]}):e.jsx("span",{className:"hp-mini-chg",style:{color:"#444"},children:"—"})]},t.symbol)})})]}),e.jsxs("div",{className:"hp-body",children:[e.jsx("div",{className:"hp-actions-card",children:D.map(t=>e.jsxs(d,{to:t.path,className:"hp-action remove_blue",children:[e.jsx("div",{className:"hp-action-ring",children:e.jsx("i",{className:t.icon,style:{color:t.color}})}),e.jsx("span",{className:"hp-action-lbl",children:t.name})]},t.path))}),e.jsxs("div",{className:"hp-row-hdr",children:[e.jsx("span",{className:"hp-row-title",children:"Live Market"}),e.jsx(d,{to:"/market",className:"hp-see-all remove_blue",children:"See All →"})]}),e.jsx("div",{className:"hp-mkt-grid",children:g.map(t=>{const s=r[t.symbol],l=s?parseFloat(s.c):0,o=s?parseFloat(s.P):0,n=o>=0,b=s?parseFloat(s.v):0;return e.jsxs(d,{to:`/market/detail/${t.symbol}`,className:"hp-mkt-card remove_blue",children:[e.jsxs("div",{className:"hp-mkt-top",children:[e.jsx("div",{className:"hp-mkt-icon",children:y[t.base]?e.jsx("span",{className:"hp-fallback",children:t.base.slice(0,2)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.base}.png`,width:28,height:28,loading:"lazy",alt:t.base,onError:()=>N(t.base)})}),e.jsxs("div",{className:"hp-mkt-names",children:[e.jsx("span",{className:"hp-mkt-sym",children:t.base}),e.jsx("span",{className:"hp-mkt-usdt",children:"/USDT"})]}),e.jsxs("div",{className:`hp-mkt-pill ${n?"up":"dn"}`,children:[n?"▲":"▼"," ",Math.abs(o).toFixed(2),"%"]})]}),x&&s?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hp-mkt-price",children:["$",T(l)]}),e.jsxs("div",{className:"hp-mkt-vol",children:["Vol ",P(b)]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hp-sk",style:{width:"88px",height:"18px",marginBottom:"5px"}}),e.jsx("div",{className:"hp-sk",style:{width:"56px",height:"11px"}})]})]},t.symbol)})}),e.jsx("div",{className:"hp-row-hdr",children:e.jsx("span",{className:"hp-row-title",children:"Why Choose Us"})}),e.jsx("div",{className:"hp-why-list",children:[{icon:"fas fa-shield-alt",color:"#26a17b",title:"Bank-Grade Security",desc:"Cold storage + 2FA + withdrawal whitelist protection"},{icon:"fas fa-bolt",color:"#f0b90b",title:"Lightning Fast",desc:"Millisecond execution with real-time order books"},{icon:"fas fa-percentage",color:"#2196f3",title:"Lowest Fees",desc:"0.02% maker / 0.05% taker — some of the best in the industry"},{icon:"fas fa-globe",color:"#9c27b0",title:"Multi-Chain Support",desc:"Solana, Ethereum, Bitcoin and more in one platform"}].map(t=>e.jsxs("div",{className:"hp-why-card",children:[e.jsx("div",{className:"hp-why-icon",style:{background:`${t.color}18`,borderColor:`${t.color}30`},children:e.jsx("i",{className:t.icon,style:{color:t.color}})}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-why-title",children:t.title}),e.jsx("div",{className:"hp-why-desc",children:t.desc})]})]},t.title))}),e.jsxs(d,{to:"/trade",className:"hp-cta-banner remove_blue",children:[e.jsx("div",{className:"hp-cta-glow"}),e.jsxs("div",{children:[e.jsx("div",{className:"hp-cta-title",children:"Start Trading Now"}),e.jsx("div",{className:"hp-cta-sub",children:"Access 200+ crypto pairs · Zero deposit fees"})]}),e.jsx("div",{className:"hp-cta-arrow",children:e.jsx("i",{className:"fas fa-arrow-right"})})]}),e.jsx(L,{topic:p,loading:k}),e.jsx("div",{style:{height:"32px"}})]}),e.jsx("style",{children:`
        /* ── Reset / Base ── */
        .hp-root {
          min-height: 100vh;
          background: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
        }
        a.remove_blue { text-decoration: none; color: inherit; }

        /* ── Ticker ── */
        .hp-ticker-bar {
          background: #0a0b0f;
          border-bottom: 1px solid #1a1b22;
          height: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hp-ticker-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: hpScroll 22s linear infinite;
        }
        @keyframes hpScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hp-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0 18px;
          font-size: 11px;
        }
        .hp-t-sym   { color: #666; font-weight: 700; }
        .hp-t-price { color: #bbb; font-weight: 500; }
        .hp-t-chg.up { color: #26a17b; }
        .hp-t-chg.dn { color: #fd4b4e; }
        .hp-t-dot    { color: #222; margin-left: 10px; }

        /* ── Hero ── */
        .hp-hero {
          position: relative;
          background: linear-gradient(170deg, #12131b 0%, #0e0f14 55%, #180a0b 100%);
          padding: 0 0 20px;
          overflow: hidden;
          max-width: 400px;
          margin: 0 auto;
        }
        .hp-hero-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253,75,78,0.14) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Slider */
        .hp-slider {
          position: relative;
          overflow: hidden;
        }
        .hp-slides {
          display: flex;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
        }
        .hp-slide { min-width: 100%; }
        .hp-slide img { width: 100%; display: block; object-fit: cover; }
        .hp-dots {
          position: absolute;
          bottom: 10px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 2;
        }
        .hp-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.3s;
        }
        .hp-dot.on { width: 20px; border-radius: 4px; background: #fd4b4e; }

        /* Tagline */
        .hp-tagline {
          padding: 18px 18px 0;
        }
        .hp-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(38,161,123,0.12);
          border: 1px solid rgba(38,161,123,0.3);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          color: #26a17b;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: 0.4px;
        }
        .hp-live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #26a17b;
          animation: hpBlink 2s infinite;
        }
        @keyframes hpBlink {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(1.4); }
        }
        .hp-h1 {
          font-size: 27px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }
        .hp-accent {
          background: linear-gradient(90deg, #fd4b4e 0%, #ff8a6e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hp-sub {
          color: #666;
          font-size: 12.5px;
          margin: 0 0 16px;
          letter-spacing: 0.2px;
        }

        /* Mini price row */
        .hp-mini-prices {
          display: flex;
          gap: 8px;
          padding: 0 18px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .hp-mini-prices::-webkit-scrollbar { display: none; }
        .hp-mini-card {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid #1e1f26;
          border-radius: 10px;
          padding: 7px 12px;
          transition: border-color 0.2s;
        }
        .hp-mini-card:hover { border-color: #fd4b4e33; }
        .hp-mini-icon {
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; border-radius: 50%;
        }
        .hp-mini-sym  { color: #ccc; font-size: 12px; font-weight: 700; }
        .hp-mini-chg  { font-size: 11px; font-weight: 700; }
        .hp-mini-chg.up { color: #26a17b; }
        .hp-mini-chg.dn { color: #fd4b4e; }

        /* ── Body ── */
        .hp-body {
          max-width: 400px;
          margin: 0 auto;
          padding: 16px 14px 0;
          box-sizing: border-box;
        }

        /* ── Quick Actions ── */
        .hp-actions-card {
          display: flex;
          justify-content: space-between;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 16px;
          padding: 16px 6px;
          margin-bottom: 22px;
        }
        .hp-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }
        .hp-action-ring {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: #0e0f14;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          transition: background 0.2s, border-color 0.2s;
        }
        .hp-action:hover .hp-action-ring {
          background: #1a1b23;
          border-color: #3a3a42;
        }
        .hp-action-lbl {
          font-size: 10.5px;
          color: #888;
          font-weight: 600;
          text-align: center;
        }

        /* ── Section header row ── */
        .hp-row-hdr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .hp-row-title { color: #fff; font-size: 15px; font-weight: 700; }
        .hp-see-all   { color: #fd4b4e; font-size: 12.5px; font-weight: 600; }

        /* ── Market Grid ── */
        .hp-mkt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .hp-mkt-card {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 12px;
          display: block;
          transition: border-color 0.2s, background 0.2s;
        }
        .hp-mkt-card:hover { background: #1a1b24; border-color: #2a2a35; }
        .hp-mkt-top {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
        }
        .hp-mkt-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #0e0f14;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .hp-mkt-names { flex: 1; min-width: 0; }
        .hp-mkt-sym   { color: #fff; font-size: 13px; font-weight: 700; display: block; line-height: 1.2; }
        .hp-mkt-usdt  { color: #444; font-size: 10px; }
        .hp-mkt-pill  {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 6px;
        }
        .hp-mkt-pill.up { background: rgba(38,161,123,0.15); color: #26a17b; }
        .hp-mkt-pill.dn { background: rgba(253,75,78,0.12);  color: #fd4b4e; }
        .hp-mkt-price { color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .hp-mkt-vol   { color: #444; font-size: 11px; }

        /* ── Trading Products ── */
        .hp-prod-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .hp-prod-card {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 12px;
          display: block;
          transition: border-color 0.2s, background 0.2s;
        }
        .hp-prod-card:hover { background: #1a1b24; border-color: #2a2a35; }
        .hp-prod-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .hp-prod-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(253,75,78,0.1);
          border: 1px solid rgba(253,75,78,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fd4b4e; font-size: 16px;
        }
        .hp-prod-badge {
          font-size: 9px;
          font-weight: 800;
          background: rgba(253,75,78,0.15);
          color: #fd4b4e;
          padding: 2px 7px;
          border-radius: 6px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(253,75,78,0.2);
        }
        .hp-prod-label { color: #fff; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
        .hp-prod-desc  { color: #555; font-size: 11px; line-height: 1.5; }

        /* ── Why section ── */
        .hp-why-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }
        .hp-why-card {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 14px;
        }
        .hp-why-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 10px;
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .hp-why-title { color: #fff; font-size: 13.5px; font-weight: 700; margin-bottom: 3px; }
        .hp-why-desc  { color: #555; font-size: 11.5px; line-height: 1.5; }

        /* ── CTA Banner ── */
        .hp-cta-banner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #1d0708 0%, #2a0b0c 100%);
          border: 1px solid rgba(253,75,78,0.3);
          border-radius: 16px;
          padding: 18px 16px;
          margin-bottom: 24px;
          overflow: hidden;
          gap: 12px;
        }
        .hp-cta-glow {
          position: absolute;
          left: -40px; top: -40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253,75,78,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .hp-cta-title { color: #fff; font-size: 15px; font-weight: 800; margin-bottom: 3px; }
        .hp-cta-sub   { color: #888; font-size: 11.5px; }
        .hp-cta-arrow {
          flex-shrink: 0;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #fd4b4e;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 14px;
        }

        /* ── Shimmer skeleton ── */
        .hp-sk {
          display: block;
          border-radius: 4px;
          animation: hpShimmer 1.5s infinite linear;
          background: linear-gradient(to right, #2a2a2e 8%, #323236 18%, #2a2a2e 33%);
          background-size: 800px 104px;
        }
        @keyframes hpShimmer {
          0%   { background-position: -468px 0; }
          100% { background-position:  468px 0; }
        }

        /* ── Fallback icon ── */
        .hp-fallback {
          font-size: 9px; font-weight: 800; color: #fd4b4e;
        }

        /* ══════════════════ NEWS STYLES ══════════════════ */
        .crypto-news-container {
          max-width: 400px;
          margin: 0 auto;
        }
        .news-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .news-sections-title {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
        .news-see-all {
          color: #fd4b4e;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
        }
        .news-item-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #15161c;
          border-radius: 14px;
          padding: 12px 12px;
          border: 1px solid #1e1f26;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          overflow: hidden;
        }
        .news-item-card:hover {
          background: #1a1b24;
          border-color: #2a2a35;
        }
        .news-image-placeholder {
          width: 76px;
          height: 68px;
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          background: #2a2a2e;
          display: block;
        }
        .news-content-wrapper {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .news-headline {
          color: #e8e8e8;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.45;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-summary {
          color: #555;
          font-size: 11.5px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-meta-info {
          color: #3a3a42;
          font-size: 10.5px;
          margin-top: 6px;
        }
      `})]})}export{_ as default};
