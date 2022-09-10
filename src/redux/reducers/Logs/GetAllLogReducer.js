import {
  GET_ALL_LOGS_SUCCESS,
  GET_ALL_LOGS_FAILURE,
  GET_LOGS_FILE_BY_ID_RESET
} from '../../../constants/constants'

const getAllLogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_LOGS_SUCCESS:
      return [...action.payload]

    case GET_ALL_LOGS_FAILURE:
      return [];
    case GET_LOGS_FILE_BY_ID_RESET:
      return [];
    default: return state;
  }
}

export default getAllLogReducer;