import { FILE_UPLOAD_FAILURE, FILE_UPLOAD_SUCCESS }
  from '../../../constants/constants';

const FileUploadReducer = (state = false, action) => {
  switch (action.type) {
    case FILE_UPLOAD_FAILURE:
      return action.payload;
    case FILE_UPLOAD_SUCCESS:
      return action.payload;
    default: return state;
  }
}

export default FileUploadReducer