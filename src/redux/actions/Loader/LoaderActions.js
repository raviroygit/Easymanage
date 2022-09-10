import { SHOW_LOADING_SUCCESS } from '../../../constants/constants';

export const loader = (status) => {
  return {
    type: SHOW_LOADING_SUCCESS,
    payload: status
  }
};