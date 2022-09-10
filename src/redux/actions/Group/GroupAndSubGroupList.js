
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAILURE,
  RESET_GROUP_LIST,
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const loadGroups = () => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/merchant/list`)
      .then(response => {
        dispatch(loader(false));
        dispatch(groupListSuccess(response.data))
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(groupListFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.data.errorCode}`),
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
      });
  };
};


export const groupListSuccess = groups => {
  return {
    type: GROUP_LIST_SUCCESS,
    payload: groups
  };
};

export const groupListFailure = error => {
  return {
    type: GROUP_LIST_FAILURE,
    payload: error
  };
};

export const groupListReset = () => {
  return {
    type: RESET_GROUP_LIST,
    payload: ''
  };
};