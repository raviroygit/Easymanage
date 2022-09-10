import {
  CALL_SCHEDULE_SUCCESS,
  CALL_SCHEDULE_FAILURE,
  CALL_SCHEDULE_RESET,
} from '../../../constants/constants'

const callScheduleReducer = (state = [], action) => {
  switch (action.type) {
    case CALL_SCHEDULE_SUCCESS:
      return [...action.payload]
    case CALL_SCHEDULE_FAILURE:
      return [];
    case CALL_SCHEDULE_RESET:
      return [];
    default: return state;
  }
}

export default callScheduleReducer;