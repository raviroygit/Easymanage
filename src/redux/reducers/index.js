import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";
import { LanguageReducer } from "./i18n/LanguageReducer";
import FileUploadReducer from "./FileUpload/FileUploadReducer";
import NotifierReducer from "./Notifier/NotifierReducer";
import importTerminal from "./ImportTerminal/ImportTerminal";
import terminalsReducer from "./Terminals/TerminalsReducer";
import updateReducer from "./Terminals/UpdateReducer";
import registerReducer from "./Terminals/TerminalRegisterReducer";
import updateTerminal from "./Terminals/UpdateReducer";
import merchantsReducer from "./Group/MerchantListReducer";
import getTerminalsReducer from "./Terminals/GetTerminalById";
import updateTerminalsReducer from "./Terminals/UpdateTerminalsReducer";
import updateMerchantsStatus from "./Group/UpdateMerchantStatus";
import getMerchantReducer from "./Group/GetMerchantById";
import updateMerchant from "./Group/UpdateReducer";
import addGroup from "./Group/AddGroupReducer";
import deleteReducer from "./Group/DeleteMerchantReducer";
import filesReducer from "./DownloadandUpload/FilesListReducer";
import uploadReducer from "../reducers/DownloadandUpload/UploadReducer";
import getFileByIdReducer from "./DownloadandUpload/GetFileByIdReducer";
import updateFileReducer from "./DownloadandUpload/UpdateFileReducer";
import applicationReducer from "../reducers/Application/AplicationListReducer";
import getApplicationReducer from "../reducers/Application/GetApplicationReducer";
import updateApplicationReducer from "../reducers/Application/UpdateApplicationReducer";
import uploadApplicationReducer from "../reducers/Application/UploadApplicationReducer";
import passwordGenerateReducer from "../reducers/PasswordGenerator/PasswordGeneratorReducer";
import getUserDetails from "../reducers/Users/UserDetailsReducer";
import terminalDetailIdReducer from "../reducers/Terminals/TerminalDetailId";
import reportReducer from "./Report/reportReducer";
import SelectedAllReducer from "../reducers/Terminals/SelectedAllReducer";
import SelectedListReducer from "../reducers/Terminals/SelectedListReducer";
import filterList from "../reducers/Report/getFilterListReducer";
import getLogByTerminalIdReducer from './Logs/getAccessLogsByTerminalIdReducer';
import dashboardDetailsReducer from './Dashboard/DashboardDetailsReducer';
import groupListReducer from '../reducers/Group/GroupAndSubGroupListReducer';
import callScheduleReducer from "./CallSetting/CallScheduleReducer";
import getPermissionByRoleReducer from './Permission/getPermissionByRoleReducer';
import userLogReducer from "./UserManagement/userLogReducer";
import userNameReducer from "./UserManagement/UserNameReducer";
import adminAccessReducer from "./UserManagement/AdminAccessReducer";
import userListReducer from "./UserManagement/UserListReducer";
import getAllRolesReducer from "./UserManagement/GetAllRolesReducer";
import getUserInfoReducer from './UserManagement/GetUserInfoReducer';
import getUserAssociateRoleReducer from './UserManagement/GetUserAssociateRoleReducer';
import getFeaturesPermissionByRoleReducer from './Permission/GetFeaturesPermissionByRoleReducer';
import getCallByIdReducer from './CallSetting/GetCallByIDReducer';
import getAllLogReducer from './Logs/GetAllLogReducer';
import transactionsDetail from "./Transaction/TransactionsDetail";
import terminalsSerialNumberListReducer from "./Terminals/GetTerminalsSerialNumber";
import getKeycloakGroupsReducer from './Group/GetKeycloakGroups';
import logInUserInfoReducer from './UserManagement/GetLogInUserInfoReducer';
import getLoginUserAssociateGroupsReducer from './Group/getLoginUserAssociateGroupsReducer';
import getUserAssociateGroupsReducer from './Group/GetUserAssociateGroup';
import loaderReducer from './Loader/LoaderReducer';
import progressImportTerminalReducer from './Terminals/progressImportTerminalReducer';
import getApplicationVersionReducer from './Application/GetApplicationByVersion';
import getApplicationByTerminalIdReducer from './Application/getApplicationByTerminalIdReducer';
import uploadAppsResponseReducer from './Application/UploadResponseReducer';

export default combineReducers({
  i18n: i18nReducer,
  language: LanguageReducer,
  FileUploadReducer: FileUploadReducer,
  Notifier: NotifierReducer,
  importTerminal: importTerminal,
  terminals: terminalsReducer,
  update: updateReducer,
  register: registerReducer,
  terminal: getTerminalsReducer,
  updateTerminal: updateTerminal,
  merchants: merchantsReducer,
  updateTerminalStatus: updateTerminalsReducer,
  updateMerchantsStatus: updateMerchantsStatus,
  merchant: getMerchantReducer,
  updateMerchant: updateMerchant,
  addGroup: addGroup,
  deleteReducer: deleteReducer,
  files: filesReducer,
  uploadFile: uploadReducer,
  fileById: getFileByIdReducer,
  updateFile: updateFileReducer,
  applications: applicationReducer,
  application: getApplicationReducer,
  updateApplication: updateApplicationReducer,
  uploadApplication: uploadApplicationReducer,
  passwordGenerate: passwordGenerateReducer,
  user: getUserDetails,
  terminalDetailID: terminalDetailIdReducer,
  report: reportReducer,
  selectedAll: SelectedAllReducer,
  selectedList: SelectedListReducer,
  filterList: filterList,
  logsByTerminalId: getLogByTerminalIdReducer,
  dashboardDetails: dashboardDetailsReducer,
  groupList: groupListReducer,
  callSchedule: callScheduleReducer,
  userLogData: userLogReducer,
  userName: userNameReducer,
  permission: getPermissionByRoleReducer,
  adminAccess: adminAccessReducer,
  users: userListReducer,
  roles: getAllRolesReducer,
  userDetails: getUserInfoReducer,
  userAssociateRole: getUserAssociateRoleReducer,
  featuresPermissionByRoles: getFeaturesPermissionByRoleReducer,
  callDetails: getCallByIdReducer,
  logs: getAllLogReducer,
  transactionsDetail: transactionsDetail,
  terminalSerialNumberList: terminalsSerialNumberListReducer,
  keycloakAllGroup: getKeycloakGroupsReducer,
  logInUserInfo: logInUserInfoReducer,
  loginUserAssociateGroups: getLoginUserAssociateGroupsReducer,
  userAssociateGroups: getUserAssociateGroupsReducer,
  loader: loaderReducer,
  progressImportTerminal: progressImportTerminalReducer,
  getApplicationByVersion: getApplicationVersionReducer,
  terminalApps: getApplicationByTerminalIdReducer,
  appResponse:uploadAppsResponseReducer
});

