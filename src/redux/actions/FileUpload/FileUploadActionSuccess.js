import { FILE_UPLOAD_SUCCESS } from '../../../constants/constants';

export default function FileUploadActionSuccess(isUploaded) {
  return {
    type: FILE_UPLOAD_SUCCESS,
    payload: isUploaded
  };
}
