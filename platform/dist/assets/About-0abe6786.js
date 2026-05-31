import{j as t,y as p,u as c,B as i,p as f,C as x,q as r}from"./index-3bb87590.js";import{u}from"./useDispatch-a9165e4b.js";function m(){return t.jsx("div",{className:"loading__page",children:t.jsx("div",{className:"spinner__big"})})}function h(){var n,s;const a=u(),l=p(),e=c(i.selectRows),o=c(i.selectLoading);f.useEffect(()=>{a(x.doFetch())},[a]);const d=()=>l.goBack();return t.jsxs("div",{className:"about-page",children:[t.jsxs("div",{className:"about-container",children:[t.jsxs("div",{className:"top-header",children:[t.jsx("div",{className:"back-button",onClick:d,children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsx("h1",{className:"page-title",children:r("pages.about.title")}),t.jsx("div",{className:"header-placeholder"})]}),t.jsxs("div",{className:"content-card",children:[o&&t.jsx(m,{}),!o&&e&&((n=e[0])==null?void 0:n.companydetails)&&t.jsx("div",{className:"about-content",dangerouslySetInnerHTML:{__html:(s=e[0])==null?void 0:s.companydetails}}),!o&&(!e||e.length===0)&&t.jsxs("div",{className:"empty-state",children:[t.jsx("i",{className:"fas fa-info-circle"}),t.jsx("p",{children:r("pages.about.noData")})]})]})]}),t.jsx("style",{children:`
        .about-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .about-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

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

        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
          min-height: 200px;
        }

        /* Rich text content */
        .about-content {
          color: #cccccc;
          font-size: 14px;
          line-height: 1.6;
          word-break: break-word;
        }

        .about-content h1,
        .about-content h2,
        .about-content h3,
        .about-content h4,
        .about-content h5,
        .about-content h6 {
          color: #ffffff;
          margin-top: 1.2em;
          margin-bottom: 0.6em;
        }

        .about-content p {
          margin-bottom: 1em;
        }

        .about-content a {
          color: #fd4b4e;
          text-decoration: none;
        }

        .about-content strong {
          color: #ffffff;
        }

        .about-content ul,
        .about-content ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }

        .about-content img {
          max-width: 100%;
          border-radius: 8px;
        }

        /* Empty / error state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #888888;
          text-align: center;
        }

        .empty-state i {
          font-size: 36px;
          color: #fd4b4e;
          margin-bottom: 12px;
        }
      `})]})}export{h as default};
