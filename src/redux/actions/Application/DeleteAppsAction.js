
import axiosInstance from '../axiosInstance/axiosInstance';
import {
    DELETE_APPS_SUCCESS,
    DELETE_APPS_FAILURE,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';
import { loadApplication } from './ApplicationListAction';

export const deleteApplication = (id) => {
    return (dispatch) => {
        dispatch(loader(true));
        axiosInstance()
            .delete(`${process.env.REACT_APP_API_URL}/application/deleteById`, {params:{ id: id }})
            .then(response => {
                dispatch(loader(false));
                dispatch(deleteApplicationSuccess());
                dispatch(loadApplication());
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
                    dispatch(deleteApplicationFailure(error.message));
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


export const deleteApplicationSuccess = () => {
    return {
        type: DELETE_APPS_SUCCESS,
    };
};

export const deleteApplicationFailure = error => {
    return {
        type: DELETE_APPS_FAILURE,
        payload: error
    };
};

