import{x as E,u as x,y as b,k as s,Z as M,q as a,aa as z,a0 as q,ab as w,j as e,L as g}from"./index-2baf2db5.js";import{u as A,y as B,F}from"./FormErrors-fd731287.js";import{y as o}from"./yupFormSchemas-4a9ce399.js";import{I as t}from"./InputFormItem-df49a50e.js";import{B as I}from"./ButtonIcon-c13adb8c.js";import{u as R}from"./useDispatch-0c7fde08.js";function D(){const i=R(),h=E(),l=x(b.selectLoading),d=x(b.selectErrorMessage),[u,y]=s.useState(!1),[m,j]=s.useState("");s.useEffect(()=>{f()},[]);const N=M().shape({email:o.string(a("user.fields.username"),{required:!0}),password:o.string(a("user.fields.password"),{required:!0,min:8}),newPasswordConfirmation:o.string(a("user.fields.newPasswordConfirmation"),{required:!0}).oneOf([z("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:o.string(a("user.fields.phoneNumber"),{required:!0}),invitationcode:o.string(a("user.fields.invitationcode"),{required:!0}),withdrawPassword:o.string(a("user.fields.withdrawPassword"),{required:!0}),captcha:q().required(a("user.fields.captcha")).test("captcha-match",a("pages.signup.captchaMismatch"),function(r){return r===m})}),n=A({resolver:B.yupResolver(N),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",withdrawPassword:"",invitationcode:"",captcha:""}});s.useEffect(()=>{i(w.doClearErrorMessage())},[i]);const f=s.useCallback(()=>{const r="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let c="";for(let p=0;p<6;p++)c+=r.charAt(Math.floor(Math.random()*r.length));j(c),n.setValue("captcha",""),n.clearErrors("captcha")},[n]),v=s.useCallback(r=>{const{email:c,password:p,phoneNumber:C,withdrawPassword:P,invitationcode:S}=r;i(w.doRegisterEmailAndPassword(c,p,C,P,S))},[i]),k=s.useCallback(()=>{h.goBack()},[h]);return s.useCallback(()=>{y(!u)},[u]),e.jsxs("div",{className:"signup-wrapper",children:[e.jsxs("div",{className:"signup-card",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"back-button",onClick:k,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"header-spacer"}),e.jsx(g,{to:"/language",className:"language-icon",children:e.jsx("i",{className:"fas fa-globe"})})]}),e.jsx("h1",{className:"page-title",children:a("pages.signup.title")}),e.jsx(F,{...n,children:e.jsxs("form",{onSubmit:n.handleSubmit(v),className:"form-section",children:[e.jsx(t,{type:"email",name:"email",placeholder:a("pages.signup.placeholders.email"),className:"text-input",externalErrorMessage:d,autoComplete:"email",label:a("pages.signup.labels.email")}),e.jsx(t,{type:"tel",name:"phoneNumber",placeholder:a("pages.signup.placeholders.phoneNumber"),className:"text-input",autoComplete:"tel",label:a("pages.signup.labels.phoneNumber")}),e.jsx("label",{className:"input-label",children:a("pages.signup.labels.captcha")}),e.jsxs("div",{className:"captcha-container",children:[e.jsx("div",{className:"captcha-display",children:e.jsx("div",{className:"captcha-text",children:m})}),e.jsxs("div",{className:"captcha-controls",children:[e.jsxs("div",{className:"refresh-captcha",onClick:f,children:[e.jsx("i",{className:"fas fa-sync-alt"}),e.jsx("span",{children:a("pages.signup.refresh")})]}),e.jsx(t,{type:"text",name:"captcha",placeholder:a("pages.signup.placeholders.captcha"),className:"captcha-input"})]})]}),e.jsx(t,{type:u?"text":"password",name:"password",placeholder:a("pages.signup.placeholders.password"),className:"text-input",autoComplete:"new-password",label:a("pages.signup.labels.password")}),e.jsx(t,{type:"password",name:"newPasswordConfirmation",placeholder:a("pages.signup.placeholders.confirmPassword"),className:"text-input",autoComplete:"new-password",label:a("pages.signup.labels.confirmPassword")}),e.jsx(t,{type:"text",name:"withdrawPassword",placeholder:a("pages.signup.placeholders.withdrawPassword"),className:"text-input",externalErrorMessage:d,label:a("pages.signup.labels.withdrawPassword")}),e.jsx(t,{type:"text",name:"invitationcode",placeholder:a("pages.signup.placeholders.invitationCode"),className:"text-input",externalErrorMessage:d,label:a("pages.signup.labels.invitationCode")}),e.jsxs("button",{className:"signup-button",disabled:l,type:"submit",children:[e.jsx(I,{loading:l}),e.jsx("span",{children:l?a("pages.signup.creatingAccount"):a("pages.signup.createAccount")})]})]})}),e.jsxs("div",{className:"signin-prompt",children:[e.jsx("span",{children:a("pages.signup.alreadyHaveAccount")}),e.jsx(g,{to:"/auth/signin",children:a("auth.signin.button")})]}),e.jsxs("div",{className:"terms",children:[a("pages.signup.terms.text")," ",e.jsx(g,{to:"/terms-of-use",children:a("pages.signup.terms.link")})]})]}),e.jsx("style",{children:`
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
          transition: background-color 0.2s;
        }

        .language-icon:hover {
          background-color: rgba(253, 75, 78, 0.15);
        }

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
      `})]})}export{D as default};
