import {
  SELECT_ALL, SELECT_ALL_RESET
} from '../../../constants/constants';

export function SelectedAllListAction(selectedAll) {
  return {
    type: SELECT_ALL,
    payload: selectedAll
  };
}

export function SelectedAllResetListAction(selectedAll) {
  return {
    type: SELECT_ALL_RESET,
    payload: selectedAll
  };
}
