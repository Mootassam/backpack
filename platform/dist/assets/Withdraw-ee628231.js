import{v as _,$ as Re,q as p,a0 as Ee,u as R,n as Me,F as Pe,Y as Ue,p as n,G as We,Z as Le,a9 as ue,aa as Te,j as e,L as Z,A as $e}from"./index-f6bcde00.js";import{u as _e,y as Be,c as he,F as Ve}from"./FormErrors-8d84a8c7.js";import{y as N}from"./yupFormSchemas-4f6c054c.js";import{F as xe}from"./FieldFormItem-638e5b85.js";import{S as Xe}from"./sucessModal-6f9180fe.js";import{u as Ye}from"./useDispatch-f673bc67.js";const E=i=>i.withdraw.form,He=_([E],i=>i.record),qe=_([E],i=>!!i.initLoading),Ge=_([E],i=>!!i.saveLoading),Oe=_([E],i=>!!i.withdrawModal),be={selectInitLoading:qe,selectSaveLoading:Ge,selectRecord:He,selectModal:Oe,selectRaw:E},J=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],$=300,ge=5,Ke={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},Ze=Re().shape({orderNo:N.string(p("entities.withdraw.fields.orderNo")),currency:N.string(p("entities.withdraw.fields.currency")),withdrawAmount:Ee().typeError(p("pages.withdraw.errors.amountNumber")).required(p("pages.withdraw.errors.amountRequired")).test("positive",p("pages.withdraw.errors.amountPositive"),i=>typeof i=="number"&&i>0),fee:N.decimal(p("entities.withdraw.fields.fee")),totalAmount:N.decimal(p("entities.withdraw.fields.totalAmount")),auditor:N.relationToOne(p("entities.withdraw.fields.auditor")),acceptTime:N.datetime(p("entities.withdraw.fields.acceptTime")),status:N.enumerator(p("entities.withdraw.fields.status"),{options:["pending","canceled","success"]})});function it(){var fe;const i=Ye(),g=R(Me.selectCurrentUser),B=R(Pe.selectRows)||[],Q=R(be.selectModal),f=R(Ue.selectRows),ee=R(be.selectSaveLoading),[ye,te]=n.useState(""),[Je,M]=n.useState(""),[r,V]=n.useState(""),[y,A]=n.useState(""),[re,ae]=n.useState(null),[ne,se]=n.useState(!1),[ie,P]=n.useState(!1),[w,je]=n.useState({}),[U,oe]=n.useState(!1),[Ne,X]=n.useState(!1),[v,F]=n.useState(""),[Y,H]=n.useState(!1),[k,x]=n.useState(""),[l,q]=n.useState(null),[G,le]=n.useState(!1),O=n.useRef(null);n.useEffect(()=>{i(We.doFetch("exchange"))},[i]),n.useEffect(()=>{i(Le.doFetch())},[i]),n.useEffect(()=>{const t=async()=>{try{oe(!0);const s=await $e.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:J.join(","),tsyms:"USD"}});if(s.data&&s.data.Response!=="Error"){const d={};J.forEach(o=>{var D;(D=s.data[o])!=null&&D.USD&&(d[o]=s.data[o].USD)}),je(d)}}catch(s){console.error("Failed to fetch exchange rates:",s)}finally{oe(!1)}};t();const a=setInterval(t,5*60*1e3);return()=>clearInterval(a)},[]),n.useEffect(()=>{if(f&&f.length>0&&!r){const t=f[0],a=t.symbol||t.id;V(a),c.setValue("currency",a),t.network&&t.network.length>0&&A(t.network[0]._id||t.network[0].name)}},[f]),n.useEffect(()=>{var t,a;if(r&&B.length){const s=B.find(o=>String(o.symbol).toUpperCase()===String(r).toUpperCase());ae(s||null);const d=((a=(t=g==null?void 0:g.wallet)==null?void 0:t[r])==null?void 0:a.address)||"";M(d),c.setValue("currency",r),d&&c.setValue("withdrawAdress",d)}else ae(null),M(""),c.setValue("currency",""),c.setValue("withdrawAdress","")},[r,B,g]);const K={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:""},c=_e({resolver:Be.yupResolver(Ze),mode:"all",defaultValues:K}),ve=he({control:c.control,name:"withdrawAmount"});he({control:c.control,name:"currency"});const u=Number(ve),S=!Number.isNaN(u)&&isFinite(u),C=re&&Number(re.amount)||0,{minInCurrency:z,feeInCurrency:m}=n.useMemo(()=>{if(!r||!w[r])return{minInCurrency:0,feeInCurrency:0};const t=w[r],a=$/t,s=ge/t;return{minInCurrency:a,feeInCurrency:s}},[r,w]),W=n.useMemo(()=>!f||!r?null:f.find(t=>{const a=t.symbol||t.id||"";return String(a).toUpperCase()===String(r).toUpperCase()}),[f,r]),b=(W==null?void 0:W.network)||[];n.useEffect(()=>{if(b.length>0){const t=b[0];A(t._id||t.name),P(!1)}else A("")},[W,b]);const I=S?Math.max(u-m,0):0,h=n.useCallback((t,a)=>{if(typeof t!="number"||!isFinite(t)||t===0)return"0";const s=a!==void 0?a:Ke[r]||2;return t>0&&t<1e-6?t.toFixed(s>8?s:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:s}).format(t)},[r]),j=n.useCallback(t=>typeof t!="number"||!isFinite(t)||t===0?"$0.00":t>0&&t<.01?`$${t.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(t),[]),ce=n.useCallback(t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t?t.toUpperCase():""}.png`,[]),ke=n.useCallback(t=>{A(t._id||t.name),P(!1)},[]),L=n.useCallback(()=>{if(!r)return{disabled:!0,label:p("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"};if(b.length>0&&!y)return{disabled:!0,label:p("pages.withdraw.validation.selectNetwork"),reason:"selectNetwork"};if(!S||u<=0)return{disabled:!0,label:p("pages.withdraw.validation.enterAmount"),reason:"enterAmount"};if(u<z){const a=h(z);return{disabled:!0,label:p("pages.withdraw.validation.belowMin",a,r),reason:"belowMin"}}if(u>C)return{disabled:!0,label:p("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"};if(u+m>C)return{disabled:!0,label:p("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"};const t=c.getValues("withdrawAdress");return!t||t.trim()===""?{disabled:!0,label:p("pages.withdraw.validation.enterAddress"),reason:"enterAddress"}:{disabled:!1,label:p("pages.withdraw.confirmWithdrawal"),reason:"ok"}},[r,b,y,S,u,z,C,m,c,h])(),Se=n.useCallback(()=>{i(ue.doClose()),c.reset(K),V(""),M(""),te(""),A("")},[i,c,K]),Ce=n.useCallback(t=>{if(L.disabled)return;t.currency=r;const a=new Date,s=`${a.getFullYear()}${String(a.getMonth()+1).padStart(2,"0")}${String(a.getDate()).padStart(2,"0")}`,d=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${s}${d}`;const o=Number(t.withdrawAmount)||0;t.fee=m,t.totalAmount=o-m,t.status="pending",t.network=y,q(t),F(""),x(""),H(!1),X(!0),setTimeout(()=>{var D;return(D=O.current)==null?void 0:D.focus()},120)},[r,m,y,L.disabled]),de=n.useCallback(async()=>{if(l){if(!v.trim()){x("Please enter your withdrawal password.");return}le(!0);try{const t=await Te.verifyWithdrawPassword(v.trim());if(!t.ok){t.reason==="no_password_set"?x("no_password_set"):(x("Incorrect withdrawal password. Please try again."),F(""),setTimeout(()=>{var s;return(s=O.current)==null?void 0:s.focus()},80));return}const a={...l,withdrawPassword:v.trim()};te(l.totalAmount.toString()),await i(ue.doCreate(a)),X(!1),q(null),F(""),x("")}catch(t){console.error("Withdrawal submission error:",t),x("Withdrawal failed. Please try again.")}finally{le(!1)}}},[l,v,i]),T=n.useCallback(()=>{X(!1),q(null),F(""),x(""),H(!1)},[]),ze=n.useCallback(t=>{const a=t.symbol||t.id;V(a),c.setValue("currency",a),c.setValue("withdrawAmount",""),c.setValue("withdrawAdress",""),se(!1),P(!1)},[c]),pe=n.useMemo(()=>!S||!w[r]?0:u*w[r],[u,r,w,S]),Ae=n.useMemo(()=>w[r]?m*w[r]:0,[m,r,w]),we=n.useMemo(()=>w[r]?I*w[r]:0,[I,r,w]),Fe=n.useMemo(()=>C===0?"0":h(C),[C,h]),me=n.useMemo(()=>z===0?"0":h(z),[z,h]),Ie=n.useMemo(()=>m===0?"0":h(m),[m,h]),De=n.useMemo(()=>I===0?"0":h(I),[I,h]);return c.formState,e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(Z,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"}),e.jsx(Z,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"currency-select-trigger",onClick:()=>se(!ne),children:[r?e.jsxs("div",{className:"selected-currency",children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:ce(r),alt:r,onError:t=>{const a=t.target;a.onerror=null,a.style.display="none";const s=a.parentElement;s&&(s.textContent=r.charAt(0),s.style.background="#f0f0f0",s.style.color="#333",s.style.fontSize="14px",s.style.fontWeight="bold",s.style.display="inline-flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.width="24px",s.style.height="24px",s.style.borderRadius="50%")}})}),e.jsx("span",{className:"currency-text",children:r}),U?e.jsx("span",{className:"rate-loading",children:"Loading rates..."}):w[r]?e.jsxs("span",{className:"currency-rate",children:["(1 ",r," ≈ ",j(w[r]),")"]}):null]}):e.jsx("span",{className:"placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),ne&&e.jsx("div",{className:"currency-dropdown",children:f&&f.length>0?f.filter(t=>J.includes(t.symbol||t.id)).map(t=>{const a=t.symbol||t.id;return e.jsxs("div",{className:"currency-option",onClick:()=>ze(t),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:ce(a),alt:a,onError:s=>{const d=s.target;d.onerror=null,d.style.display="none";const o=d.parentElement;o&&(o.textContent=a.charAt(0),o.style.background="#f0f0f0",o.style.color="#333",o.style.fontSize="14px",o.style.fontWeight="bold",o.style.display="inline-flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.width="24px",o.style.height="24px",o.style.borderRadius="50%")}})}),e.jsx("span",{className:"currency-text",children:a}),U?e.jsx("span",{className:"rate-loading-small",children:"..."}):w[a]?e.jsxs("span",{className:"currency-rate-small",children:["(",j(w[a]),")"]}):null]},t.id||a)}):e.jsx("div",{className:"no-options",children:"No currencies available"})})]})]}),r&&w[r]&&e.jsx("div",{className:"info-box",children:e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Minimum withdrawal:"}),e.jsxs("span",{className:"info-value",children:[me," ",r," (",j($),")"]})]})}),r&&b.length>0&&e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"network-select-trigger",onClick:()=>P(!ie),children:[e.jsxs("div",{className:"selected-network",children:[e.jsx("i",{className:"fas fa-network-wired network-icon"}),e.jsx("span",{className:"network-text",children:((fe=b.find(t=>t._id===y||t.id===y||t.name===y))==null?void 0:fe.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),ie&&e.jsx("div",{className:"network-dropdown",children:b.map(t=>e.jsxs("div",{className:"network-option",onClick:()=>ke(t),children:[e.jsx("i",{className:"fas fa-network-wired network-icon-small"}),e.jsx("span",{className:"network-text",children:t.name})]},t._id||t.id||t.name))})]})]}),e.jsx(Ve,{...c,children:e.jsxs("form",{onSubmit:c.handleSubmit(Ce),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(xe,{name:"withdrawAdress",type:"text",className:"address-field",placeholder:"Enter your wallet address",onChange:t=>M(t.target.value)})}),e.jsx("br",{})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(xe,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0",step:"any"})}),e.jsxs("div",{className:"balance-info",children:[e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[Fe," ",r]})]}),S&&pe>0&&e.jsxs("div",{className:"usd-value",children:["≈ ",j(pe)]})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Withdrawal fee:"}),e.jsxs("div",{className:"fee-value",children:[Ie," ",r,e.jsxs("span",{className:"fee-usd",children:[" (",j(Ae),")"]})]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Minimum withdrawal:"}),e.jsxs("div",{className:"fee-value",children:[me," ",r,e.jsxs("span",{className:"fee-usd",children:[" (",j($),")"]})]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[De," ",r,we>0&&e.jsxs("span",{className:"receive-usd",children:[" (≈ ",j(we),")"]})]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsxs("div",{className:"notice-item",children:["1. Minimum withdrawal amount is $",$," USD equivalent in selected currency."]}),e.jsxs("div",{className:"notice-item",children:["2. Withdrawal fee is $",ge," USD equivalent in selected currency."]}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:L.disabled||ee||U,children:ee?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):U?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading rates..."]}):L.label})]})})]})})}),Q&&e.jsx(Xe,{isOpen:Q,onClose:Se,type:"withdraw",amount:ye,coinType:r}),Ne&&(()=>{var a,s;const t=!!(g!=null&&g.withdrawPassword)&&k!=="no_password_set";return e.jsx("div",{className:"wp-overlay",role:"dialog","aria-modal":"true","aria-labelledby":"wp-title",children:e.jsxs("div",{className:"wp-modal",children:[e.jsxs("div",{className:"wp-header",children:[e.jsxs("div",{className:"wp-header-left",children:[e.jsx("div",{className:`wp-shield-icon${t?"":" wp-shield-warn"}`,children:e.jsx("i",{className:`fas ${t?"fa-shield-alt":"fa-exclamation-triangle"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:"wp-title",id:"wp-title",children:t?"Security Verification":"Withdrawal Password Required"}),e.jsx("div",{className:"wp-subtitle",children:t?"Confirm your withdrawal":"Action needed before you can withdraw"})]})]}),e.jsx("button",{className:"wp-close-btn",onClick:T,"aria-label":"Cancel",children:e.jsx("i",{className:"fas fa-times"})})]}),t?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wp-summary",children:[e.jsxs("div",{className:"wp-summary-row",children:[e.jsx("span",{className:"wp-summary-label",children:"Amount"}),e.jsxs("span",{className:"wp-summary-value wp-summary-amount",children:[l==null?void 0:l.withdrawAmount," ",r]})]}),e.jsxs("div",{className:"wp-summary-row",children:[e.jsx("span",{className:"wp-summary-label",children:"You receive"}),e.jsxs("span",{className:"wp-summary-value wp-summary-receive",children:[((s=(a=l==null?void 0:l.totalAmount)==null?void 0:a.toFixed)==null?void 0:s.call(a,6))??(l==null?void 0:l.totalAmount)," ",r]})]}),e.jsxs("div",{className:"wp-summary-row",children:[e.jsx("span",{className:"wp-summary-label",children:"Address"}),e.jsx("span",{className:"wp-summary-value wp-summary-address",children:l!=null&&l.withdrawAdress?`${String(l.withdrawAdress).slice(0,8)}...${String(l.withdrawAdress).slice(-6)}`:"—"})]})]}),e.jsxs("div",{className:"wp-field-section",children:[e.jsxs("label",{className:"wp-label",htmlFor:"wp-password-input",children:[e.jsx("i",{className:"fas fa-lock wp-label-icon"}),"Withdrawal Password"]}),e.jsxs("div",{className:"wp-input-wrapper",children:[e.jsx("input",{id:"wp-password-input",ref:O,type:Y?"text":"password",className:`wp-input${k?" wp-input-error":""}`,placeholder:"Enter withdrawal password",value:v,onChange:d=>{F(d.target.value),k&&x("")},onKeyDown:d=>d.key==="Enter"&&de(),autoComplete:"off"}),e.jsx("button",{type:"button",className:"wp-eye-btn",onClick:()=>H(d=>!d),"aria-label":Y?"Hide password":"Show password",children:e.jsx("i",{className:`fas ${Y?"fa-eye-slash":"fa-eye"}`})})]}),k&&k!=="no_password_set"&&e.jsxs("div",{className:"wp-error-msg",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),k]})]}),e.jsxs("div",{className:"wp-actions",children:[e.jsx("button",{className:"wp-cancel-btn",onClick:T,disabled:G,children:"Cancel"}),e.jsx("button",{className:"wp-confirm-btn",onClick:de,disabled:G||!v.trim(),children:G?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),"Verifying..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-check"}),"Confirm Withdrawal"]})})]})]}):e.jsxs("div",{className:"wp-no-password",children:[e.jsx("div",{className:"wp-no-password-icon",children:e.jsx("i",{className:"fas fa-lock-open"})}),e.jsx("div",{className:"wp-no-password-title",children:"No Withdrawal Password Set"}),e.jsx("div",{className:"wp-no-password-desc",children:"Your account does not have a withdrawal password configured. A withdrawal password is required to authorize any funds transfer and protect your assets."}),e.jsxs("div",{className:"wp-no-password-steps",children:[e.jsxs("div",{className:"wp-step",children:[e.jsx("div",{className:"wp-step-num",children:"1"}),e.jsxs("div",{className:"wp-step-text",children:["Go to ",e.jsx("strong",{children:"Security Settings"})]})]}),e.jsxs("div",{className:"wp-step",children:[e.jsx("div",{className:"wp-step-num",children:"2"}),e.jsxs("div",{className:"wp-step-text",children:["Tap ",e.jsx("strong",{children:"Withdrawal Password"})]})]}),e.jsxs("div",{className:"wp-step",children:[e.jsx("div",{className:"wp-step-num",children:"3"}),e.jsx("div",{className:"wp-step-text",children:"Set a secure withdrawal password"})]})]}),e.jsxs("div",{className:"wp-actions",children:[e.jsx("button",{className:"wp-cancel-btn",onClick:T,children:"Cancel"}),e.jsxs(Z,{to:"/withdrawPassword",className:"wp-goto-btn",onClick:T,children:[e.jsx("i",{className:"fas fa-cog"}),"Set Password Now"]})]})]})]})})})(),e.jsx("style",{children:`
        /* ── Root ── */
        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #0e0f14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
        }

        /* ── Top bar ── */
        .withdraw-container .header {
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          background: #0e0f14;
          border-bottom: 1px solid #1e1f26;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .withdraw-container .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .withdraw-container .back-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #15161c;
          border: 1px solid #2a2a2e;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .withdraw-container .back-arrow:hover { background: #2a2a2e; border-color: #fd4b4e; color: #fd4b4e; }
        .withdraw-container .page-title {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .withdraw-container .header-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #15161c;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #aaa !important;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .withdraw-container .header-icon:hover { border-color: #fd4b4e; color: #fd4b4e !important; }

        /* ── Content card ── */
        .withdraw-container .content-card {
          background: #0e0f14;
          padding: 20px 16px 100px;
          min-height: calc(100vh - 56px);
        }
        .withdraw-container .withdraw-content { width: 100%; }
        .withdraw-container .form-section { display: flex; flex-direction: column; gap: 16px; }

        /* ── Labels ── */
        .withdraw-container .input-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        /* ── Generic select trigger (currency & network) ── */
        .withdraw-container .currency-select-trigger,
        .withdraw-container .network-select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          min-height: 52px;
        }
        .withdraw-container .currency-select-trigger:hover,
        .withdraw-container .network-select-trigger:hover {
          background: #1a1b24;
          border-color: #2a2a35;
        }

        /* ── Selected state inside trigger ── */
        .withdraw-container .selected-currency,
        .withdraw-container .selected-network {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .withdraw-container .currency-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }
        .withdraw-container .currency-icon img { width: 100%; height: 100%; object-fit: cover; }
        .withdraw-container .currency-text {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .withdraw-container .currency-rate {
          font-size: 11px;
          color: #555;
          margin-left: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .withdraw-container .rate-loading { font-size: 11px; color: #555; }
        .withdraw-container .placeholder { font-size: 14px; color: #444; }
        .withdraw-container .dropdown-arrow { color: #555; font-size: 12px; flex-shrink: 0; transition: transform 0.2s; }

        /* ── Dropdowns ── */
        .withdraw-container .currency-dropdown,
        .withdraw-container .network-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: #1a1b24;
          border: 1px solid #2a2a35;
          border-radius: 14px;
          overflow: hidden;
          z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          max-height: 240px;
          overflow-y: auto;
        }
        .withdraw-container .currency-option,
        .withdraw-container .network-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid #1e1f26;
        }
        .withdraw-container .currency-option:last-child,
        .withdraw-container .network-option:last-child { border-bottom: none; }
        .withdraw-container .currency-option:hover,
        .withdraw-container .network-option:hover { background: #22232e; }
        .withdraw-container .currency-rate-small { font-size: 11px; color: #555; margin-left: auto; }
        .withdraw-container .rate-loading-small { font-size: 11px; color: #555; margin-left: auto; }
        .withdraw-container .network-icon { font-size: 14px; color: #fd4b4e; flex-shrink: 0; }
        .withdraw-container .network-icon-small { font-size: 12px; color: #fd4b4e; flex-shrink: 0; }
        .withdraw-container .network-text { font-size: 14px; font-weight: 600; color: #e8e8e8; }
        .withdraw-container .no-options { padding: 16px; text-align: center; color: #555; font-size: 13px; }

        /* needed so dropdown is positioned relative to wrapper */
        .withdraw-container .custom-select-wrapper { position: relative; }

        /* ── Info box (min withdrawal) ── */
        .withdraw-container .info-box {
          background: rgba(38,161,123,0.08);
          border: 1px solid rgba(38,161,123,0.2);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .withdraw-container .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .withdraw-container .info-label { font-size: 12px; color: #26a17b; font-weight: 500; }
        .withdraw-container .info-value { font-size: 12px; color: #26a17b; font-weight: 600; }

        /* ── Inputs (via FieldFormItem) ── */
        .withdraw-container .input-wrapper { position: relative; }
        .withdraw-container .input-wrapper input,
        .withdraw-container .input-wrapper textarea {
          width: 100%;
          padding: 14px 16px;
          background: #15161c !important;
          border: 1px solid #1e1f26 !important;
          border-radius: 14px !important;
          color: #fff !important;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .withdraw-container .input-wrapper input::placeholder,
        .withdraw-container .input-wrapper textarea::placeholder { color: #444; }
        .withdraw-container .input-wrapper input:focus,
        .withdraw-container .input-wrapper textarea:focus {
          border-color: #fd4b4e !important;
          background: #1a1b24 !important;
        }
        /* FieldFormItem wraps with its own divs — target any input inside input-field */
        .withdraw-container .input-field input,
        .withdraw-container .input-field textarea {
          width: 100%;
          padding: 14px 16px !important;
          background: #15161c !important;
          border: 1px solid #1e1f26 !important;
          border-radius: 14px !important;
          color: #fff !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: border-color 0.2s;
          box-sizing: border-box;
          box-shadow: none !important;
        }
        .withdraw-container .input-field input::placeholder,
        .withdraw-container .input-field textarea::placeholder { color: #444 !important; }
        .withdraw-container .input-field input:focus,
        .withdraw-container .input-field textarea:focus {
          border-color: #fd4b4e !important;
          background: #1a1b24 !important;
        }
        /* Remove default form error red border from FieldFormItem */
        .withdraw-container .input-field .is-invalid,
        .withdraw-container .input-field input.is-invalid {
          border-color: #fd4b4e !important;
        }
        .withdraw-container .input-field .invalid-feedback {
          font-size: 11px !important;
          color: #fd4b4e !important;
          margin-top: 5px;
        }

        /* ── Balance info ── */
        .withdraw-container .balance-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding: 0 2px;
        }
        .withdraw-container .balance-text { font-size: 12px; color: #555; padding-bottom: 12px; }
        .withdraw-container .balance-amount { color: #e8e8e8; font-weight: 600; }
        .withdraw-container .usd-value { font-size: 12px; color: #555; }

        /* ── Fee section ── */
        .withdraw-container .fee-section {
          background: #15161c;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .withdraw-container .fee-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .withdraw-container .fee-label { font-size: 13px; color: #666; }
        .withdraw-container .fee-value { font-size: 13px; color: #e8e8e8; font-weight: 600; text-align: right; }
        .withdraw-container .fee-usd { color: #555; font-weight: 400; font-size: 12px; }
        .withdraw-container .receive-amount { color: #26a17b; }
        .withdraw-container .receive-usd { color: #26a17b; opacity: 0.7; font-weight: 400; }

        /* ── Notice section ── */
        .withdraw-container .notice-section {
          background: rgba(253,75,78,0.05);
          border: 1px solid rgba(253,75,78,0.12);
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .withdraw-container .notice-title {
          font-size: 13px;
          font-weight: 700;
          color: #fd4b4e;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .withdraw-container .notice-title::before {
          content: '⚠';
          font-size: 13px;
        }
        .withdraw-container .notice-content { display: flex; flex-direction: column; gap: 6px; }
        .withdraw-container .notice-item {
          font-size: 12px;
          color: #888;
          line-height: 1.55;
          padding-left: 2px;
        }

        /* ── Submit button ── */
        .withdraw-container .withdraw-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          background: #fd4b4e;
          color: #fff;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .withdraw-container .withdraw-button:hover:not(:disabled) { opacity: 0.88; }
        .withdraw-container .withdraw-button:active:not(:disabled) { transform: scale(0.98); }
        .withdraw-container .withdraw-button:disabled {
          background: #2a2a2e;
          color: #555;
          cursor: not-allowed;
        }

        /* ── Scrollbar ── */
        .withdraw-container .currency-dropdown::-webkit-scrollbar,
        .withdraw-container .network-dropdown::-webkit-scrollbar { width: 4px; }
        .withdraw-container .currency-dropdown::-webkit-scrollbar-track { background: transparent; }
        .withdraw-container .currency-dropdown::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 2px; }

        /* ── Withdrawal Password Modal ── */
        .wp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.82);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: wpFadeIn 0.22s ease;
        }
        @keyframes wpFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .wp-modal {
          background: #13141a;
          border: 1px solid #1e1f26;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 480px;
          padding: 0 0 32px;
          animation: wpSlideUp 0.28s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
        }
        @keyframes wpSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* Warning variant of shield */
        .wp-shield-warn {
          background: rgba(255,152,0,0.12) !important;
          border-color: rgba(255,152,0,0.25) !important;
          color: #FF9800 !important;
        }

        /* Header */
        .wp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid #1e1f26;
        }
        .wp-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wp-shield-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(253,75,78,0.12);
          border: 1px solid rgba(253,75,78,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 18px;
          flex-shrink: 0;
        }
        .wp-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
        }
        .wp-subtitle {
          font-size: 12px;
          color: #555;
          margin-top: 2px;
        }
        .wp-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e1f26;
          border: none;
          color: #666;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .wp-close-btn:hover { background: #2a2a2e; color: #fd4b4e; }

        /* ── No-password state ── */
        .wp-no-password {
          padding: 20px 20px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .wp-no-password-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: rgba(255,152,0,0.1);
          border: 1.5px solid rgba(255,152,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #FF9800;
          margin-bottom: 14px;
        }
        .wp-no-password-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
        }
        .wp-no-password-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 300px;
        }
        .wp-no-password-steps {
          width: 100%;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          text-align: left;
        }
        .wp-step {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wp-step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(253,75,78,0.15);
          border: 1px solid rgba(253,75,78,0.3);
          color: #fd4b4e;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wp-step-text {
          font-size: 13px;
          color: #888;
          line-height: 1.4;
        }
        .wp-step-text strong { color: #e8e8e8; font-weight: 600; }

        /* Go-to-settings button */
        .wp-goto-btn {
          flex: 2;
          padding: 14px;
          background: #FF9800;
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .wp-goto-btn:hover { background: #e68900; }
        .wp-goto-btn:active { transform: scale(0.98); }

        /* Summary */
        .wp-summary {
          margin: 16px 20px;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .wp-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .wp-summary-label {
          font-size: 12px;
          color: #555;
          font-weight: 500;
        }
        .wp-summary-value {
          font-size: 13px;
          font-weight: 700;
          color: #e8e8e8;
          text-align: right;
        }
        .wp-summary-amount { color: #fff; font-size: 14px; }
        .wp-summary-receive { color: #26a17b; }
        .wp-summary-address {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #aaa;
          font-weight: 400;
        }

        /* Password field */
        .wp-field-section {
          padding: 0 20px;
          margin-bottom: 8px;
        }
        .wp-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .wp-label-icon { color: #fd4b4e; font-size: 11px; }
        .wp-input-wrapper {
          position: relative;
        }
        .wp-input {
          width: 100%;
          padding: 14px 48px 14px 16px;
          background: #15161c;
          border: 1.5px solid #1e1f26;
          border-radius: 14px;
          color: #fff;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
          letter-spacing: 2px;
        }
        .wp-input::placeholder { letter-spacing: 0; color: #444; }
        .wp-input:focus {
          border-color: #fd4b4e;
          background: #1a1b24;
        }
        .wp-input-error {
          border-color: #fd4b4e !important;
          background: rgba(253,75,78,0.05) !important;
        }
        .wp-eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #555;
          font-size: 14px;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wp-eye-btn:hover { color: #aaa; }

        /* Error message */
        .wp-error-msg {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          padding: 10px 12px;
          background: rgba(253,75,78,0.08);
          border: 1px solid rgba(253,75,78,0.2);
          border-radius: 10px;
          font-size: 12.5px;
          color: #fd4b4e;
          font-weight: 500;
          animation: wpShake 0.35s ease;
        }
        @keyframes wpShake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }

        /* Actions */
        .wp-actions {
          display: flex;
          gap: 10px;
          padding: 16px 20px 0;
        }
        .wp-cancel-btn {
          flex: 1;
          padding: 14px;
          background: #15161c;
          border: 1.5px solid #2a2a2e;
          border-radius: 14px;
          color: #888;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .wp-cancel-btn:hover:not(:disabled) { border-color: #fd4b4e; color: #fd4b4e; }
        .wp-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .wp-confirm-btn {
          flex: 2;
          padding: 14px;
          background: #fd4b4e;
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
        }
        .wp-confirm-btn:hover:not(:disabled) { background: #e8393c; }
        .wp-confirm-btn:active:not(:disabled) { transform: scale(0.98); }
        .wp-confirm-btn:disabled { background: #2a2a2e; color: #555; cursor: not-allowed; }
      `})]})}export{it as default};
