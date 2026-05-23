import React, { useMemo, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
import { i18n } from "../../../i18n";

const MENU_ITEMS = [
  {
    icon: "fas fa-wallet",
    path: "/withdrawaddress",
    name: i18n("pages.profile.menu.withdrawalAddress"),
    requiresKyc: true,
  },
  {
    icon: "fas fa-lock",
    path: "/passwordtype",
    name: i18n("pages.profile.menu.password"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-bell",
    path: "/notification",
    name: i18n("pages.profile.menu.notifications"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-gift",
    path: "/invitation",
    name: i18n("pages.profile.menu.myInvitation"),
    requiresKyc: true,
  },
  {
    icon: "fas fa-language",
    path: "/language",
    name: i18n("pages.profile.menu.language"),
    requiresKyc: false,
  },
  {
    path: "/terms-of-use",
    icon: "fas fa-file-contract",
    name: i18n("pages.profile.menu.termsOfUse"),
  },
  {
    path: "/privacy-portal",
    icon: "fas fa-user-shield",
    name: i18n("pages.profile.menu.privacyPortal"),
  },
  {
    icon: "fas fa-info-circle",
    path: "/about",
    name: i18n("pages.profile.menu.aboutUs"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-file-contract",
    path: "/approval",
    name: i18n("pages.profile.menu.msbApproval"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-headset",
    path: "/LiveChat",
    name: i18n("pages.profile.menu.customerSupport"),
    requiresKyc: false,
  },
  {
    icon: "fab fa-google-play",
    path: "/Playstore",
    name: i18n("pages.profile.menu.downloadApp"),
    requiresKyc: false,
    external: true,
  },
];

const VERIFICATION_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  UNVERIFIED: "unverified",
};

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const selectRows = useSelector(kycSelectors.selectRows);

  const kycStatus = useMemo(() => {
    if (selectRows[0]?.status === VERIFICATION_STATUS.PENDING) {
      return VERIFICATION_STATUS.PENDING;
    }
    return currentUser?.kyc
      ? VERIFICATION_STATUS.SUCCESS
      : VERIFICATION_STATUS.UNVERIFIED;
  }, [selectRows, currentUser?.kyc]);

  const userData = useMemo(() => ({ user: currentUser }), [currentUser]);

  useEffect(() => {
    dispatch(actions.doFetch(userData, userData));
  }, [dispatch, userData]);

  const handleSignout = useCallback(() => {
    dispatch(authActions.doSignout());
  }, [dispatch]);

  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        disabled: item.requiresKyc && !currentUser?.kyc,
      })),
    [currentUser?.kyc]
  );

  const renderMenuItem = useCallback((item) => {
    const menuItemContent = (
      <li className={`profile-settings-item ${item.disabled ? "disabled" : ""}`}>
        <div className="profile-settings-info">
          <div className="profile-settings-icon">
            <i className={item.icon} />
          </div>
          <div className="profile-settings-name">{item.name}</div>
        </div>
        <div className="profile-settings-arrow">
          <i className="fas fa-chevron-right" />
        </div>
      </li>
    );

    if (item.disabled) {
      return <div key={item.name}>{menuItemContent}</div>;
    }

    if (item.external) {
      return (
        <a
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className="remove_blue"
          key={item.name}
        >
          {menuItemContent}
        </a>
      );
    }

    return (
      <Link to={item.path} className="remove_blue" key={item.name}>
        {menuItemContent}
      </Link>
    );
  }, []);

  const goBack = () => history.goBack();

  return (
    <div className="profile-page">
      {kycStatus === VERIFICATION_STATUS.UNVERIFIED && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="alert-icon">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <div className="alert-title">
              {i18n("pages.profile.verification.alert.title")}
            </div>
            <div className="alert-desc">
              {i18n("pages.profile.verification.alert.description")}
            </div>
            <Link to="/proof" className="remove_blue">
              <button className="verify-now-button">
                {i18n("pages.profile.verification.alert.verifyNow")}
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="profile-container">
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.profile.title")}</h1>
          <div className="header-placeholder"></div>
        </div>

        <div className="content-card">
          {kycStatus === VERIFICATION_STATUS.PENDING && (
            <div className="verification-status">
              <div className="status-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="status-title">
                {i18n("pages.profile.verification.pending.title")}
              </div>
              <div className="status-desc">
                {i18n("pages.profile.verification.pending.description")}
              </div>
            </div>
          )}

          <div className="profile-profile-header">
            <div className="profile-profile-avatar">
              <i className="fas fa-user" />
            </div>
            <div className="profile-profile-info">
              <div className="profile-profile-name">
                {currentUser?.email?.split("@")[0]}
              </div>
              <div
                className={
                  kycStatus === VERIFICATION_STATUS.SUCCESS
                    ? "profile-profile-status"
                    : "profile-not-status"
                }
              >
                {kycStatus === VERIFICATION_STATUS.SUCCESS
                  ? i18n("pages.profile.status.verified")
                  : i18n("pages.profile.status.unverified")}
              </div>
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-section-title">
              {i18n("pages.profile.accountInfo.title")}
            </div>
            <div className="profile-info-item">
              <div className="profile-info-label">
                {i18n("pages.profile.accountInfo.email")}
              </div>
              <div className="profile-info-value">{currentUser?.email}</div>
            </div>
            <div className="profile-info-item">
              <div className="profile-info-label">
                {i18n("pages.profile.accountInfo.creditScore")}
              </div>
              <div className="profile-info-value">{currentUser?.score}</div>
            </div>
            <div className="profile-info-item">
              <div className="profile-info-label">
                {i18n("pages.profile.accountInfo.invitationCode")}
              </div>
              <div className="profile-info-value">
                <span className="profile-invite-code">
                  {currentUser?.kyc ? currentUser?.refcode : "******"}
                </span>
              </div>
            </div>
          </div>

          {kycStatus === VERIFICATION_STATUS.PENDING && (
            <div className="info-section">
              <div className="profile-section-title">
                {i18n("pages.profile.pendingVerifications.title")}
              </div>
              <div className="verification-item">
                <div className="verification-icon">
                  <i className="fas fa-id-card"></i>
                </div>
                <div className="verification-info">
                  <div className="verification-name">
                    {i18n("pages.profile.pendingVerifications.identity.title")}
                  </div>
                  <div className="verification-desc">
                    {i18n(
                      "pages.profile.pendingVerifications.identity.description"
                    )}
                  </div>
                </div>
                <div className="verification-status-badge">
                  {i18n("pages.profile.pendingVerifications.status.pending")}
                </div>
              </div>
              <div className="verification-item">
                <div className="verification-icon">
                  <i className="fas fa-home"></i>
                </div>
                <div className="verification-info">
                  <div className="verification-name">
                    {i18n("pages.profile.pendingVerifications.address.title")}
                  </div>
                  <div className="verification-desc">
                    {i18n(
                      "pages.profile.pendingVerifications.address.description"
                    )}
                  </div>
                </div>
                <div className="verification-status-badge">
                  {i18n("pages.profile.pendingVerifications.status.pending")}
                </div>
              </div>
            </div>
          )}

          {kycStatus === VERIFICATION_STATUS.SUCCESS && (
            <div className="profile-info-section">
              <div className="profile-section-title">
                {i18n("pages.profile.approvedVerifications.title")}
              </div>
              <div className="profile-verification-badge">
                <div className="profile-badge-icon">
                  <i className="fas fa-id-card" />
                </div>
                <div className="profile-badge-info">
                  <div className="profile-badge-title">
                    {i18n(
                      "pages.profile.approvedVerifications.identity.title"
                    )}
                  </div>
                  <div className="profile-badge-desc">
                    {i18n(
                      "pages.profile.approvedVerifications.status.completed"
                    )}
                  </div>
                </div>
              </div>
              <div className="profile-verification-badge">
                <div className="profile-badge-icon">
                  <i className="fas fa-shield-alt" />
                </div>
                <div className="profile-badge-info">
                  <div className="profile-badge-title">
                    {i18n(
                      "pages.profile.approvedVerifications.address.title"
                    )}
                  </div>
                  <div className="profile-badge-desc">
                    {i18n(
                      "pages.profile.approvedVerifications.status.completed"
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="profile-info-section">
            <div className="profile-section-title">
              {i18n("pages.profile.settings")}
            </div>
            <ul className="profile-settings-list">
              {menuItems.map(renderMenuItem)}
              <li className="profile-settings-item" onClick={handleSignout}>
                <div className="profile-settings-info">
                  <div className="profile-settings-icon">
                    <i className="fas fa-sign-out-alt" />
                  </div>
                  <div className="profile-settings-name">
                    {i18n("pages.profile.menu.logout")}
                  </div>
                </div>
                <div className="profile-settings-arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        /* Solid dark background */
        .profile-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding: 0 0 20px 0;
        }

        .profile-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        .top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .header-placeholder {
          width: 32px;
        }

        .content-card {
          background-color: #15161c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px 24px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
          flex: 1;
        }

        .verification-status {
          background-color: #0e0f14;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          text-align: center;
        }

        .status-icon {
          font-size: 28px;
          color: #fd4b4e;
          margin-bottom: 8px;
        }

        .status-title {
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 6px;
        }

        .status-desc {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.4;
        }

        .profile-profile-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .profile-profile-avatar {
          width: 48px;
          height: 48px;
          background-color: #0e0f14;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 22px;
        }

        .profile-profile-name {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
        }

        .profile-profile-status {
          color: #4caf50;
          font-size: 13px;
          margin-top: 4px;
        }

        .profile-not-status {
          color: #fd4b4e;
          font-size: 13px;
          margin-top: 4px;
        }

        .profile-info-section {
          margin-bottom: 20px;
        }

        .profile-section-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        .profile-info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #2a2a2e;
        }

        .profile-info-item:last-child {
          border-bottom: none;
        }

        .profile-info-label {
          color: #aaaaaa;
          font-size: 13px;
        }

        .profile-info-value {
          color: #ffffff;
          font-size: 13px;
          word-break: break-all;
        }

        .profile-invite-code {
          background-color: #0e0f14;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
        }

        .verification-item {
          display: flex;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
          gap: 12px;
        }

        .verification-icon {
          color: #fd4b4e;
          font-size: 20px;
          width: 36px;
          text-align: center;
        }

        .verification-info {
          flex: 1;
        }

        .verification-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
        }

        .verification-desc {
          color: #aaaaaa;
          font-size: 12px;
        }

        .verification-status-badge {
          background-color: rgba(253, 75, 78, 0.15);
          color: #fd4b4e;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
        }

        .profile-verification-badge {
          display: flex;
          align-items: center;
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 10px;
          gap: 12px;
        }

        .profile-badge-icon {
          color: #4caf50;
          font-size: 20px;
        }

        .profile-badge-title {
          color: #ffffff;
          font-size: 14px;
        }

        .profile-badge-desc {
          color: #4caf50;
          font-size: 12px;
        }

        .profile-settings-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .profile-settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #2a2a2e;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .profile-settings-item:last-child {
          border-bottom: none;
        }

        .profile-settings-item:hover {
          background-color: rgba(253, 75, 78, 0.05);
        }

        .profile-settings-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-settings-icon {
          color: #fd4b4e;
          font-size: 16px;
          width: 28px;
          text-align: center;
        }

        .profile-settings-name {
          color: #ffffff;
          font-size: 14px;
        }

        .profile-settings-arrow {
          color: #888888;
          font-size: 14px;
        }

        .profile-settings-item.disabled {
          opacity: 0.4;
          pointer-events: none;
        }

        .profile-settings-item.disabled .profile-settings-icon {
          color: #888888;
        }

        .profile-settings-item.disabled .profile-settings-name {
          color: #888888;
        }

        a.remove_blue {
          text-decoration: none;
          color: inherit;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-card {
          background-color: #15161c;
          border-radius: 16px;
          padding: 30px 24px;
          text-align: center;
          max-width: 360px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
        }

        .popup-card .alert-icon {
          font-size: 36px;
          color: #fd4b4e;
          margin-bottom: 16px;
        }

        .popup-card .alert-title {
          color: #ffffff;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 12px;
        }

        .popup-card .alert-desc {
          color: #aaaaaa;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .verify-now-button {
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 12px 32px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
        }

        .verify-now-button:hover {
          background-color: #e04345;
        }
      `}</style>
    </div>
  );
}

export default Profile;