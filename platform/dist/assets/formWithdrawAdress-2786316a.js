import{q as s,$ as h,T as x,y as g,u as b,n as w,p as y,j as e,S as F}from"./index-52cad42e.js";import{y as i}from"./yupFormSchemas-c51678b2.js";import{u as j,y as v,F as N}from"./FormErrors-ab744f80.js";import{F as d}from"./FieldFormItem-e06d258e.js";import{u as k}from"./useDispatch-a8300b64.js";const A=[{icon:"fab fa-bitcoin",label:s("pages.withdrawAddressForm.currencies.btc"),id:"BTC",symbol:"BTC"},{icon:"fab fa-ethereum",label:s("pages.withdrawAddressForm.currencies.eth"),id:"ETH",symbol:"ETH"},{icon:"fas fa-chevron-right",label:s("pages.withdrawAddressForm.currencies.usdt"),id:"USDT",symbol:"USDT"},{label:s("pages.withdrawAddressForm.currencies.sol"),symbol:"SOL",id:"SOL"},{label:s("pages.withdrawAddressForm.currencies.xrp"),symbol:"XRP",id:"XRP"}],S=h().shape({address:i.string(s("pages.withdrawAddressForm.fields.address"),{required:!0}),password:i.string(s("pages.withdrawAddressForm.fields.password"),{required:!0})});function R(){const{id:t}=x(),n=g(),c=A.filter(r=>r.id===t),l=k(),a=b(w.selectCurrentUser),[p]=y.useState(()=>{var r;return{currency:t,address:a&&a.wallet&&((r=a==null?void 0:a.wallet[t])==null?void 0:r.address)||"",password:""}}),o=j({resolver:v.yupResolver(S),mode:"all",defaultValues:p}),m=r=>{r.currency=t,l(F.UpdateWalletAdress(r))},u=()=>n.goBack();return e.jsxs("div",{className:"withdraw-address-page",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:u,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:s("pages.withdrawAddressForm.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"currency-section",children:[e.jsx("div",{className:"section-title",children:s("pages.withdrawAddressForm.currencyType")}),c.map((r,f)=>e.jsxs("div",{className:"selected-currency",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r.symbol}.png`,alt:r.symbol}),e.jsx("span",{children:r.label})]},f))]}),e.jsx(N,{...o,children:e.jsx("form",{onSubmit:o.handleSubmit(m),children:e.jsxs("div",{className:"form-section",children:[e.jsx("div",{className:"section-title",children:s("pages.withdrawAddressForm.withdrawalAddress")}),e.jsx(d,{name:"address",type:"text",label:s("pages.withdrawAddressForm.fields.address"),className:"form-input",className1:"form-group",className2:"form-label",className3:"input-container",placeholder:s("pages.withdrawAddressForm.placeholders.address")}),e.jsx(d,{name:"password",type:"password",label:s("pages.withdrawAddressForm.fields.password"),className:"form-input",className1:"form-group",className2:"form-label",className3:"input-container",placeholder:s("pages.withdrawAddressForm.placeholders.password")}),e.jsx("button",{type:"submit",className:"save-btn",children:s("pages.withdrawAddressForm.buttons.save")})]})})})]}),e.jsx("style",{children:`
        /* ====== Page Layout ====== */
        .withdraw-address-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        /* ----- Header ----- */
        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          padding: 16px 20px 12px;
          background: #0e0f14;
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
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header-placeholder {
          width: 32px;
        }

        /* ----- Main Card ----- */
        .content-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        /* ----- Currency Section ----- */
        .currency-section {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 13px;
          font-weight: 600;
          color: #aaaaaa;
          margin-bottom: 10px;
        }
        .selected-currency {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }
        .selected-currency img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          object-fit: contain;
        }

        /* ----- Form Section ----- */
        .form-section {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }

        /* Override FieldFormItem styles for dark theme */
        .form-group {
          margin-bottom: 14px;
        }
        .form-label {
          font-size: 12px !important;
          color: #aaaaaa !important;
          margin-bottom: 4px !important;
          display: block;
        }
        .input-container input,
        .input-container select,
        .input-container textarea {
          width: 100%;
          background: #2a2a2e !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 10px 12px !important;
          font-size: 13px !important;
          color: #ffffff !important;
          outline: none;
        }
        .input-container input::placeholder {
          color: #777;
        }

        /* Save Button */
        .save-btn {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          background: #fd4b4e;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .save-btn:hover {
          background: #e04345;
        }
      `})]})}export{R as default};
