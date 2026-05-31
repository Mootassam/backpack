import{y as A,u as b,n as w,p as t,$ as q,q as a,ac as B,a1 as F,ad as y,j as e,ae as R,af as j,L as v}from"./index-3bb87590.js";import{u as I,y as O,F as T}from"./FormErrors-84b74aee.js";import{y as r}from"./yupFormSchemas-80cd1824.js";import{I as o}from"./InputFormItem-1bfc3f71.js";import{B as U}from"./ButtonIcon-1e17d6ef.js";import{l as $}from"./layoutActions-2b19243d.js";import{u as H}from"./useDispatch-a9165e4b.js";function X(){const c=H(),f=A(),l=b(w.selectLoading),d=b(w.selectErrorMessage),[u,k]=t.useState(!1),[m,N]=t.useState(""),[C,g]=t.useState(!1),h=t.useRef(null);t.useEffect(()=>{const s=n=>{h.current&&!h.current.contains(n.target)&&g(!1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]),t.useEffect(()=>{x()},[]);const P=q().shape({email:r.string(a("user.fields.username"),{required:!0}),password:r.string(a("user.fields.password"),{required:!0,min:8}),newPasswordConfirmation:r.string(a("user.fields.newPasswordConfirmation"),{required:!0}).oneOf([B("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:r.string(a("user.fields.phoneNumber"),{required:!0}),invitationcode:r.string(a("user.fields.invitationcode"),{required:!0}),withdrawPassword:r.string(a("user.fields.withdrawPassword"),{required:!0}),captcha:F().required(a("user.fields.captcha")).test("captcha-match",a("pages.signup.captchaMismatch"),function(s){return s===m})}),i=I({resolver:O.yupResolver(P),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",withdrawPassword:"",invitationcode:"",captcha:""}});t.useEffect(()=>{c(y.doClearErrorMessage())},[c]);const x=t.useCallback(()=>{const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let n="";for(let p=0;p<6;p++)n+=s.charAt(Math.floor(Math.random()*s.length));N(n),i.setValue("captcha",""),i.clearErrors("captcha")},[i]),S=t.useCallback(s=>{const{email:n,password:p,phoneNumber:M,withdrawPassword:z,invitationcode:L}=s;c(y.doRegisterEmailAndPassword(n,p,M,z,L))},[c]),E=t.useCallback(()=>{f.goBack()},[f]);return t.useCallback(()=>{k(!u)},[u]),e.jsxs("div",{className:"signup-wrapper",children:[e.jsxs("div",{className:"signup-card",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"back-button",onClick:E,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"header-spacer"}),e.jsxs("div",{className:"lang-picker-wrap",ref:h,children:[e.jsx("button",{className:"language-icon",onClick:()=>g(s=>!s),type:"button",children:e.jsx("i",{className:"fas fa-globe"})}),C&&e.jsx("div",{className:"lang-dropdown",children:R().map(s=>e.jsxs("button",{className:`lang-option${j()===s.id?" lang-option--active":""}`,onClick:()=>{g(!1),$.doChangeLanguage(s.id)},type:"button",children:[e.jsx("span",{className:"lang-option-code",children:s.id.toUpperCase().slice(0,2)}),e.jsx("span",{className:"lang-option-label",children:s.label}),j()===s.id&&e.jsx("i",{className:"fas fa-check lang-option-check"})]},s.id))})]})]}),e.jsx("h1",{className:"page-title",children:a("pages.signup.title")}),e.jsx(T,{...i,children:e.jsxs("form",{onSubmit:i.handleSubmit(S),className:"form-section",children:[e.jsx(o,{type:"email",name:"email",placeholder:a("pages.signup.placeholders.email"),className:"text-input",externalErrorMessage:d,autoComplete:"email",label:a("pages.signup.labels.email")}),e.jsx(o,{type:"tel",name:"phoneNumber",placeholder:a("pages.signup.placeholders.phoneNumber"),className:"text-input",autoComplete:"tel",label:a("pages.signup.labels.phoneNumber")}),e.jsx("label",{className:"input-label",children:a("pages.signup.labels.captcha")}),e.jsxs("div",{className:"captcha-container",children:[e.jsx("div",{className:"captcha-display",children:e.jsx("div",{className:"captcha-text",children:m})}),e.jsxs("div",{className:"captcha-controls",children:[e.jsxs("div",{className:"refresh-captcha",onClick:x,children:[e.jsx("i",{className:"fas fa-sync-alt"}),e.jsx("span",{children:a("pages.signup.refresh")})]}),e.jsx(o,{type:"text",name:"captcha",placeholder:a("pages.signup.placeholders.captcha"),className:"captcha-input"})]})]}),e.jsx(o,{type:u?"text":"password",name:"password",placeholder:a("pages.signup.placeholders.password"),className:"text-input",autoComplete:"new-password",label:a("pages.signup.labels.password")}),e.jsx(o,{type:"password",name:"newPasswordConfirmation",placeholder:a("pages.signup.placeholders.confirmPassword"),className:"text-input",autoComplete:"new-password",label:a("pages.signup.labels.confirmPassword")}),e.jsx(o,{type:"text",name:"withdrawPassword",placeholder:a("pages.signup.placeholders.withdrawPassword"),className:"text-input",externalErrorMessage:d,label:a("pages.signup.labels.withdrawPassword")}),e.jsx(o,{type:"text",name:"invitationcode",placeholder:a("pages.signup.placeholders.invitationCode"),className:"text-input",externalErrorMessage:d,label:a("pages.signup.labels.invitationCode")}),e.jsxs("button",{className:"signup-button",disabled:l,type:"submit",children:[e.jsx(U,{loading:l}),e.jsx("span",{children:l?a("pages.signup.creatingAccount"):a("pages.signup.createAccount")})]})]})}),e.jsxs("div",{className:"signin-prompt",children:[e.jsx("span",{children:a("pages.signup.alreadyHaveAccount")}),e.jsx(v,{to:"/auth/signin",children:a("auth.signin.button")})]}),e.jsxs("div",{className:"terms",children:[a("pages.signup.terms.text")," ",e.jsx(v,{to:"/terms-of-use",children:a("pages.signup.terms.link")})]})]}),e.jsx("style",{children:`
        .signup-wrapper {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .signup-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-radius: 16px;
          padding: 24px 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        }

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
          background: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .language-icon:hover {
          background-color: rgba(253, 75, 78, 0.15);
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
        .lang-option--active { color: #fd4b4e; background: rgba(253,75,78,0.07); }
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
        .lang-option--active .lang-option-code { color: #fd4b4e; border-color: #fd4b4e; }
        .lang-option-label { flex: 1; }
        .lang-option-check { font-size: 11px; color: #fd4b4e; }

        .page-title {
          text-align: center;
          color: #ffffff;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px 0;
          letter-spacing: 0.5px;
        }

        .form-section {
          margin-bottom: 18px;
        }

        .form-section .text-input,
        .form-section .captcha-input {
          margin-bottom: 0;
        }

        .input-label {
          display: block;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        /* Captcha styling */
        .captcha-container {
          margin-bottom: 14px;
        }

        .captcha-display {
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 10px;
          padding: 10px 14px;
          text-align: center;
          margin-bottom: 10px;
        }

        .captcha-text {
          font-size: 24px;
          font-weight: 700;
          color: #fd4b4e;
          letter-spacing: 6px;
          user-select: none;
        }

        .captcha-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .refresh-captcha {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fd4b4e;
          cursor: pointer;
          font-size: 13px;
          white-space: nowrap;
          transition: opacity 0.2s;
        }

        .refresh-captcha:hover {
          opacity: 0.8;
        }

        .captcha-input input {
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 10px;
          padding: 12px 14px;
          color: #ffffff;
          font-size: 15px;
          outline: none;
        }

        .captcha-input input:focus {
          border-color: #fd4b4e;
        }

        /* Buttons */
        .signup-button {
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
          margin-top: 8px;
        }

        .signup-button:hover:not(:disabled) {
          background-color: #e04345;
        }

        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Already have account */
        .signin-prompt {
          text-align: center;
          margin-bottom: 16px;
          font-size: 14px;
          color: #cccccc;
        }

        .signin-prompt span {
          margin-right: 6px;
        }

        .signin-prompt a {
          color: #fd4b4e;
          text-decoration: none;
          font-weight: 500;
        }

        .signin-prompt a:hover {
          opacity: 0.8;
        }

        /* Terms */
        .terms {
          text-align: center;
          color: #888888;
          font-size: 12px;
          margin-top: 12px;
        }

        .terms a {
          color: #fd4b4e;
          text-decoration: none;
        }

        .terms a:hover {
          opacity: 0.8;
        }
      `})]})}export{X as default};
