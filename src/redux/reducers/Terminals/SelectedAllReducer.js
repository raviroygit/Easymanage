import {
  SELECT_ALL, SELECT_ALL_RESET
} from '../../../constants/constants';

const selectedAll = false;

const SelectedAllReducer = (state = selectedAll, action) => {
  switch (action.type) {
    case SELECT_ALL:
      return action.payload;
    case SELECT_ALL_RESET:
      return false;
    default:
      return state;
  }
};

export default SelectedAllReducer;