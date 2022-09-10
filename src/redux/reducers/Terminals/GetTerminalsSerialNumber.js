import {
  TERMINALS_SERIAL_NUMBER_SUCCESS,
  TERMINALS_SERIAL_NUMBER_FAILURE,
  TERMINALS_SERIAL_NUMBER_RESET,
} from '../../../constants/constants'

const terminalsSerialNumberListReducer = (state = [], action) => {
  switch (action.type) {
    case TERMINALS_SERIAL_NUMBER_SUCCESS:
      return [...action.payload]

    case TERMINALS_SERIAL_NUMBER_FAILURE:
      return [];

    case TERMINALS_SERIAL_NUMBER_RESET:
      return [];

    default: return state;
  }
}

export default terminalsSerialNumberListReducer;