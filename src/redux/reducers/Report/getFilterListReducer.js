import {
  FILTER_LIST_SUCCESS,
  FILTER_LIST_FAILURE,
  RESET_FILTER_LIST
} from '../../../constants/constants'


const getFilterListReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_LIST_SUCCESS:
      return Object.assign({}, action.payload)
    case FILTER_LIST_FAILURE:
      return {};
    case RESET_FILTER_LIST:
      return {};
    default: return state;
  }
}

export default getFilterListReducer;