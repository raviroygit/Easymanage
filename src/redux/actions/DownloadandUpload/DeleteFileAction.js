
import axiosInstance from '../axiosInstance/axiosInstance';
import {
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAILURE,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';
import { loadFiles } from './FileListAction';

export const deleteFile = (id) => {
    return (dispatch) => {
        dispatch(loader(true));
        axiosInstance()
            .delete(`${process.env.REACT_APP_API_URL}/filestore/deleteById`, {params:{ id: id }})
            .then(response => {
                dispatch(loader(false));
                dispatch(deleteFileSuccess());
                dispatch(loadFiles());
                dispatch(enqueueSnackbar({
                    message: I18n.t('DOWNLOAD_AND_UPLOAD.DELETE_SUCCESS'),
                    options: {
                        variant: 'success'
                    }
                }));
            })
            .catch(error => {
                dispatch(loader(false));
                if (error.response) {
                    dispatch(deleteFileFailure(error.message));
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
            })
    };
};


export const deleteFileSuccess = () => {
    return {
        type: DELETE_FILE_SUCCESS,
    };
};

export const deleteFileFailure = error => {
    return {
        type: DELETE_FILE_FAILURE,
        payload: error
    };
};

