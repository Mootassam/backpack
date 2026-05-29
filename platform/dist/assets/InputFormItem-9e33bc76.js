import{a4 as e,p as k,a5 as q,j as o}from"./index-54206aa9.js";import{a as B,b as E}from"./FormErrors-a2b7d0a7.js";function g(t){const{label:i,description:f,name:r,hint:l,type:a,placeholder:x,autoFocus:m,autoComplete:b,required:h,externalErrorMessage:d,disabled:y,endAdornment:p,className:c}=t,[n,w]=k.useState(!1),{register:j,errors:v,formState:{touched:N,isSubmitted:C}}=B();d&&q.error(d);const u=E.errorMessage(r,v,N,C),F=()=>{w(!n)},z=a==="password"&&n?"text":a;return o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"input-group",children:[!!i&&o.jsx("label",{className:`input-label ${h?"required":""}`,htmlFor:r,children:i}),f,o.jsxs("div",{className:"input-container",style:{position:"relative",...c==="captcha-input"?{padding:0}:{}},children:[o.jsx("input",{className:`${c||""} ${u?"__danger":""}`,id:r,name:r,type:z,ref:j,onChange:s=>{t.onChange&&t.onChange(s.target.value)},onBlur:s=>{t.onBlur&&t.onBlur(s)},placeholder:x||void 0,autoFocus:m||void 0,autoComplete:b||void 0,disabled:y,style:a==="password"?{paddingRight:"40px",width:"100%"}:{width:"100%"}}),a==="password"&&o.jsx("div",{className:"toggle-password",onClick:F,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:"#888",zIndex:2,background:"transparent",border:"none",padding:"8px"},children:o.jsx("i",{className:n?"far fa-eye-slash":"far fa-eye"})})]}),p&&o.jsx("div",{className:"input-group-append",children:o.jsx("span",{className:"input-group-text",children:p})}),o.jsx("div",{className:"invalid-feedback",children:u}),!!l&&o.jsx("small",{className:"form-text text-muted",children:l})]}),o.jsx("style",{children:`
        .input-group {
          width: 100%;
          margin-bottom: 0;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        .input-container input,
        .input-container input.text-input {
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

        .input-container input::placeholder {
          color: #6b6b70;
        }

        .input-container input:focus {
          border-color: #fd4b4e;
        }

        .input-container input.__danger {
          border-color: #fd4b4e;
        }

        .input-container input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .invalid-feedback {
          color: #fd4b4e;
          font-size: 13px;
          margin-top: 6px;
          padding-left: 4px;
        }

        .form-text.text-muted {
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 4px;
          padding-left: 4px;
        }

        .toggle-password i {
          color: #888;
          font-size: 16px;
        }

        .toggle-password:hover i {
          color: #ffffff;
        }
      `})]})}g.defaultProps={type:"text",required:!1};g.propTypes={name:e.string.isRequired,required:e.bool,type:e.string,label:e.string,description:e.string,hint:e.string,autoFocus:e.bool,disabled:e.bool,prefix:e.string,placeholder:e.string,autoComplete:e.string,externalErrorMessage:e.string,endAdornment:e.any,onChange:e.any,className:e.string};export{g as I};
