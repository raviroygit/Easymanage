import axiosIncetance from '../../actions/axiosInstance/axiosInstance';
import {
  ADD_CALL_SUCCESS,
  ADD_CALL_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { callSchedule } from './CallScheduleAction';
import { loader } from '../Loader/LoaderActions';

export const addCall = (call) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosIncetance()
      .post(`${process.env.REACT_APP_API_URL}/call/schedule`, call)
      .then(response => {
        dispatch(loader(false));
        dispatch(addCallSuccess());
        dispatch(callSchedule());
        dispatch(enqueueSnackbar({
          message: I18n.t('CALL_SETTINGS.ADD_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        dispatch(addCallFailure(error.message))
        dispatch(enqueueSnackbar({
          message: I18n.t(`ERRORCODES.${error.response.data.errorCode}`),
          options: {
            variant: 'error'
          }
        }));
      })
  }
}
export const addCallSuccess = add => {
  return {
    type: ADD_CALL_SUCCESS,
    payload: add
  }
}

export const addCallFailure = error => {
  return {
    type: ADD_CALL_FAILURE,
    payload: error
  }
}