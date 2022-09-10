import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAILURE,
} from '../../../constants/constants';
import { loadMerchants } from './GroupListAction';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { getMerchantById } from './MerchantByIdAction'
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { loader } from '../Loader/LoaderActions';


export const updateMerchant = (id, merchant) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .put(`${process.env.REACT_APP_API_URL}/merchant/update/${id}`, merchant)
      .then(response => {
        dispatch(loader(false));
        dispatch(updateMerchantSuccess(response));
        dispatch(loadMerchants(GetUserAssociatedGroups()));
        dispatch(getMerchantById(id));
        dispatch(enqueueSnackbar({
          message: I18n.t('GROUP.EDIT_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(updateMerchantFailure(error.message));
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


export const updateMerchantSuccess = update => {
  return {
    type: UPDATE_MERCHANT_SUCCESS,
    payload: update
  }
}

export const updateMerchantFailure = error => {
  return {
    type: UPDATE_MERCHANT_FAILURE,
    payload: error
  }
}