import {
  FILTER_LIST_SUCCESS,
  FILTER_LIST_FAILURE,
  RESET_FILTER_LIST
} from '../../../constants/constants'
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import axiosInstance from '../axiosInstance/axiosInstance';

export const getFilterList = () => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/report/filter`)
      .then(response => {
        const filterList = response.data
        dispatch(filterListSuccess(filterList));
      })
      .catch(error => {
        if (error.response) {
          dispatch(filterListFailure(error.message));
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


export const filterListSuccess = list => {
  return {
    type: FILTER_LIST_SUCCESS,
    payload: list
  }
}

export const filterListFailure = error => {
  return {
    type: FILTER_LIST_FAILURE,
    payload: error
  }
}

export const filterListReset = () => {
  return {
    type: RESET_FILTER_LIST,
    payload: ''
  }
}