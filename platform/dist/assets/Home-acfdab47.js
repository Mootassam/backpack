import{j as e,L as m,k as E,u as f,n as C,o as D,p as a,q as s,t as T}from"./index-58d25818.js";import{p as b}from"./productListSelectors-ef0c3d4c.js";import{u as B}from"./useNotifications-853a72f5.js";import{u as F}from"./useDispatch-a18d5675.js";function L(r){const{topic:c,loading:h}=r;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px",margin:"0 auto"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(m,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),c==null?void 0:c.map((o,x)=>{var n,p;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:o==null?void 0:o.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(n=o==null?void 0:o.meta)==null?void 0:n.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(p=o==null?void 0:o.meta)==null?void 0:p.subtitle})]})]},x)}),e.jsx("style",{children:`
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
          color: #fd4b4e;
          font-weight: 500;
          transition: color 0.2s;
          text-decoration: none;
        }
        .news-see-all:hover {
          color: #ff6b6e;
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
          background-color: rgba(253, 75, 78, 0.05);
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
      `})]})}const U=`
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
    color: #fd4b4e;
  }
  
  .notification-btn:hover {
    background: rgba(253, 75, 78, 0.15);
    transform: scale(1.1);
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #fd4b4e;
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
    color: #fd4b4e;
    transition: all 0.2s ease;
  }
  
  .profile-avatars:hover {
    background: rgba(253, 75, 78, 0.15);
    transform: scale(1.1);
  }
`;function $(){const r=f(C.selectCurrentUser),c=f(D.selectCount),h=a.useMemo(()=>(r==null?void 0:r.id)||null,[r==null?void 0:r.id]);B(h);const o=a.useMemo(()=>c<=0?null:e.jsx("span",{className:"notification-badge",children:c>99?"99+":c}),[c]),x=a.useMemo(()=>e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/playsotre/logo.svg",alt:"App Logo",style:{height:25},loading:"lazy"})}),[]),n=a.useMemo(()=>e.jsx(m,{to:"/notification","aria-label":"Notifications",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn",type:"button",children:[e.jsx("i",{className:"fas fa-bell"}),o]})})}),[o]),p=a.useMemo(()=>e.jsx(m,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})}),[]);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:x}),e.jsxs("div",{className:"header-right",children:[n,p]})]}),e.jsx("style",{children:U})]})}const R=E.memo($);function I(){const r=F();a.useState(""),a.useState([]),f(b.selectRows),f(b.selectLoading),a.useState();const c=f(b.selectNews),h=f(b.selectloadingNews),[o,x]=a.useState({}),n=a.useRef(null),[p,j]=a.useState(0),u=["/images/1.png","/images/2.png","/images/3.png"];s("pages.home.notifications.btcAlert"),s("pages.home.notifications.btcReached"),s("pages.home.notifications.fiveMinAgo"),s("pages.home.notifications.depositSuccess"),s("pages.home.notifications.depositConfirmed"),s("pages.home.notifications.oneHourAgo"),s("pages.home.notifications.securityUpdate"),s("pages.home.notifications.newSecurityFeatures"),s("pages.home.notifications.twoHoursAgo"),s("pages.home.notifications.marketNews"),s("pages.home.notifications.ethUpgrade"),s("pages.home.notifications.fiveHoursAgo"),a.useEffect(()=>{const i={id:1,page:1,size:5};r(T.doFindNews(i))},[]),a.useEffect(()=>{const i=setInterval(()=>{j(t=>(t+1)%u.length)},5e3);return()=>clearInterval(i)},[u.length]),a.useEffect(()=>{const t=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(l=>`${l.toLowerCase()}@ticker`).join("/");return n.current=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${t}`),n.current.onopen=()=>{},n.current.onmessage=l=>{try{const d=JSON.parse(l.data).data;if(d&&d.s){const v=d.s,S=!d.P.startsWith("-"),A=Math.abs(Number(d.P)).toFixed(2),g=Number(d.v);let y=g.toFixed(0);g>=1e9?y=(g/1e9).toFixed(1)+"B":g>=1e6&&(y=(g/1e6).toFixed(1)+"M"),x(z=>({...z,[v]:{symbol:v,name:`${v.replace("USDT","")}/USDT`,price:Number(d.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(d.c)<1?6:4}),change:d.p,changePercent:A,volume:d.v,volumeFormatted:y,isPositive:S}}))}}catch(w){console.error("Error parsing WebSocket message:",w)}},n.current.onerror=l=>{console.error("Home WebSocket error:",l)},n.current.onclose=()=>{setTimeout(()=>{n.current},5e3)},()=>{n.current&&n.current.readyState===WebSocket.OPEN&&n.current.close()}},[]),a.useState("/security-tips");const N=[{path:"/security-tips",icon:"fas fa-shield-alt",name:s("pages.home.quickAccess.security")},{path:"/faq-center",icon:"fas fa-question-circle",name:s("pages.home.quickAccess.faqCenter")},{icon:"fas fa-gift",path:"/invitation",name:s("pages.home.quickAccess.invitation")},{path:"/stacking",icon:"fas fa-coins ",name:s("pages.home.quickAccess.staking")}],k=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container home-page",children:[e.jsx(R,{}),e.jsx("div",{className:"slider-container card-style",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${p*100}%)`},children:u.map((i,t)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:i,alt:`Slide ${t+1}`})},t))}),e.jsx("div",{className:"slider-indicators",children:u.map((i,t)=>e.jsx("div",{className:`slider-indicator ${t===p?"active":""}`},t))})]})}),e.jsxs("div",{className:"quick-access card-style",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h2",{className:"section-title",children:s("pages.home.quickAccess.title")}),e.jsxs(m,{to:"/deposit",className:"deposit-header-button remove_blue",children:[e.jsx("div",{className:"deposit-header-icon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("span",{className:"deposit-header-text",children:s("pages.home.quickAccess.deposit")})]})]}),e.jsx("div",{className:"access-grid",children:N.map(i=>e.jsxs(m,{to:i.path,className:"access-card remove_blue",children:[e.jsx("div",{className:"access-icon",children:e.jsx("i",{className:i.icon})}),e.jsx("span",{className:"access-text",children:i.name})]},i.path))})]}),e.jsxs("div",{className:"favorites-header card-style",children:[e.jsx("div",{className:"favorites-title",children:s("pages.home.popularCryptos")}),e.jsxs(m,{to:"/market",className:"see-all remove_blue",children:[s("pages.home.seeAll")," →"]})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:k.map(i=>{const t=o[i.symbol],l=i.symbol.replace("USDT","/USDT");return e.jsxs(m,{to:`/market/detail/${i.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:i.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${l==null?void 0:l.split("/")[0]}.png`,className:i.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:l}),e.jsxs("div",{className:"crypto-volume",children:[s("pages.home.volume"),": ",t?t.volumeFormatted:s("pages.home.loading")]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:t?`$${t.price}`:s("pages.home.loading")}),e.jsx("div",{className:`change ${t?t.isPositive?"positive":"negative":""}`,children:t?`${t.isPositive?"+":""}${t.changePercent}%`:s("pages.home.loading")})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:t?t.isPositive?"#4caf50":"#fd4b4e":"#aaaaaa"}})})]},i.symbol)})}),e.jsx(L,{topic:c,loading:h}),e.jsx("style",{children:`
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

        /* ===== SLIDER ===== */
        .slider-container.card-style {
          padding: 0;
          overflow: hidden;
        }
        .slider {
          position: relative;
          width: 100%;
        }
        .slides-container {
          display: flex;
          transition: transform 0.5s ease-in-out;
          height: auto;
        }
        .slide {
          min-width: 100%;
        }
        .slide img {
          width: 100%;
          object-fit: contain;
          border-radius: 24px 24px 0 0;
        }
        .slider-indicators {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .slider-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transition: background-color 0.3s ease;
        }
        .slider-indicator.active {
          background-color: #fd4b4e;
          width: 20px;
          border-radius: 4px;
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
          background-color: rgba(253, 75, 78, 0.08);
        }
        .access-icon {
          font-size: 22px;
          color: #fd4b4e;
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
          background: #fd4b4e;
          border-radius: 10px;
          padding: 8px 16px;
          transition: background-color 0.2s;
          box-shadow: 0 2px 8px rgba(253, 75, 78, 0.3);
        }
        .deposit-header-button:hover {
          background-color: #e04345;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(253, 75, 78, 0.4);
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
          color: #fd4b4e;
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
          background-color: rgba(253, 75, 78, 0.05);
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
          color: #fd4b4e;
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
      `})]})}export{I as default};
