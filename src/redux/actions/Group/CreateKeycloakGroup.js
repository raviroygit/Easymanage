/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  CREATE_KEYCLOAK_GROUPS_SUCCESS,
  CREATE_KEYCLOAK_GROUPS_FAILURE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const createKeycloakGroups = (token, groupData) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
  
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/groups`, groupData, config)
      .then(response => {
        dispatch(createKeycloakGroupsSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errorMessage) {
            dispatch(createKeycloakGroupsFailure(error.response));
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


export const createKeycloakGroupsSuccess = group => {
  return {
    type: CREATE_KEYCLOAK_GROUPS_SUCCESS,
    payload: group
  }
}

export const createKeycloakGroupsFailure = error => {
  return {
    type: CREATE_KEYCLOAK_GROUPS_FAILURE,
    payload: error
  }
}