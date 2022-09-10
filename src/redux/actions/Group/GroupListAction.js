import axiosInstance from '../axiosInstance/axiosInstance';
import {
  LIST_MERCHANT_SUCCESS,
  LIST_MERCHANT_FAILURE,
  LIST_MERCHANT_RESET
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const loadMerchants = (queryData, isMerchantList) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/merchant/merchant-list`, { params: queryData })
      .then(response => {
        dispatch(loader(false));
        const merchants = response.data
        dispatch(merchantsSuccess(merchants))
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(merchantsFailure(error.message));
          if (isMerchantList) {
            dispatch(enqueueSnackbar({
              message: I18n.t(`ERRORCODES.${error.response.data.errorCode}`),
              options: {
                variant: 'error'
              }
            }));
          }
        } else {
          if (isMerchantList) {
            dispatch(enqueueSnackbar({
              message: I18n.t(`ERRORCODES.UNKNOWN_ERROR`),
              options: {
                variant: 'error'
              }
            }));
          }
        }
      })
  }
}


export const merchantsSuccess = merchants => {
  return {
    type: LIST_MERCHANT_SUCCESS,
    payload: merchants
  }
}

export const merchantsFailure = error => {
  return {
    type: LIST_MERCHANT_FAILURE,
    payload: error
  }
}

export const merchantsReset = () => {
  return {
    type: LIST_MERCHANT_RESET,
    payload: ''
  }
}