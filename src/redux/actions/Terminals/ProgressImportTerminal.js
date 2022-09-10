import {
  IMPORT_TERMINAL_PROGRESS_SUCCESS
} from '../../../constants/constants';


export const progressImportTerminal = (data) => {
  return {
    type: IMPORT_TERMINAL_PROGRESS_SUCCESS,
    payload: data
  };
}