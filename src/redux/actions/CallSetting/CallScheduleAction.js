import axiosIncetance from '../../actions/axiosInstance/axiosInstance';
import {
  CALL_SCHEDULE_SUCCESS,
  CALL_SCHEDULE_FAILURE,
  CALL_SCHEDULE_RESET,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';

export const callSchedule = () => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosIncetance()
      .get(`${process.env.REACT_APP_API_URL}/call/scheduled-list`)
      .then(response => {
        dispatch(loader(false));
        const scheduleData = response.data
        dispatch(callScheduleSuccess(scheduleData));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(callScheduleFailure(error.message));
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
export const callScheduleSuccess = add => {
  return {
    type: CALL_SCHEDULE_SUCCESS,
    payload: add
  }
}

export const callScheduleFailure = error => {
  return {
    type: CALL_SCHEDULE_FAILURE,
    payload: error
  }
}

export const callScheduleReset = () => {
  return {
    type: CALL_SCHEDULE_RESET,
    payload: ''
  }
}