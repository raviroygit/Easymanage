import {
  GET_CALL_SUCCESS,
  GET_CALL_FAILURE,
  GET_CALL_RESET,
} from '../../../constants/constants';

const getCallByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CALL_SUCCESS:
      return Object.assign({}, action.payload)
    case GET_CALL_FAILURE:
      return {};
    case GET_CALL_RESET:
      return {};
    default: return state;
  };
};

export default getCallByIdReducer;