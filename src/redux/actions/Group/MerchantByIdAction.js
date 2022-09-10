
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_MERCHANT_SUCCESS,
  GET_MERCHANT_FAILURE,
  RESET_MERCHANT,
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';


export const getMerchantById = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/merchant/merchantById/${id}`)
      .then(response => {
        dispatch(loader(false));
        dispatch(getMerchantSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(getMerchantFailure(error.message));
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


export const getMerchantSuccess = merchant => {
  return {
    type: GET_MERCHANT_SUCCESS,
    payload: merchant
  }
}

export const getMerchantFailure = error => {
  return {
    type: GET_MERCHANT_FAILURE,
    payload: error
  }
}

export const resetMerchant = () => {
  return {
    type: RESET_MERCHANT,
    payload: ''
  }
}