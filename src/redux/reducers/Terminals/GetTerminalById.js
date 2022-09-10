import {
  GET_TERMINAL_SUCCESS,
  GET_TERMINAL_FAILURE,
  RESET_TERMINAL
} from '../../../constants/constants'


const getTerminalsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TERMINAL_SUCCESS:
      return Object.assign({}, action.payload)
    case GET_TERMINAL_FAILURE:
      return {};
    case RESET_TERMINAL:
      return {};
    default: return state;
  }
}

export default getTerminalsReducer;