import {
  UPDATE_TERMINAL_SUCCESS,
  UPDATE_TERMINAL_FAILURE,
} from '../../../constants/constants'

const updateTerminalsReducer = (state = false, action) => {
  switch (action.type) {
    case UPDATE_TERMINAL_SUCCESS:
      return true;
    case UPDATE_TERMINAL_FAILURE:
      return false;
    default: return state;
  }
}

export default updateTerminalsReducer;