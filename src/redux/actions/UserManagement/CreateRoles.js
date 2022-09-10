/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { getRoles } from './GetAllRoles';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const createRole = (token, rolesData) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/clients/${process.env.REACT_APP_CLIENT_FRONT_END_ID}/roles`, rolesData, config)
      .then(response => {
        dispatch(createRoleSuccess(response.data));
        dispatch(getRoles(RegeneratedAdminToken));
        dispatch(enqueueSnackbar({
          message: I18n.t(("USER_MANAGEMENT.ROLE_CREATED")),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(createRoleFailure(error.response));
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


export const createRoleSuccess = role => {
  return {
    type: CREATE_ROLE_SUCCESS,
    payload: role
  }
}

export const createRoleFailure = error => {
  return {
    type: CREATE_ROLE_FAILURE,
    payload: error
  }
}