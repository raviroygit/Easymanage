import {
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
  RESET_REPORT

} from '../../../constants/constants'



const reportReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REPORT_SUCCESS:
      return [...action.payload]

    case GET_REPORT_FAILURE:
      return [];

    case RESET_REPORT:
      return [];

    default: return state;
  }
}

export default reportReducer;