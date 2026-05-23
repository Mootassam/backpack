import{Z as y,q as s,x as j,u as n,y as l,k as c,ab as d,j as e,L as o}from"./index-2baf2db5.js";import{u as v,y as w,F as N}from"./FormErrors-fd731287.js";import{y as p}from"./yupFormSchemas-4a9ce399.js";import{I as g}from"./InputFormItem-df49a50e.js";import{B as k}from"./ButtonIcon-c13adb8c.js";import{u as S}from"./useDispatch-0c7fde08.js";const _=y().shape({email:p.string(s("user.fields.username"),{required:!0}).email(s("validation.email")),password:p.string(s("user.fields.password"),{required:!0,min:6})});function P(){const a=S(),m=j(),i=n(l.selectLoading),t=n(l.selectErrorMessage),[x]=c.useState({email:"",password:""});c.useEffect(()=>{a(d.doClearErrorMessage())},[a]);const r=v({resolver:w.yupResolver(_),mode:"onSubmit",defaultValues:x}),u=({email:h,password:b})=>{a(d.doSigninWithEmailAndPassword(h,b,!1))},f=()=>{m.goBack()};return e.jsxs("div",{className:"signin-wrapper",children:[e.jsxs("div",{className:"signin-card",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"back-button",onClick:f,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"header-spacer"}),e.jsx(o,{to:"/language",className:"language-icon",children:e.jsx("i",{className:"fas fa-globe"})})]}),e.jsx("div",{className:"logo-container",children:e.jsx("img",{src:"/images/logo.png",alt:"App Logo",className:"app-logo"})}),e.jsx("h1",{className:"page-title",children:s("auth.signin.title")}),e.jsx(N,{...r,children:e.jsxs("div",{className:"form-section",children:[t&&e.jsxs("div",{className:"error-message",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),t]}),e.jsxs("form",{onSubmit:r.handleSubmit(u),children:[e.jsxs("div",{className:"auth__form",children:[e.jsx("div",{className:"form__authgroup",children:e.jsx(g,{type:"text",name:"email",label:s("auth.fields.emailOrPhone"),placeholder:s("user.fields.username"),className:"text-input"})}),e.jsx("div",{className:"form__authgroup",children:e.jsx(g,{type:"password",name:"password",placeholder:s("user.fields.password"),className:"text-input",label:s("auth.fields.password"),autoComplete:"current-password"})})]}),e.jsxs("button",{className:"login-button",disabled:i,type:"submit",children:[e.jsx(k,{loading:i,iconClass:"fas fa-sign-in-alt"}),e.jsx("span",{children:i?s("auth.signin.signingIn"):s("auth.signin.button")})]})]})]})}),e.jsxs("div",{className:"signup-prompt",children:[e.jsx("span",{children:s("auth.signin.newHere")}),e.jsx(o,{to:"/auth/signup",children:s("auth.signin.signUp")})]}),e.jsx("div",{className:"divider",children:e.jsx("span",{className:"divider-text",children:s("auth.signin.getTheApp")})}),e.jsx("div",{className:"google-play-badge",children:e.jsx(o,{to:"/playstore",children:e.jsx("img",{src:"https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=fr",alt:"Get it on Google Play"})})})]}),e.jsx("style",{children:`
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
          background-color: rgba(253, 75, 78, 0.15);
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
          transition: background-color 0.2s;
        }

        .language-icon:hover {
          background-color: rgba(253, 75, 78, 0.15);
        }

        /* Logo & title */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }

        .app-logo {
          height: 64px;
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
          background-color: rgba(253, 75, 78, 0.12);
          border-left: 3px solid #fd4b4e;
          color: #ffffff;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 14px;
        }

        .error-message i {
          color: #fd4b4e;
          font-size: 14px;
        }

        /* Sign in button */
        .login-button {
          width: 100%;
          background-color: #fd4b4e;
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
          background-color: #e04345;
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
          color: #fd4b4e;
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
      `})]})}export{P as default};
