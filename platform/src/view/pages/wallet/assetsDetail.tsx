import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from 'src/modules/assets/view/assetsViewActions';
import assetsSelectors from 'src/modules/assets/view/assetsViewSelectors';
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import { Link, useHistory } from 'react-router-dom';
import { i18n } from "../../../i18n";

function AssetsDetail() {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const dispatch = useDispatch();
    const details = useSelector(assetsSelectors.selectRecord);
    const transaction = useSelector(transactionListSelector.selectRows);
    const assetLoading = useSelector(assetsSelectors.selectLoading);
    const Transactionloading = useSelector(transactionListSelector.selectLoading);
    const loading = assetLoading || Transactionloading;

    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        direction: 'all',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        Promise.all([
            dispatch(assetsActions.doFind(id)),
            dispatch(transactionListActions.doFetch(id))
        ]);
    }, [dispatch, id]);

    // Filter transactions based on active filters
    const filteredTransactions = transaction.filter(tx => {
        if (filters.status !== 'all' && tx.status !== filters.status) return false;
        if (filters.type !== 'all' && tx.type !== filters.type) return false;
        if (filters.direction !== 'all' && tx.direction !== filters.direction) return false;
        if (filters.startDate && new Date(tx.dateTransaction) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(tx.dateTransaction) > new Date(filters.endDate)) return false;
        return true;
    });

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

        if (isToday) return `${i18n("pages.assetsDetail.today")}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        if (isYesterday) return `${i18n("pages.assetsDetail.yesterday")}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        return date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Enhanced transaction configuration with icons and colors
    const getTransactionConfig = (type, direction, relatedAsset) => {
        const config = {
            icon: 'fa-exchange-alt',
            typeText: i18n("pages.assetsDetail.transactionTypes.transaction"),
            iconClass: 'swap',
            color: '#627EEA',
            amountColor: direction === 'in' ? '#2ff378' : '#FF6838'
        };

        switch (type) {
            case 'deposit':
                config.icon = 'fa-arrow-down';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.deposit");
                config.iconClass = 'deposit';
                config.color = '#F3BA2F';
                config.amountColor = '#2ff378';
                break;

            case 'withdraw':
                config.icon = 'fa-arrow-up';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.withdrawal");
                config.iconClass = 'withdraw';
                config.color = '#FF6838';
                config.amountColor = '#FF6838';
                break;

            case 'convert_in':
                config.icon = 'fa-exchange-alt';
                config.typeText = relatedAsset ?
                    i18n("pages.assetsDetail.transactionTypes.convertedFrom", relatedAsset) :
                    i18n("pages.assetsDetail.transactionTypes.conversionIn");
                config.iconClass = 'convert-in';
                config.color = '#9C27B0';
                config.amountColor = '#2ff378';
                break;

            case 'convert_out':
                config.icon = 'fa-exchange-alt';
                config.typeText = relatedAsset ?
                    i18n("pages.assetsDetail.transactionTypes.convertedTo", relatedAsset) :
                    i18n("pages.assetsDetail.transactionTypes.conversionOut");
                config.iconClass = 'convert-out';
                config.color = '#9C27B0';
                config.amountColor = '#FF6838';
                break;

            case 'stacking':
                config.icon = 'fa-coins';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.stakedAmount");
                config.iconClass = 'stacking';
                config.color = '#FF9800';
                config.amountColor = '#FFB74D';
                break;

            case 'staking_reward':
                config.icon = 'fa-gift';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.stakingRewards");
                config.iconClass = 'staking_reward';
                config.color = '#4CAF50';
                config.amountColor = '#81C784';
                break;

            // Futures Trading Transactions
            case 'futures_reserved':
                config.icon = 'fa-lock';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresReserved");
                config.iconClass = 'futures-reserved';
                config.color = '#FF9800';
                config.amountColor = '#FF9800';
                break;

            case 'futures_profit':
                config.icon = 'fa-chart-line';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresProfit");
                config.iconClass = 'futures-profit';
                config.color = '#00C076';
                config.amountColor = '#00C076';
                break;

            case 'futures_loss':
                config.icon = 'fa-chart-line';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresLoss");
                config.iconClass = 'futures-loss';
                config.color = '#FF6838';
                config.amountColor = '#FF6838';
                break;

            case 'futures_settlement':
                config.icon = 'fa-file-contract';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresSettlement");
                config.iconClass = 'futures-settlement';
                config.color = '#9C27B0';
                config.amountColor = '#9C27B0';
                break;

            case 'futures_fee':
                config.icon = 'fa-receipt';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresFee");
                config.iconClass = 'futures-fee';
                config.color = '#607D8B';
                config.amountColor = '#607D8B';
                break;

            case 'futures_refund':
                config.icon = 'fa-undo';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresRefund");
                config.iconClass = 'futures-refund';
                config.color = '#4CAF50';
                config.amountColor = '#4CAF50';
                break;

            case 'futures_bonus':
                config.icon = 'fa-gift';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresBonus");
                config.iconClass = 'futures-bonus';
                config.color = '#E91E63';
                config.amountColor = '#E91E63';
                break;

            case 'futures_commission':
                config.icon = 'fa-handshake';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.futuresCommission");
                config.iconClass = 'futures-commission';
                config.color = '#795548';
                config.amountColor = '#795548';
                break;

            // Manual Control Operations
            case 'manual_profit':
                config.icon = 'fa-user-check';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.manualProfit");
                config.iconClass = 'manual-profit';
                config.color = '#00C076';
                config.amountColor = '#00C076';
                break;

            case 'manual_loss':
                config.icon = 'fa-user-slash';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.manualLoss");
                config.iconClass = 'manual-loss';
                config.color = '#FF6838';
                config.amountColor = '#FF6838';
                break;

            case 'manual_adjustment':
                config.icon = 'fa-cog';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.manualAdjustment");
                config.iconClass = 'manual-adjustment';
                config.color = '#9C27B0';
                config.amountColor = '#9C27B0';
                break;

            // Spot Trading
            case 'spot_profit':
                config.icon = 'fa-coins';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.spotTradingProfit");
                config.iconClass = 'spot-profit';
                config.color = '#4CAF50';
                config.amountColor = '#2ff378';
                break;

            case 'spot_loss':
                config.icon = 'fa-coins';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.spotTradingLoss");
                config.iconClass = 'spot-loss';
                config.color = '#FF5722';
                config.amountColor = '#FF6838';
                break;

            // Rewards & Bonuses
            case 'reward':
                config.icon = 'fa-hand-holding-dollar';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.referralReward");
                config.iconClass = 'spot-profit';
                config.color = '#63f211ff';
                config.amountColor = '#5ffc1bff';
                break;

            case 'bonus':
                config.icon = 'fa-gift';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.bonus");
                config.iconClass = 'bonus';
                config.color = '#E91E63';
                config.amountColor = '#E91E63';
                break;

            case 'referral_commission':
                config.icon = 'fa-users';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.referralCommission");
                config.iconClass = 'referral-commission';
                config.color = '#FF9800';
                config.amountColor = '#FF9800';
                break;

            // Order Management
            case 'order_reserved':
                config.icon = 'fa-clock';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.orderReserved");
                config.iconClass = 'order-reserved';
                config.color = '#FF9800';
                config.amountColor = '#FF9800';
                break;

            case 'order_cancelled':
                config.icon = 'fa-ban';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.orderCancelled");
                config.iconClass = 'order-cancelled';
                config.color = '#9E9E9E';
                config.amountColor = '#9E9E9E';
                break;

            case 'order_partial_fill':
                config.icon = 'fa-chart-pie';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.orderPartialFill");
                config.iconClass = 'order-partial';
                config.color = '#FF9800';
                config.amountColor = '#FF9800';
                break;

            case 'order_completed':
                config.icon = 'fa-check-circle';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.orderCompleted");
                config.iconClass = 'order-completed';
                config.color = '#4CAF50';
                config.amountColor = '#4CAF50';
                break;

            // System Operations
            case 'fee_payment':
                config.icon = 'fa-receipt';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.feePayment");
                config.iconClass = 'fee-payment';
                config.color = '#607D8B';
                config.amountColor = '#607D8B';
                break;

            case 'adjustment':
                config.icon = 'fa-sliders-h';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.balanceAdjustment");
                config.iconClass = 'adjustment';
                config.color = '#9C27B0';
                config.amountColor = '#9C27B0';
                break;

            case 'transfer':
                config.icon = 'fa-exchange-alt';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.transfer");
                config.iconClass = 'transfer';
                config.color = '#2196F3';
                config.amountColor = '#2196F3';
                break;

            default:
                config.icon = 'fa-exchange-alt';
                config.typeText = i18n("pages.assetsDetail.transactionTypes.transaction");
                config.iconClass = 'default';
                config.color = '#627EEA';
                config.amountColor = '#627EEA';
        }
        return config;
    };

    const resetFilters = () => {
        setFilters({
            status: 'all',
            type: 'all',
            direction: 'all',
            startDate: '',
            endDate: ''
        });
    };

    return (
        <div className="container">

            {/* Back button */}
            <div className="ad-topbar">
                <button className="ad-back-btn" onClick={() => history.goBack()} aria-label="Go back">
                    <i className="fas fa-arrow-left" />
                </button>
                <span className="ad-topbar-title">{details?.coinName || i18n("pages.assetsDetail.transactionHistory.title")}</span>
                <div style={{ width: 36 }} />
            </div>

            {/* Asset Card with Loading Placeholder */}
            {loading ? (
                <div className="asset-card-placeholder">
                    <div className="shimmer-circle"></div>
                    <div className="shimmer-line medium"></div>
                    <div className="shimmer-line large"></div>
                </div>
            ) : (
                <div className="asset-card">
                    <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${details?.symbol}.png`}
                        style={{ width: 60, height: 60 }}
                        alt={details?.symbol}
                        loading="lazy"
                    />
                    <div className="asset-name">{details?.coinName}</div>
                    <div className="asset-amount">{details?.amount} {details?.symbol}</div>
                </div>
            )}

            <div className="transaction-history">
                <div className="section-header">
                    <div className="section-title">{i18n("pages.assetsDetail.transactionHistory.title")}</div>
                    <div className="filter-button" onClick={() => setFilterModalOpen(true)}>
                        <i className="fas fa-filter" />
                        {i18n("pages.assetsDetail.filter")}
                    </div>
                </div>

                {/* Transaction List with Loading Placeholder */}
                <div className="transaction-list">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div className="transaction-item-placeholder" key={index}>
                                <div className="transaction-info-placeholder">
                                    <div className="shimmer-circle"></div>
                                    <div className="transaction-details-placeholder">
                                        <div className="shimmer-line medium"></div>
                                        <div className="shimmer-line small"></div>
                                    </div>
                                </div>
                                <div className="transaction-amount-placeholder">
                                    <div className="shimmer-line medium"></div>
                                    <div className="shimmer-line small"></div>
                                </div>
                            </div>
                        ))
                    ) : filteredTransactions?.length > 0 ? (
                        filteredTransactions.map((tx) => {
                            const { icon, typeText, iconClass, amountColor } = getTransactionConfig(
                                tx.type,
                                tx.direction,
                                tx.relatedAsset
                            );

                            return (
                                <div className="transaction-item" key={tx._id}>
                                    <div className="transaction-info">
                                        <div className={`transaction-icon ${iconClass}`} style={{ backgroundColor: getTransactionConfig(tx.type, tx.direction, tx.relatedAsset).color }}>
                                            <i className={`fas ${icon}`} />
                                        </div>
                                        <div className="transaction-details">
                                            <div className="transaction-type">{typeText}</div>
                                            <div className="transaction-date">
                                                {formatDate(tx.dateTransaction)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transaction-amount">
                                        <div className="transaction-value" style={{ color: amountColor }}>
                                            {tx.direction === 'in' ? '+' : '-'}
                                            {tx.amount} {tx.asset}
                                        </div>
                                        <div className={`transaction-status ${tx.status === 'pending' ? 'pending' : tx.status === "canceled" ? 'canceled' : ''
                                            }`}>
                                            {i18n(`pages.assetsDetail.status.${tx.status}`)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-transactions-container">
                            <div className="no-transactions-icon">
                                <i className="fas fa-file-invoice-dollar"></i>
                            </div>
                            <h3>{i18n("pages.assetsDetail.noTransactions.title")}</h3>
                            <p>{i18n("pages.assetsDetail.noTransactions.description")}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Filter Modal */}
            {filterModalOpen && (
                <div className="modal-backdrop" onClick={() => setFilterModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{i18n("pages.assetsDetail.filterModal.title")}</h3>
                            <span className="close" onClick={() => setFilterModalOpen(false)}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <div className="filter-group">
                                <label>{i18n("pages.assetsDetail.filterModal.status")}</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                >
                                    <option value="all">{i18n("pages.assetsDetail.filterModal.allStatuses")}</option>
                                    <option value="completed">{i18n("pages.assetsDetail.filterModal.completed")}</option>
                                    <option value="pending">{i18n("pages.assetsDetail.filterModal.pending")}</option>
                                    <option value="canceled">{i18n("pages.assetsDetail.filterModal.canceled")}</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>{i18n("pages.assetsDetail.filterModal.type")}</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                >
                                    <option value="all">{i18n("pages.assetsDetail.filterModal.allTypes")}</option>
                                    <option value="deposit">{i18n("pages.assetsDetail.transactionTypes.deposit")}</option>
                                    <option value="withdraw">{i18n("pages.assetsDetail.transactionTypes.withdrawal")}</option>
                                    <option value="convert_in">{i18n("pages.assetsDetail.transactionTypes.conversionIn")}</option>
                                    <option value="convert_out">{i18n("pages.assetsDetail.transactionTypes.conversionOut")}</option>
                                    <option value="stacking">{i18n("pages.assetsDetail.transactionTypes.stakedAmount")}</option>
                                    <option value="futures_profit">{i18n("pages.assetsDetail.transactionTypes.futuresProfit")}</option>
                                    <option value="futures_loss">{i18n("pages.assetsDetail.transactionTypes.futuresLoss")}</option>
                                    <option value="spot_profit">{i18n("pages.assetsDetail.transactionTypes.spotTradingProfit")}</option>
                                    <option value="spot_loss">{i18n("pages.assetsDetail.transactionTypes.spotTradingLoss")}</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>{i18n("pages.assetsDetail.filterModal.direction")}</label>
                                <select
                                    value={filters.direction}
                                    onChange={(e) => setFilters({ ...filters, direction: e.target.value })}
                                >
                                    <option value="all">{i18n("pages.assetsDetail.filterModal.bothDirections")}</option>
                                    <option value="in">{i18n("pages.assetsDetail.filterModal.incoming")}</option>
                                    <option value="out">{i18n("pages.assetsDetail.filterModal.outgoing")}</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>{i18n("pages.assetsDetail.filterModal.startDate")}</label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                />
                            </div>
                            <div className="filter-group">
                                <label>{i18n("pages.assetsDetail.filterModal.endDate")}</label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={resetFilters}>
                                {i18n("pages.assetsDetail.filterModal.resetFilters")}
                            </button>
                            <button className="btn-primary" onClick={() => setFilterModalOpen(false)}>
                                {i18n("pages.assetsDetail.filterModal.applyFilters")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="action-buttons">
                <Link to="/deposit" className="action-button deposit-button remove_blue">
                    {i18n("pages.assetsDetail.actions.deposit")}
                </Link>
                <Link to="/withdraw" className="action-button withdraw-button remove_blue">
                    {i18n("pages.assetsDetail.actions.withdraw")}
                </Link>
            </div>



            <style>{`
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
                    border-color: #F41112;
                    color: #F41112;
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
                    background: radial-gradient(circle, rgba(244, 17, 18,0.12) 0%, transparent 65%);
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
                    border-color: #F41112;
                    color: #F41112;
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
                .filter-group input:focus { border-color: #F41112; }
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
                .btn-secondary:hover { border-color: #F41112; color: #F41112; }
                .btn-primary {
                    flex: 1;
                    background: #F41112;
                    border: none;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    padding: 13px 0;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn-primary:hover { background: #AD1111; }

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
                .withdraw-button { background: #F41112; color: #fff; }
                a.remove_blue { text-decoration: none; color: inherit; }
            `}</style>
        </div>
    );
}

export default AssetsDetail;