import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  email: yupFormSchemas
    .string(i18n("user.fields.username"), {
      required: true,
    })
    .email(i18n("validation.email")),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
    min: 6,
  }),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [initialValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({ email, password }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, false));
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        {/* Header row */}
        <div className="header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="header-spacer"></div>
          <Link to="/language" className="language-icon">
            <i className="fas fa-globe"></i>
          </Link>
        </div>

        {/* Logo + Title */}
        <div className="logo-container">
          <img
            src="/images/logo.png"
            alt="App Logo"
            className="app-logo"
          />
        </div>
        <h1 className="page-title">{i18n("auth.signin.title")}</h1>

        {/* Form */}
        <FormProvider {...form}>
          <div className="form-section">
            {externalErrorMessage && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {externalErrorMessage}
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="auth__form">
                <div className="form__authgroup">
                  <InputFormItem
                    type="text"
                    name="email"
                    label={i18n("auth.fields.emailOrPhone")}
                    placeholder={i18n("user.fields.username")}
                    className="text-input"
                  />
                </div>

                <div className="form__authgroup">
                  <InputFormItem
                    type="password"
                    name="password"
                    placeholder={i18n("user.fields.password")}
                    className="text-input"
                    label={i18n("auth.fields.password")}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                className="login-button"
                disabled={loading}
                type="submit"
              >
                <ButtonIcon loading={loading} iconClass="fas fa-sign-in-alt" />
                <span>
                  {loading
                    ? i18n("auth.signin.signingIn")
                    : i18n("auth.signin.button")}
                </span>
              </button>
            </form>
          </div>
        </FormProvider>

        {/* New here? Sign up */}
        <div className="signup-prompt">
          <span>{i18n("auth.signin.newHere")}</span>
          <Link to="/auth/signup">{i18n("auth.signin.signUp")}</Link>
        </div>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">{i18n("auth.signin.getTheApp")}</span>
        </div>

        {/* Google Play badge */}
        <div className="google-play-badge">
          <Link to="/playstore">
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=fr"
              alt="Get it on Google Play"
            />
          </Link>
        </div>
      </div>

      <style>{`
        .signin-wrapper {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .signin-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-radius: 16px;
          padding: 24px 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
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

        .header-spacer {
          flex: 1;
        }

        .language-icon {
          color: #ffffff;
          font-size: 18px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .language-icon:hover {
          background-color: rgba(253, 75, 78, 0.15);
        }

        /* Logo & title */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }

        .app-logo {
          height: 64px;
          border-radius: 16px;
          object-fit: cover;
        }

        .page-title {
          text-align: center;
          color: #ffffff;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px 0;
          letter-spacing: 0.5px;
        }

        /* Form section */
        .form-section {
          margin-bottom: 18px;
        }

        .form__authgroup {
          margin-bottom: 14px;
        }

        /* Error message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(253, 75, 78, 0.12);
          border-left: 3px solid #fd4b4e;
          color: #ffffff;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 14px;
        }

        .error-message i {
          color: #fd4b4e;
          font-size: 14px;
        }

        /* Sign in button */
        .login-button {
          width: 100%;
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.2px;
        }

        .login-button:hover:not(:disabled) {
          background-color: #e04345;
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Sign up prompt */
        .signup-prompt {
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: #cccccc;
        }

        .signup-prompt span {
          margin-right: 6px;
        }

        .signup-prompt a {
          color: #fd4b4e;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-prompt a:hover {
          opacity: 0.8;
        }

        /* Divider */
        .divider {
          text-align: center;
          margin-bottom: 16px;
        }

        .divider-text {
          color: #888888;
          font-size: 13px;
          position: relative;
          display: inline-block;
          padding: 0 12px;
        }

        .divider-text::before,
        .divider-text::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 60px;
          height: 1px;
          background-color: #2a2a2e;
        }

        .divider-text::before {
          right: 100%;
          margin-right: 12px;
        }

        .divider-text::after {
          left: 100%;
          margin-left: 12px;
        }

        /* Google Play badge */
        .google-play-badge {
          text-align: center;
        }

        .google-play-badge img {
          height: 48px;
          width: auto;
          display: inline-block;
          transition: opacity 0.2s;
        }

        .google-play-badge a:hover img {
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}

export default Signin;