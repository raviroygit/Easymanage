import axios from 'axios';
import {
  ADMIN_ACCESS_SUCCESS,
  ADMIN_ACCESS_FAILURE,
  RESET_ADMIN_ACCESS,
  GRANT_TYPE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';

export const adminAccess = () => {
  const userCredential = new URLSearchParams();
  userCredential.append('username', `${process.env.REACT_APP_ADMIN_NAME}`);
  userCredential.append('client_id', `${process.env.REACT_APP_CLIENT_ID}`);
  userCredential.append('grant_type', GRANT_TYPE);
  userCredential.append('password', `${process.env.REACT_APP_PASSWORD}`);
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/realms/${process.env.REACT_APP_REALMS}/protocol/openid-connect/token`, userCredential)
      .then(response => {
        dispatch(loader(false));
        dispatch(adminAccessSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(adminAccessFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.data.errorCode}`),
            options: {
              variant: 'error'
            }
          }));
        }
      })
  }
}


export const adminAccessSuccess = access => {
  return {
    type: ADMIN_ACCESS_SUCCESS,
    payload: access
  }
}

export const adminAccessFailure = error => {
  return {
    type: ADMIN_ACCESS_FAILURE,
    payload: error
  }
}

export const adminAccessReset = () => {
  return {
    type: RESET_ADMIN_ACCESS,
    payload: ''
  }
}
