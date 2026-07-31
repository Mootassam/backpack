import{j as e,L as p,R as _,n as g,y as S,z,k as n,w as a,p as A}from"./index-9fb4ec24.js";import{p as u}from"./productListSelectors-570c3ed8.js";import{u as F}from"./useNotifications-ac174185.js";import{u as E}from"./useDispatch-09756e97.js";function C(r){const{topic:c,loading:f}=r;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px",margin:"0 auto"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(p,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),c==null?void 0:c.map((s,x)=>{var t,m;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:s==null?void 0:s.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(t=s==null?void 0:s.meta)==null?void 0:t.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(m=s==null?void 0:s.meta)==null?void 0:m.subtitle})]})]},x)}),e.jsx("style",{children:`
        .crypto-news-container {
          padding: 0 15px 20px;
        }

        .news-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 5px 10px;
          margin-bottom: 8px;
        }

        .news-sections-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          padding-bottom: 6px;
          border-bottom: 1px solid #2a2a2e;
        }

        .news-see-all {
          font-size: 13px;
          color: #F41112;
          font-weight: 500;
          transition: color 0.2s;
          text-decoration: none;
        }
        .news-see-all:hover {
          color: #F64141;
        }

        .news-item-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background-color: #15161c;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 10px;
          transition: background-color 0.2s;
        }
        .news-item-card:hover {
          background-color: rgba(244, 17, 18, 0.05);
        }

        .news-image-placeholder {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          background-color: #0e0f14;
        }

        .news-content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .news-headline {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .news-summary {
          color: #aaaaaa;
          font-size: 12px;
          line-height: 1.4;
        }

        .news-meta-info {
          color: #888888;
          font-size: 11px;
          margin-top: 6px;
        }

        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        @media (max-width: 480px) {
          .news-image-placeholder {
            width: 70px;
            height: 70px;
          }
          .news-headline {
            font-size: 13px;
          }
        }
      `})]})}const D=`
  .app-header {
    background-color: #0e0f14;
    padding: 10px 0;
    border-bottom: 1px solid #2a2a2e;
    margin: auto;
    max-width: 400px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  /* Notification Styles */
  .notification-containers {
    position: relative;
  }
  
  .notification-btn {
    position: relative;
    background: #15161c;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #F41112;
  }
  
  .notification-btn:hover {
    background: rgba(244, 17, 18, 0.15);
    transform: scale(1.1);
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #F41112;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  /* Profile Button */
  .profile-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .profile-avatars {
    width: 40px;
    height: 40px;
    background: #15161c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F41112;
    transition: all 0.2s ease;
  }
  
  .profile-avatars:hover {
    background: rgba(244, 17, 18, 0.15);
    transform: scale(1.1);
  }
`;function T(){const r=g(S.selectCurrentUser),c=g(z.selectCount),f=n.useMemo(()=>(r==null?void 0:r.id)||null,[r==null?void 0:r.id]);F(f);const s=n.useMemo(()=>c<=0?null:e.jsx("span",{className:"notification-badge",children:c>99?"99+":c}),[c]),x=n.useMemo(()=>e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/playsotre/logo.svg",alt:"App Logo",style:{height:25},loading:"lazy"})}),[]),t=n.useMemo(()=>e.jsx(p,{to:"/notification","aria-label":"Notifications",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn",type:"button",children:[e.jsx("i",{className:"fas fa-bell"}),s]})})}),[s]),m=n.useMemo(()=>e.jsx(p,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})}),[]);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:x}),e.jsxs("div",{className:"header-right",children:[t,m]})]}),e.jsx("style",{children:D})]})}const B=_.memo(T);function O(){const r=E();n.useState(""),n.useState([]),g(u.selectRows),g(u.selectLoading),n.useState();const c=g(u.selectNews),f=g(u.selectloadingNews),[s,x]=n.useState({}),t=n.useRef(null);a("pages.home.notifications.btcAlert"),a("pages.home.notifications.btcReached"),a("pages.home.notifications.fiveMinAgo"),a("pages.home.notifications.depositSuccess"),a("pages.home.notifications.depositConfirmed"),a("pages.home.notifications.oneHourAgo"),a("pages.home.notifications.securityUpdate"),a("pages.home.notifications.newSecurityFeatures"),a("pages.home.notifications.twoHoursAgo"),a("pages.home.notifications.marketNews"),a("pages.home.notifications.ethUpgrade"),a("pages.home.notifications.fiveHoursAgo"),n.useEffect(()=>{const o={id:1,page:1,size:5};r(A.doFindNews(o))},[]),n.useEffect(()=>{const i=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(l=>`${l.toLowerCase()}@ticker`).join("/");return t.current=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${i}`),t.current.onopen=()=>{},t.current.onmessage=l=>{try{const d=JSON.parse(l.data).data;if(d&&d.s){const b=d.s,j=!d.P.startsWith("-"),N=Math.abs(Number(d.P)).toFixed(2),h=Number(d.v);let v=h.toFixed(0);h>=1e9?v=(h/1e9).toFixed(1)+"B":h>=1e6&&(v=(h/1e6).toFixed(1)+"M"),x(k=>({...k,[b]:{symbol:b,name:`${b.replace("USDT","")}/USDT`,price:Number(d.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(d.c)<1?6:4}),change:d.p,changePercent:N,volume:d.v,volumeFormatted:v,isPositive:j}}))}}catch(w){console.error("Error parsing WebSocket message:",w)}},t.current.onerror=l=>{console.error("Home WebSocket error:",l)},t.current.onclose=()=>{setTimeout(()=>{t.current},5e3)},()=>{t.current&&t.current.readyState===WebSocket.OPEN&&t.current.close()}},[]),n.useState("/security-tips");const m=[{path:"/security-tips",icon:"fas fa-shield-alt",name:a("pages.home.quickAccess.security")},{path:"/faq-center",icon:"fas fa-question-circle",name:a("pages.home.quickAccess.faqCenter")},{icon:"fas fa-gift",path:"/invitation",name:a("pages.home.quickAccess.invitation")},{path:"/stacking",icon:"fas fa-coins ",name:a("pages.home.quickAccess.staking")}],y=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container home-page",children:[e.jsx(B,{}),e.jsxs("div",{className:"home-hero",children:[e.jsxs("div",{className:"home-hero-media__video-overlay",children:[e.jsx("video",{className:"home-hero-media__video",src:"/hero.mp4",autoPlay:!0,loop:!0,muted:!0,playsInline:!0}),e.jsx("div",{className:"home-hero-media__grid"}),e.jsx("div",{className:"home-hero-media__gradient"})]}),e.jsxs("div",{className:"home-hero__content",children:[e.jsxs("div",{className:"home-hero__badge",children:[e.jsx("img",{src:"/images/logo.png",alt:"Backpack  Exchange"}),e.jsxs("span",{children:["FxPro ",e.jsx("br",{}),"Exchange"]})]}),e.jsxs("h1",{className:"home-hero__title",children:["Trade Crypto",e.jsx("br",{}),"Like a Pro"]}),e.jsx("p",{className:"home-hero__subtitle",children:a("pages.home.hero.subtitle")}),e.jsxs(p,{to:"/market",className:"home-hero__cta remove_blue",children:[a("pages.home.hero.cta"),e.jsx("i",{className:"fas fa-arrow-right"})]})]})]}),e.jsxs("div",{className:"quick-access card-style",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h2",{className:"section-title",children:a("pages.home.quickAccess.title")}),e.jsxs(p,{to:"/deposit",className:"deposit-header-button remove_blue",children:[e.jsx("div",{className:"deposit-header-icon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("span",{className:"deposit-header-text",children:a("pages.home.quickAccess.deposit")})]})]}),e.jsx("div",{className:"access-grid",children:m.map(o=>e.jsxs(p,{to:o.path,className:"access-card remove_blue",children:[e.jsx("div",{className:"access-icon",children:e.jsx("i",{className:o.icon})}),e.jsx("span",{className:"access-text",children:o.name})]},o.path))})]}),e.jsxs("div",{className:"favorites-header card-style",children:[e.jsx("div",{className:"favorites-title",children:a("pages.home.popularCryptos")}),e.jsxs(p,{to:"/market",className:"see-all remove_blue",children:[a("pages.home.seeAll")," →"]})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:y.map(o=>{const i=s[o.symbol],l=o.symbol.replace("USDT","/USDT");return e.jsxs(p,{to:`/market/detail/${o.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:o.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${l==null?void 0:l.split("/")[0]}.png`,className:o.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:l}),e.jsxs("div",{className:"crypto-volume",children:[a("pages.home.volume"),": ",i?i.volumeFormatted:a("pages.home.loading")]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:i?`$${i.price}`:a("pages.home.loading")}),e.jsx("div",{className:`change ${i?i.isPositive?"positive":"negative":""}`,children:i?`${i.isPositive?"+":""}${i.changePercent}%`:a("pages.home.loading")})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:i?i.isPositive?"#4caf50":"#F41112":"#aaaaaa"}})})]},o.symbol)})}),e.jsx(C,{topic:c,loading:f}),e.jsx("style",{children:`
        /* ===== GLOBAL RESET & BASE ===== */
        .home-page {
          min-height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        /* ===== CARDS (matching profile's content-card) ===== */
        .card-style {
          background-color: #15161c;
          border-radius: 24px;
          padding: 20px;
          margin: 16px 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* ===== HERO ===== */
        .home-hero {
          position: relative;
          margin: 0 -5px 16px;
          min-height: 320px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #0a0b0f;
        }
        .home-hero-media__video-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .home-hero-media__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .home-hero-media__grid {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.15));
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.15));
        }
        .home-hero-media__gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 90% at 15% 20%, rgba(244, 17, 18, 0.35) 0%, rgba(244, 17, 18, 0) 55%),
            radial-gradient(100% 80% at 90% 100%, rgba(244, 17, 18, 0.18) 0%, rgba(244, 17, 18, 0) 60%),
            linear-gradient(160deg, rgba(10, 11, 15, 0.75) 0%, rgba(20, 21, 28, 0.45) 55%, rgba(10, 11, 15, 0.75) 100%);
        }
        .home-hero__content {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 36px 24px 32px;
          text-align: center;
        }
        .home-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(244, 17, 18, 0.12);
          border: 1px solid rgba(244, 17, 18, 0.35);
          border-radius: 999px;
          padding: 6px 14px 6px 6px;
          margin-bottom: 18px;
        }
        .home-hero__badge img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }
        .home-hero__badge span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #ffffff;
          line-height: 1.15;
          text-align: left;
        }
        .home-hero__title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 10px;
          letter-spacing: -0.3px;
        }
        .home-hero__subtitle {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.55;
          margin: 0 auto 24px;
          max-width: 300px;
        }
        .home-hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F41112;
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 700;
          padding: 13px 26px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(244, 17, 18, 0.35);
          transition: background-color 0.2s, transform 0.15s;
        }
        .home-hero__cta:hover {
          background: #AD1111;
          transform: translateY(-2px);
        }
        @media (max-width: 350px) {
          .home-hero__title {
            font-size: 24px;
          }
        }

        /* ===== QUICK ACCESS ===== */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
          width: fit-content;
        }
        .access-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .access-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 14px 8px;
          transition: transform 0.2s, background-color 0.2s;
          text-align: center;
        }
        .access-card:hover {
          transform: translateY(-3px);
          background-color: rgba(244, 17, 18, 0.08);
        }
        .access-icon {
          font-size: 22px;
          color: #F41112;
          margin-bottom: 8px;
        }
        .access-text {
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.3;
        }

        /* Deposit button */
        .deposit-header-button {
          display: flex;
          align-items: center;
          background: #F41112;
          border-radius: 10px;
          padding: 8px 16px;
          transition: background-color 0.2s;
          box-shadow: 0 2px 8px rgba(244, 17, 18, 0.3);
        }
        .deposit-header-button:hover {
          background-color: #AD1111;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 17, 18, 0.4);
        }
        .deposit-header-icon {
          font-size: 14px;
          color: #ffffff;
          margin-right: 6px;
        }
        .deposit-header-text {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }

        /* ===== FAVORITES HEADER ===== */
        .favorites-header.card-style {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
        }
        .favorites-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .see-all {
          font-size: 13px;
          color: #F41112;
          font-weight: 500;
        }

        /* ===== MARKET LIST ===== */
        .market-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #15161c;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 10px;
          transition: background-color 0.2s;
        }
        .market-item:hover {
          background-color: rgba(244, 17, 18, 0.05);
        }
        .crypto-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .crypto-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .crypto-name {
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
        }
        .crypto-volume {
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 2px;
        }
        .price-info {
          text-align: right;
        }
        .price {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }
        .change {
          font-size: 12px;
          margin-top: 2px;
        }
        .change.positive {
          color: #4caf50;
        }
        .change.negative {
          color: #F41112;
        }
        .chart i {
          font-size: 18px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 480px) {
          .access-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          .access-card {
            padding: 10px 5px;
          }
          .access-icon {
            font-size: 20px;
          }
          .access-text {
            font-size: 11px;
          }
          .card-style {
            margin: 12px 10px;
            padding: 16px;
          }
          .market-item {
            padding: 12px 14px;
          }
        }

        @media (max-width: 350px) {
          .access-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `})]})}export{O as default};
