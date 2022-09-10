import {
  SELECTED_SUCCESS,
  SELECTED_RESET
} from '../../../constants/constants';

const SelectedListReducer = (state = [], action) => {
  switch (action.type) {
    case SELECTED_SUCCESS:
      return action.payload;
    case SELECTED_RESET:
      return [];
    default:
      return [...state];
  }
};

export default SelectedListReducer;