
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  DELETE_CALL_SUCCESS,
  DELETE_CALL_FAILURE,
} from '../../../constants/constants'
import { callSchedule } from './CallScheduleAction';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';

export const deleteScheduledCallById = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .delete(`${process.env.REACT_APP_API_URL}/call/deleteById/${id}`)
      .then(response => {
        dispatch(loader(false));
        dispatch(deleteScheduledCallByIdSuccess());
        dispatch(callSchedule());
        dispatch(enqueueSnackbar({
          message: I18n.t('CALL_SETTINGS.SCHEDULED_CALL_DELETED'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(deleteScheduledCallByIdFailure(error.message));
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
  };
};


export const deleteScheduledCallByIdSuccess = () => {
  return {
    type: DELETE_CALL_SUCCESS,
  };
};

export const deleteScheduledCallByIdFailure = error => {
  return {
    type: DELETE_CALL_FAILURE,
    payload: error
  };
};

