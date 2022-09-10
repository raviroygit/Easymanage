import axios from 'axios';
import {
  GET_USER_ASSOCIATE_ROLE_SUCCESS,
  GET_USER_ASSOCIATE_ROLE_FAILURE,
  RESET_USER_ASSOCIATE_ROLE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const getUserAssociateRole = (token, id) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}/role-mappings/clients/${process.env.REACT_APP_CLIENT_FRONT_END_ID}`, config)
      .then(response => {
        dispatch(getUserAssociateRoleSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getUserAssociateRoleFailure(error.message));
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


export const getUserAssociateRoleSuccess = role => {
  return {
    type: GET_USER_ASSOCIATE_ROLE_SUCCESS,
    payload: role
  }
};

export const getUserAssociateRoleFailure = error => {
  return {
    type: GET_USER_ASSOCIATE_ROLE_FAILURE,
    payload: error
  }
};

export const resetUserAssociateRole = () => {
  return {
    type: RESET_USER_ASSOCIATE_ROLE,
    payload: ''
  }
};