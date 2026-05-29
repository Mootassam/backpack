import{v as M,Z as xe,q as l,$ as be,u as S,n as ge,E as ye,X as Ne,p as a,F as ve,Y as je,a8 as ee,j as e,L as te,A as ke}from"./index-e08889f7.js";import{u as Se,y as Ce,c as re,F as Ae}from"./FormErrors-4aa0e33f.js";import{y as g}from"./yupFormSchemas-42bb2957.js";import{F as ne}from"./FieldFormItem-f43955e0.js";import{S as Fe}from"./sucessModal-c9d05c37.js";import{u as ze}from"./useDispatch-aefee968.js";const C=o=>o.withdraw.form,De=M([C],o=>o.record),Ie=M([C],o=>!!o.initLoading),Re=M([C],o=>!!o.saveLoading),Ee=M([C],o=>!!o.withdrawModal),ae={selectInitLoading:Ie,selectSaveLoading:Re,selectRecord:De,selectModal:Ee,selectRaw:C},T=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],E=500,ie=5,Me={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},Ue=xe().shape({orderNo:g.string(l("entities.withdraw.fields.orderNo")),currency:g.string(l("entities.withdraw.fields.currency")),withdrawAmount:be().typeError(l("pages.withdraw.errors.amountNumber")).required(l("pages.withdraw.errors.amountRequired")).test("positive",l("pages.withdraw.errors.amountPositive"),o=>typeof o=="number"&&o>0),fee:g.decimal(l("entities.withdraw.fields.fee")),totalAmount:g.decimal(l("entities.withdraw.fields.totalAmount")),auditor:g.relationToOne(l("entities.withdraw.fields.auditor")),acceptTime:g.datetime(l("entities.withdraw.fields.acceptTime")),status:g.enumerator(l("entities.withdraw.fields.status"),{options:["pending","canceled","success"]})});function Oe(){var K;const o=ze(),A=S(ge.selectCurrentUser),U=S(ye.selectRows)||[],V=S(ae.selectModal),h=S(Ne.selectRows),W=S(ae.selectSaveLoading),[oe,$]=a.useState(""),[Le,F]=a.useState(""),[r,L]=a.useState(""),[x,j]=a.useState(""),[_,H]=a.useState(null),[O,P]=a.useState(!1),[X,z]=a.useState(!1),[d,se]=a.useState({}),[D,q]=a.useState(!1);a.useEffect(()=>{o(ve.doFetch("exchange"))},[o]),a.useEffect(()=>{o(je.doFetch())},[o]),a.useEffect(()=>{const t=async()=>{try{q(!0);const i=await ke.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:T.join(","),tsyms:"USD"}});if(i.data&&i.data.Response!=="Error"){const w={};T.forEach(s=>{var Q;(Q=i.data[s])!=null&&Q.USD&&(w[s]=i.data[s].USD)}),se(w)}}catch(i){console.error("Failed to fetch exchange rates:",i)}finally{q(!1)}};t();const n=setInterval(t,5*60*1e3);return()=>clearInterval(n)},[]),a.useEffect(()=>{if(h&&h.length>0&&!r){const t=h[0],n=t.symbol||t.id;L(n),c.setValue("currency",n),t.network&&t.network.length>0&&j(t.network[0]._id||t.network[0].name)}},[h]),a.useEffect(()=>{var t,n;if(r&&U.length){const i=U.find(s=>String(s.symbol).toUpperCase()===String(r).toUpperCase());H(i||null);const w=((n=(t=A==null?void 0:A.wallet)==null?void 0:t[r])==null?void 0:n.address)||"";F(w),c.setValue("currency",r),w&&c.setValue("withdrawAdress",w)}else H(null),F(""),c.setValue("currency",""),c.setValue("withdrawAdress","")},[r,U,A]);const B={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:""},c=Se({resolver:Ce.yupResolver(Ue),mode:"all",defaultValues:B}),ce=re({control:c.control,name:"withdrawAmount"});re({control:c.control,name:"currency"});const u=Number(ce),y=!Number.isNaN(u)&&isFinite(u),N=_&&Number(_.amount)||0,{minInCurrency:v,feeInCurrency:p}=a.useMemo(()=>{if(!r||!d[r])return{minInCurrency:0,feeInCurrency:0};const t=d[r],n=E/t,i=ie/t;return{minInCurrency:n,feeInCurrency:i}},[r,d]),I=a.useMemo(()=>!h||!r?null:h.find(t=>{const n=t.symbol||t.id||"";return String(n).toUpperCase()===String(r).toUpperCase()}),[h,r]),f=(I==null?void 0:I.network)||[];a.useEffect(()=>{if(f.length>0){const t=f[0];j(t._id||t.name),z(!1)}else j("")},[I,f]);const k=y?Math.max(u-p,0):0,m=a.useCallback((t,n)=>{if(typeof t!="number"||!isFinite(t)||t===0)return"0";const i=n!==void 0?n:Me[r]||2;return t>0&&t<1e-6?t.toFixed(i>8?i:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:i}).format(t)},[r]),b=a.useCallback(t=>typeof t!="number"||!isFinite(t)||t===0?"$0.00":t>0&&t<.01?`$${t.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(t),[]),Y=a.useCallback(t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t?t.toUpperCase():""}.png`,[]),le=a.useCallback(t=>{j(t._id||t.name),z(!1)},[]),R=a.useCallback(()=>{if(!r)return{disabled:!0,label:l("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"};if(f.length>0&&!x)return{disabled:!0,label:l("pages.withdraw.validation.selectNetwork"),reason:"selectNetwork"};if(!y||u<=0)return{disabled:!0,label:l("pages.withdraw.validation.enterAmount"),reason:"enterAmount"};if(u<v){const n=m(v);return{disabled:!0,label:l("pages.withdraw.validation.belowMin",n,r),reason:"belowMin"}}if(u>N)return{disabled:!0,label:l("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"};if(u+p>N)return{disabled:!0,label:l("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"};const t=c.getValues("withdrawAdress");return!t||t.trim()===""?{disabled:!0,label:l("pages.withdraw.validation.enterAddress"),reason:"enterAddress"}:{disabled:!1,label:l("pages.withdraw.confirmWithdrawal"),reason:"ok"}},[r,f,x,y,u,v,N,p,c,m])(),de=a.useCallback(()=>{o(ee.doClose()),c.reset(B),L(""),F(""),$(""),j("")},[o,c,B]),we=a.useCallback(async t=>{if(!R.disabled)try{t.currency=r;const n=new Date,i=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}`,w=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${i}${w}`;const s=Number(t.withdrawAmount)||0;t.fee=p,t.totalAmount=s-p,t.status="pending",t.network=x,$(t.totalAmount.toString()),await o(ee.doCreate(t))}catch(n){console.error("Withdrawal submission error:",n)}},[r,p,x,R.disabled,o]),pe=a.useCallback(t=>{const n=t.symbol||t.id;L(n),c.setValue("currency",n),c.setValue("withdrawAmount",""),c.setValue("withdrawAdress",""),P(!1),z(!1)},[c]),G=a.useMemo(()=>!y||!d[r]?0:u*d[r],[u,r,d,y]),he=a.useMemo(()=>d[r]?p*d[r]:0,[p,r,d]),Z=a.useMemo(()=>d[r]?k*d[r]:0,[k,r,d]),ue=a.useMemo(()=>N===0?"0":m(N),[N,m]),J=a.useMemo(()=>v===0?"0":m(v),[v,m]),me=a.useMemo(()=>p===0?"0":m(p),[p,m]),fe=a.useMemo(()=>k===0?"0":m(k),[k,m]);return c.formState,e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(te,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"}),e.jsx(te,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"currency-select-trigger",onClick:()=>P(!O),children:[r?e.jsxs("div",{className:"selected-currency",children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:Y(r),alt:r,onError:t=>{const n=t.target;n.onerror=null,n.style.display="none";const i=n.parentElement;i&&(i.textContent=r.charAt(0),i.style.background="#f0f0f0",i.style.color="#333",i.style.fontSize="14px",i.style.fontWeight="bold",i.style.display="inline-flex",i.style.alignItems="center",i.style.justifyContent="center",i.style.width="24px",i.style.height="24px",i.style.borderRadius="50%")}})}),e.jsx("span",{className:"currency-text",children:r}),D?e.jsx("span",{className:"rate-loading",children:"Loading rates..."}):d[r]?e.jsxs("span",{className:"currency-rate",children:["(1 ",r," ≈ ",b(d[r]),")"]}):null]}):e.jsx("span",{className:"placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),O&&e.jsx("div",{className:"currency-dropdown",children:h&&h.length>0?h.filter(t=>T.includes(t.symbol||t.id)).map(t=>{const n=t.symbol||t.id;return e.jsxs("div",{className:"currency-option",onClick:()=>pe(t),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:Y(n),alt:n,onError:i=>{const w=i.target;w.onerror=null,w.style.display="none";const s=w.parentElement;s&&(s.textContent=n.charAt(0),s.style.background="#f0f0f0",s.style.color="#333",s.style.fontSize="14px",s.style.fontWeight="bold",s.style.display="inline-flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.width="24px",s.style.height="24px",s.style.borderRadius="50%")}})}),e.jsx("span",{className:"currency-text",children:n}),D?e.jsx("span",{className:"rate-loading-small",children:"..."}):d[n]?e.jsxs("span",{className:"currency-rate-small",children:["(",b(d[n]),")"]}):null]},t.id||n)}):e.jsx("div",{className:"no-options",children:"No currencies available"})})]})]}),r&&d[r]&&e.jsx("div",{className:"info-box",children:e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Minimum withdrawal:"}),e.jsxs("span",{className:"info-value",children:[J," ",r," (",b(E),")"]})]})}),r&&f.length>0&&e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"network-select-trigger",onClick:()=>z(!X),children:[e.jsxs("div",{className:"selected-network",children:[e.jsx("i",{className:"fas fa-network-wired network-icon"}),e.jsx("span",{className:"network-text",children:((K=f.find(t=>t._id===x||t.id===x||t.name===x))==null?void 0:K.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),X&&e.jsx("div",{className:"network-dropdown",children:f.map(t=>e.jsxs("div",{className:"network-option",onClick:()=>le(t),children:[e.jsx("i",{className:"fas fa-network-wired network-icon-small"}),e.jsx("span",{className:"network-text",children:t.name})]},t._id||t.id||t.name))})]})]}),e.jsx(Ae,{...c,children:e.jsxs("form",{onSubmit:c.handleSubmit(we),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(ne,{name:"withdrawAdress",type:"text",className:"address-field",placeholder:"Enter your wallet address",onChange:t=>F(t.target.value)})}),e.jsx("br",{})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(ne,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0",step:"any"})}),e.jsxs("div",{className:"balance-info",children:[e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[ue," ",r]})]}),y&&G>0&&e.jsxs("div",{className:"usd-value",children:["≈ ",b(G)]})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Withdrawal fee:"}),e.jsxs("div",{className:"fee-value",children:[me," ",r,e.jsxs("span",{className:"fee-usd",children:[" (",b(he),")"]})]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Minimum withdrawal:"}),e.jsxs("div",{className:"fee-value",children:[J," ",r,e.jsxs("span",{className:"fee-usd",children:[" (",b(E),")"]})]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[fe," ",r,Z>0&&e.jsxs("span",{className:"receive-usd",children:[" (≈ ",b(Z),")"]})]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsxs("div",{className:"notice-item",children:["1. Minimum withdrawal amount is $",E," USD equivalent in selected currency."]}),e.jsxs("div",{className:"notice-item",children:["2. Withdrawal fee is $",ie," USD equivalent in selected currency."]}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:R.disabled||W||D,children:W?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):D?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading rates..."]}):R.label})]})})]})})}),V&&e.jsx(Fe,{isOpen:V,onClose:de,type:"withdraw",amount:oe,coinType:r}),e.jsx("style",{children:`
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
      `})]})}export{Oe as default};
