import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from 'src/modules/company/list/companyListActions';
import selectors from 'src/modules/company/list/companyListSelectors';
import LoadingModal from "src/shared/LoadingModal";
import { i18n } from "../../../i18n";

function About() {
  const dispatch = useDispatch();
  const history = useHistory();
  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  const goBack = () => history.goBack();

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header */}
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.about.title")}</h1>
          <div className="header-placeholder"></div>
        </div>

        {/* Card with content */}
        <div className="content-card">
          {loading && <LoadingModal />}
          {!loading && record && record[0]?.companydetails && (
            <div
              className="about-content"
              dangerouslySetInnerHTML={{ __html: record[0]?.companydetails }}
            />
          )}
          {!loading && (!record || record.length === 0) && (
            <div className="empty-state">
              <i className="fas fa-info-circle" />
              <p>{i18n("pages.about.noData")}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .about-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .about-container {
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
          min-height: 200px;
        }

        /* Rich text content */
        .about-content {
          color: #cccccc;
          font-size: 14px;
          line-height: 1.6;
          word-break: break-word;
        }

        .about-content h1,
        .about-content h2,
        .about-content h3,
        .about-content h4,
        .about-content h5,
        .about-content h6 {
          color: #ffffff;
          margin-top: 1.2em;
          margin-bottom: 0.6em;
        }

        .about-content p {
          margin-bottom: 1em;
        }

        .about-content a {
          color: #fd4b4e;
          text-decoration: none;
        }

        .about-content strong {
          color: #ffffff;
        }

        .about-content ul,
        .about-content ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }

        .about-content img {
          max-width: 100%;
          border-radius: 8px;
        }

        /* Empty / error state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #888888;
          text-align: center;
        }

        .empty-state i {
          font-size: 36px;
          color: #fd4b4e;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}

export default About;