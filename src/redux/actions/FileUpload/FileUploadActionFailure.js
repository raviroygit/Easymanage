import { FILE_UPLOAD_FAILURE } from '../../../constants/constants';

export default function FileUploadActionFailure(isUploaded) {
  return {
    type: FILE_UPLOAD_FAILURE,
    payload: isUploaded
  };
}
