/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  USER_ROLE_MAPPING_SUCCESS,
  USER_ROLE_MAPPING_FAILURE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { userList } from './UserList';
import { loader } from '../Loader/LoaderActions';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const roleMappingToUser = (token, id, roleData) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    dispatch(loader(true));
    axios
      .post(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}/role-mappings/clients/${process.env.REACT_APP_CLIENT_FRONT_END_ID}`, roleData, config)
      .then(response => {
        dispatch(loader(false));
        dispatch(roleMappingToUserSuccess(response.data));
        dispatch(userList(RegeneratedAdminToken));
        dispatch(enqueueSnackbar({
          message: I18n.t(("USER_MANAGEMENT.ROLE_MAPPED_TO_USER")),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          if (error.response.data.errorMessage) {
            dispatch(roleMappingToUserFailure(error.response));
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


export const roleMappingToUserSuccess = role => {
  return {
    type: USER_ROLE_MAPPING_SUCCESS,
    payload: role
  };
};

export const roleMappingToUserFailure = error => {
  return {
    type: USER_ROLE_MAPPING_FAILURE,
    payload: error
  };
};