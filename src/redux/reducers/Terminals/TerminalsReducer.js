import {
  LIST_TERMINAL_SUCCESS,
  LIST_TERMINAL_FAILURE,
  LIST_TERMINAL_RESET,
} from '../../../constants/constants'

const terminalsReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_TERMINAL_SUCCESS:
      return [...action.payload]

    case LIST_TERMINAL_FAILURE:
      return [];

    case LIST_TERMINAL_RESET:
      return [];

    default: return state;
  }
}

export default terminalsReducer;