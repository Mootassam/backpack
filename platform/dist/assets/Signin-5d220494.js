import{$ as k,w as a,u as N,n as p,y as g,k as t,ad as u,j as e,ae as S,af as x,L as m}from"./index-9fb4ec24.js";import{u as F,y as L,F as z}from"./FormErrors-dac726aa.js";import{y as f}from"./yupFormSchemas-49c3a4f4.js";import{I as h}from"./InputFormItem-c5977cd7.js";import{B as _}from"./ButtonIcon-5dc5f647.js";import{l as E}from"./layoutActions-d9a0c4b2.js";import{u as C}from"./useDispatch-09756e97.js";const M=k().shape({email:f.string(a("user.fields.username"),{required:!0}).email(a("validation.email")),password:f.string(a("user.fields.password"),{required:!0,min:6})});function G(){const i=C(),b=N(),s=p(g.selectLoading),c=p(g.selectErrorMessage),[y,n]=t.useState(!1),r=t.useRef(null);t.useEffect(()=>{const o=l=>{r.current&&!r.current.contains(l.target)&&n(!1)};return document.addEventListener("mousedown",o),()=>document.removeEventListener("mousedown",o)},[]);const[j]=t.useState({email:"",password:""});t.useEffect(()=>{i(u.doClearErrorMessage())},[i]);const d=F({resolver:L.yupResolver(M),mode:"onSubmit",defaultValues:j}),v=({email:o,password:l})=>{i(u.doSigninWithEmailAndPassword(o,l,!1))},w=()=>{b.goBack()};return e.jsxs("div",{className:"signin-wrapper",children:[e.jsxs("div",{className:"signin-card",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"back-button",onClick:w,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"header-spacer"}),e.jsxs("div",{className:"lang-picker-wrap",ref:r,children:[e.jsx("button",{className:"language-icon",onClick:()=>n(o=>!o),type:"button",children:e.jsx("i",{className:"fas fa-globe"})}),y&&e.jsx("div",{className:"lang-dropdown",children:S().map(o=>e.jsxs("button",{className:`lang-option${x()===o.id?" lang-option--active":""}`,onClick:()=>{n(!1),E.doChangeLanguage(o.id)},type:"button",children:[e.jsx("span",{className:"lang-option-code",children:o.id.toUpperCase().slice(0,2)}),e.jsx("span",{className:"lang-option-label",children:o.label}),x()===o.id&&e.jsx("i",{className:"fas fa-check lang-option-check"})]},o.id))})]})]}),e.jsx("div",{className:"logo-container",children:e.jsx("img",{src:"/playsotre/logo.svg",alt:"App Logo",className:"app-logo"})}),e.jsx("h1",{className:"page-title",children:a("auth.signin.title")}),e.jsx(z,{...d,children:e.jsxs("div",{className:"form-section",children:[c&&e.jsxs("div",{className:"error-message",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),c]}),e.jsxs("form",{onSubmit:d.handleSubmit(v),children:[e.jsxs("div",{className:"auth__form",children:[e.jsx("div",{className:"form__authgroup",children:e.jsx(h,{type:"text",name:"email",label:a("auth.fields.emailOrPhone"),placeholder:a("user.fields.username"),className:"text-input"})}),e.jsx("div",{className:"form__authgroup",children:e.jsx(h,{type:"password",name:"password",placeholder:a("user.fields.password"),className:"text-input",label:a("auth.fields.password"),autoComplete:"current-password"})})]}),e.jsxs("button",{className:"login-button",disabled:s,type:"submit",children:[e.jsx(_,{loading:s,iconClass:"fas fa-sign-in-alt"}),e.jsx("span",{children:s?a("auth.signin.signingIn"):a("auth.signin.button")})]})]})]})}),e.jsxs("div",{className:"signup-prompt",children:[e.jsx("span",{children:a("auth.signin.newHere")}),e.jsx(m,{to:"/auth/signup",children:a("auth.signin.signUp")})]}),e.jsx("div",{className:"divider",children:e.jsx("span",{className:"divider-text",children:a("auth.signin.getTheApp")})}),e.jsx("div",{className:"google-play-badge",children:e.jsx(m,{to:"/playstore",children:e.jsx("img",{src:"https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=fr",alt:"Get it on Google Play"})})})]}),e.jsx("style",{children:`
        .signin-wrapper {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .signin-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-radius: 16px;
          padding: 24px 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
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
          background-color: rgba(244, 17, 18, 0.15);
        }

        .header-spacer {
          flex: 1;
        }

        .language-icon {
          color: #ffffff;
          font-size: 18px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .language-icon:hover {
          background-color: rgba(244, 17, 18, 0.15);
        }

        /* Language dropdown */
        .lang-picker-wrap {
          position: relative;
        }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 200px;
          background: #1a1b22;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          z-index: 999;
          max-height: 320px;
          overflow-y: auto;
        }
        .lang-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: none;
          border: none;
          color: #ccc;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
        }
        .lang-option:hover { background: #22232c; color: #fff; }
        .lang-option--active { color: #F41112; background: rgba(244, 17, 18,0.07); }
        .lang-option-code {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0e0f14;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #aaa;
          flex-shrink: 0;
          border: 1px solid #2a2a2e;
        }
        .lang-option--active .lang-option-code { color: #F41112; border-color: #F41112; }
        .lang-option-label { flex: 1; }
        .lang-option-check { font-size: 11px; color: #F41112; }

        /* Logo & title */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }

        .app-logo {
          height: 60px;
          border-radius: 16px;
          object-fit: cover;
        }

        .page-title {
          text-align: center;
          color: #ffffff;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px 0;
          letter-spacing: 0.5px;
        }

        /* Form section */
        .form-section {
          margin-bottom: 18px;
        }

        .form__authgroup {
          margin-bottom: 14px;
        }

        /* Error message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(244, 17, 18, 0.12);
          border-left: 3px solid #F41112;
          color: #ffffff;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 14px;
        }

        .error-message i {
          color: #F41112;
          font-size: 14px;
        }

        /* Sign in button */
        .login-button {
          width: 100%;
          background-color: #F41112;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.2px;
        }

        .login-button:hover:not(:disabled) {
          background-color: #AD1111;
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Sign up prompt */
        .signup-prompt {
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: #cccccc;
        }

        .signup-prompt span {
          margin-right: 6px;
        }

        .signup-prompt a {
          color: #F41112;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-prompt a:hover {
          opacity: 0.8;
        }

        /* Divider */
        .divider {
          text-align: center;
          margin-bottom: 16px;
        }

        .divider-text {
          color: #888888;
          font-size: 13px;
          position: relative;
          display: inline-block;
          padding: 0 12px;
        }

        .divider-text::before,
        .divider-text::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 60px;
          height: 1px;
          background-color: #2a2a2e;
        }

        .divider-text::before {
          right: 100%;
          margin-right: 12px;
        }

        .divider-text::after {
          left: 100%;
          margin-left: 12px;
        }

        /* Google Play badge */
        .google-play-badge {
          text-align: center;
        }

        .google-play-badge img {
          height: 48px;
          width: auto;
          display: inline-block;
          transition: opacity 0.2s;
        }

        .google-play-badge a:hover img {
          opacity: 0.85;
        }
      `})]})}export{G as default};
