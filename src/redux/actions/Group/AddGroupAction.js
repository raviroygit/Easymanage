import axiosInstance from '../axiosInstance/axiosInstance';
import {
  ADD_MERCHANT_SUCCESS,
  ADD_MERCHANT_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadMerchants } from './GroupListAction'
import { loadTerminals } from '../Terminals/TerminalsListAction'
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { getKeycloakGroups } from './GetKeycloakGroups';
import { loader } from '../Loader/LoaderActions';


export const addMerchant = (merchant) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/merchant/register`, merchant)
      .then(response => {
        dispatch(loader(false));
        dispatch(addMerchantSuccess());
        dispatch(loadMerchants(GetUserAssociatedGroups()));
        dispatch(loadTerminals(GetUserAssociatedGroups()));
        dispatch(getKeycloakGroups(localStorage.token));
        dispatch(enqueueSnackbar({
          message: I18n.t('GROUP.ADD_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(addMerchantFailure(error.message));
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


export const addMerchantSuccess = add => {
  return {
    type: ADD_MERCHANT_SUCCESS,
    payload: add
  }
}

export const addMerchantFailure = error => {
  return {
    type: ADD_MERCHANT_FAILURE,
    payload: error
  }
}