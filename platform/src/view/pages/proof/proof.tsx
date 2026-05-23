import React, { useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import * as yup from "yup";
import actions from "src/modules/kyc/form/kycFormActions";
import { yupResolver } from "@hookform/resolvers/yup";
import authSelectors from "src/modules/auth/authSelectors";
import transactionEnumerators from "src/modules/transaction/transactionEnumerators";
import Storage from "src/security/storage";

const createSchema = (documentType) =>
  yup.object().shape({
    user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
    Documenttype: yupFormSchemas.string(i18n("pages.proof.fields.documentType")),
    realname: yupFormSchemas.string(i18n("pages.proof.fields.fullName"), { required: true }),
    idnumer: yupFormSchemas.string(i18n("pages.proof.fields.documentNumber"), { required: true }),
    address: yupFormSchemas.string(i18n("pages.proof.fields.address"), { required: true }),
    front: yupFormSchemas.images(i18n("pages.proof.fields.frontSide"), { required: true }),
    back:
      documentType === "passport"
        ? yupFormSchemas.images(i18n("pages.proof.fields.backSide"))
        : yupFormSchemas.images(i18n("pages.proof.fields.backSide"), { required: true }),
    selfie: yupFormSchemas.images(i18n("pages.proof.fields.selfie"), { required: true }),
    status: yupFormSchemas.enumerator(
      i18n("entities.transaction.fields.status"),
      { options: transactionEnumerators.status }
    ),
  });

function Proof() {
  const history = useHistory();
  const [document, setDocument] = useState("passport");
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  const schema = useMemo(() => createSchema(document), [document]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
      idnumer: "",
      address: "",
      front: [],
      back: [],
      selfie: [],
      status: "pending",
    },
  });

  const onSubmit = (values) => {
    const data = { ...values, user: currentUser, Documenttype: document };
    if (document === "passport") data.back = [];
    dispatch(actions.doCreate(data));
  };

  const handleDocumentChange = (type) => {
    setDocument(type);
    if (type === "passport") form.setValue("back", []);
  };

  const goBack = () => history.goBack();

  const documentTypeOptions = [
    { value: "passport", label: i18n("pages.proof.documentTypes.passport"), icon: "fas fa-passport" },
    { value: "idCard", label: i18n("pages.proof.documentTypes.idCard"), icon: "fas fa-id-card" },
    { value: "driversLicense", label: i18n("pages.proof.documentTypes.driversLicense"), icon: "fas fa-id-card-alt" },
  ];

  return (
    <div className="proof-wrapper">
      <div className="proof-card">
        {/* Header */}
        <div className="header">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h1 className="page-title">{i18n("pages.proof.title")}</h1>
          <div className="header-spacer"></div>
        </div>

        {/* Instructions */}
        <div className="instructions">
          {i18n("pages.proof.instructions")}
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Document Info Section */}
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.proof.sections.documentInfo")}
              </div>

              {/* Document Type Radio Group */}
              <div className="input-group">
                <label className="input-label">
                  {i18n("pages.proof.fields.documentType")} <span className="required">*</span>
                </label>
                <div className="radio-group">
                  {documentTypeOptions.map((item) => (
                    <div
                      key={item.value}
                      className={`radio-option ${item.value === document ? "selected" : ""}`}
                      onClick={() => handleDocumentChange(item.value)}
                    >
                      <i className={`${item.icon} radio-icon`} />
                      <span className="radio-text">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <InputFormItem 
                className="text-input" 
                name="realname" 
                label={i18n("pages.proof.fields.fullName")} 
                placeholder={i18n("pages.proof.placeholders.fullName")} 
              />
              <InputFormItem 
                className="text-input" 
                name="idnumer" 
                label={i18n("pages.proof.fields.documentNumber")} 
                placeholder={i18n("pages.proof.placeholders.documentNumber")} 
              />
              <InputFormItem 
                className="text-input"
                name="address" 
                label={i18n("pages.proof.fields.address")} 
                placeholder={i18n("pages.proof.placeholders.address")} 
              />
            </div>

            {/* Upload Section */}
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.proof.sections.documentUpload")}
              </div>

              <ImagesFormItem
                name="front"
                label={i18n("pages.proof.fields.frontSide")}
                storage={Storage.values.categoryPhoto}
                text={i18n("pages.proof.uploadTexts.frontSide")}
                max={2}
              />

              {document !== "passport" && (
                <ImagesFormItem
                  name="back"
                  label={i18n("pages.proof.fields.backSide")}
                  storage={Storage.values.categoryPhoto}
                  text={i18n("pages.proof.uploadTexts.backSide")}
                  max={2}
                />
              )}

              <ImagesFormItem
                name="selfie"
                label={i18n("pages.proof.fields.selfie")}
                storage={Storage.values.categoryPhoto}
                text={i18n("pages.proof.uploadTexts.selfie")}
                max={2}
              />
            </div>

            {/* Security Note */}
            <div className="security-note">
              <div className="security-title">
                <i className="fas fa-shield-alt" /> {i18n("pages.proof.security.title")}
              </div>
              <div className="security-text">
                {i18n("pages.proof.security.text")}
              </div>
            </div>

            <button type="submit" className="submit-button">
              {i18n("pages.proof.buttons.validateDocuments")}
            </button>
          </form>
        </FormProvider>

        {/* Footer */}
        <div className="footer">
          {i18n("pages.proof.footer.copyright")} | <a href="#">{i18n("pages.proof.footer.privacyPolicy")}</a>
        </div>
      </div>

      <style>{`
        .proof-wrapper {
          min-height: 100vh;
          background-color: #0e0f14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .proof-card {
          width: 100%;
          max-width: 400px;
          background-color: #15161c;
          border-radius: 16px;
          padding: 24px 20px 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
          margin-top: 0;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
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
          width: 32px;
        }

        .page-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          margin: 0;
          flex: 1;
        }

        /* Instructions */
        .instructions {
          background-color: #0e0f14;
          border-left: 3px solid #fd4b4e;
          color: #cccccc;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        /* Form sections */
        .form-section {
          margin-bottom: 20px;
        }

        .section-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2e;
        }

        /* Radio group – now horizontal, options column-centred */
        .radio-group {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .radio-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
          background-color: #0e0f14;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 16px 10px;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .radio-option.selected {
          border-color: #fd4b4e;
          background-color: rgba(253, 75, 78, 0.08);
        }

        .radio-icon {
          color: #aaaaaa;
          font-size: 22px;
          transition: color 0.2s;
        }

        .radio-option.selected .radio-icon {
          color: #fd4b4e;
        }

        .radio-text {
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
        }

        .required {
          color: #fd4b4e;
        }

        /* Security note */
        .security-note {
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .security-title {
          color: #fd4b4e;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .security-text {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.4;
        }

        /* Submit button */
        .submit-button {
          width: 100%;
          background-color: #fd4b4e;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #e04345;
        }

        /* Footer */
        .footer {
          text-align: center;
          color: #888888;
          font-size: 12px;
          margin-top: 16px;
        }

        .footer a {
          color: #fd4b4e;
          text-decoration: none;
        }

        .footer a:hover {
          opacity: 0.8;
        }

        /* Override ImagesFormItem background to match theme */
        .images-form-item {
          background-color: #0e0f14;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 14px;
        }

        .images-form-item label {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default Proof;