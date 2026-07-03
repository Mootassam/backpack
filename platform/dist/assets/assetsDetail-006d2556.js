import{v as D,T as z,y as E,u as f,U as y,p as m,V as S,W as A,j as a,q as t,L as v}from"./index-58d25818.js";import{u as M}from"./useDispatch-a18d5675.js";const g=l=>l.assets.view,B=D([g],l=>l.record),L=D([g],l=>!!l.loading),j={selectLoading:L,selectRecord:B,selectRaw:g};function $(){const{id:l}=z(),k=E(),u=M(),i=f(j.selectRecord),C=f(y.selectRows),T=f(j.selectLoading),w=f(y.selectLoading),h=T||w,[F,d]=m.useState(!1),[o,c]=m.useState({status:"all",type:"all",direction:"all",startDate:"",endDate:""});m.useEffect(()=>{Promise.all([u(S.doFind(l)),u(A.doFetch(l))])},[u,l]);const p=C.filter(s=>!(o.status!=="all"&&s.status!==o.status||o.type!=="all"&&s.type!==o.type||o.direction!=="all"&&s.direction!==o.direction||o.startDate&&new Date(s.dateTransaction)<new Date(o.startDate)||o.endDate&&new Date(s.dateTransaction)>new Date(o.endDate))),N=s=>{const n=new Date(s),r=new Date,e=n.toDateString()===r.toDateString(),x=new Date(r.setDate(r.getDate()-1)).toDateString()===n.toDateString();return e?`${t("pages.assetsDetail.today")}, ${n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:x?`${t("pages.assetsDetail.yesterday")}, ${n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:n.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},b=(s,n,r)=>{const e={icon:"fa-exchange-alt",typeText:t("pages.assetsDetail.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:n==="in"?"#2ff378":"#FF6838"};switch(s){case"deposit":e.icon="fa-arrow-down",e.typeText=t("pages.assetsDetail.transactionTypes.deposit"),e.iconClass="deposit",e.color="#F3BA2F",e.amountColor="#2ff378";break;case"withdraw":e.icon="fa-arrow-up",e.typeText=t("pages.assetsDetail.transactionTypes.withdrawal"),e.iconClass="withdraw",e.color="#FF6838",e.amountColor="#FF6838";break;case"convert_in":e.icon="fa-exchange-alt",e.typeText=r?t("pages.assetsDetail.transactionTypes.convertedFrom",r):t("pages.assetsDetail.transactionTypes.conversionIn"),e.iconClass="convert-in",e.color="#9C27B0",e.amountColor="#2ff378";break;case"convert_out":e.icon="fa-exchange-alt",e.typeText=r?t("pages.assetsDetail.transactionTypes.convertedTo",r):t("pages.assetsDetail.transactionTypes.conversionOut"),e.iconClass="convert-out",e.color="#9C27B0",e.amountColor="#FF6838";break;case"stacking":e.icon="fa-coins",e.typeText=t("pages.assetsDetail.transactionTypes.stakedAmount"),e.iconClass="stacking",e.color="#FF9800",e.amountColor="#FFB74D";break;case"staking_reward":e.icon="fa-gift",e.typeText=t("pages.assetsDetail.transactionTypes.stakingRewards"),e.iconClass="staking_reward",e.color="#4CAF50",e.amountColor="#81C784";break;case"futures_reserved":e.icon="fa-lock",e.typeText=t("pages.assetsDetail.transactionTypes.futuresReserved"),e.iconClass="futures-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"futures_profit":e.icon="fa-chart-line",e.typeText=t("pages.assetsDetail.transactionTypes.futuresProfit"),e.iconClass="futures-profit",e.color="#00C076",e.amountColor="#00C076";break;case"futures_loss":e.icon="fa-chart-line",e.typeText=t("pages.assetsDetail.transactionTypes.futuresLoss"),e.iconClass="futures-loss",e.color="#FF6838",e.amountColor="#FF6838";break;case"futures_settlement":e.icon="fa-file-contract",e.typeText=t("pages.assetsDetail.transactionTypes.futuresSettlement"),e.iconClass="futures-settlement",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"futures_fee":e.icon="fa-receipt",e.typeText=t("pages.assetsDetail.transactionTypes.futuresFee"),e.iconClass="futures-fee",e.color="#607D8B",e.amountColor="#607D8B";break;case"futures_refund":e.icon="fa-undo",e.typeText=t("pages.assetsDetail.transactionTypes.futuresRefund"),e.iconClass="futures-refund",e.color="#4CAF50",e.amountColor="#4CAF50";break;case"futures_bonus":e.icon="fa-gift",e.typeText=t("pages.assetsDetail.transactionTypes.futuresBonus"),e.iconClass="futures-bonus",e.color="#E91E63",e.amountColor="#E91E63";break;case"futures_commission":e.icon="fa-handshake",e.typeText=t("pages.assetsDetail.transactionTypes.futuresCommission"),e.iconClass="futures-commission",e.color="#795548",e.amountColor="#795548";break;case"manual_profit":e.icon="fa-user-check",e.typeText=t("pages.assetsDetail.transactionTypes.manualProfit"),e.iconClass="manual-profit",e.color="#00C076",e.amountColor="#00C076";break;case"manual_loss":e.icon="fa-user-slash",e.typeText=t("pages.assetsDetail.transactionTypes.manualLoss"),e.iconClass="manual-loss",e.color="#FF6838",e.amountColor="#FF6838";break;case"manual_adjustment":e.icon="fa-cog",e.typeText=t("pages.assetsDetail.transactionTypes.manualAdjustment"),e.iconClass="manual-adjustment",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"spot_profit":e.icon="fa-coins",e.typeText=t("pages.assetsDetail.transactionTypes.spotTradingProfit"),e.iconClass="spot-profit",e.color="#4CAF50",e.amountColor="#2ff378";break;case"spot_loss":e.icon="fa-coins",e.typeText=t("pages.assetsDetail.transactionTypes.spotTradingLoss"),e.iconClass="spot-loss",e.color="#FF5722",e.amountColor="#FF6838";break;case"reward":e.icon="fa-hand-holding-dollar",e.typeText=t("pages.assetsDetail.transactionTypes.referralReward"),e.iconClass="spot-profit",e.color="#63f211ff",e.amountColor="#5ffc1bff";break;case"bonus":e.icon="fa-gift",e.typeText=t("pages.assetsDetail.transactionTypes.bonus"),e.iconClass="bonus",e.color="#E91E63",e.amountColor="#E91E63";break;case"referral_commission":e.icon="fa-users",e.typeText=t("pages.assetsDetail.transactionTypes.referralCommission"),e.iconClass="referral-commission",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_reserved":e.icon="fa-clock",e.typeText=t("pages.assetsDetail.transactionTypes.orderReserved"),e.iconClass="order-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_cancelled":e.icon="fa-ban",e.typeText=t("pages.assetsDetail.transactionTypes.orderCancelled"),e.iconClass="order-cancelled",e.color="#9E9E9E",e.amountColor="#9E9E9E";break;case"order_partial_fill":e.icon="fa-chart-pie",e.typeText=t("pages.assetsDetail.transactionTypes.orderPartialFill"),e.iconClass="order-partial",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_completed":e.icon="fa-check-circle",e.typeText=t("pages.assetsDetail.transactionTypes.orderCompleted"),e.iconClass="order-completed",e.color="#4CAF50",e.amountColor="#4CAF50";break;case"fee_payment":e.icon="fa-receipt",e.typeText=t("pages.assetsDetail.transactionTypes.feePayment"),e.iconClass="fee-payment",e.color="#607D8B",e.amountColor="#607D8B";break;case"adjustment":e.icon="fa-sliders-h",e.typeText=t("pages.assetsDetail.transactionTypes.balanceAdjustment"),e.iconClass="adjustment",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"transfer":e.icon="fa-exchange-alt",e.typeText=t("pages.assetsDetail.transactionTypes.transfer"),e.iconClass="transfer",e.color="#2196F3",e.amountColor="#2196F3";break;default:e.icon="fa-exchange-alt",e.typeText=t("pages.assetsDetail.transactionTypes.transaction"),e.iconClass="default",e.color="#627EEA",e.amountColor="#627EEA"}return e},_=()=>{c({status:"all",type:"all",direction:"all",startDate:"",endDate:""})};return a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"ad-topbar",children:[a.jsx("button",{className:"ad-back-btn",onClick:()=>k.goBack(),"aria-label":"Go back",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("span",{className:"ad-topbar-title",children:(i==null?void 0:i.coinName)||t("pages.assetsDetail.transactionHistory.title")}),a.jsx("div",{style:{width:36}})]}),h?a.jsxs("div",{className:"asset-card-placeholder",children:[a.jsx("div",{className:"shimmer-circle"}),a.jsx("div",{className:"shimmer-line medium"}),a.jsx("div",{className:"shimmer-line large"})]}):a.jsxs("div",{className:"asset-card",children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${i==null?void 0:i.symbol}.png`,style:{width:60,height:60},alt:i==null?void 0:i.symbol,loading:"lazy"}),a.jsx("div",{className:"asset-name",children:i==null?void 0:i.coinName}),a.jsxs("div",{className:"asset-amount",children:[i==null?void 0:i.amount," ",i==null?void 0:i.symbol]})]}),a.jsxs("div",{className:"transaction-history",children:[a.jsxs("div",{className:"section-header",children:[a.jsx("div",{className:"section-title",children:t("pages.assetsDetail.transactionHistory.title")}),a.jsxs("div",{className:"filter-button",onClick:()=>d(!0),children:[a.jsx("i",{className:"fas fa-filter"}),t("pages.assetsDetail.filter")]})]}),a.jsx("div",{className:"transaction-list",children:h?Array.from({length:5}).map((s,n)=>a.jsxs("div",{className:"transaction-item-placeholder",children:[a.jsxs("div",{className:"transaction-info-placeholder",children:[a.jsx("div",{className:"shimmer-circle"}),a.jsxs("div",{className:"transaction-details-placeholder",children:[a.jsx("div",{className:"shimmer-line medium"}),a.jsx("div",{className:"shimmer-line small"})]})]}),a.jsxs("div",{className:"transaction-amount-placeholder",children:[a.jsx("div",{className:"shimmer-line medium"}),a.jsx("div",{className:"shimmer-line small"})]})]},n)):(p==null?void 0:p.length)>0?p.map(s=>{const{icon:n,typeText:r,iconClass:e,amountColor:x}=b(s.type,s.direction,s.relatedAsset);return a.jsxs("div",{className:"transaction-item",children:[a.jsxs("div",{className:"transaction-info",children:[a.jsx("div",{className:`transaction-icon ${e}`,style:{backgroundColor:b(s.type,s.direction,s.relatedAsset).color},children:a.jsx("i",{className:`fas ${n}`})}),a.jsxs("div",{className:"transaction-details",children:[a.jsx("div",{className:"transaction-type",children:r}),a.jsx("div",{className:"transaction-date",children:N(s.dateTransaction)})]})]}),a.jsxs("div",{className:"transaction-amount",children:[a.jsxs("div",{className:"transaction-value",style:{color:x},children:[s.direction==="in"?"+":"-",s.amount," ",s.asset]}),a.jsx("div",{className:`transaction-status ${s.status==="pending"?"pending":s.status==="canceled"?"canceled":""}`,children:t(`pages.assetsDetail.status.${s.status}`)})]})]},s._id)}):a.jsxs("div",{className:"no-transactions-container",children:[a.jsx("div",{className:"no-transactions-icon",children:a.jsx("i",{className:"fas fa-file-invoice-dollar"})}),a.jsx("h3",{children:t("pages.assetsDetail.noTransactions.title")}),a.jsx("p",{children:t("pages.assetsDetail.noTransactions.description")})]})})]}),F&&a.jsx("div",{className:"modal-backdrop",onClick:()=>d(!1),children:a.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:t("pages.assetsDetail.filterModal.title")}),a.jsx("span",{className:"close",onClick:()=>d(!1),children:"×"})]}),a.jsxs("div",{className:"modal-body",children:[a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.status")}),a.jsxs("select",{value:o.status,onChange:s=>c({...o,status:s.target.value}),children:[a.jsx("option",{value:"all",children:t("pages.assetsDetail.filterModal.allStatuses")}),a.jsx("option",{value:"completed",children:t("pages.assetsDetail.filterModal.completed")}),a.jsx("option",{value:"pending",children:t("pages.assetsDetail.filterModal.pending")}),a.jsx("option",{value:"canceled",children:t("pages.assetsDetail.filterModal.canceled")})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.type")}),a.jsxs("select",{value:o.type,onChange:s=>c({...o,type:s.target.value}),children:[a.jsx("option",{value:"all",children:t("pages.assetsDetail.filterModal.allTypes")}),a.jsx("option",{value:"deposit",children:t("pages.assetsDetail.transactionTypes.deposit")}),a.jsx("option",{value:"withdraw",children:t("pages.assetsDetail.transactionTypes.withdrawal")}),a.jsx("option",{value:"convert_in",children:t("pages.assetsDetail.transactionTypes.conversionIn")}),a.jsx("option",{value:"convert_out",children:t("pages.assetsDetail.transactionTypes.conversionOut")}),a.jsx("option",{value:"stacking",children:t("pages.assetsDetail.transactionTypes.stakedAmount")}),a.jsx("option",{value:"futures_profit",children:t("pages.assetsDetail.transactionTypes.futuresProfit")}),a.jsx("option",{value:"futures_loss",children:t("pages.assetsDetail.transactionTypes.futuresLoss")}),a.jsx("option",{value:"spot_profit",children:t("pages.assetsDetail.transactionTypes.spotTradingProfit")}),a.jsx("option",{value:"spot_loss",children:t("pages.assetsDetail.transactionTypes.spotTradingLoss")})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.direction")}),a.jsxs("select",{value:o.direction,onChange:s=>c({...o,direction:s.target.value}),children:[a.jsx("option",{value:"all",children:t("pages.assetsDetail.filterModal.bothDirections")}),a.jsx("option",{value:"in",children:t("pages.assetsDetail.filterModal.incoming")}),a.jsx("option",{value:"out",children:t("pages.assetsDetail.filterModal.outgoing")})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.startDate")}),a.jsx("input",{type:"date",value:o.startDate,onChange:s=>c({...o,startDate:s.target.value})})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.endDate")}),a.jsx("input",{type:"date",value:o.endDate,onChange:s=>c({...o,endDate:s.target.value})})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{className:"btn-secondary",onClick:_,children:t("pages.assetsDetail.filterModal.resetFilters")}),a.jsx("button",{className:"btn-primary",onClick:()=>d(!1),children:t("pages.assetsDetail.filterModal.applyFilters")})]})]})}),a.jsxs("div",{className:"action-buttons",children:[a.jsx(v,{to:"/deposit",className:"action-button deposit-button remove_blue",children:t("pages.assetsDetail.actions.deposit")}),a.jsx(v,{to:"/withdraw",className:"action-button withdraw-button remove_blue",children:t("pages.assetsDetail.actions.withdraw")})]}),a.jsx("style",{children:`
                /* ── Page root ── */
                .container {
                    min-height: 100vh;
                    background: #0e0f14;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 0 0 100px;
                    box-sizing: border-box;
                    color: #fff;
                }

                /* ── Top bar ── */
                .ad-topbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 14px 16px;
                    background: #0e0f14;
                    border-bottom: 1px solid #1e1f26;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                .ad-back-btn {
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
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s;
                    flex-shrink: 0;
                }
                .ad-back-btn:hover {
                    background: #2a2a2e;
                    border-color: #fd4b4e;
                    color: #fd4b4e;
                }
                .ad-topbar-title {
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    text-align: center;
                    flex: 1;
                }

                /* ── Asset hero card ── */
                .asset-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 32px 20px 28px;
                    background: linear-gradient(160deg, #16080a 0%, #0e0f14 60%);
                    border-bottom: 1px solid #1e1f26;
                    gap: 10px;
                    position: relative;
                    overflow: hidden;
                }
                .asset-card::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 200px; height: 200px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(253,75,78,0.12) 0%, transparent 65%);
                    pointer-events: none;
                }
                .asset-card img {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: #1e1f26;
                    object-fit: contain;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                }
                .asset-name {
                    color: #aaa;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 2px;
                }
                .asset-amount {
                    color: #fff;
                    font-size: 30px;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    line-height: 1;
                }

                /* ── Asset card skeleton ── */
                .asset-card-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 32px 20px 28px;
                    background: #0e0f14;
                    border-bottom: 1px solid #1e1f26;
                    gap: 12px;
                }

                /* ── Transaction section ── */
                .transaction-history {
                    padding: 20px 16px 0;
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 14px;
                }
                .section-title {
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                }
                .filter-button {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: #15161c;
                    border: 1px solid #2a2a2e;
                    border-radius: 8px;
                    padding: 7px 12px;
                    color: #aaa;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: border-color 0.2s, color 0.2s;
                    user-select: none;
                }
                .filter-button:hover {
                    border-color: #fd4b4e;
                    color: #fd4b4e;
                }
                .filter-button i { font-size: 11px; }

                /* ── Transaction list ── */
                .transaction-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                /* ── Transaction item ── */
                .transaction-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 0;
                    border-bottom: 1px solid #1a1b22;
                    gap: 12px;
                }
                .transaction-item:last-child { border-bottom: none; }

                .transaction-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                    min-width: 0;
                }
                .transaction-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 15px;
                    flex-shrink: 0;
                    opacity: 0.9;
                }
                .transaction-details { min-width: 0; }
                .transaction-type {
                    color: #e8e8e8;
                    font-size: 13px;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 3px;
                }
                .transaction-date {
                    color: #555;
                    font-size: 11.5px;
                }

                /* Amount + status */
                .transaction-amount { text-align: right; flex-shrink: 0; }
                .transaction-value {
                    font-size: 13px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }
                .transaction-status {
                    font-size: 10.5px;
                    font-weight: 600;
                    color: #26a17b;
                    text-transform: capitalize;
                }
                .transaction-status.pending  { color: #f0b90b; }
                .transaction-status.canceled { color: #555; }

                /* ── Transaction skeleton ── */
                .transaction-item-placeholder {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 0;
                    border-bottom: 1px solid #1a1b22;
                }
                .transaction-info-placeholder {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .transaction-details-placeholder { display: flex; flex-direction: column; gap: 6px; }
                .transaction-amount-placeholder  { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }

                /* ── Shimmer ── */
                .shimmer-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    animation: adShimmer 1.5s infinite linear;
                    background: linear-gradient(to right, #2a2a2e 8%, #333 18%, #2a2a2e 33%);
                    background-size: 800px 104px;
                }
                .shimmer-line {
                    height: 12px;
                    border-radius: 4px;
                    animation: adShimmer 1.5s infinite linear;
                    background: linear-gradient(to right, #2a2a2e 8%, #333 18%, #2a2a2e 33%);
                    background-size: 800px 104px;
                }
                .shimmer-line.small  { width: 60px; }
                .shimmer-line.medium { width: 90px; }
                .shimmer-line.large  { width: 140px; height: 20px; }
                @keyframes adShimmer {
                    0%   { background-position: -468px 0; }
                    100% { background-position:  468px 0; }
                }

                /* ── Empty state ── */
                .no-transactions-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 48px 20px;
                    text-align: center;
                }
                .no-transactions-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: #15161c;
                    border: 1px solid #1e1f26;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #333;
                    font-size: 24px;
                    margin-bottom: 16px;
                }
                .no-transactions-container h3 {
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    margin: 0 0 8px;
                }
                .no-transactions-container p {
                    color: #555;
                    font-size: 13px;
                    line-height: 1.5;
                    margin: 0;
                }

                /* ── Filter Modal ── */
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(2px);
                }
                .modal-content {
                    background: #15161c;
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                    border: 1px solid #1e1f26;
                    border-bottom: none;
                    width: 100%;
                    max-width: 400px;
                    padding: 0 0 24px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: adSlideUp 0.25s cubic-bezier(0.4,0,0.2,1);
                }
                @keyframes adSlideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 20px 16px;
                    border-bottom: 1px solid #1e1f26;
                }
                .modal-header h3 {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 700;
                    margin: 0;
                }
                .close {
                    color: #555;
                    font-size: 22px;
                    line-height: 1;
                    cursor: pointer;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #1e1f26;
                    transition: background 0.2s, color 0.2s;
                }
                .close:hover { background: #2a2a2e; color: #fff; }

                .modal-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; }

                .filter-group { display: flex; flex-direction: column; gap: 6px; }
                .filter-group label {
                    color: #888;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .filter-group select,
                .filter-group input {
                    background: #0e0f14;
                    border: 1px solid #2a2a2e;
                    border-radius: 10px;
                    color: #e8e8e8;
                    font-size: 13px;
                    padding: 11px 14px;
                    width: 100%;
                    box-sizing: border-box;
                    appearance: none;
                    -webkit-appearance: none;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .filter-group select:focus,
                .filter-group input:focus { border-color: #fd4b4e; }
                .filter-group input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(0.5);
                    cursor: pointer;
                }

                .modal-footer {
                    display: flex;
                    gap: 10px;
                    padding: 16px 20px 0;
                    border-top: 1px solid #1e1f26;
                }
                .btn-secondary {
                    flex: 1;
                    background: transparent;
                    border: 1.5px solid #2a2a2e;
                    border-radius: 12px;
                    color: #888;
                    font-size: 14px;
                    font-weight: 600;
                    padding: 13px 0;
                    cursor: pointer;
                    transition: border-color 0.2s, color 0.2s;
                }
                .btn-secondary:hover { border-color: #fd4b4e; color: #fd4b4e; }
                .btn-primary {
                    flex: 1;
                    background: #fd4b4e;
                    border: none;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    padding: 13px 0;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn-primary:hover { background: #e8393c; }

                /* ── Action buttons (fixed bottom) ── */
                .action-buttons {
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    max-width: 400px;
                    display: flex;
                    gap: 10px;
                    padding: 12px 16px;
                    background: rgba(14,15,20,0.95);
                    border-top: 1px solid #1e1f26;
                    backdrop-filter: blur(10px);
                    box-sizing: border-box;
                    z-index: 100;
                }
                .action-button {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 13px 0;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: opacity 0.2s, transform 0.15s;
                }
                .action-button:hover { opacity: 0.9; transform: translateY(-1px); }
                .deposit-button  { background: #26a17b; color: #fff; }
                .withdraw-button { background: #fd4b4e; color: #fff; }
                a.remove_blue { text-decoration: none; color: inherit; }
            `})]})}export{$ as default};
