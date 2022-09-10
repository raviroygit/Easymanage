
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  DELETE_MERCHANT_SUCCESS,
  DELETE_MERCHANT_FAILURE,
  RESET_MERCHANT,
} from '../../../constants/constants'
import { loadMerchants } from './GroupListAction';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';

export const deleteMerchantById = (id) => {
  return (dispatch) => {
    axiosInstance()
      .delete(`${process.env.REACT_APP_API_URL}/merchant/deleteById/${id}`)
      .then(response => {
        dispatch(deleteMerchantSuccess());
        dispatch(loadMerchants(GetUserAssociatedGroups()));
        dispatch(enqueueSnackbar({
          message: I18n.t('GROUP.DELETE_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(deleteMerchantFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.data.errorCode}`),
            options: {
              variant: 'error'
            }
          }));
        } else {
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.UNKNOWN_ERROR`),
            options: {
              variant: 'error'
            }
          }));
        }
      })
  }
}


export const deleteMerchantSuccess = () => {
  return {
    type: DELETE_MERCHANT_SUCCESS,
  }
}

export const deleteMerchantFailure = error => {
  return {
    type: DELETE_MERCHANT_FAILURE,
    payload: error
  }
}

export const resetMerchant = error => {
  return {
    type: RESET_MERCHANT,
    payload: error
  }
}