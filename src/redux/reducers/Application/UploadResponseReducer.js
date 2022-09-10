import {
    UPLOAD_APPLICATION_SUCCESS,
    UPLOAD_APPLICATION_FAILURE,
} from '../../../constants/constants'


const uploadAppsResponseReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_APPLICATION_SUCCESS:
            return Object.assign({}, action.payload);
        case UPLOAD_APPLICATION_FAILURE:
            return {};
        default: return state;
    }
}

export default uploadAppsResponseReducer;