import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import userFormActions from "src/modules/user/form/userFormActions";
import userFormSelectors from "src/modules/user/form/userFormSelectors";
import Dates from "src/view/shared/utils/Dates";

function Invitation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const listMembers = useSelector(userFormSelectors.listMembers);
  const Loading = useSelector(userFormSelectors.loading);
  const listUser = useSelector(userFormSelectors.lisUsers);
  const userLoading = useSelector(userFormSelectors.usersLoading);
  const totalReward = useSelector(userFormSelectors.reward);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    members: [],
    type: "",
  });
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (currentUser?.refcode) {
      dispatch(userFormActions.rewardCount());
      dispatch(userFormActions.doTree(currentUser.refcode));
    }
  }, [dispatch, currentUser?.refcode]);

  const copyReferralCode = async () => {
    if (!currentUser?.refcode) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUser.refcode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUser.refcode;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareReferral = (platform: string) => {
    const shareText = `Join Backpack using my referral code: ${currentUser?.refcode}`;
    const shareUrl = window.location.origin;

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=Join Backpack&body=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "sms":
        window.open(`sms:?body=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "more":
        if (navigator.share) {
          navigator.share({
            title: "Backpack Referral",
            text: shareText,
            url: shareUrl,
          });
        } else {
          copyReferralCode();
        }
        break;
    }
  };

  const handleOpenModal = (level: number, type: "approved" | "pending") => {
    const title = `${level}${getOrdinalSuffix(level)} Generation ${
      type === "approved" ? "Approved" : "Pending"
    } Members`;
    setModalData({ title, members: [], type });
    setIsModalOpen(true);

    const values = {
      status: type,
      refCode: currentUser?.refcode,
      level,
    };
    dispatch(userFormActions.byLevel(values));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({ title: "", members: [], type: "" });
  };

  const getOrdinalSuffix = (number: number) => {
    if (number === 1) return "st";
    if (number === 2) return "nd";
    if (number === 3) return "rd";
    return "th";
  };

  const getGenerationTitle = (level: number) => {
    return `${level}${getOrdinalSuffix(level)} Generation Members`;
  };

  const goBack = () => history.goBack();

  return (
    <div className="invitation-page">
      {/* Header with back button */}
      <div className="top-header">
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h1 className="page-title">{i18n("pages.invitation.title")}</h1>
        <div className="header-placeholder"></div>
      </div>

      <div className="content-card">
        {/* Invite Section */}
        <div className="invite-earn-section">
          <div className="section-heading">
            {i18n("pages.invitation.earnTogether")}
          </div>
          <div className="section-description">
            {i18n("pages.invitation.description")}
          </div>

          <div className="referral-code-label">
            {i18n("pages.invitation.yourReferralCode")}
          </div>
          <div className="referral-code-value">
            {currentUser?.refcode || i18n("pages.invitation.loading")}
          </div>
          <button className="copy-btn" onClick={copyReferralCode}>
            <i className="fas fa-copy" />
            {copySuccess
              ? i18n("pages.invitation.copied")
              : i18n("pages.invitation.copyCode")}
          </button>

          <div className="share-buttons">
            <button
              className="share-btn"
              onClick={() => shareReferral("whatsapp")}
            >
              <i className="fab fa-whatsapp" />
            </button>
            <button
              className="share-btn"
              onClick={() => shareReferral("email")}
            >
              <i className="fas fa-envelope" />
            </button>
            <button className="share-btn" onClick={() => shareReferral("sms")}>
              <i className="fas fa-sms" />
            </button>
            <button
              className="share-btn"
              onClick={() => shareReferral("more")}
            >
              <i className="fas fa-share-alt" />
            </button>
          </div>
        </div>

        {/* Total Earned */}
        <div className="total-earned-section">
          <div className="total-earned-card">
            <div className="total-earned-label">
              {i18n("pages.invitation.totalEarned")}
            </div>
            <div className="total-earned-amount">
              {totalReward.toFixed(0)} USDT
            </div>
            <div className="total-earned-subtitle">
              {i18n("pages.invitation.allTimeCommission")}
            </div>
          </div>
        </div>

        {/* Generation Stats */}
        <div className="section-heading">
          {i18n("pages.invitation.generationMembers")}
        </div>
        <div className="generation-stats-grid">
          {Loading && (
            <div className="loading-text">
              <i className="fas fa-spinner fa-spin" />
              {i18n("pages.invitation.loading")}
            </div>
          )}
          {!Loading &&
            listMembers?.map((item: any, index: number) => (
              <div className="generation-stat-item" key={index}>
                <div className="generation-stat-title">
                  <i className="fas fa-crown" />
                  {getGenerationTitle(item?.level)}
                </div>
                <div className="generation-stats-details">
                  <div
                    className="generation-stat-detail approved"
                    onClick={() => handleOpenModal(item.level, "approved")}
                  >
                    <div className="generation-stat-value">
                      {item?.approvedCount || 0}
                    </div>
                    <div className="generation-stat-label">
                      {i18n("pages.invitation.approvedMembers")}
                    </div>
                  </div>
                  <div
                    className="generation-stat-detail pending"
                    onClick={() => handleOpenModal(item.level, "pending")}
                  >
                    <div className="generation-stat-value">
                      {item?.pendingCount || 0}
                    </div>
                    <div className="generation-stat-label">
                      {i18n("pages.invitation.pendingMembers")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {!Loading && listMembers?.length === 0 && (
            <div className="empty-text" style={{ textAlign: "center", padding: "20px", color: "#aaaaaa", fontSize: "13px" }}>
              {i18n("pages.invitation.noGenerationData")}
            </div>
          )}
        </div>

        {/* Commission Structure */}
        <div className="section-heading">
          {i18n("pages.invitation.commissionStructure")}
        </div>
        <div className="commission-grid">
          <div className="commission-item">
            <div className="commission-title">
              <i className="fas fa-crown" />
              {i18n("pages.invitation.firstGeneration")}
            </div>
            <div className="commission-details">
              <div className="commission-detail">
                <span className="commission-label">
                  {i18n("pages.invitation.firstDepositCommission")}
                </span>
                <span className="commission-value">15%</span>
              </div>
              <div className="commission-detail">
                <span className="commission-label">
                  {i18n("pages.invitation.stakingProfitsCommission")}
                </span>
                <span className="commission-value">10%</span>
              </div>
            </div>
          </div>
          <div className="commission-item">
            <div className="commission-title">
              <i className="fas fa-users" />
              {i18n("pages.invitation.secondGeneration")}
            </div>
            <div className="commission-details">
              <div className="commission-detail">
                <span className="commission-label">
                  {i18n("pages.invitation.firstDepositCommission")}
                </span>
                <span className="commission-value">10%</span>
              </div>
              <div className="commission-detail">
                <span className="commission-label">
                  {i18n("pages.invitation.stakingProfitsCommission")}
                </span>
                <span className="commission-value">7%</span>
              </div>
            </div>
          </div>
          <div className="commission-item">
            <div className="commission-title">
              <i className="fas fa-user-friends" />
              {i18n("pages.invitation.thirdGeneration")}
            </div>
            <div className="commission-details">
              <div className="commission-detail">
                <span className="commission-label">
                  {i18n("pages.invitation.firstDepositCommission")}
                </span>
                <span className="commission-value">5%</span>
              </div>
              <div className="commission-detail">
                <span className="commission-label">
                  {i18n("pages.invitation.stakingProfitsCommission")}
                </span>
                <span className="commission-value">4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="section-heading">
          {i18n("pages.invitation.howItWorks")}
        </div>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number-circle">1</div>
            <div className="step-content-text">
              <div className="step-title-text">
                {i18n("pages.invitation.steps.shareCode.title")}
              </div>
              <div className="step-desc">
                {i18n("pages.invitation.steps.shareCode.description")}
              </div>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number-circle">2</div>
            <div className="step-content-text">
              <div className="step-title-text">
                {i18n("pages.invitation.steps.friendsSignUp.title")}
              </div>
              <div className="step-desc">
                {i18n("pages.invitation.steps.friendsSignUp.description")}
              </div>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number-circle">3</div>
            <div className="step-content-text">
              <div className="step-title-text">
                {i18n("pages.invitation.steps.earnCommissions.title")}
              </div>
              <div className="step-desc">
                {i18n("pages.invitation.steps.earnCommissions.description")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalData.title}</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              {userLoading ? (
                <div className="modal-loading">
                  <i className="fas fa-spinner fa-spin" />
                  <p>{i18n("pages.invitation.loadingMembers")}</p>
                </div>
              ) : listUser && listUser.length > 0 ? (
                <ul className="members-list">
                  {listUser.map((member: any, index: number) => (
                    <li key={index} className="member-item">
                      <div className="member-info">
                        <div className="member-email">{member.email}</div>
                        <div className="member-date">
                          {modalData.type === "approved"
                            ? `${i18n("pages.invitation.approved")}: ${Dates.formatDateTime(
                                member.updatedAt || member.createdAt
                              )}`
                            : `${i18n("pages.invitation.joined")}: ${Dates.formatDateTime(
                                member.createdAt
                              )}`}
                        </div>
                      </div>
                      <div
                        className={`member-status ${
                          modalData.type === "approved" ? "approved" : "pending"
                        }`}
                      >
                        {modalData.type}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="modal-empty">
                  <i className="fas fa-users" />
                  <p>{i18n("pages.invitation.noMembersFound")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {copySuccess && (
        <div className="toast-notification">
          <i className="fas fa-check-circle" />
          {i18n("pages.invitation.referralCopied")}
        </div>
      )}

      <style>{`
        /* ====== Page Layout ====== */
        .invitation-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
          padding: 16px 20px 12px;
          background: #0e0f14;
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

        /* ====== Main Card ====== */
        .content-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .section-heading {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin: 20px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        .section-description {
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 16px;
        }

        /* ====== Invite Section ====== */
        .invite-earn-section {
          background: #1e1e24;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .referral-code-label {
          font-size: 12px;
          color: #aaaaaa;
          margin: 12px 0 4px;
        }
        .referral-code-value {
          background: #2a2a2e;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          margin-bottom: 8px;
          font-family: monospace;
          letter-spacing: 1px;
        }
        .copy-btn {
          width: 100%;
          padding: 10px;
          border: 1px solid #fd4b4e;
          background: transparent;
          color: #fd4b4e;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .copy-btn:hover {
          background: #fd4b4e;
          color: #fff;
        }

        .share-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 14px;
        }
        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2a2a2e;
          border: none;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .share-btn:hover {
          background: #fd4b4e;
        }

        /* ====== Total Earned ====== */
        .total-earned-section {
          margin-bottom: 16px;
        }
        .total-earned-card {
          background: #1e1e24;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .total-earned-label {
          font-size: 12px;
          color: #aaaaaa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .total-earned-amount {
          font-size: 32px;
          font-weight: 700;
          color: #4caf50;
          margin-bottom: 4px;
        }
        .total-earned-subtitle {
          font-size: 11px;
          color: #666;
        }

        /* ====== Generation Stats ====== */
        .generation-stats-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .generation-stat-item {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }
        .generation-stat-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .generation-stat-title i {
          color: #fd4b4e;
        }
        .generation-stats-details {
          display: flex;
          gap: 12px;
        }
        .generation-stat-detail {
          flex: 1;
          background: #2a2a2e;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .generation-stat-detail:hover {
          background: #3a3a3e;
        }
        .generation-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }
        .generation-stat-detail.approved .generation-stat-value {
          color: #4caf50;
        }
        .generation-stat-detail.pending .generation-stat-value {
          color: #fd4b4e;
        }
        .generation-stat-label {
          font-size: 11px;
          color: #aaaaaa;
          margin-top: 4px;
        }

        /* ====== Commission ====== */
        .commission-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .commission-item {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }
        .commission-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .commission-title i {
          color: #fd4b4e;
        }
        .commission-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .commission-detail {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #aaaaaa;
        }
        .commission-value {
          color: #ffffff;
          font-weight: 600;
        }

        /* ====== How It Works ====== */
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }
        .step-number-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fd4b4e;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-title-text {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .step-desc {
          font-size: 12px;
          color: #aaaaaa;
        }

        /* ====== Modal ====== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-dialog {
          background: #15161c;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
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
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }
        .modal-loading,
        .modal-empty {
          text-align: center;
          padding: 30px;
          color: #aaaaaa;
          font-size: 13px;
        }
        .modal-loading i,
        .modal-empty i {
          font-size: 24px;
          margin-bottom: 8px;
          display: block;
        }

        .members-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .member-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #2a2a2e;
          font-size: 13px;
        }
        .member-email {
          color: #ffffff;
          margin-bottom: 2px;
        }
        .member-date {
          font-size: 11px;
          color: #aaaaaa;
        }
        .member-status {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .member-status.approved {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }
        .member-status.pending {
          background: rgba(253, 75, 78, 0.15);
          color: #fd4b4e;
        }

        /* ====== Toast ====== */
        .toast-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #4caf50;
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          z-index: 1100;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          animation: fadeInUp 0.3s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .loading-text {
          text-align: center;
          color: #aaaaaa;
          font-size: 13px;
          padding: 16px;
        }
        .loading-text i {
          margin-right: 8px;
        }

        .empty-text {
          text-align: center;
          color: #aaaaaa;
          font-size: 13px;
          padding: 16px;
        }
      `}</style>
    </div>
  );
}

export default Invitation;