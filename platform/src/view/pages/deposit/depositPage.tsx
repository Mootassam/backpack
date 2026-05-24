import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'
import method from 'src/modules/depositMethod/list/depositMethodListActions'
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';

import { useDispatch, useSelector } from "react-redux";
function DepositPage() {
    const dispatch = useDispatch();
    const listMethod = useSelector(selectors.selectRows);
    const loading = useSelector(selectors.selectLoading);


    const offsiteExchanges = [
        { name: 'Gemini', icon: 'fas fa-gem', src: './images/market/gemini.jpg' },
        { name: 'Coinbase', icon: 'fas fa-coins', src: './images/market/coinbase.jpg' },
        { name: 'Kraken', icon: 'fas fa-anchor', src: './images/market/kraken.jpg' },
        { name: 'Shakepay', icon: 'fas fa-handshake', src: './images/market/shakepay.jpg' }
    ]


    useEffect(() => {
        dispatch(method.doFetch());
    }, [dispatch]);
    return (
        <div className="deposit-container">
            {/* Header Section - Matching HelpCenter */}
            <div className="header">
                <div className="nav-bar">
                    <Link to="/wallets" className="back-arrow">
                        <i className="fas fa-arrow-left" />
                    </Link>
                    <div className="page-title">Deposit</div>
                    <Link className="header-icon" to="/history" style={{ color: 'white' }}>
                        <i className="fas fa-receipt" />
                    </Link>
                </div>
            </div>

            {/* Content Card - Matching HelpCenter */}
            <div className="content-card">
                <div className="deposit-content">
                    {/* Section Title */}
                    <div className="section-title">Select the currency you want to recharge</div>

                    {/* Cryptocurrency Grid */}
                    <div className="crypto-grid">
                        {listMethod?.map((crypto) => (
                            <Link
                                key={crypto.symbol}
                                to={`/deposit/wallet/${crypto.symbol}`}
                                className="crypto-item"
                            >
                                <div className="crypto-icon">
                                    <img
                                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${crypto.symbol}.png`}
                                        alt={crypto.symbol}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const img = e.currentTarget;
                                            img.onerror = null;
                                            img.style.display = 'none';
                                            if (img.parentElement) img.parentElement.innerHTML = crypto.symbol;
                                        }}
                                    />
                                </div>
                                <div className="crypto-name">{crypto.symbol}</div>
                            </Link>
                        ))}
                    </div>

         

                    {/* OTC Section */}
                    <div className="otc-section">
                        <div className="section-title">Over-the-counter trading line</div>
                        <Link to="/online-service" className="otc-item">
                            <div className="otc-icon">
                                <i className="fas fa-headset" />
                            </div>
                            <div className="otc-name">Online Customer Support</div>
                            <i className="fas fa-chevron-right offsite-arrow" />
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
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
            `}</style>
        </div>
    )
}

export default DepositPage