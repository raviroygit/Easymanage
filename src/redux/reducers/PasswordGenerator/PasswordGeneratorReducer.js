import {
  PASSWORD_GENERATOR_SUCCESS,
  PASSWORD_GENERATOR_FAILURE,
  RESET_GENERATOR

} from '../../../constants/constants'



const passwordGenerateReducer = (state = [], action) => {
  switch (action.type) {
    case PASSWORD_GENERATOR_SUCCESS:
      return [...action.payload]

    case PASSWORD_GENERATOR_FAILURE:
      return [];

    case RESET_GENERATOR:
      return [];

    default: return state;
  }
}

export default passwordGenerateReducer;

