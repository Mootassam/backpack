import{j as e,k as b,y as u,p as t,u as d,t as p}from"./index-f6bcde00.js";import{p as f}from"./productListSelectors-2b92b356.js";import{D as k}from"./Dates-da108157.js";import{u as y}from"./useDispatch-f673bc67.js";import"./v4-4a60fe23.js";function N(o){const{topic:n,loading:x}=o;return e.jsxs(e.Fragment,{children:[n==null?void 0:n.map((s,c)=>{var i,l;return e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{className:"news-header",children:[e.jsx("div",{className:"news-source",children:e.jsx("i",{className:"fas fa-newspaper"})}),e.jsxs("div",{className:"news-info",children:[e.jsx("div",{className:"news-source-name",children:s==null?void 0:s.meta.sourceName}),e.jsxs("div",{className:"news-date",children:[" ",k.NewsDate(s.meta.updatedAt)]})]})]}),e.jsx("div",{className:"news-title",children:(i=s==null?void 0:s.meta)==null?void 0:i.title}),e.jsx("div",{className:"news-content",children:(l=s==null?void 0:s.meta)==null?void 0:l.subtitle}),e.jsx("img",{loading:"lazy",src:s==null?void 0:s.cover,className:"news-image"}),e.jsxs("div",{className:"news-footer",children:[e.jsx("div",{className:"news-tags",children:s.assets.map(r=>e.jsxs("span",{className:"news-tag",style:{display:"flex",alignItems:"center",gap:3},children:[e.jsx("img",{src:`https://s2.coinmarketcap.com/static/img/coins/64x64/${r.coinId}.png`,alt:"",style:{width:10,height:10}})," ",r.symbol]}))}),e.jsx("div",{className:"news-actions"})]})]},c)}),e.jsx("style",{children:`
        .news-item {
          background-color: #15161c;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          transition: background-color 0.2s;
        }
        .news-item:hover {
          background-color: rgba(253, 75, 78, 0.05);
        }

        .news-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .news-source {
          width: 36px;
          height: 36px;
          background-color: #0e0f14;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 14px;
          flex-shrink: 0;
        }

        .news-info {
          flex: 1;
        }

        .news-source-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .news-date {
          color: #888888;
          font-size: 12px;
        }

        .news-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .news-content {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .news-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 12px;
          background-color: #0e0f14;
        }

        .news-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #2a2a2e;
          padding-top: 12px;
        }

        .news-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .news-tag {
          background-color: #0e0f14;
          color: #ffffff;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .news-tag img {
          border-radius: 50%;
        }

        .news-actions {
          display: flex;
          gap: 12px;
        }
      `})]})}const j=[{key:"news",coin:0,label:"All"},{key:"bitcoin",coin:1,label:"Bitcoin"},{key:"ethereum",coin:1027,label:"Ethereum"},{key:"Usdt",coin:825,label:"Usdt"},{key:"BNB",coin:1839,label:"BNB"},{key:"Solona",coin:5426,label:"Solona"},{key:"USDC",coin:3408,label:"USDC"},{key:"XRP",coin:52,label:"XRP"},{key:"toncoin",coin:11419,label:"TonCoin"}],v=()=>e.jsx("div",{className:"news-placeholder",children:[...Array(5)].map((o,n)=>e.jsxs("div",{className:"news-item-placeholder",children:[e.jsx("div",{className:"placeholder-image shimmer"}),e.jsxs("div",{className:"placeholder-content",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"14px",marginBottom:"12px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]})]},n))});function S(){const o=y(),n=u(),[x,s]=t.useState("news"),c=d(f.selectNews),i=d(f.selectloadingNews);d(f.selectRows);const l=t.useMemo(()=>j,[]),r=t.useCallback((a,m)=>{s(a);const w={id:m,page:1,size:30};o(p.doFindNews(w))},[o]),h=t.useCallback(()=>{o(p.doFetch());const a={id:1,page:1,size:60};o(p.doFindNews(a))},[o]);t.useEffect(()=>{h()},[h]);const g=()=>n.goBack();return e.jsxs("div",{className:"news-page",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:g,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:"Crypto News"}),e.jsx("div",{className:"header-placeholder"})]}),e.jsx("div",{className:"news-filters",children:l.map(a=>e.jsx("button",{className:`filter-button ${x===a.key?"active":""}`,onClick:()=>r(a.key,a.coin),children:a.label},a.key))}),e.jsxs("div",{className:"news-list",children:[e.jsx("div",{className:"news-section-title",children:"Latest News"}),i?e.jsx(v,{}):e.jsx(N,{topic:c,loading:i})]}),e.jsx("style",{children:`
        /* ===== GLOBAL ===== */
        .news-page {
          min-height: 100vh;
          background-color: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        /* ===== TOP HEADER ===== */
        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        .back-button:hover {
          background-color: rgba(253, 75, 78, 0.15);
        }
        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header-placeholder {
          width: 32px;
        }

        /* ===== FILTERS ===== */
        .news-filters {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 8px;
          padding: 12px 15px;
          margin-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        .news-filters::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .filter-button {
          flex-shrink: 0;
          background-color: #15161c;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #aaaaaa;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .filter-button.active {
          background-color: #fd4b4e;
          color: #ffffff;
        }
        .filter-button:hover:not(.active) {
          background-color: rgba(253, 75, 78, 0.15);
          color: #ffffff;
        }

        /* ===== NEWS LIST ===== */
        .news-list {
          padding: 0 15px;
        }
        .news-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        /* ===== PLACEHOLDERS ===== */
        .news-placeholder {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .news-item-placeholder {
          display: flex;
          gap: 12px;
          background-color: #15161c;
          border-radius: 12px;
          padding: 12px;
        }
        .placeholder-image {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          background-color: #2a2a2e;
          flex-shrink: 0;
        }
        .placeholder-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .placeholder-line {
          background-color: #2a2a2e;
          border-radius: 4px;
        }
        .shimmer {
          background: linear-gradient(90deg, #2a2a2e 25%, #3a3a3e 50%, #2a2a2e 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `})]})}const F=b.memo(S);export{F as default};
