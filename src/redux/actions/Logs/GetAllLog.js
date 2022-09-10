
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_ALL_LOGS_SUCCESS,
  GET_ALL_LOGS_FAILURE,
  GET_LOGS_FILE_BY_ID_RESET
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const getAllLog = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/logs`, { params: { id: id } })
      .then(response => {
        dispatch(loader(false));
        dispatch(getAllLogSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(getAllLogFailure(error.message));
        } else {
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.UNKNOWN_ERROR`),
            options: {
              variant: 'error'
            }
          }));
        }
      });
  };
};


export const getAllLogSuccess = log => {
  return {
    type: GET_ALL_LOGS_SUCCESS,
    payload: log
  };
};

export const getAllLogFailure = error => {
  return {
    type: GET_ALL_LOGS_FAILURE,
    payload: error
  };
};

export const getAllLogReset = () => {
  return {
    type: GET_LOGS_FILE_BY_ID_RESET,
    payload: ''
  };
};
