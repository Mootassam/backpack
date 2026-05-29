import{p as c,j as e}from"./index-52cad42e.js";const v=({isOpen:a,onClose:n,type:l,amount:d,coinType:m})=>{c.useEffect(()=>{const t=o=>{o.key==="Escape"&&a&&n()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[a,n]),c.useEffect(()=>(a?(document.body.style.overflow="hidden",u()):document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[a]);const p=t=>{const o={deposit:{title:"Deposit Submitted!",message:"Your deposit request has been received. Funds will be credited after admin review.",icon:"fas fa-arrow-down",color:"#26a17b"},convert:{title:"Conversion Complete!",message:"Your currency conversion has been processed successfully.",icon:"fas fa-exchange-alt",color:"#3a8ef6"},staking:{title:"Staking Active!",message:"Your funds are now staked and actively earning rewards.",icon:"fas fa-coins",color:"#f0a500"},withdraw:{title:"Withdrawal Submitted!",message:"Your withdrawal request is under review. We will process it within 24 hours.",icon:"fas fa-arrow-up",color:"#fd4b4e"}};return o[t]||o.deposit},u=()=>{const t=["#F3BA2F","#00C076","#627EEA","#FFFFFF"],o=document.querySelector(".success-modal-overlay");if(!o)return;o.querySelectorAll(".success-confetti").forEach(i=>i.remove());for(let i=0;i<30;i++){const s=document.createElement("div");s.className="success-confetti",s.style.backgroundColor=t[Math.floor(Math.random()*t.length)],s.style.left=Math.random()*100+"vw",s.style.top="-10px",s.style.animation=`successConfettiFall ${Math.random()*3+2}s linear forwards`,s.style.animationDelay=Math.random()*1+"s",o.appendChild(s),setTimeout(()=>{s.parentNode&&s.remove()},5e3)}},f=t=>{t.target===t.currentTarget&&n()};if(!a)return null;const{title:x,message:g,icon:b,color:r}=p(l);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        /* ── Overlay ── */
        .success-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 10000;
          padding: 0 0 env(safe-area-inset-bottom, 0);
          overflow: hidden;
        }

        /* ── Sheet card (slides up) ── */
        .success-modal-container {
          background: #15161c;
          width: 100%;
          max-width: 400px;
          border-radius: 24px 24px 0 0;
          padding: 32px 24px 40px;
          text-align: center;
          border: 1px solid #1e1f26;
          border-bottom: none;
          box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.6);
          animation: smSlideUp 0.38s cubic-bezier(0.32, 0.72, 0, 1) both;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes smSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* ── Drag handle ── */
        .success-modal-handle {
          width: 40px;
          height: 4px;
          background: #2a2a2e;
          border-radius: 2px;
          margin: 0 auto 28px;
        }

        /* ── Icon ring ── */
        .success-modal-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: smIconPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
        }

        .success-modal-icon-wrap::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid currentColor;
          opacity: 0.2;
        }

        @keyframes smIconPop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .success-modal-icon-wrap i {
          font-size: 30px;
          color: #fff;
        }

        /* ── Title ── */
        .success-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        /* ── Amount pill ── */
        .success-modal-amount {
          display: inline-block;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 12px 0 16px;
          background: linear-gradient(135deg, #fff 0%, #aaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Divider ── */
        .success-modal-divider {
          height: 1px;
          background: #1e1f26;
          margin: 0 0 16px;
        }

        /* ── Message ── */
        .success-modal-message {
          font-size: 13px;
          color: #777;
          line-height: 1.6;
          margin-bottom: 28px;
          padding: 0 4px;
        }

        /* ── CTA button ── */
        .success-modal-button {
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
        }

        .success-modal-button:hover  { opacity: 0.9; }
        .success-modal-button:active { transform: scale(0.98); }

        /* ── Confetti pieces ── */
        .success-confetti {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          opacity: 0;
          pointer-events: none;
        }

        @keyframes successConfettiFall {
          0%   { transform: translateY(-60px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(460px) rotate(480deg); opacity: 0; }
        }
      `}),e.jsx("div",{className:"success-modal-overlay",onClick:f,children:e.jsxs("div",{className:"success-modal-container",children:[e.jsx("div",{className:"success-modal-handle"}),e.jsx("div",{className:"success-modal-icon-wrap",style:{background:`${r}22`,color:r},children:e.jsx("i",{className:b})}),e.jsx("div",{className:"success-modal-title",children:x}),e.jsxs("div",{className:"success-modal-amount",children:[d," ",e.jsx("span",{style:{fontSize:"18px",fontWeight:600,opacity:.7},children:m})]}),e.jsx("div",{className:"success-modal-divider"}),e.jsx("div",{className:"success-modal-message",children:g}),e.jsx("button",{className:"success-modal-button",onClick:n,children:"Done"})]})})]})};export{v as S};
