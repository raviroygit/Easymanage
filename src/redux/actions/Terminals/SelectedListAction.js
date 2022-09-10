import {
  SELECTED_SUCCESS,
  SELECTED_RESET
} from '../../../constants/constants';

export function SelectedListAction(id) {
  return {
    type: SELECTED_SUCCESS,
    payload: id
  };
}

export function SelectedListResetAction(id) {
  return {
    type: SELECTED_RESET,
    payload: id
  };
}
