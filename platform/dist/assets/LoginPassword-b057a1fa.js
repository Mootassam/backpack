import{Z as c,q as s,aa as f,v as m,u as g,n as u,p as w,j as o,ab as x}from"./index-07486408.js";import{u as b,y as h,F as P}from"./FormErrors-54de97cf.js";import{y as e}from"./yupFormSchemas-f9e8a9e4.js";import{F as a}from"./FieldFormItem-6953c008.js";import{u as y}from"./useDispatch-69f3e435.js";const N=c().shape({oldPassword:e.string(s("pages.loginPassword.fields.oldPassword"),{required:!0}),newPassword:e.string(s("pages.loginPassword.fields.newPassword"),{required:!0}),newPasswordConfirmation:e.string(s("pages.loginPassword.fields.newPasswordConfirmation"),{required:!0}).oneOf([f("newPassword"),null],s("pages.loginPassword.validation.mustMatch"))});function C(){const t=y(),i=m();g(u.selectCurrentUser);const[l]=w.useState({oldPassword:"",newPassword:"",newPasswordConfirmation:""}),r=b({resolver:h.yupResolver(N),mode:"all",defaultValues:l}),d=n=>{t(x.doChangePassword(n.oldPassword,n.newPassword))},p=()=>i.goBack();return o.jsxs("div",{className:"login-password-page",children:[o.jsxs("div",{className:"login-password-container",children:[o.jsxs("div",{className:"top-header",children:[o.jsx("div",{className:"back-button",onClick:p,children:o.jsx("i",{className:"fas fa-arrow-left"})}),o.jsx("h1",{className:"page-title",children:s("pages.loginPassword.title")}),o.jsx("div",{className:"header-placeholder"})]}),o.jsx("div",{className:"content-card",children:o.jsx(P,{...r,children:o.jsxs("form",{onSubmit:r.handleSubmit(d),children:[o.jsx("h2",{className:"card-title",children:s("pages.loginPassword.cardTitle")}),o.jsx(a,{name:"oldPassword",type:"password",label:s("pages.loginPassword.fields.oldPassword"),className:"form-input",className1:"form-group",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.oldPassword")}),o.jsx(a,{name:"newPassword",type:"password",label:s("pages.loginPassword.fields.newPassword"),className:"form-input",className1:"form-group",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.newPassword")}),o.jsx(a,{name:"newPasswordConfirmation",type:"password",label:s("pages.loginPassword.fields.newPasswordConfirmation"),className:"form-input",className1:"form-group",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.confirmPassword")}),o.jsx("button",{className:"save-button",type:"submit",children:s("pages.loginPassword.buttons.saveChanges")}),o.jsx("p",{className:"warning-message",children:s("pages.loginPassword.warningMessage")})]})})})]}),o.jsx("style",{children:`
        .login-password-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .login-password-container {
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
        }

        .card-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #2a2a2e;
        }

        /* Override FieldFormItem styles to match dark theme */
        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        .form-input {
          width: 100%;
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 14px 16px;
          color: #ffffff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #fd4b4e;
        }

        .form-input::placeholder {
          color: #6b6b70;
        }

        .password-input-container {
          position: relative;
        }

        .password-input-container .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #888888;
        }

        .save-button {
          width: 100%;
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background-color 0.2s;
        }

        .save-button:hover {
          background-color: #e04345;
        }

        .warning-message {
          color: #fd4b4e;
          font-size: 13px;
          text-align: center;
          margin-top: 16px;
          line-height: 1.4;
        }

        .invalid-feedback {
          color: #fd4b4e;
          font-size: 12px;
          margin-top: 4px;
        }
      `})]})}export{C as default};
