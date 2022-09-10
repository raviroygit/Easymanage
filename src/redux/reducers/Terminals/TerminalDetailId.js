import {
  TERMINAL_DETAIL_ID
} from '../../../constants/constants'

const terminalDetailIdReducer = (state = '', action) => {
  switch (action.type) {
    case TERMINAL_DETAIL_ID:
      return action.payload
    default: return state;
  }
}

export default terminalDetailIdReducer;