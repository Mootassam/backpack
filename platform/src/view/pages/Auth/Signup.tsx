import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local imports
import actions from "src/modules/auth/authActions";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectors.selectLoading);
  const errorMessage = useSelector(selectors.selectErrorMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");

  // Generate initial captcha on component mount
  useEffect(() => {
    refreshCaptcha();
  }, []);

  // Validation schema
  const schema = yup.object().shape({
    email: yupFormSchemas.string(i18n("user.fields.username"), {
      required: true,
    }),
    password: yupFormSchemas.string(i18n("user.fields.password"), {
      required: true,
      min: 8,
    }),
    newPasswordConfirmation: yupFormSchemas
      .string(i18n("user.fields.newPasswordConfirmation"), {
        required: true,
      })
      .oneOf(
        [yup.ref("password"), null],
        i18n("auth.passwordChange.mustMatch")
      ),
    phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
      required: true,
    }),
    invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
      required: true,
    }),
    withdrawPassword: yupFormSchemas.string(
      i18n("user.fields.withdrawPassword"),
      {
        required: true,
      }
    ),

    captcha: yup
      .string()
      .required(i18n("user.fields.captcha"))
      .test("captcha-match", i18n("pages.signup.captchaMismatch"), function (value) {
        return value === captchaText;
      }),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      newPasswordConfirmation: "",
      phoneNumber: "",
      withdrawPassword: "",
      invitationcode: "",
      captcha: "",
    },
  });

  // Clear error message on component mount
  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  // Generate new captcha
  const refreshCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(newCaptcha);
    // Clear captcha field when refreshing
    form.setValue("captcha", "");
    form.clearErrors("captcha");
  }, [form]);

  const onSubmit = useCallback(
    (data) => {
      // Captcha validation is already handled by yup schema
      const { email, password, phoneNumber, withdrawPassword, invitationcode } =
        data;
      dispatch(
        actions.doRegisterEmailAndPassword(
          email,
          password,
          phoneNumber,
          withdrawPassword,
          invitationcode
        )
      );
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {/* Header with back button */}
        <div className="header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="header-spacer"></div>
          <Link to="/language" className="language-icon">
            <i className="fas fa-globe"></i>
          </Link>
        </div>

        {/* Title – no logo here */}
        <h1 className="page-title">{i18n("pages.signup.title")}</h1>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form-section">
            <InputFormItem
              type="email"
              name="email"
              placeholder={i18n("pages.signup.placeholders.email")}
              className="text-input"
              externalErrorMessage={errorMessage}
              autoComplete="email"
              label={i18n("pages.signup.labels.email")}
            />

            <InputFormItem
              type="tel"
              name="phoneNumber"
              placeholder={i18n("pages.signup.placeholders.phoneNumber")}
              className="text-input"
              autoComplete="tel"
              label={i18n("pages.signup.labels.phoneNumber")}
            />

            {/* Graphical Captcha */}
            <label className="input-label">{i18n("pages.signup.labels.captcha")}</label>
            <div className="captcha-container">
              <div className="captcha-display">
                <div className="captcha-text">{captchaText}</div>
              </div>
              <div className="captcha-controls">
                <div className="refresh-captcha" onClick={refreshCaptcha}>
                  <i className="fas fa-sync-alt" />
                  <span>{i18n("pages.signup.refresh")}</span>
                </div>
                <InputFormItem
                  type="text"
                  name="captcha"
                  placeholder={i18n("pages.signup.placeholders.captcha")}
                  className="captcha-input"
                />
              </div>
            </div>

            <InputFormItem
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={i18n("pages.signup.placeholders.password")}
              className="text-input"
              autoComplete="new-password"
              label={i18n("pages.signup.labels.password")}
            />

            <InputFormItem
              type="password"
              name="newPasswordConfirmation"
              placeholder={i18n("pages.signup.placeholders.confirmPassword")}
              className="text-input"
              autoComplete="new-password"
              label={i18n("pages.signup.labels.confirmPassword")}
            />
            <InputFormItem
              type="text"
              name="withdrawPassword"
              placeholder={i18n("pages.signup.placeholders.withdrawPassword")}
              className="text-input"
              externalErrorMessage={errorMessage}
              label={i18n("pages.signup.labels.withdrawPassword")}
            />
            <InputFormItem
              type="text"
              name="invitationcode"
              placeholder={i18n("pages.signup.placeholders.invitationCode")}
              className="text-input"
              externalErrorMessage={errorMessage}
              label={i18n("pages.signup.labels.invitationCode")}
            />

            <button className="signup-button" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>
                {loading 
                  ? i18n("pages.signup.creatingAccount") 
                  : i18n("pages.signup.createAccount")
                }
              </span>
            </button>
          </form>
        </FormProvider>

        {/* Already have account? Sign in */}
        <div className="signin-prompt">
          <span>{i18n("pages.signup.alreadyHaveAccount")}</span>
          <Link to="/auth/signin">{i18n("auth.signin.button")}</Link>
        </div>

        {/* Terms of use */}
        <div className="terms">
          {i18n("pages.signup.terms.text")}{" "}
          <Link to="/terms-of-use">{i18n("pages.signup.terms.link")}</Link>
        </div>
      </div>

      <style>{`
        .signup-wrapper {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .signup-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-radius: 16px;
          padding: 24px 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        }

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

        .page-title {
          text-align: center;
          color: #ffffff;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px 0;
          letter-spacing: 0.5px;
        }

        .form-section {
          margin-bottom: 18px;
        }

        .form-section .text-input,
        .form-section .captcha-input {
          margin-bottom: 0;
        }

        .input-label {
          display: block;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        /* Captcha styling */
        .captcha-container {
          margin-bottom: 14px;
        }

        .captcha-display {
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 10px;
          padding: 10px 14px;
          text-align: center;
          margin-bottom: 10px;
        }

        .captcha-text {
          font-size: 24px;
          font-weight: 700;
          color: #fd4b4e;
          letter-spacing: 6px;
          user-select: none;
        }

        .captcha-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .refresh-captcha {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fd4b4e;
          cursor: pointer;
          font-size: 13px;
          white-space: nowrap;
          transition: opacity 0.2s;
        }

        .refresh-captcha:hover {
          opacity: 0.8;
        }

        .captcha-input input {
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 10px;
          padding: 12px 14px;
          color: #ffffff;
          font-size: 15px;
          outline: none;
        }

        .captcha-input input:focus {
          border-color: #fd4b4e;
        }

        /* Buttons */
        .signup-button {
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
          margin-top: 8px;
        }

        .signup-button:hover:not(:disabled) {
          background-color: #e04345;
        }

        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Already have account */
        .signin-prompt {
          text-align: center;
          margin-bottom: 16px;
          font-size: 14px;
          color: #cccccc;
        }

        .signin-prompt span {
          margin-right: 6px;
        }

        .signin-prompt a {
          color: #fd4b4e;
          text-decoration: none;
          font-weight: 500;
        }

        .signin-prompt a:hover {
          opacity: 0.8;
        }

        /* Terms */
        .terms {
          text-align: center;
          color: #888888;
          font-size: 12px;
          margin-top: 12px;
        }

        .terms a {
          color: #fd4b4e;
          text-decoration: none;
        }

        .terms a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default Signup;