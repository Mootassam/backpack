import{o as d,$ as xa,w as s,k as m,u as ka,n as w,y as fa,aq as ha,F as ba,ar as ya,as as U,G as K,j as e,at as W}from"./index-9fb4ec24.js";import{u as ja,y as va,c as wa,F as Na}from"./FormErrors-dac726aa.js";import{y as f}from"./yupFormSchemas-49c3a4f4.js";import{F as Sa}from"./FieldFormItem-77816792.js";import{D as q}from"./Dates-de0b2d39.js";import{S as Fa}from"./sucessModal-24ee7dc1.js";import{u as Ra}from"./useDispatch-09756e97.js";import"./v4-4a60fe23.js";const g=t=>t.plan.list,za=d([g],t=>t.loading),Da=d([g],t=>t.exportLoading),C=d([g],t=>t.rows),M=d([g],t=>t.count),Ca=d([M],t=>t>0),Ma=d([g],t=>t.sorter||{}),Aa=d([g],t=>{const r=t.sorter;if(!r||!r.field)return null;let h=r.order==="descend"?"DESC":"ASC";return`${r.field}_${h}`}),Pa=d([g],t=>t.filter),Ta=d([g],t=>t.rawFilter),Ea=d([g],t=>t.pagination.pageSize),$a=d([g],t=>{const r=t.pagination;return!r||!r.pageSize?0:((r.current||1)-1)*r.pageSize}),Ba=d([g,M],(t,r)=>({...t.pagination,total:r})),H=d([g],t=>t.selectedKeys),La=d([g,C],(t,r)=>r.filter(h=>t.selectedKeys.includes(h.id))),Oa=d([C,H],(t,r)=>t.length===r.length),Va={selectLoading:za,selectRows:C,selectCount:M,selectOrderBy:Aa,selectLimit:Ea,selectFilter:Pa,selectOffset:$a,selectPagination:Ba,selectSelectedKeys:H,selectSelectedRows:La,selectHasRows:Ca,selectExportLoading:Da,selectRawFilter:Ta,selectIsAllSelected:Oa,selectSorter:Ma},N=t=>t.stacking.form,Ia=d([N],t=>t.record),Ua=d([N],t=>!!t.initLoading),Ka=d([N],t=>!!t.saveLoading),Wa=d([N],t=>!!t.showModal),qa={selectInitLoading:Ua,selectSaveLoading:Ka,selectRecord:Ia,selectModal:Wa,selectRaw:N},Ha=xa().shape({user:f.relationToOne(s("entities.stacking.fields.user"),{}),plan:f.relationToOne(s("entities.stacking.fields.plan"),{}),amount:f.decimal(s("entities.stacking.fields.amount"),{required:!0}),status:f.enumerator(s("entities.stacking.fields.status"),{options:["active","completed","cancelled"]}),startDate:f.datetime(s("entities.stacking.fields.startDate"),{}),endDate:f.datetime(s("entities.stacking.fields.endDate"),{}),earnedRewards:f.decimal(s("entities.stacking.fields.earnedRewards"),{})});function ee(){const[t,r]=m.useState("options"),[h,A]=m.useState(!1),x=Ra(),G=ka(),y=w(Va.selectRows),_=w(fa.selectCurrentUser),F=w(ha.selectRows),S=w(ba.selectRows),[R,J]=m.useState({}),[P,T]=m.useState({}),[Q,X]=m.useState(""),E=w(qa.selectModal),Y=()=>{x(W.doClose())},[c,Z]=m.useState({crypto:"",daily:"",balance:0,min:0,max:0,symbol:"",plan:"",unstakingPeriod:""}),[b,z]=m.useState(""),[aa]=m.useState(()=>({user:"",plan:"",amount:"",status:"",startDate:"",endDate:"",earnedRewards:""})),j=ja({resolver:va.yupResolver(Ha),mode:"all",defaultValues:aa}),$=wa({control:j.control,name:"amount",defaultValue:""}),ea=()=>{if(S&&S.length>0){const a=S.reduce((n,i)=>(i.symbol&&i.amount!==void 0&&(n[i.symbol]=parseFloat(i.amount)||0),n),{});T(a)}};m.useEffect(()=>{z($||"")},[$]),m.useEffect(()=>{ea()},[S]);const sa=async a=>{a.startDate=new Date;const n=new Date(a.startDate);n.setDate(n.getDate()+parseInt(c.unstakingPeriod)),a.endDate=n.toISOString(),a.status="active",a.plan=c.plan,a.user=_.id,X(a.amount);try{await x(W.doCreate(a)),x(K.doFetch()),x(U.doFetch()),T(i=>({...i,[c.symbol]:(i[c.symbol]||0)-parseFloat(b)})),B()}catch(i){console.error("Staking failed:",i)}},ta=()=>{if(!b||isNaN(b)||b<=0)return"0";const a=parseFloat(b),n=parseFloat(c.daily),i=parseFloat(c.unstakingPeriod);return(a*(n/100)*i).toFixed(6)},na=()=>{const a=parseFloat(b),n=P[c.symbol]||0;return isNaN(a)||a<=0?{isValid:!1,message:s("stake.enterAmount")}:a>n?{isValid:!1,message:s("stake.insufficientBalance")}:a<c.min?{isValid:!1,message:s("stake.minAmount",{min:c.min})}:a>c.max?{isValid:!1,message:s("stake.maxAmount",{max:c.max})}:{isValid:!0,message:s("stake.confirmStake")}},ia=(a,n,i,l,o,p,u,k)=>{Z({crypto:a,daily:n,balance:i,min:l,max:o,symbol:p,plan:u,unstakingPeriod:k}),A(!0),z(""),j.setValue("amount","")},B=()=>{A(!1),z(""),j.setValue("amount","")},oa=async()=>{try{const n=[...new Set(y.map(o=>o.currency))].map(async o=>{if(o==="USDT")return{currency:o,price:1};try{const u=await(await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${o}USDT`)).json();return{currency:o,price:parseFloat(u.price)}}catch{return{currency:o,price:0}}}),i=await Promise.all(n),l={};i.forEach(o=>{l[o.currency]=o.price}),J(l)}catch(a){console.error("Error fetching crypto prices:",a)}},D=F.filter(a=>a.status==="active"),v=F.filter(a=>a.status==="completed"),ca=()=>{let a=0;return D.forEach(n=>{var p;const i=(p=n==null?void 0:n.plan)==null?void 0:p.currency,l=parseFloat(n.amount)||0,o=R[i]||0;a+=l*o}),a.toFixed(2)},ra=()=>{let a=0;return F.forEach(n=>{var p;const i=(p=n==null?void 0:n.plan)==null?void 0:p.currency,l=parseFloat(n.earnedRewards)||0,o=R[i]||0;a+=l*o}),a.toFixed(2)},la=()=>{let a=0;return v.forEach(n=>{var p;const i=(p=n==null?void 0:n.plan)==null?void 0:p.currency,l=parseFloat(n.earnedRewards)||0,o=R[i]||0;a+=l*o}),a.toFixed(2)};m.useEffect(()=>(x(ya.doFetch()),x(U.doFetch()),x(K.doFetch()),()=>{}),[x]),m.useEffect(()=>{y.length>0&&oa()},[y]);const L=na(),O=!L.isValid,da=L.message,pa=a=>{const n=new Date,i=new Date(a.startDate);return Math.floor((n.getTime()-i.getTime())/(1e3*60*60*24))},ga=a=>{const n=new Date,i=new Date(a.endDate),l=Math.floor((i.getTime()-n.getTime())/(1e3*60*60*24));return Math.max(0,l)},ma=()=>P[c.symbol]||0,ua=()=>G.goBack();return e.jsxs("div",{className:"stacking-page",children:[e.jsxs("div",{className:"top-header",children:[e.jsx("div",{className:"back-button",onClick:ua,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"page-title",children:s("pages.staking.title")}),e.jsx("div",{className:"header-placeholder"})]}),e.jsxs("div",{className:"stacking-card",children:[e.jsxs("div",{className:"stacking-overview",children:[e.jsx("div",{className:"stacking-label",children:s("pages.staking.totalStakedBalance")}),e.jsxs("div",{className:"stacking-balance",children:["$",ca()]}),e.jsxs("div",{className:"stacking-rewards-earned",children:["+ $",ra()," ",s("pages.staking.earned")]})]}),e.jsx("div",{className:"stacking-toggle-section",children:["options","active","completed"].map(a=>e.jsx("div",{className:`stacking-toggle-option ${t===a?"stacking-toggle-active":""}`,onClick:()=>r(a),children:s(`pages.staking.tabs.${a}`)},a))}),t==="options"&&e.jsx("div",{className:"stacking-options",children:y.length>0?y.map(a=>e.jsxs("div",{className:"stacking-option-card",children:[e.jsxs("div",{className:"stacking-option-header",children:[e.jsxs("div",{className:"option-coin-info",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a.currency}.png`,alt:a.currency}),e.jsx("span",{className:"stacking-option-name",children:a.currency})]}),e.jsxs("div",{className:"stacking-option-apy",children:[a.dailyRate,"% ",s("pages.staking.daily")]})]}),e.jsxs("div",{className:"stacking-option-details",children:[e.jsx("span",{className:"stacking-detail-label",children:s("pages.staking.minimumStake")}),e.jsxs("span",{className:"stacking-detail-value",children:[a.minimumStake," ",a.currency]})]}),e.jsxs("div",{className:"stacking-option-details",children:[e.jsx("span",{className:"stacking-detail-label",children:s("pages.staking.unstakingPeriod")}),e.jsxs("span",{className:"stacking-detail-value",children:[a.unstakingPeriod," ",s("pages.staking.days")]})]}),e.jsx("button",{className:"stacking-stake-button",onClick:()=>ia(a.currency,a.dailyRate,a.earnedRewards,a.minimumStake,a.maxStake,a.currency,a.id,a.unstakingPeriod),children:s("pages.staking.stakeButton",a.currency)})]},a.currency)):e.jsxs("div",{className:"empty-stacking-state",children:[e.jsx("i",{className:"fas fa-coins empty-icon"}),e.jsx("div",{className:"empty-title",children:s("pages.staking.emptyStates.options.title")}),e.jsx("div",{className:"empty-message",children:s("pages.staking.emptyStates.options.message")})]})}),t==="active"&&e.jsx("div",{className:"stacking-active-stakes",children:D.length>0?D.map(a=>{var l,o,p,u,k,V,I;const n=Math.min(100,pa(a)/((l=a==null?void 0:a.plan)==null?void 0:l.unstakingPeriod)*100),i=ga(a);return e.jsxs("div",{className:"stacking-stake-item",children:[e.jsxs("div",{className:"stacking-stake-header",children:[e.jsxs("div",{className:"stake-coin-info",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(o=a==null?void 0:a.plan)==null?void 0:o.currency}.png`,alt:(p=a==null?void 0:a.plan)==null?void 0:p.currency}),e.jsx("span",{className:"stacking-stake-crypto",children:(u=a==null?void 0:a.plan)==null?void 0:u.currency}),e.jsx("span",{className:"stacking-status-badge stacking-status-active",children:s("pages.staking.status.active")})]}),e.jsxs("span",{className:"stacking-stake-amount",children:[a.amount," ",(k=a==null?void 0:a.plan)==null?void 0:k.currency]})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.daily")}),e.jsxs("span",{className:"stacking-stake-value",children:[(V=a==null?void 0:a.plan)==null?void 0:V.dailyRate,"%"]})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.earned")}),e.jsxs("span",{className:"stacking-stake-value stacking-value-positive",children:[a.earnedRewards||0," ",(I=a==null?void 0:a.plan)==null?void 0:I.currency]})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.remaining")}),e.jsxs("span",{className:"stacking-stake-value",children:[i," ",s("pages.staking.days")]})]}),e.jsx("div",{className:"stacking-progress-bar",children:e.jsx("div",{className:"stacking-progress-fill",style:{width:`${n}%`}})})]},a.id)}):e.jsxs("div",{className:"empty-stacking-state",children:[e.jsx("i",{className:"fas fa-chart-line empty-icon"}),e.jsx("div",{className:"empty-title",children:s("pages.staking.emptyStates.active.title")}),e.jsx("div",{className:"empty-message",children:s("pages.staking.emptyStates.active.message")}),e.jsx("button",{className:"start-staking-button",onClick:()=>r("options"),children:s("pages.staking.exploreStakingOptions")})]})}),t==="completed"&&e.jsx("div",{className:"stacking-completed-stakes",children:v.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"completed-rewards-overview",children:[e.jsxs("div",{className:"completed-rewards-header",children:[e.jsx("span",{className:"completed-rewards-label",children:s("pages.staking.totalCompletedRewards")}),e.jsxs("span",{className:"completed-rewards-count",children:[v.length," ",v.length===1?s("pages.staking.stake"):s("pages.staking.stakes")]})]}),e.jsxs("div",{className:"completed-rewards-amount",children:["$",la()]}),e.jsx("div",{className:"completed-rewards-subtext",children:s("pages.staking.allRewardsFromCompleted")})]}),v.map(a=>{var n,i,l,o,p,u,k;return e.jsxs("div",{className:"stacking-completed-item",children:[e.jsxs("div",{className:"stacking-stake-header",children:[e.jsxs("div",{className:"stake-coin-info",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(n=a==null?void 0:a.plan)==null?void 0:n.currency}.png`,alt:(i=a==null?void 0:a.plan)==null?void 0:i.currency}),e.jsx("span",{className:"stacking-stake-crypto",children:(l=a==null?void 0:a.plan)==null?void 0:l.currency}),e.jsx("span",{className:"stacking-status-badge stacking-status-completed",children:s("pages.staking.status.completed")})]}),e.jsxs("span",{className:"stacking-stake-amount",children:[a.amount," ",(o=a==null?void 0:a.plan)==null?void 0:o.currency]})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.dailyRate")}),e.jsxs("span",{className:"stacking-stake-value",children:[(p=a==null?void 0:a.plan)==null?void 0:p.dailyRate,"%"]})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.duration")}),e.jsxs("span",{className:"stacking-stake-value",children:[(u=a==null?void 0:a.plan)==null?void 0:u.unstakingPeriod," ",s("pages.staking.days")]})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.createdAt")}),e.jsx("span",{className:"stacking-stake-value",children:q.NewsDate(a==null?void 0:a.startDate)})]}),e.jsxs("div",{className:"stacking-stake-details",children:[e.jsx("span",{className:"stacking-stake-label",children:s("pages.staking.dateFinish")}),e.jsx("span",{className:"stacking-stake-value",children:q.NewsDate(a==null?void 0:a.endDate)})]}),e.jsxs("div",{className:"stacking-completed-rewards",children:[e.jsx("div",{className:"stacking-completed-rewards-label",children:s("pages.staking.totalRewardsEarned")}),e.jsxs("div",{className:"stacking-completed-rewards-amount",children:["+",a.earnedRewards||0," ",(k=a==null?void 0:a.plan)==null?void 0:k.currency]})]})]},a.id)})]}):e.jsxs("div",{className:"empty-stacking-state",children:[e.jsx("i",{className:"fas fa-check-circle empty-icon"}),e.jsx("div",{className:"empty-title",children:s("pages.staking.emptyStates.completed.title")}),e.jsx("div",{className:"empty-message",children:s("pages.staking.emptyStates.completed.message")}),e.jsx("button",{className:"start-staking-button",onClick:()=>r("options"),children:s("pages.staking.startStaking")})]})})]}),E&&e.jsx(Fa,{isOpen:E,onClose:Y,type:"staking",amount:String(Q),coinType:c.crypto}),h&&e.jsx("div",{className:"staking-modal-overlay",children:e.jsx("div",{className:"staking-modal-content",children:e.jsx(Na,{...j,children:e.jsxs("form",{onSubmit:j.handleSubmit(sa),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h3",{children:[s("pages.staking.stakeModal.title")," ",c.crypto]}),e.jsx("button",{type:"button",className:"modal-close",onClick:B,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"staking-input-group",children:[e.jsx(Sa,{name:"amount",label:s("pages.staking.stakeModal.amountToStake"),className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:s("pages.staking.stakeModal.enterAmount")}),e.jsxs("div",{className:"balance-info",children:[s("pages.staking.balance"),":"," ",ma()," ",c.symbol]})]}),e.jsxs("div",{className:"staking-modal-details",children:[e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:s("pages.staking.daily")}),e.jsxs("span",{children:[c.daily,"%"]})]}),e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:s("pages.staking.minimumStake")}),e.jsxs("span",{children:[c.min," ",c.symbol]})]}),e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:s("pages.staking.maximumStake")}),e.jsxs("span",{children:[c.max," ",c.symbol]})]}),e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:s("pages.staking.estimatedTotalRewards")}),e.jsxs("span",{children:[ta()," ",c.symbol]})]})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{type:"submit",disabled:O,className:`stake-submit-btn ${O?"disabled":""}`,children:da})})]})})})}),e.jsx("style",{children:`
        /* ====== Page Layout ====== */
        .stacking-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        /* ----- Top header (back button) ----- */
        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
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
        .stacking-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        /* ----- Overview Box ----- */
        .stacking-overview {
          background: #1e1e24;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          margin-bottom: 16px;
        }
        .stacking-label {
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 8px;
        }
        .stacking-balance {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .stacking-rewards-earned {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        /* ----- Tabs ----- */
        .stacking-toggle-section {
          display: flex;
          background: #2a2a2e;
          border-radius: 10px;
          margin-bottom: 16px;
          padding: 4px;
        }
        .stacking-toggle-option {
          flex: 1;
          text-align: center;
          padding: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #aaaaaa;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .stacking-toggle-active {
          background: #F41112;
          color: #ffffff;
        }

        /* ----- Option Cards ----- */
        .stacking-option-card {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
          border: 1px solid #2a2a2e;
          transition: border 0.2s;
        }
        .stacking-option-card:hover {
          border-color: #F41112;
        }
        .stacking-option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .option-coin-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .option-coin-info img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }
        .stacking-option-name {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .stacking-option-apy {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
        }
        .stacking-option-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .stacking-detail-label {
          font-size: 12px;
          color: #aaaaaa;
        }
        .stacking-detail-value {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
        }
        .stacking-stake-button {
          width: 100%;
          background: #F41112;
          color: #ffffff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 8px;
        }
        .stacking-stake-button:hover {
          background: #AD1111;
        }

        /* ----- Stake Items (Active/Completed) ----- */
        .stacking-stake-item,
        .stacking-completed-item {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
          border: 1px solid #2a2a2e;
        }
        .stacking-completed-item {
          border-left: 3px solid #4caf50;
          padding-left: 11px;
        }
        .stacking-stake-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .stake-coin-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stake-coin-info img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }
        .stacking-stake-crypto {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .stacking-stake-amount {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .stacking-status-badge {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 8px;
          font-weight: 600;
        }
        .stacking-status-active {
          background: rgba(244, 17, 18, 0.15);
          color: #F41112;
        }
        .stacking-status-completed {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }
        .stacking-stake-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .stacking-stake-label {
          font-size: 11px;
          color: #aaaaaa;
        }
        .stacking-stake-value {
          font-size: 11px;
          color: #ffffff;
          font-weight: 500;
        }
        .stacking-value-positive {
          color: #4caf50;
        }
        .stacking-progress-bar {
          height: 4px;
          background: #2a2a2e;
          border-radius: 2px;
          margin-top: 8px;
          overflow: hidden;
        }
        .stacking-progress-fill {
          height: 100%;
          background: #F41112;
          border-radius: 2px;
        }
        .stacking-completed-rewards {
          background: rgba(76, 175, 80, 0.08);
          border-radius: 8px;
          padding: 8px;
          margin-top: 10px;
          text-align: center;
        }
        .stacking-completed-rewards-label {
          font-size: 10px;
          color: #4caf50;
          margin-bottom: 4px;
        }
        .stacking-completed-rewards-amount {
          font-size: 13px;
          font-weight: 700;
          color: #4caf50;
        }

        /* ----- Empty States ----- */
        .empty-stacking-state {
          text-align: center;
          padding: 32px 16px;
          color: #aaaaaa;
        }
        .empty-icon {
          font-size: 40px;
          color: #2a2a2e;
          margin-bottom: 12px;
        }
        .empty-title {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .empty-message {
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 16px;
        }
        .start-staking-button {
          background: #F41112;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Completed Rewards Overview */
        .completed-rewards-overview {
          background: rgba(76, 175, 80, 0.08);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
          border-left: 3px solid #4caf50;
        }
        .completed-rewards-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .completed-rewards-label {
          font-size: 12px;
          color: #aaaaaa;
        }
        .completed-rewards-count {
          font-size: 10px;
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
          padding: 2px 8px;
          border-radius: 10px;
        }
        .completed-rewards-amount {
          font-size: 20px;
          font-weight: 700;
          color: #4caf50;
          margin-bottom: 4px;
        }
        .completed-rewards-subtext {
          font-size: 11px;
          color: #666;
        }

        /* ====== Stake Modal ====== */
        .staking-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .staking-modal-content {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #2a2a2e;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .modal-close {
          background: none;
          border: none;
          color: #aaaaaa;
          font-size: 18px;
          cursor: pointer;
        }
        .modal-close:hover {
          color: #F41112;
        }
        .modal-body {
          padding: 16px;
        }
        .staking-input-group {
          margin-bottom: 16px;
        }
        .balance-info {
          text-align: right;
          font-size: 11px;
          color: #aaaaaa;
          margin-top: 4px;
        }
        .staking-modal-details {
          background: #1e1e24;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 16px;
        }
        .detail-line {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 8px;
        }
        .detail-line:last-child {
          margin-bottom: 0;
        }
        .detail-line span:last-child {
          color: #ffffff;
          font-weight: 500;
        }
        .modal-footer {
          padding: 12px 16px 16px;
        }
        .stake-submit-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #F41112;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .stake-submit-btn:hover:not(.disabled) {
          background: #AD1111;
        }
        .stake-submit-btn.disabled {
          background: #2a2a2e;
          color: #777;
          cursor: not-allowed;
        }

        /* ====== Form overrides (FieldFormItem) ====== */
        .textField input, .textField select, .textField textarea {
          background: #2a2a2e !important;
          border: none !important;
          border-radius: 8px !important;
          color: #fff !important;
          padding: 10px 12px !important;
          font-size: 14px !important;
        }
        .inputLabel {
          color: #aaaaaa !important;
          font-size: 12px !important;
          margin-bottom: 4px !important;
        }
        .inputWrapper {
          margin-bottom: 0 !important;
        }
      `})]})}export{ee as default};
