import React, { useMemo, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldFormItem from "src/shared/form/FieldFormItem";
import actions from "src/modules/user/form/userFormActions";

const currencyType = [
  { 
    icon: "fab fa-bitcoin", 
    label: i18n("pages.withdrawAddressForm.currencies.btc"), 
    id: "BTC", 
    symbol: "BTC" 
  },
  {
    icon: "fab fa-ethereum",
    label: i18n("pages.withdrawAddressForm.currencies.eth"),
    id: "ETH",
    symbol: "ETH",
  },
  {
    icon: "fas fa-chevron-right",
    label: i18n("pages.withdrawAddressForm.currencies.usdt"),
    id: "USDT",
    symbol: "USDT",
  },
  {
    label: i18n("pages.withdrawAddressForm.currencies.sol"),
    symbol: "SOL",
    id: "SOL",
  },
  {
    label: i18n("pages.withdrawAddressForm.currencies.xrp"),
    symbol: "XRP",
    id: "XRP",
  },
];

const schema = yup.object().shape({
  address: yupFormSchemas.string(i18n("pages.withdrawAddressForm.fields.address"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("pages.withdrawAddressForm.fields.password"), {
    required: true,
  }),
});

function formWithdrawAdress() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const selected = currencyType.filter((item) => item.id === id);
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [initialValues] = useState(() => {
    return {
      currency: id,
      address:
        (currentUser &&
          currentUser.wallet &&
          currentUser?.wallet[id]?.address) ||
        "",
      password: "",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    values.currency = id;
    dispatch(actions.UpdateWalletAdress(values));
  };

  const goBack = () => history.goBack();

  return (
    <div className="withdraw-address-page">
      {/* Header with back button */}
      <div className="top-header">
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <h1 className="page-title">
          {i18n("pages.withdrawAddressForm.title")}
        </h1>
        <div className="header-placeholder"></div>
      </div>

      <div className="content-card">
        {/* Selected Currency */}
        <div className="currency-section">
          <div className="section-title">
            {i18n("pages.withdrawAddressForm.currencyType")}
          </div>
          {selected.map((item, index) => (
            <div className="selected-currency" key={index}>
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item.symbol}.png`}
                alt={item.symbol}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Address Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.withdrawAddressForm.withdrawalAddress")}
              </div>

              <FieldFormItem
                name="address"
                type="text"
                label={i18n("pages.withdrawAddressForm.fields.address")}
                className="form-input"
                className1="form-group"
                className2="form-label"
                className3="input-container"
                placeholder={i18n("pages.withdrawAddressForm.placeholders.address")}
              />

              <FieldFormItem
                name="password"
                type="password"
                label={i18n("pages.withdrawAddressForm.fields.password")}
                className="form-input"
                className1="form-group"
                className2="form-label"
                className3="input-container"
                placeholder={i18n("pages.withdrawAddressForm.placeholders.password")}
              />

              <button type="submit" className="save-btn">
                {i18n("pages.withdrawAddressForm.buttons.save")}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      <style>{`
        /* ====== Page Layout ====== */
        .withdraw-address-page {
          min-height: 100vh;
          background: #0e0f14;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding-bottom: 20px;
        }

        /* ----- Header ----- */
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

        /* ----- Main Card ----- */
        .content-card {
          width: 100%;
          max-width: 400px;
          background: #15161c;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        /* ----- Currency Section ----- */
        .currency-section {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 13px;
          font-weight: 600;
          color: #aaaaaa;
          margin-bottom: 10px;
        }
        .selected-currency {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
        }
        .selected-currency img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          object-fit: contain;
        }

        /* ----- Form Section ----- */
        .form-section {
          background: #1e1e24;
          border-radius: 10px;
          padding: 14px;
        }

        /* Override FieldFormItem styles for dark theme */
        .form-group {
          margin-bottom: 14px;
        }
        .form-label {
          font-size: 12px !important;
          color: #aaaaaa !important;
          margin-bottom: 4px !important;
          display: block;
        }
        .input-container input,
        .input-container select,
        .input-container textarea {
          width: 100%;
          background: #2a2a2e !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 10px 12px !important;
          font-size: 13px !important;
          color: #ffffff !important;
          outline: none;
        }
        .input-container input::placeholder {
          color: #777;
        }

        /* Save Button */
        .save-btn {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          background: #fd4b4e;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .save-btn:hover {
          background: #e04345;
        }
      `}</style>
    </div>
  );
}

export default formWithdrawAdress;