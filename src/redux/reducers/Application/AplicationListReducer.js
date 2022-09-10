import {
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAILURE,
  APPLICATION_LIST_RESET,
} from '../../../constants/constants'

const applicationReducer = (state = [], action) => {
  switch (action.type) {
    case APPLICATION_LIST_SUCCESS:
      return [...action.payload]

    case APPLICATION_LIST_FAILURE:
      return [];

    case APPLICATION_LIST_RESET:
      return [];
    default: return state;
  }
}

export default applicationReducer;