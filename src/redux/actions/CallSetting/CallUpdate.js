import axiosInstance from '../axiosInstance/axiosInstance';
import {
  CALL_RESCHEDULE_SUCCESS,
  CALL_RESCHEDULE_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { callSchedule } from './CallScheduleAction';
import { loader } from '../Loader/LoaderActions';

export const updateCall = (callRescheduleData) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .put(`${process.env.REACT_APP_API_URL}/call/reschedule`, callRescheduleData)
      .then(response => {
        dispatch(loader(false));
        dispatch(updateCallSuccess(response));
        dispatch(callSchedule());
        dispatch(enqueueSnackbar({
          message: I18n.t('CALL_SETTINGS.CALL_RESCHEDULED'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(updateCallFailure(error.message));
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
      });
  };
};


export const updateCallSuccess = update => {
  return {
    type: CALL_RESCHEDULE_SUCCESS,
    payload: update
  };
};

export const updateCallFailure = error => {
  return {
    type: CALL_RESCHEDULE_FAILURE,
    payload: error
  };
};