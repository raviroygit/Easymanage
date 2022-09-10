import {
  PASSWORD_GENERATOR_SUCCESS,
  PASSWORD_GENERATOR_FAILURE,
  RESET_GENERATOR
} from '../../../constants/constants'
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import axiosInstance from '../axiosInstance/axiosInstance';
import { loader } from '../Loader/LoaderActions';

export const passwordGenerate = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/password/generate`, data)
      .then(response => {
        dispatch(loader(false));
        dispatch(passwordGenerateSuccess(response.data));

      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          passwordGenerateFailure(error.response);
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


export const passwordGenerateSuccess = password => {
  return {
    type: PASSWORD_GENERATOR_SUCCESS,
    payload: password
  }
}

export const passwordGenerateFailure = error => {
  return {
    type: PASSWORD_GENERATOR_FAILURE,
    payload: error
  }
}

export const resetGenerator = () => {
  return {
    type: RESET_GENERATOR,
    payload: []
  }
}