import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPDATE_TERMINAL_SUCCESS,
  UPDATE_TERMINAL_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadTerminals } from './TerminalsListAction';
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { loader } from '../Loader/LoaderActions';

export const updateTerminal = (terminal) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .put(`${process.env.REACT_APP_API_URL}/terminal/updateTerminal`, terminal)
      .then(response => {
        dispatch(loader(false));
        dispatch(updateTerminalSuccess(response));
        dispatch(loadTerminals(GetUserAssociatedGroups()));

        dispatch(enqueueSnackbar({
          message: I18n.t('TERMINAL.EDIT_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(updateTerminalFailure(error.message));
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


export const updateTerminalSuccess = update => {
  return {
    type: UPDATE_TERMINAL_SUCCESS,
    payload: update
  }
}

export const updateTerminalFailure = error => {
  return {
    type: UPDATE_TERMINAL_FAILURE,
    payload: error
  }
}