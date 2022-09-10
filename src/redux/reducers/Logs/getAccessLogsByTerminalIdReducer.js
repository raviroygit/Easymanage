import {
  GET_ACCESS_LOG_BY_TERMINAL_ID_SUCCESS,
  GET_ACCESS_LOG_BY_TERMINAL_ID_FAILURE
} from '../../../constants/constants'

const getLogByTerminalIdReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ACCESS_LOG_BY_TERMINAL_ID_SUCCESS:
      return [...action.payload]

    case GET_ACCESS_LOG_BY_TERMINAL_ID_FAILURE:
      return [];

    default: return state;
  }
}

export default getLogByTerminalIdReducer;