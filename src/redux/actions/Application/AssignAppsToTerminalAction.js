import axiosInstance from '../axiosInstance/axiosInstance';
import {
    ASSIGN_APPS_TO_TERMINAL_SUCCESS,
    ASSIGN_APPS_TO_TERMINAL_FAILURE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';

export const assignAppsToTerminalAction = (data) => {
    return (dispatch) => {
        dispatch(loader(true));
        axiosInstance()
            .put(`${process.env.REACT_APP_API_URL}/application/assignAppsToTerminal`, data)
            .then(response => {
                dispatch(loader(false));
                dispatch(assignAppsToTerminalActionSuccess(response));
                dispatch(enqueueSnackbar({
                    message: I18n.t('FILE_UPLOAD.UPDATE_SUCCESS'),
                    options: {
                        variant: 'success'
                    }
                }));
            })
            .catch(error => {
                dispatch(loader(false));
                if (error.response) {
                    dispatch(assignAppsToTerminalActionFailure(error.message));
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
    }
}


export const assignAppsToTerminalActionSuccess = update => {
    return {
        type: ASSIGN_APPS_TO_TERMINAL_SUCCESS,
        payload: update
    }
}

export const assignAppsToTerminalActionFailure = error => {
    return {
        type: ASSIGN_APPS_TO_TERMINAL_FAILURE,
        payload: error
    }
}