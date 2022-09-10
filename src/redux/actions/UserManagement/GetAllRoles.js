import axios from 'axios';
import {
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const getRoles = (token) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/clients/${process.env.REACT_APP_CLIENT_FRONT_END_ID}/roles`, config)
      .then(response => {
        dispatch(getRolesSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getRolesFailure(error.message));
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


export const getRolesSuccess = roles => {
  return {
    type: GET_ROLES_SUCCESS,
    payload: roles
  }
}

export const getRolesFailure = error => {
  return {
    type: GET_ROLES_FAILURE,
    payload: error
  }
}