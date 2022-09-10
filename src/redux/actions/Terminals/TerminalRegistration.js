import axiosInstance from '../axiosInstance/axiosInstance';
import {
  TERMINAL_REGISTRATION_SUCCESS,
  TERMINAL_REGISTRATION_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadTerminals } from '../Terminals/TerminalsListAction';
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { loader } from '../Loader/LoaderActions';



export const terminalRegistration = (terminalData) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/terminal/register`, terminalData)
      .then(response => {
        dispatch(loader(false));
        dispatch(terminalRegistrationSuccess());
        dispatch(loadTerminals(GetUserAssociatedGroups()));
        dispatch(enqueueSnackbar({
          message: I18n.t('TERMINAL.TERMINAL_REGISTRATION_SUCCESSFUL'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(terminalRegistrationFailure(error.message));
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


export const terminalRegistrationSuccess = add => {
  return {
    type: TERMINAL_REGISTRATION_SUCCESS,
    payload: add
  }
}

export const terminalRegistrationFailure = error => {
  return {
    type: TERMINAL_REGISTRATION_FAILURE,
    payload: error
  }
}