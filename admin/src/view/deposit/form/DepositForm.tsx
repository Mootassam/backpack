import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import depositMethodEnumerators from 'src/modules/depositMethod/depositMethodEnumerators';

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(
    i18n('entities.deposit.fields.user') || 'Target User',
    { required: true },
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.deposit.fields.amount'),
    { required: true },
  ),
  rechargechannel: yupFormSchemas.string(
    i18n('entities.deposit.fields.rechargechannel'),
    { required: true },
  ),
});

function DepositForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      user: record.user || null,
      amount: record.amount || '',
      rechargechannel: record.rechargechannel || '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* Auto-filled notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#e8f4fd',
            border: '1px solid #bee3f8',
            borderRadius: 8,
            padding: '10px 16px',
            marginBottom: 24,
            fontSize: 13,
            color: '#2b6cb0',
          }}>
            <i className="fas fa-info-circle" style={{ fontSize: 16, flexShrink: 0 }} />
            <span>
              <strong>Order No</strong>, <strong>Transaction ID</strong>,&nbsp;
              <strong>Recharge Time</strong>, and <strong>Accept Time</strong> are
              generated automatically. Status is set to&nbsp;
              <strong style={{ color: '#276749' }}>Success</strong> and the
              selected user's balance will be credited immediately.
            </span>
          </div>

          <div className="row">
            {/* Target user */}
            <div className="col-lg-12 col-md-12 col-12">
              <UserAutocompleteFormItem
                name="user"
                label="Target User"
                required={true}
              />
            </div>

            {/* Amount */}
            <div className="col-lg-6 col-md-6 col-12">
              <InputFormItem
                name="amount"
                label={i18n('entities.deposit.fields.amount')}
                required={true}
                type="number"
              />
            </div>

            {/* Coin / Recharge Channel */}
            <div className="col-lg-6 col-md-6 col-12">
              <SelectFormItem
                name="rechargechannel"
                label={i18n('entities.deposit.fields.rechargechannel')}
                required={true}
                options={depositMethodEnumerators.coins.map((coin) => ({
                  value: coin,
                  label: coin,
                }))}
              />
            </div>
          </div>

          {/* Auto-filled fields preview */}
          <div style={{
            background: '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '14px 16px',
            marginTop: 8,
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 12, color: '#718096', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Auto-generated fields (read-only)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 13 }}>
              <div><span style={{ color: '#718096' }}>Order No: </span><span style={{ color: '#2d3748', fontFamily: 'monospace' }}>DEP{Date.now().toString().slice(-8)}****</span></div>
              <div><span style={{ color: '#718096' }}>Status: </span><span style={{ color: '#276749', fontWeight: 600 }}>✓ Success</span></div>
              <div><span style={{ color: '#718096' }}>Recharge Time: </span><span style={{ color: '#2d3748' }}>{new Date().toLocaleString()}</span></div>
              <div><span style={{ color: '#718096' }}>Accept Time: </span><span style={{ color: '#2d3748' }}>{new Date().toLocaleString()}</span></div>
            </div>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon loading={props.saveLoading} iconClass="fas fa-paper-plane" />
              &nbsp;{props.saveLoading ? 'Processing...' : 'Credit User Balance'}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo" />
              &nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
              >
                <i className="fas fa-times" />
                &nbsp;{i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default DepositForm;
