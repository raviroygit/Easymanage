import {
  IMPORT_TERMINAL_PROGRESS_SUCCESS
} from '../../../constants/constants'

const progressImportTerminalReducer = (state = false, action) => {
  switch (action.type) {
    case IMPORT_TERMINAL_PROGRESS_SUCCESS:
      return action.payload
    default: return state;
  }
}

export default progressImportTerminalReducer;