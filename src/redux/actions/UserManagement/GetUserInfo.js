import axios from 'axios';
import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  RESET_USER
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const getUserInfo = (token, id) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}`, config)
      .then(response => {
        dispatch(getUserInfoSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getUserInfoFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.statusText}`),
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


export const getUserInfoSuccess = info => {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: info
  }
};

export const getUserInfoFailure = error => {
  return {
    type: GET_USER_INFO_FAILURE,
    payload: error
  }
};

export const resetUserInfo = () => {
  return {
    type: RESET_USER,
    payload: ''
  }
};