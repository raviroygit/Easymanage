import {
  ADD_CALL_SUCCESS,
  ADD_CALL_FAILURE,
} from '../../../constants/constants'



const addCallReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CALL_SUCCESS:
      return true;
    case ADD_CALL_FAILURE:
      return false;
    default: return state;
  }
}

export default addCallReducer;