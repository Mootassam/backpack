import{u as n,X as a,p as d,Y as l,j as e,L as r}from"./index-e08889f7.js";import{u as p}from"./useDispatch-aefee968.js";function m(){const s=p(),i=n(a.selectRows);return n(a.selectLoading),d.useEffect(()=>{s(l.doFetch())},[s]),e.jsxs("div",{className:"deposit-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(r,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Deposit"}),e.jsx(r,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsxs("div",{className:"deposit-content",children:[e.jsx("div",{className:"section-title",children:"Select the currency you want to recharge"}),e.jsx("div",{className:"crypto-grid",children:i==null?void 0:i.map(o=>e.jsxs(r,{to:`/deposit/wallet/${o.symbol}`,className:"crypto-item",children:[e.jsx("div",{className:"crypto-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o.symbol}.png`,alt:o.symbol,onError:c=>{const t=c.currentTarget;t.onerror=null,t.style.display="none",t.parentElement&&(t.parentElement.innerHTML=o.symbol)}})}),e.jsx("div",{className:"crypto-name",children:o.symbol})]},o.symbol))}),e.jsxs("div",{className:"otc-section",children:[e.jsx("div",{className:"section-title",children:"Over-the-counter trading line"}),e.jsxs(r,{to:"/online-service",className:"otc-item",children:[e.jsx("div",{className:"otc-icon",children:e.jsx("i",{className:"fas fa-headset"})}),e.jsx("div",{className:"otc-name",children:"Online Customer Support"}),e.jsx("i",{className:"fas fa-chevron-right offsite-arrow"})]})]})]})}),e.jsx("style",{children:`
                .deposit-container {
                    max-width: 400px;
                    margin: 0 auto;
                    min-height: 100vh;
                    background: #0e0f14;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: #fff;
                }

                /* ── Top bar ── */
                .header {
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
                .nav-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }
                .back-arrow {
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
                .back-arrow:hover { background: #2a2a2e; border-color: #fd4b4e; color: #fd4b4e; }
                .page-title {
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .header-icon {
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
                .header-icon:hover { border-color: #fd4b4e; color: #fd4b4e !important; }

                /* ── Content ── */
                .content-card {
                    background: #0e0f14;
                    padding: 20px 16px;
                    min-height: calc(100vh - 56px);
                }
                .deposit-content { width: 100%; }

                /* ── Section title ── */
                .section-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #888;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 14px;
                }

                /* ── Crypto grid ── */
                .crypto-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    margin-bottom: 28px;
                }
                .crypto-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 16px 8px 14px;
                    background: #15161c;
                    border: 1px solid #1e1f26;
                    border-radius: 14px;
                    text-decoration: none;
                    color: inherit;
                    transition: background 0.2s, border-color 0.2s, transform 0.15s;
                    gap: 8px;
                }
                .crypto-item:hover {
                    background: #1a1b24;
                    border-color: #fd4b4e;
                    transform: translateY(-2px);
                }
                .crypto-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #0e0f14;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border: 1px solid #1e1f26;
                }
                .crypto-icon img { width: 100%; height: 100%; object-fit: cover; }
                .crypto-name {
                    font-size: 12px;
                    font-weight: 700;
                    color: #e8e8e8;
                    text-align: center;
                }

                /* ── Offsite section ── */
                .offsite-section { margin-bottom: 24px; }
                .offsite-list { display: flex; flex-direction: column; gap: 8px; }
                .offsite-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 14px 16px;
                    background: #15161c;
                    border: 1px solid #1e1f26;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s;
                }
                .offsite-item:hover { background: #1a1b24; border-color: #2a2a35; }
                .offsite-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    overflow: hidden;
                    flex-shrink: 0;
                    background: #0e0f14;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .offsite-icon img { width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }
                .offsite-name { flex: 1; font-size: 14px; font-weight: 600; color: #e8e8e8; }
                .offsite-arrow { color: #444; font-size: 13px; }

                /* ── OTC section ── */
                .otc-section { margin-bottom: 24px; }
                .otc-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 16px;
                    background: #15161c;
                    border: 1px solid #1e1f26;
                    border-radius: 14px;
                    text-decoration: none;
                    color: inherit;
                    transition: background 0.2s, border-color 0.2s;
                }
                .otc-item:hover { background: #1a1b24; border-color: #fd4b4e33; }
                .otc-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    background: rgba(253,75,78,0.12);
                    border: 1px solid rgba(253,75,78,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fd4b4e;
                    font-size: 17px;
                    flex-shrink: 0;
                }
                .otc-name { flex: 1; font-size: 14px; font-weight: 600; color: #e8e8e8; }
            `})]})}export{m as default};
