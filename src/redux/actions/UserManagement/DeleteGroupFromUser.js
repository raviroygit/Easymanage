import axios from 'axios';
import {
  DELETE_GROUP_FROM_USER_SUCCESS,
  DELETE_GROUP_FROM_USER_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const deleteAssignGroupFromUser = (token, userId, groupId) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .delete(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${userId}/groups/${groupId}`, config)
      .then(response => {
        dispatch(deleteAssignGroupFromUserSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(deleteAssignGroupFromUserFailure(error.message));
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


export const deleteAssignGroupFromUserSuccess = role => {
  return {
    type: DELETE_GROUP_FROM_USER_SUCCESS,
    payload: role
  }
};

export const deleteAssignGroupFromUserFailure = error => {
  return {
    type: DELETE_GROUP_FROM_USER_FAILURE,
    payload: error
  }
};
