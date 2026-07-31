// src/components/FuturesModal.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import futuresFormAction from "src/modules/futures/form/futuresFormActions";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresViewActions from "src/modules/futures/view/futuresViewActions";

interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
  dispatch: any;
  listAssets?: any;
  selectedCoin: string;
  marketPrice: string;
  availableBalance: number;
  setOpeningOrders;
}

const FuturesModal: React.FC<FuturesModalProps> = ({
  isOpen,
  onClose,
  direction,
  dispatch,
  listAssets,
  selectedCoin,
  marketPrice,
  availableBalance,
  setOpeningOrders
}) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("30");
  const [selectvalue, setSelectedValue] = useState<string>("10");
  const [selectedLeverage, setSelectedLeverage] = useState<string>("2");
  const [futuresAmount, setFuturesAmount] = useState<number>(30);
  const [tradeStatus, setTradeStatus] = useState<
    "configuring" | "in-progress" | "completed"
  >("configuring");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<"win" | "loss" | null>(null);
  const [amountError, setAmountError] = useState<string>("");
  const [futureId, setFutureId] = useState<string | null>(null);
  const [pnlDisplay, setPnlDisplay] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [tradeDetails, setTradeDetails] = useState<any>(null);

  // Updated duration/payout mapping
  const durationOptions = [
    { duration: "30", payout: "10" },
    { duration: "60", payout: "20" },
    { duration: "90", payout: "30" },
    { duration: "120", payout: "40" },

  ];

  const leverageOptions = ["1", "2",  "5",  "10", "20", "50"];

  const changeValues = (duration: string, value: string) => {
    setSelectedDuration(duration);
    setSelectedValue(value);
  };

  // prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // refresh list on mount (and when dispatch changes)
  useEffect(() => {
    dispatch(futuresListAction.doFetch());
  }, [dispatch]);

  // validate amount
  useEffect(() => {
    if (futuresAmount < 30) {
      setAmountError("Minimum amount is 30 USDT");
    } else if (futuresAmount > availableBalance) {
      setAmountError("Insufficient balance");
    } else {
      setAmountError("");
    }
  }, [futuresAmount, availableBalance]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (tradeStatus === "in-progress") {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        (async () => {
          await completeTrade();
        })();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tradeStatus, timeLeft]);

  // Start the trade: create backend record then start timer
  const startTrade = async () => {
    if (!direction || futuresAmount < 30 || futuresAmount > availableBalance) {
      return;
    }

    setIsCreating(true);
    try {
      const created = await create();
      if (!created || !created.id) {
        setIsCreating(false);
        return;
      }

      setTradeDetails({
        futuresAmount,
        contractDuration: selectedDuration,
        futuresStatus: direction === "up" ? "long" : "short",
        openPositionPrice: parseFloat(marketPrice || "0") || 0,
        closePositionPrice: null,
        leverage: parseInt(selectedLeverage, 10),
        openPositionTime: new Date(),
        closePositionTime: null
      });

      setOpeningOrders(prev => [...prev, {
        id: futureId,
        futuresAmount,
        contractDuration: selectedDuration,
        futuresStatus: direction === "up" ? "long" : "short",
        openPositionPrice: parseFloat(marketPrice || "0") || 0,
        closePositionPrice: null,
        leverage: parseInt(selectedLeverage, 10),
        openPositionTime: new Date().toISOString(),
        closePositionTime: null
      }]);

      const secs = parseInt(selectedDuration, 10) || 0;
      setTimeLeft(secs);
      setTradeStatus("in-progress");
    } catch (err) {
      console.error("startTrade error", err);
    } finally {
      setIsCreating(false);
    }
  };

  // completeTrade: fetch finalized trade from backend and show real PnL
  const completeTrade = async () => {
    setOpeningOrders([]);
    if (!futureId) {
      const calculatedIsWin = false;
      setTradeResult(calculatedIsWin ? "win" : "loss");
      if (calculatedIsWin) {
        setPnlDisplay(`+${calculateProfit(futuresAmount, selectedLeverage, selectvalue).toFixed(2)} USDT`);
      } else {
        setPnlDisplay(`-${futuresAmount.toFixed(2)} USDT`);
      }
      setTradeStatus("completed");
      return;
    }

    try {
      const result = await dispatch(futuresViewActions.doFind(futureId));
      const trade = result && result.payload ? result.payload : result;

      if (!trade) {
        setTradeResult("loss");
        setPnlDisplay(`-${futuresAmount.toFixed(2)} USDT`);
        setTradeStatus("completed");
        return;
      }

      setTradeDetails({
        ...tradeDetails,
        closePositionPrice: trade.closePositionPrice,
        closePositionTime: trade.closePositionTime,
        profitAndLossAmount: trade.profitAndLossAmount
      });

      if (trade.control === "profit") {
        setTradeResult("win");
        const pnl = Number(trade.profitAndLossAmount ?? calculateProfit(futuresAmount, selectedLeverage, selectvalue));
        setPnlDisplay(`+${Number.isFinite(pnl) ? pnl.toFixed(2) : "0.00"} USDT`);
      } else {
        setTradeResult("loss");
        const amt = Number(trade.futuresAmount ?? futuresAmount);
        setPnlDisplay(`-${Number.isFinite(amt) ? amt.toFixed(2) : futuresAmount.toFixed(2)} USDT`);
      }

      setTradeStatus("completed");
      dispatch(futuresListAction.doFetchPending());
    } catch (err) {
      console.error("completeTrade error", err);
      setTradeResult("loss");
      setPnlDisplay(`-${futuresAmount.toFixed(2)} USDT`);
      setTradeStatus("completed");
    }
  };

  // create trade record and return created record
  const create = async () => {
    const currentPrice = parseFloat(marketPrice || "0") || 0;

    let closePrice = currentPrice;
    if (direction === "up") {
      closePrice = currentPrice * 0.95;
    } else {
      closePrice = currentPrice * 1.05;
    }

    const payload = {
      futuresStatus: direction === "up" ? "long" : "short",
      profitAndLossAmount: '',
      leverage: parseInt(selectedLeverage, 10),
      control: "loss",
      operate: "low",
      futureCoin: selectedCoin.replace("USDT", "/USDT"),
      closePositionTime: '',
      closePositionPrice: '',
      openPositionTime: new Date().toISOString(),
      openPositionPrice: currentPrice,
      contractDuration: selectedDuration,
      futuresAmount,
    };

    try {
      const createdRecord = await dispatch(futuresFormAction.doCreate(payload));
      const record = createdRecord && createdRecord.id ? createdRecord : (createdRecord && createdRecord.payload ? createdRecord.payload : null);

      if (record && record.id) {
        setFutureId(record.id);
        return record;
      } else {
        console.warn("Create did not return created record");
        return null;
      }
    } catch (err) {
      console.error("create error", err);
      return null;
    }
  };

  const resetTrade = () => {
    setTradeStatus("configuring");
    setOpeningOrders([]);
    setTradeResult(null);
    setTimeLeft(0);
    setFutureId(null);
    setPnlDisplay("");
    setTradeDetails(null);
    setFuturesAmount(30);
    setSelectedValue("10");
    setSelectedDuration("30");
  };

  const calculateProfit = (
    amount: number,
    leverage: string,
    value: string
  ): number => {
    const validAmount = Number.isFinite(amount) ? amount : 0;
    const validLeverage = parseInt(leverage, 10) || 0;
    const validValue = parseInt(value, 10) || 0;
    return (validAmount * validLeverage * validValue) / 100;
  };

  const calculateProgress = (): number => {
    if (tradeStatus !== "in-progress") return 0;
    const total = parseInt(selectedDuration, 10) || 1;
    return ((total - timeLeft) / total) * 100;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setFuturesAmount(value);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${direction === "up" ? "up-theme" : "down-theme"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="fm-handle" />

        {/* Header */}
        <div className="modal-header">
          <div className="pair-info">
            <div className="pair-icon">
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedCoin.split("USDT")[0]}.png`}
                style={{ width: 34, height: 34 }}
                alt={selectedCoin}
                loading="lazy"
              />
            </div>
            <div className="pair-name">{selectedCoin.replace("USDT", "/USDT")}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Trade in-progress / completed */}
        {tradeStatus !== "configuring" && (
          <div className="trade-progress-section">
            {/* Circular countdown */}
            <div className="progress-container">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(${direction === "up" ? "#26a17b" : "#F41112"} ${calculateProgress()}%, #1e1f26 ${calculateProgress()}%)`,
                }}
              >
                <div className="progress-inner">
                  <div className="progress-time">{formatTime(timeLeft)}</div>
                  <div className="progress-label">Remaining</div>
                </div>
              </div>
            </div>

            {/* Result badge + PnL (completed only) */}
            {tradeStatus === "completed" && tradeResult && (
              <>
                <div className={`trade-result-badge ${tradeResult}`}>
                  <i className={`fas ${tradeResult === "win" ? "fa-check-circle" : "fa-times-circle"}`} />
                  {tradeResult === "win" ? "Trade Won!" : "Trade Lost"}
                </div>
                <div className={`pnl-display ${tradeResult}`}>{pnlDisplay}</div>
              </>
            )}

            {/* Trade detail rows */}
            {tradeDetails && (
              <div className="trade-details">
                <div className="trade-details-row">
                  <span>Amount</span>
                  <span>{tradeDetails.futuresAmount} USDT</span>
                </div>
                <div className="trade-details-row">
                  <span>Duration</span>
                  <span>{tradeDetails.contractDuration}s</span>
                </div>
                <div className="trade-details-row">
                  <span>Direction</span>
                  <span className={tradeDetails.futuresStatus === "long" ? "up-text" : "down-text"}>
                    {tradeDetails.futuresStatus === "long" ? "▲ LONG" : "▼ SHORT"}
                  </span>
                </div>
                <div className="trade-details-row">
                  <span>Leverage</span>
                  <span>{tradeDetails.leverage}×</span>
                </div>
                <div className="trade-details-row">
                  <span>Open Price</span>
                  <span>{tradeDetails.openPositionPrice.toFixed(4)} USDT</span>
                </div>
                <div className="trade-details-row">
                  <span>Close Price</span>
                  <span>{tradeDetails.closePositionPrice ? Number(tradeDetails.closePositionPrice).toFixed(4) : "—"} {tradeDetails.closePositionPrice ? "USDT" : ""}</span>
                </div>
                <div className="trade-details-row">
                  <span>Open Time</span>
                  <span>{formatDate(tradeDetails.openPositionTime)}</span>
                </div>
                <div className="trade-details-row">
                  <span>Close Time</span>
                  <span>{formatDate(tradeDetails.closePositionTime)}</span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="trade-actions">
              {tradeStatus === "in-progress" && (
                <button className="trade-action-btn keep-buying" onClick={onClose}>
                  Keep Buying
                </button>
              )}
              {tradeStatus === "completed" && (
                <>
                  <button className="trade-action-btn secondary" onClick={onClose}>Close</button>
                  <button className="trade-action-btn primary" onClick={resetTrade}>New Trade</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Configuration form (only shown when configuring) */}
        {tradeStatus === "configuring" && (
          <>
            {/* Direction Indicator */}
            <div className={`direction-indicator ${direction}-indicator`}>
              {direction === "up" ? "Predicting price will go UP" : "Predicting price will go DOWN"}
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Trade Duration Section */}
              <div className="section">
                <div className="section-title">
                  <span>Contract Duration</span>
                  <span>Payout</span>
                </div>
                <div className="options-container">
                  {durationOptions.map((option) => (
                    <button
                      key={option.duration}
                      className={`option-btn ${selectedDuration === option.duration ? "selected" : ""}`}
                      onClick={() => changeValues(option.duration, option.payout)}
                    >
                      {option.duration}s ({option.payout}%)
                    </button>
                  ))}
                </div>
              </div>

              {/* Leverage Section */}
              <div className="section">
                <div className="section-title">
                  <span>Leverage</span>
                </div>
                <div className="options-container">
                  {leverageOptions.map((leverage) => (
                    <button
                      key={leverage}
                      className={`option-btn ${selectedLeverage === leverage ? "selected" : ""}`}
                      onClick={() => setSelectedLeverage(leverage)}
                    >
                      {leverage}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Futures Amount Section */}
              <div className="section">
                <div className="section-title">
                  <span>Futures Amount (USDT)</span>
                </div>
                <div className="amount-control">
                  <button
                    className="amount-btn"
                    onClick={() => setFuturesAmount((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="amount-inputs"
                    value={futuresAmount}
                    onChange={handleAmountChange}
                    min="1"
                    placeholder="Enter amount"
                  />
                  <button className="amount-btn" onClick={() => setFuturesAmount((prev) => prev + 1)}>
                    +
                  </button>
                </div>
                <div className="balance-info">Available: {availableBalance} USDT</div>
                {amountError && (
                  <div className="error-message">{amountError}</div>
                )}
              </div>

              {/* Projected Profit */}
              <div className="profit-info">
                Projected profit:&nbsp;
                <span>{calculateProfit(futuresAmount, selectedLeverage, selectvalue).toFixed(2)} USDT</span>
              </div>

              {/* Confirm Button */}
              <button
                className="confirm-btn"
                onClick={startTrade}
                disabled={!direction || futuresAmount < 30 || futuresAmount > availableBalance || isCreating}
              >
                {isCreating
                  ? "Creating…"
                  : futuresAmount > availableBalance
                  ? "Insufficient Balance"
                  : direction === "up"
                  ? "▲ Confirm Long"
                  : "▼ Confirm Short"}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        /* ── Overlay ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 100000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* ── Sheet container ── */
        .modal-container {
          background: #15161c;
          width: 100%;
          max-width: 400px;
          border-radius: 24px 24px 0 0;
          border: 1px solid #1e1f26;
          border-bottom: none;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          overflow: hidden;
          max-height: 92vh;
          overflow-y: auto;
          animation: fmSlideUp 0.36s cubic-bezier(0.32,0.72,0,1) both;
          scrollbar-width: none;
        }
        .modal-container::-webkit-scrollbar { display: none; }

        @keyframes fmSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* direction accent line */
        .up-theme   { border-top: 3px solid #26a17b; }
        .down-theme { border-top: 3px solid #F41112; }

        /* ── Drag handle ── */
        .fm-handle {
          width: 40px; height: 4px;
          background: #2a2a2e;
          border-radius: 2px;
          margin: 14px auto 0;
        }

        /* ── Header ── */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px 12px;
          border-bottom: 1px solid #1e1f26;
        }
        .pair-info { display: flex; align-items: center; gap: 10px; }
        .pair-icon {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pair-name { font-size: 16px; font-weight: 700; color: #fff; }
        .close-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #1e1f26;
          border: none;
          color: #888;
          font-size: 18px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
          line-height: 1;
        }
        .close-btn:hover { background: #2a2a2e; color: #fff; }

        /* ── Direction banner ── */
        .direction-indicator {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 20px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.3px;
        }
        .up-indicator   { background: rgba(38,161,123,0.10); color: #26a17b; }
        .down-indicator { background: rgba(244, 17, 18,0.10);  color: #F41112; }
        .direction-indicator::before {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          font-size: 11px;
        }
        .up-indicator::before   { content: "\\f062"; } /* fa-arrow-up   */
        .down-indicator::before { content: "\\f063"; } /* fa-arrow-down */

        /* ── Configuring form ── */
        .modal-content { padding: 18px 20px 24px; display: flex; flex-direction: column; gap: 20px; }

        .section { display: flex; flex-direction: column; gap: 10px; }
        .section-title {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 11px; font-weight: 600; color: #888;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        /* ── Pill option buttons ── */
        .options-container { display: flex; gap: 8px; flex-wrap: wrap; }
        .option-btn {
          flex: 1; min-width: 64px;
          padding: 9px 6px;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 10px;
          color: #888;
          font-size: 12px; font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: border-color 0.18s, color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .option-btn:hover { border-color: #2a2a35; color: #ccc; }

        /* UP theme selected */
        .up-theme .option-btn.selected {
          background: rgba(38,161,123,0.12);
          border-color: #26a17b;
          color: #26a17b;
        }
        /* DOWN theme selected */
        .down-theme .option-btn.selected {
          background: rgba(244, 17, 18,0.12);
          border-color: #F41112;
          color: #F41112;
        }

        /* ── Amount control ── */
        .amount-control {
          display: flex; align-items: center;
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 12px;
          overflow: hidden;
        }
        .amount-btn {
          width: 46px; height: 48px;
          background: none; border: none;
          color: #888; font-size: 22px;
          cursor: pointer; flex-shrink: 0;
          transition: color 0.15s, background 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .amount-btn:hover { background: #1e1f26; color: #fff; }
        .amount-inputs {
          flex: 1; background: none; border: none;
          color: #fff; font-size: 18px; font-weight: 700;
          text-align: center; outline: none; padding: 0;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }

        .balance-info { font-size: 12px; color: #555; text-align: right; }
        .error-message { font-size: 11px; color: #F41112 !important; margin-top: 4px; }

        /* ── Projected profit box ── */
        .profit-info {
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px; color: #888;
          text-align: center;
        }
        .up-theme   .profit-info span { color: #26a17b; font-weight: 700; }
        .down-theme .profit-info span { color: #F41112; font-weight: 700; }

        /* ── Confirm button ── */
        .confirm-btn {
          width: 100%; padding: 15px;
          border: none; border-radius: 14px;
          font-size: 15px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.2px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .up-theme   .confirm-btn { background: #26a17b; color: #fff; }
        .down-theme .confirm-btn { background: #F41112; color: #fff; }
        .confirm-btn:hover:not(:disabled) { opacity: 0.88; }
        .confirm-btn:active:not(:disabled) { transform: scale(0.98); }
        .confirm-btn:disabled { background: #1e1f26; color: #444; cursor: not-allowed; }

        /* ── In-progress / completed view ── */
        .trade-progress-section { padding: 20px 20px 28px; text-align: center; }

        .progress-container { display: flex; justify-content: center; margin-bottom: 20px; }
        .circular-progress {
          width: 140px; height: 140px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 1s linear;
        }
        .progress-inner {
          width: 116px; height: 116px;
          border-radius: 50%;
          background: #15161c;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border: 2px solid #1e1f26;
        }
        .progress-time { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -1px; }
        .progress-label { font-size: 11px; color: #555; margin-top: 2px; }

        /* ── Trade result badge ── */
        .trade-result-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 15px; font-weight: 700;
          margin-bottom: 16px;
        }
        .trade-result-badge.win  { background: rgba(38,161,123,0.14); color: #26a17b; }
        .trade-result-badge.loss { background: rgba(244, 17, 18,0.14);  color: #F41112; }

        .pnl-display {
          font-size: 28px; font-weight: 800; letter-spacing: -0.5px;
          margin-bottom: 18px;
        }
        .pnl-display.win  { color: #26a17b; }
        .pnl-display.loss { color: #F41112; }

        /* ── Trade details card ── */
        .trade-details {
          background: #0e0f14;
          border: 1px solid #1e1f26;
          border-radius: 14px;
          padding: 14px 16px;
          margin: 0 0 18px;
          text-align: left;
          display: flex; flex-direction: column; gap: 10px;
        }
        .trade-details-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px;
        }
        .trade-details-row span:first-child { color: #555; }
        .trade-details-row span:last-child  { color: #e8e8e8; font-weight: 600; }

        .up-text   { color: #26a17b !important; }
        .down-text { color: #F41112 !important; }

        /* ── Action buttons ── */
        .trade-actions { display: flex; gap: 10px; }
        .trade-action-btn {
          flex: 1; padding: 14px;
          border: none; border-radius: 14px;
          font-size: 14px; font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .trade-action-btn:active { transform: scale(0.97); }
        .trade-action-btn.primary   { background: #F41112; color: #fff; }
        .trade-action-btn.secondary { background: #1e1f26; color: #aaa; border: 1px solid #2a2a2e; }
        .trade-action-btn.secondary:hover { background: #2a2a2e; color: #fff; }

        .up-theme   .trade-action-btn.keep-buying { background: #26a17b; color: #fff; }
        .down-theme .trade-action-btn.keep-buying { background: #F41112; color: #fff; }
        .trade-action-btn.keep-buying { width: 100%; }
        .trade-action-btn:hover:not(.secondary) { opacity: 0.88; }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default FuturesModal;