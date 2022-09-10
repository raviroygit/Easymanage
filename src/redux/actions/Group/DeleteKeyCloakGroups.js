import axios from 'axios';
import {
  DELETE_KEYCLOAK_GROUPS_SUCCESS,
  DELETE_KEYCLOAK_GROUPS_FAILURE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const deleteKeycloakGroup = (token, groupId) => {

  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .delete(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/groups/${groupId}`, config)
      .then(response => {
        dispatch(deleteKeycloakGroupSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(deleteKeycloakGroupFailure(error.message));
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


export const deleteKeycloakGroupSuccess = id => {
  return {
    type: DELETE_KEYCLOAK_GROUPS_SUCCESS,
    payload: id
  }
};

export const deleteKeycloakGroupFailure = error => {
  return {
    type: DELETE_KEYCLOAK_GROUPS_FAILURE,
    payload: error
  }
};
