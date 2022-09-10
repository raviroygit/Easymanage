import {
  IMPORT_TERMINAL_SUCCESS,
  IMPORT_TERMINAL_FAILURE,
} from '../../../constants/constants'



const importTerminal = (state = {}, action) => {
  switch (action.type) {
    case IMPORT_TERMINAL_SUCCESS:
      return action.payload;
    case IMPORT_TERMINAL_FAILURE:
      return action.payload;
    default: return state;
  }
}

export default importTerminal;

