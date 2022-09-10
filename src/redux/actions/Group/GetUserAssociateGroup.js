/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  GET_USER_GROUPS_SUCCESS,
  GET_USER_GROUPS_FAILURE,
  RESET_USER_GROUPS_SUCCESS
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const getUserAssociateGroups = (token, id) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}/groups`, config)
      .then(response => {
        dispatch(getUserAssociateGroupsSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errorMessage) {
            dispatch(getUserAssociateGroupsFailure(error.response));
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


export const getUserAssociateGroupsSuccess = userGroup => {
  return {
    type: GET_USER_GROUPS_SUCCESS,
    payload: userGroup
  }
}

export const getUserAssociateGroupsFailure = error => {
  return {
    type: GET_USER_GROUPS_FAILURE,
    payload: error
  }
}

export const resetUserAssociateGroups = () => {
  return {
    type: RESET_USER_GROUPS_SUCCESS,
    payload: ""
  }
}