import {
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_LIST_RESET,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import axiosInstance from '../axiosInstance/axiosInstance';

export const transactionsList = () => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/transaction`)
      .then(response => {
        const transactions = response.data
        dispatch(importTransactionSuccess(transactions))
      })
      .catch(error => {
        if (error.response) {
          dispatch(importTransactionFailure(error.message));
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


export const importTransactionSuccess = terminals => {
  return {
    type: TRANSACTION_LIST_SUCCESS,
    payload: terminals
  }
}

export const importTransactionFailure = error => {
  return {
    type: TRANSACTION_LIST_FAILURE,
    payload: error
  }
}

export const importTransactionReset = () => {
  return {
    type: TRANSACTION_LIST_RESET,
    payload: ''
  }
}