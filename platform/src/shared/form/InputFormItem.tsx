import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import FormErrors from "./FormErrors";
import Message from "src/view/shared/message";

export function InputFormItem(props) {
  const {
    label,
    description,
    name,
    hint,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    required,
    externalErrorMessage,
    disabled,
    endAdornment,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();

  if (externalErrorMessage) {
    Message.error(externalErrorMessage);
  }
  
  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <>
      <div className="input-group">
        {Boolean(label) && (
          <label
            className={`input-label ${required ? "required" : ""}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        {description}
        <div 
          className="input-container" 
          style={{ 
            position: 'relative',
            ...(className === "captcha-input" ? { padding: 0 } : {})
          }}
        >
          <input
            className={`${className || ""} ${
              errorMessage ? "__danger" : ""
            }`}
            id={name}
            name={name}
            type={inputType}
            ref={register}
            onChange={(event) => {
              props.onChange && props.onChange(event.target.value);
            }}
            onBlur={(event) => {
              props.onBlur && props.onBlur(event);
            }}
            placeholder={placeholder || undefined}
            autoFocus={autoFocus || undefined}
            autoComplete={autoComplete || undefined}
            disabled={disabled}
            style={type === "password" ? { 
              paddingRight: "40px",
              width: "100%"
            } : { width: "100%" }}
          />
          
          {type === "password" && (
            <div 
              className="toggle-password" 
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#888",
                zIndex: 2,
                background: "transparent",
                border: "none",
                padding: "8px"
              }}
            >
              <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"} />
            </div>
          )}
        </div>
        {endAdornment && (
          <div className="input-group-append">
            <span className="input-group-text">{endAdornment}</span>
          </div>
        )}
      
        <div className="invalid-feedback">{errorMessage}</div>
        {Boolean(hint) && <small className="form-text text-muted">{hint}</small>}
      </div>

      <style>{`
        .input-group {
          width: 100%;
          margin-bottom: 0;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 8px;
          padding-left: 4px;
        }

        .input-container input,
        .input-container input.text-input {
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

        .input-container input::placeholder {
          color: #6b6b70;
        }

        .input-container input:focus {
          border-color: #fd4b4e;
        }

        .input-container input.__danger {
          border-color: #fd4b4e;
        }

        .input-container input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .invalid-feedback {
          color: #fd4b4e;
          font-size: 13px;
          margin-top: 6px;
          padding-left: 4px;
        }

        .form-text.text-muted {
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 4px;
          padding-left: 4px;
        }

        .toggle-password i {
          color: #888;
          font-size: 16px;
        }

        .toggle-password:hover i {
          color: #ffffff;
        }
      `}</style>
    </>
  );
}

InputFormItem.defaultProps = {
  type: "text",
  required: false,
};

InputFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  endAdornment: PropTypes.any,
  onChange: PropTypes.any,
  className: PropTypes.string,
};

export default InputFormItem;