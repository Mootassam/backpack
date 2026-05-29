import vipService from 'src/modules/deposit/depositService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import listActions from 'src/modules/deposit/list/depositListActions';
import UserService from 'src/modules/user/userService';

const prefix = 'COUPONS_FORM';

const vipFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({ type: vipFormActions.INIT_STARTED });

      let record = {};
      if (Boolean(id)) {
        record = await vipService.find(id);
      }

      dispatch({ type: vipFormActions.INIT_SUCCESS, payload: record });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: vipFormActions.INIT_ERROR });
      getHistory().push('/deposit');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({ type: vipFormActions.CREATE_STARTED });

      const now = new Date().toISOString();
      const rand = () => Math.random().toString(36).substr(2, 4).toUpperCase();
      const orderno = `DEP${Date.now()}${rand()}`;
      const txid    = `TX${Date.now()}${rand()}`;
      // yup relationToOne transform reduces { id, label } → raw id string before doCreate runs
      const targetUserId = typeof values.user === 'string'
        ? values.user
        : values.user?.id || values.user?.value;

      const depositData = {
        orderno,
        txid,
        amount: values.amount,
        rechargechannel: values.rechargechannel,
        rechargetime: now,
        acceptime: now,
        status: 'success',
        targetUser: targetUserId,
      };

      // Create deposit — server credits the wallet immediately when status='success'
      await vipService.create(depositData);

      // Mark user as having deposited (enables referral / bonus logic)
      if (targetUserId) {
        await UserService.Hasdeposited({ id: targetUserId });
      }

      dispatch({ type: vipFormActions.CREATE_SUCCESS });
      Message.success(i18n('entities.deposit.create.success'));
      dispatch(listActions.doFetchCurrentFilter());
      getHistory().push('/deposit');
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: vipFormActions.CREATE_ERROR });
    }
  },

  doUpdate: (id, values) => async (dispatch) => {
    try {
      dispatch({ type: vipFormActions.UPDATE_STARTED });
      await vipService.update(id, values);
      dispatch({ type: vipFormActions.UPDATE_SUCCESS });
      Message.success(i18n('entities.vip.update.success'));
      dispatch(listActions.doFetchCurrentFilter());
      getHistory().push('/deposit');
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: vipFormActions.UPDATE_ERROR });
    }
  },

  // Called from DepositListTable "Pass" / "Rejection" buttons
  Update: (id, values) => async (dispatch) => {
    try {
      dispatch({ type: vipFormActions.UPDATE_STARTED });
      await vipService.updateStatus(id, values);
      await UserService.Hasdeposited(values.createdBy);
      dispatch({ type: vipFormActions.UPDATE_SUCCESS });
      Message.success(i18n('entities.deposit.update.success'));
      dispatch(listActions.doFetchCurrentFilter());
      getHistory().push('/deposit');
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: vipFormActions.UPDATE_ERROR });
    }
  },
};

export default vipFormActions;
