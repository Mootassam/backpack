import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useWatch } from "react-hook-form";
import stackingPlanListActions from "src/modules/stackingPlan/list/stackingPlanListActions";
import stackingPlanListSelectros from "src/modules/stackingPlan/list/stackingPlanListSelectors";
import stackingListSelectors from "src/modules/stacking/list/stackingListSelectors";
import stackingListActions from "src/modules/stacking/list/stackingListActions";
import assetsListSelector from "src/modules/assets/list/assetsListSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import stackingFormAction from "src/modules/stacking/form/stackingFormActions";
import selector from "src/modules/stacking/form/stackingFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import Dates from "src/view/shared/utils/Dates";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.stacking.fields.user"), {}),
  plan: yupFormSchemas.relationToOne(i18n("entities.stacking.fields.plan"), {}),
  amount: yupFormSchemas.decimal(i18n("entities.stacking.fields.amount"), {
    required: true,
  }),
  status: yupFormSchemas.enumerator(i18n("entities.stacking.fields.status"), {
    options: ["active", "completed", "cancelled"],
  }),
  startDate: yupFormSchemas.datetime(
    i18n("entities.stacking.fields.startDate"),
    {}
  ),
  endDate: yupFormSchemas.datetime(
    i18n("entities.stacking.fields.endDate"),
    {}
  ),
  earnedRewards: yupFormSchemas.decimal(
    i18n("entities.stacking.fields.earnedRewards"),
    {}
  ),
});

function StackingPage() {
  const [activeTab, setActiveTab] = useState("options");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const listPlanStacking = useSelector(stackingPlanListSelectros.selectRows);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const listStacking = useSelector(stackingListSelectors.selectRows);
  const assets = useSelector(assetsListSelector.selectRows);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  const [amount, setAmount] = useState("");
  const showModal = useSelector(selector.selectModal);

  const handleCloseModal = () => {
    dispatch(stackingFormAction.doClose());
  };

  const [modalData, setModalData] = useState({
    crypto: "",
    daily: "",
    balance: 0,
    min: 0,
    max: 0,
    symbol: "",
    plan: "",
    unstakingPeriod: "",
  });

  const [stakeAmount, setStakeAmount] = useState("");
  const [initialValues] = useState(() => {
    return {
      user: "",
      plan: "",
      amount: "",
      status: "",
      startDate: "",
      endDate: "",
      earnedRewards: "",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const watchedAmount = useWatch({
    control: form.control,
    name: "amount",
    defaultValue: "",
  });

  const processAssets = () => {
    if (assets && assets.length > 0) {
      const formattedBalances = assets.reduce((acc, item) => {
        if (item.symbol && item.amount !== undefined) {
          acc[item.symbol] = parseFloat(item.amount) || 0;
        }
        return acc;
      }, {});
      setBalances(formattedBalances);
    }
  };

  useEffect(() => {
    setStakeAmount(watchedAmount || "");
  }, [watchedAmount]);

  useEffect(() => {
    processAssets();
  }, [assets]);

  const onSubmit = async (values) => {
    values.startDate = new Date();
    const endDate = new Date(values.startDate);
    endDate.setDate(endDate.getDate() + parseInt(modalData.unstakingPeriod));
    values.endDate = endDate.toISOString();
    values.status = "active";
    values.plan = modalData.plan;
    values.user = currentUser.id;
    setAmount(values.amount);

    try {
      await dispatch(stackingFormAction.doCreate(values));
      dispatch(assetsActions.doFetch());
      dispatch(stackingListActions.doFetch());
      setBalances((prev) => ({
        ...prev,
        [modalData.symbol]:
          (prev[modalData.symbol] || 0) - parseFloat(stakeAmount),
      }));
      closeStakeModal();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  };

  const calculateRewards = () => {
    if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) return "0";
    const amount = parseFloat(stakeAmount);
    const dailyRate = parseFloat(modalData.daily);
    const unstakingPeriod = parseFloat(modalData.unstakingPeriod);
    const totalReward = amount * (dailyRate / 100) * unstakingPeriod;
    return totalReward.toFixed(6);
  };

  const validateStake = () => {
    const amount = parseFloat(stakeAmount);
    const userBalance = balances[modalData.symbol] || 0;
    if (isNaN(amount) || amount <= 0) {
      return { isValid: false, message: i18n("stake.enterAmount") };
    }
    if (amount > userBalance) {
      return { isValid: false, message: i18n("stake.insufficientBalance") };
    }
    if (amount < modalData.min) {
      return {
        isValid: false,
        message: i18n("stake.minAmount", { min: modalData.min }),
      };
    }
    if (amount > modalData.max) {
      return {
        isValid: false,
        message: i18n("stake.maxAmount", { max: modalData.max }),
      };
    }
    return { isValid: true, message: i18n("stake.confirmStake") };
  };

  const openStakeModal = (
    crypto,
    daily,
    balance,
    min,
    max,
    symbol,
    plan,
    unstakingPeriod
  ) => {
    setModalData({
      crypto,
      daily,
      balance,
      min,
      max,
      symbol,
      plan,
      unstakingPeriod,
    });
    setIsModalOpen(true);
    setStakeAmount("");
    form.setValue("amount", "");
  };

  const closeStakeModal = () => {
    setIsModalOpen(false);
    setStakeAmount("");
    form.setValue("amount", "");
  };

  const fetchCryptoPrices = async () => {
    try {
      const currencies = [
        ...new Set(listPlanStacking.map((plan) => plan.currency)),
      ];
      const pricePromises = currencies.map(async (currency) => {
        if (currency === "USDT") return { currency, price: 1 };
        try {
          const response = await fetch(
            `https://api.binance.com/api/v3/ticker/price?symbol=${currency}USDT`
          );
          const data = await response.json();
          return { currency, price: parseFloat(data.price) };
        } catch (error) {
          return { currency, price: 0 };
        }
      });
      const prices = await Promise.all(pricePromises);
      const priceMap = {};
      prices.forEach((item) => {
        priceMap[item.currency] = item.price;
      });
      setCryptoPrices(priceMap);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  const activeStakes = listStacking.filter(
    (stake) => stake.status === "active"
  );
  const completedStakes = listStacking.filter(
    (stake) => stake.status === "completed"
  );

  const calculateTotalStakedValue = () => {
    let total = 0;
    activeStakes.forEach((stake) => {
      const currency = stake?.plan?.currency;
      const amount = parseFloat(stake.amount) || 0;
      const price = cryptoPrices[currency] || 0;
      total += amount * price;
    });
    return total.toFixed(2);
  };

  const calculateTotalEarnedRewards = () => {
    let total = 0;
    listStacking.forEach((stake) => {
      const currency = stake?.plan?.currency;
      const earned = parseFloat(stake.earnedRewards) || 0;
      const price = cryptoPrices[currency] || 0;
      total += earned * price;
    });
    return total.toFixed(2);
  };

  const calculateTotalCompletedRewards = () => {
    let total = 0;
    completedStakes.forEach((stake) => {
      const currency = stake?.plan?.currency;
      const earned = parseFloat(stake.earnedRewards) || 0;
      const price = cryptoPrices[currency] || 0;
      total += earned * price;
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    dispatch(stackingPlanListActions.doFetch());
    dispatch(stackingListActions.doFetch());
    dispatch(assetsActions.doFetch());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (listPlanStacking.length > 0) {
      fetchCryptoPrices();
    }
  }, [listPlanStacking]);

  const validation = validateStake();
  const isButtonDisabled = !validation.isValid;
  const buttonText = validation.message;

  const daysElapsed = (item) => {
    const now = new Date();
    const startDate = new Date(item.startDate);
    return Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const daysRemaining = (item) => {
    const now = new Date();
    const endDate = new Date(item.endDate);
    const remaining = Math.floor(
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, remaining);
  };

  const getCurrentBalance = () => {
    return balances[modalData.symbol] || 0;
  };

  const goBack = () => history.goBack();

  return (
    <div className="stacking-page">
      {/* Header with back button */}
      <div className="top-header">
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h1 className="page-title">{i18n("pages.staking.title")}</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Main content card */}
      <div className="stacking-card">
        {/* Staking Overview */}
        <div className="stacking-overview">
          <div className="stacking-label">
            {i18n("pages.staking.totalStakedBalance")}
          </div>
          <div className="stacking-balance">
            ${calculateTotalStakedValue()}
          </div>
          <div className="stacking-rewards-earned">
            + ${calculateTotalEarnedRewards()} {i18n("pages.staking.earned")}
          </div>
        </div>

        {/* Tabs */}
        <div className="stacking-toggle-section">
          {["options", "active", "completed"].map((tab) => (
            <div
              key={tab}
              className={`stacking-toggle-option ${
                activeTab === tab ? "stacking-toggle-active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {i18n(`pages.staking.tabs.${tab}`)}
            </div>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "options" && (
          <div className="stacking-options">
            {listPlanStacking.length > 0 ? (
              listPlanStacking.map((item) => (
                <div className="stacking-option-card" key={item.currency}>
                  <div className="stacking-option-header">
                    <div className="option-coin-info">
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item.currency}.png`}
                        alt={item.currency}
                      />
                      <span className="stacking-option-name">
                        {item.currency}
                      </span>
                    </div>
                    <div className="stacking-option-apy">
                      {item.dailyRate}% {i18n("pages.staking.daily")}
                    </div>
                  </div>
                  <div className="stacking-option-details">
                    <span className="stacking-detail-label">
                      {i18n("pages.staking.minimumStake")}
                    </span>
                    <span className="stacking-detail-value">
                      {item.minimumStake} {item.currency}
                    </span>
                  </div>
                  <div className="stacking-option-details">
                    <span className="stacking-detail-label">
                      {i18n("pages.staking.unstakingPeriod")}
                    </span>
                    <span className="stacking-detail-value">
                      {item.unstakingPeriod} {i18n("pages.staking.days")}
                    </span>
                  </div>
                  <button
                    className="stacking-stake-button"
                    onClick={() =>
                      openStakeModal(
                        item.currency,
                        item.dailyRate,
                        item.earnedRewards,
                        item.minimumStake,
                        item.maxStake,
                        item.currency,
                        item.id,
                        item.unstakingPeriod
                      )
                    }
                  >
                    {i18n("pages.staking.stakeButton", item.currency)}
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-stacking-state">
                <i className="fas fa-coins empty-icon" />
                <div className="empty-title">
                  {i18n("pages.staking.emptyStates.options.title")}
                </div>
                <div className="empty-message">
                  {i18n("pages.staking.emptyStates.options.message")}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "active" && (
          <div className="stacking-active-stakes">
            {activeStakes.length > 0 ? (
              activeStakes.map((item) => {
                const progress = Math.min(
                  100,
                  (daysElapsed(item) / item?.plan?.unstakingPeriod) * 100
                );
                const remaining = daysRemaining(item);
                return (
                  <div className="stacking-stake-item" key={item.id}>
                    <div className="stacking-stake-header">
                      <div className="stake-coin-info">
                        <img
                          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item?.plan?.currency}.png`}
                          alt={item?.plan?.currency}
                        />
                        <span className="stacking-stake-crypto">
                          {item?.plan?.currency}
                        </span>
                        <span className="stacking-status-badge stacking-status-active">
                          {i18n("pages.staking.status.active")}
                        </span>
                      </div>
                      <span className="stacking-stake-amount">
                        {item.amount} {item?.plan?.currency}
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.daily")}
                      </span>
                      <span className="stacking-stake-value">
                        {item?.plan?.dailyRate}%
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.earned")}
                      </span>
                      <span className="stacking-stake-value stacking-value-positive">
                        {item.earnedRewards || 0} {item?.plan?.currency}
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.remaining")}
                      </span>
                      <span className="stacking-stake-value">
                        {remaining} {i18n("pages.staking.days")}
                      </span>
                    </div>
                    <div className="stacking-progress-bar">
                      <div
                        className="stacking-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-stacking-state">
                <i className="fas fa-chart-line empty-icon" />
                <div className="empty-title">
                  {i18n("pages.staking.emptyStates.active.title")}
                </div>
                <div className="empty-message">
                  {i18n("pages.staking.emptyStates.active.message")}
                </div>
                <button
                  className="start-staking-button"
                  onClick={() => setActiveTab("options")}
                >
                  {i18n("pages.staking.exploreStakingOptions")}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="stacking-completed-stakes">
            {completedStakes.length > 0 ? (
              <>
                <div className="completed-rewards-overview">
                  <div className="completed-rewards-header">
                    <span className="completed-rewards-label">
                      {i18n("pages.staking.totalCompletedRewards")}
                    </span>
                    <span className="completed-rewards-count">
                      {completedStakes.length}{" "}
                      {completedStakes.length === 1
                        ? i18n("pages.staking.stake")
                        : i18n("pages.staking.stakes")}
                    </span>
                  </div>
                  <div className="completed-rewards-amount">
                    ${calculateTotalCompletedRewards()}
                  </div>
                  <div className="completed-rewards-subtext">
                    {i18n("pages.staking.allRewardsFromCompleted")}
                  </div>
                </div>
                {completedStakes.map((item) => (
                  <div className="stacking-completed-item" key={item.id}>
                    <div className="stacking-stake-header">
                      <div className="stake-coin-info">
                        <img
                          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item?.plan?.currency}.png`}
                          alt={item?.plan?.currency}
                        />
                        <span className="stacking-stake-crypto">
                          {item?.plan?.currency}
                        </span>
                        <span className="stacking-status-badge stacking-status-completed">
                          {i18n("pages.staking.status.completed")}
                        </span>
                      </div>
                      <span className="stacking-stake-amount">
                        {item.amount} {item?.plan?.currency}
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.dailyRate")}
                      </span>
                      <span className="stacking-stake-value">
                        {item?.plan?.dailyRate}%
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.duration")}
                      </span>
                      <span className="stacking-stake-value">
                        {item?.plan?.unstakingPeriod}{" "}
                        {i18n("pages.staking.days")}
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.createdAt")}
                      </span>
                      <span className="stacking-stake-value">
                        {Dates.NewsDate(item?.startDate)}
                      </span>
                    </div>
                    <div className="stacking-stake-details">
                      <span className="stacking-stake-label">
                        {i18n("pages.staking.dateFinish")}
                      </span>
                      <span className="stacking-stake-value">
                        {Dates.NewsDate(item?.endDate)}
                      </span>
                    </div>
                    <div className="stacking-completed-rewards">
                      <div className="stacking-completed-rewards-label">
                        {i18n("pages.staking.totalRewardsEarned")}
                      </div>
                      <div className="stacking-completed-rewards-amount">
                        +{item.earnedRewards || 0} {item?.plan?.currency}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="empty-stacking-state">
                <i className="fas fa-check-circle empty-icon" />
                <div className="empty-title">
                  {i18n("pages.staking.emptyStates.completed.title")}
                </div>
                <div className="empty-message">
                  {i18n("pages.staking.emptyStates.completed.message")}
                </div>
                <button
                  className="start-staking-button"
                  onClick={() => setActiveTab("options")}
                >
                  {i18n("pages.staking.startStaking")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <SuccessModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          type="staking"
          amount={String(amount)}
          coinType={modalData.crypto}
        />
      )}

      {/* Stake Modal */}
      {isModalOpen && (
        <div className="staking-modal-overlay">
          <div className="staking-modal-content">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="modal-header">
                  <h3>
                    {i18n("pages.staking.stakeModal.title")}{" "}
                    {modalData.crypto}
                  </h3>
                  <button
                    type="button"
                    className="modal-close"
                    onClick={closeStakeModal}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="staking-input-group">
                    <FieldFormItem
                      name="amount"
                      label={i18n(
                        "pages.staking.stakeModal.amountToStake"
                      )}
                      className="textField"
                      className1="inputField"
                      className2="inputLabel"
                      className3="inputWrapper"
                      placeholder={i18n(
                        "pages.staking.stakeModal.enterAmount"
                      )}
                    />
                    <div className="balance-info">
                      {i18n("pages.staking.balance")}:{" "}
                      {getCurrentBalance()} {modalData.symbol}
                    </div>
                  </div>
                  <div className="staking-modal-details">
                    <div className="detail-line">
                      <span>{i18n("pages.staking.daily")}</span>
                      <span>{modalData.daily}%</span>
                    </div>
                    <div className="detail-line">
                      <span>{i18n("pages.staking.minimumStake")}</span>
                      <span>
                        {modalData.min} {modalData.symbol}
                      </span>
                    </div>
                    <div className="detail-line">
                      <span>{i18n("pages.staking.maximumStake")}</span>
                      <span>
                        {modalData.max} {modalData.symbol}
                      </span>
                    </div>
                    <div className="detail-line">
                      <span>
                        {i18n("pages.staking.estimatedTotalRewards")}
                      </span>
                      <span>
                        {calculateRewards()} {modalData.symbol}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`stake-submit-btn ${
                      isButtonDisabled ? "disabled" : ""
                    }`}
                  >
                    {buttonText}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}

      <style>{`
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
          background-color: rgba(253, 75, 78, 0.15);
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
          background: #fd4b4e;
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
          border-color: #fd4b4e;
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
          background: #fd4b4e;
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
          background: #e04345;
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
          background: rgba(253, 75, 78, 0.15);
          color: #fd4b4e;
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
          background: #fd4b4e;
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
          background: #fd4b4e;
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
          color: #fd4b4e;
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
          background: #fd4b4e;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .stake-submit-btn:hover:not(.disabled) {
          background: #e04345;
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
      `}</style>
    </div>
  );
}

export default StackingPage;