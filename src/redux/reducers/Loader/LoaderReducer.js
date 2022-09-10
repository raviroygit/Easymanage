import { SHOW_LOADING_SUCCESS } from '../../../constants/constants';

export const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_LOADING_SUCCESS:
      return action.payload;
    default: return state
  }
};

export default loaderReducer;