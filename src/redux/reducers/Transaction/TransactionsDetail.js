import {
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_LIST_RESET,
} from '../../../constants/constants'

const transactionsDetail = (state = [], action) => {
  switch (action.type) {
    case TRANSACTION_LIST_SUCCESS:
      return [...action.payload]

    case TRANSACTION_LIST_FAILURE:
      return [];

    case TRANSACTION_LIST_RESET:
      return [];

    default: return state;
  }
}

export default transactionsDetail;