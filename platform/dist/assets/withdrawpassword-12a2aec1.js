import{$ as c,w as r,u as f,n as w,y as m,k as u,j as s,S as x}from"./index-9fb4ec24.js";import{u as h,y as g,F as b}from"./FormErrors-dac726aa.js";import{y as o}from"./yupFormSchemas-49c3a4f4.js";import{F as a}from"./FieldFormItem-77816792.js";import{u as y}from"./useDispatch-09756e97.js";const j=c().shape({password:o.string(r("pages.withdrawPassword.fields.currentPassword"),{required:!0}),newPassword:o.string(r("pages.withdrawPassword.fields.newPassword"),{required:!0})});function S(){const t=y(),i=f();w(m.selectCurrentUser);const[n]=u.useState({password:"",newPassword:""}),e=h({resolver:g.yupResolver(j),mode:"all",defaultValues:n}),d=p=>{t(x.UpdateWithdraw(p))},l=()=>i.goBack();return s.jsxs("div",{className:"withdraw-password-page",children:[s.jsxs("div",{className:"withdraw-password-container",children:[s.jsxs("div",{className:"top-header",children:[s.jsx("div",{className:"back-button",onClick:l,children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("h1",{className:"page-title",children:r("pages.withdrawPassword.title")}),s.jsx("div",{className:"header-placeholder"})]}),s.jsx("div",{className:"content-card",children:s.jsx(b,{...e,children:s.jsxs("form",{onSubmit:e.handleSubmit(d),children:[s.jsx("h2",{className:"card-title",children:r("pages.withdrawPassword.cardTitle")}),s.jsx(a,{name:"password",type:"password",label:r("pages.withdrawPassword.fields.currentPassword"),className:"form-input",className1:"form-group",className2:"form-label",className3:"password-input-container",placeholder:r("pages.withdrawPassword.placeholders.currentPassword")}),s.jsx(a,{name:"newPassword",type:"password",label:r("pages.withdrawPassword.fields.newPassword"),className:"form-input",className1:"form-group",className2:"form-label",className3:"password-input-container",placeholder:r("pages.withdrawPassword.placeholders.newPassword")}),s.jsx("button",{className:"save-button",type:"submit",children:r("pages.withdrawPassword.buttons.saveChanges")}),s.jsx("p",{className:"warning-message",children:r("pages.withdrawPassword.warningMessage")})]})})})]}),s.jsx("style",{children:`
        .withdraw-password-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .withdraw-password-container {
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
          background-color: rgba(244, 17, 18, 0.15);
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
          border-color: #F41112;
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
          background-color: #F41112;
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
          background-color: #AD1111;
        }

        .warning-message {
          color: #F41112;
          font-size: 13px;
          text-align: center;
          margin-top: 16px;
          line-height: 1.4;
        }

        .invalid-feedback {
          color: #F41112;
          font-size: 12px;
          margin-top: 4px;
        }
      `})]})}export{S as default};
