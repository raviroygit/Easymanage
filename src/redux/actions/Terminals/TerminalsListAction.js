import {
  LIST_TERMINAL_SUCCESS,
  LIST_TERMINAL_FAILURE,
  LIST_TERMINAL_RESET,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import axiosInstance from '../axiosInstance/axiosInstance';
import { loader } from '../Loader/LoaderActions';

export const loadTerminals = (userData) => {
  let data;
  if(userData.groupName){
    data={params:{groupName:userData.groupName}}
  }else{
    data={}
  };
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/terminal/terminal-list`, data)
      .then(response => {
        dispatch(loader(false));
        const terminals = response.data;
        dispatch(terminalSuccess(terminals));

      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(terminalFailure(error.message));
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


export const terminalSuccess = terminals => {
  return {
    type: LIST_TERMINAL_SUCCESS,
    payload: terminals
  }
}

export const terminalFailure = error => {
  return {
    type: LIST_TERMINAL_FAILURE,
    payload: error
  }
}

export const terminalReset = () => {
  return {
    type: LIST_TERMINAL_RESET,
    payload: ''
  }
}