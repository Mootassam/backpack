import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/user/form/userFormActions";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import FieldFormItem from "src/shared/form/fieldFormItem";

const schema = yup.object().shape({
  password: yupFormSchemas.string(i18n("pages.withdrawPassword.fields.currentPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("pages.withdrawPassword.fields.newPassword"), {
    required: true,
  }),
});

function WithdrawPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [initialValues] = useState({
    password: "",
    newPassword: "",
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(actions.UpdateWithdraw(values));
  };

  const goBack = () => history.goBack();

  return (
    <div className="withdraw-password-page">
      <div className="withdraw-password-container">
        {/* Header */}
        <div className="top-header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.withdrawPassword.title")}</h1>
          <div className="header-placeholder"></div>
        </div>

        {/* Card */}
        <div className="content-card">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h2 className="card-title">
                {i18n("pages.withdrawPassword.cardTitle")}
              </h2>

              <FieldFormItem
                name="password"
                type="password"
                label={i18n("pages.withdrawPassword.fields.currentPassword")}
                className="form-input"
                className1="form-group"
                className2="form-label"
                className3="password-input-container"
                placeholder={i18n("pages.withdrawPassword.placeholders.currentPassword")}
              />

              <FieldFormItem
                name="newPassword"
                type="password"
                label={i18n("pages.withdrawPassword.fields.newPassword")}
                className="form-input"
                className1="form-group"
                className2="form-label"
                className3="password-input-container"
                placeholder={i18n("pages.withdrawPassword.placeholders.newPassword")}
              />
              
              <button className="save-button" type="submit">
                {i18n("pages.withdrawPassword.buttons.saveChanges")}
              </button>
              
              <p className="warning-message">
                {i18n("pages.withdrawPassword.warningMessage")}
              </p>
            </form>
          </FormProvider>
        </div>
      </div>

      <style>{`
        .withdraw-password-page {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .withdraw-password-container {
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

        .card-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #2a2a2e;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        .form-input {
          width: 100%;
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 14px 16px;
          color: #ffffff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #fd4b4e;
        }

        .form-input::placeholder {
          color: #6b6b70;
        }

        .password-input-container {
          position: relative;
        }

        .password-input-container .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #888888;
        }

        .save-button {
          width: 100%;
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background-color 0.2s;
        }

        .save-button:hover {
          background-color: #e04345;
        }

        .warning-message {
          color: #fd4b4e;
          font-size: 13px;
          text-align: center;
          margin-top: 16px;
          line-height: 1.4;
        }

        .invalid-feedback {
          color: #fd4b4e;
          font-size: 12px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}

export default WithdrawPassword;