/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  GET_KEYCLOAK_GROUPS_SUCCESS,
  GET_KEYCLOAK_GROUPS_FAILURE,
  RESET_KEYCLOAK_GROUPS
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const getKeycloakGroups = (token) => {

return async (dispatch) => {
  const RegeneratedAdminToken = await isAdminSessionExpire(token);
  const config = {
    headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
};
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/groups`, config)
      .then(response => {
        dispatch(getKeycloakGroupsSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errorMessage) {
            dispatch(getKeycloakGroupsFailure(error.response));
            dispatch(enqueueSnackbar({
              message: I18n.t(`ERRORCODES.${[error.response.data.errorMessage]}`),
              options: {
                variant: 'error'
              }
            }));
          } else if (error.response.data.error) {
            dispatch(enqueueSnackbar({
              message: I18n.t(`ERRORCODES.${[error.response.statusText]}`),
              options: {
                variant: 'error'
              }
            }));
          }
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


export const getKeycloakGroupsSuccess = groups => {
  return {
    type: GET_KEYCLOAK_GROUPS_SUCCESS,
    payload: groups
  }
}

export const getKeycloakGroupsFailure = error => {
  return {
    type: GET_KEYCLOAK_GROUPS_FAILURE,
    payload: error
  }
}

export const resetKeycloakGroups = () => {
  return {
    type: RESET_KEYCLOAK_GROUPS,
    payload: ''
  }

}