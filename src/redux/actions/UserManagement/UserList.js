import axios from 'axios';
import {
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const userList = (token) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    dispatch(loader(true));
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users`, config)
      .then(response => {
        dispatch(loader(false));
        dispatch(usersSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(usersFailure(error.message));
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


export const usersSuccess = users => {
  return {
    type: USER_LIST_SUCCESS,
    payload: users
  }
}

export const usersFailure = error => {
  return {
    type: USER_LIST_FAILURE,
    payload: error
  }
}