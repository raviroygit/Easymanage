
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  FILE_LIST_SUCCESS,
  FILE_LIST_FAILURE,
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const loadFiles = () => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/filestore/getAllFiles`)
      .then(response => {
        dispatch(loader(false));
        dispatch(filesSuccess(response.data))
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(filesFailure(error.message));
        } else {
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.UNKNOWN_ERROR`),
            options: {
              variant: 'error'
            }
          }));
        }
      })
  }
}


export const filesSuccess = files => {
  return {
    type: FILE_LIST_SUCCESS,
    payload: files
  }
}

export const filesFailure = error => {
  return {
    type: FILE_LIST_FAILURE,
    payload: error
  }
}