import {
    GET_APPLICATION_BY_TERMINAL_ID_SUCCESS,
    GET_APPLICATION_BY_TERMINAL_ID_FAILURE,
    RESET_APPLICATION_BY_TERMINAL_ID,
} from '../../../constants/constants'


const getApplicationByTerminalIdReducer = (state = [], action) => {
    switch (action.type) {
        case GET_APPLICATION_BY_TERMINAL_ID_SUCCESS:
            return [...action.payload]
        case GET_APPLICATION_BY_TERMINAL_ID_FAILURE:
            return [];
        case RESET_APPLICATION_BY_TERMINAL_ID:
            return [];
        default: return state;
    }
}

export default getApplicationByTerminalIdReducer;