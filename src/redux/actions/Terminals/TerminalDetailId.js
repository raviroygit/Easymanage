import {
  TERMINAL_DETAIL_ID
} from '../../../constants/constants'

export const terminalDetailId = terminalId => {
  return {
    type: TERMINAL_DETAIL_ID,
    payload: terminalId
  }
}