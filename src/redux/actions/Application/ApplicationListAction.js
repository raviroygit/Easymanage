
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAILURE,
  APPLICATION_LIST_RESET,
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const loadApplication = () => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/application/getAllApplication`)
      .then(response => {
        dispatch(loader(false));
        dispatch(applicationsSuccess(response.data))
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(applicationsFailure(error.message));
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


export const applicationsSuccess = application => {
  return {
    type: APPLICATION_LIST_SUCCESS,
    payload: application
  }
}

export const applicationsFailure = error => {
  return {
    type: APPLICATION_LIST_FAILURE,
    payload: error
  }
}

export const applicationsReset = () => {
  return {
    type: APPLICATION_LIST_RESET,
    payload: ""
  }
}