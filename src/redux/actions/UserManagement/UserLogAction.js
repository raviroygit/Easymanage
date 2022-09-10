import axiosIncetance from '../../actions/axiosInstance/axiosInstance';
import {
  USER_LOG_SUCCESS,
  USER_LOG_FAILURE,
  USER_LOG_RESET,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';

import { loader } from '../Loader/LoaderActions';

export const userLog = (user) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosIncetance()
      .post(`${process.env.REACT_APP_API_URL}/UserLogs`, user)
      .then(response => {
        dispatch(loader(false));
        dispatch(userLogSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(userLogFailure(error.message));
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
export const userLogSuccess = add => {
  return {
    type: USER_LOG_SUCCESS,
    payload: add
  }
}

export const userLogFailure = error => {
  return {
    type: USER_LOG_FAILURE,
    payload: error
  }
}

export const userLogReset = () => {
  return {
    type: USER_LOG_RESET,
    payload: ''
  }
}