import axios from 'axios';
import {
  UPDATE_KEYCLOAK_GROUP_SUCCESS,
  UPDATE_KEYCLOAK_GROUP_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { getKeycloakGroups } from './GetKeycloakGroups';

export const updateKeycloakGroup = (token, groupId, groupData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return (dispatch) => {
    axios
      .put(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/groups/${groupId}`, groupData, config)
      .then(response => {
        dispatch(updateKeycloakGroupSuccess(response.data));
        dispatch(getKeycloakGroups(token));
      })
      .catch(error => {
        if (error.response) {
          dispatch(updateKeycloakGroupFailure(error.message));
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


export const updateKeycloakGroupSuccess = id => {
  return {
    type: UPDATE_KEYCLOAK_GROUP_SUCCESS,
    payload: id
  }
};

export const updateKeycloakGroupFailure = error => {
  return {
    type: UPDATE_KEYCLOAK_GROUP_FAILURE,
    payload: error
  }
};
