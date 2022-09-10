import moment from "moment";
import decode from "jwt-decode";
import axios from 'axios';
import {
  GRANT_TYPE
} from '../../constants/constants';
import store from '../../redux/store/store';
import { adminAccess } from '../../redux/actions/UserManagement/AdminAccess';

export const isAdminSessionExpire = (RegeneratedAdminToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const state = store.getState();
      const token= state.adminAccess;
      const decodeToken = decode(token.access_token);
      const adminSessionExpireTime = new Date(decodeToken.exp * 1000);
      let currentTime = new Date();

      if (moment(currentTime).format("DD/MM/YY hh:mm:ss") >= moment(adminSessionExpireTime).format("DD/MM/YY hh:mm:ss")) {
        const userCredential = new URLSearchParams();
        userCredential.append('username', `${process.env.REACT_APP_ADMIN_NAME}`);
        userCredential.append('client_id', `${process.env.REACT_APP_CLIENT_ID}`);
        userCredential.append('grant_type', GRANT_TYPE);
        userCredential.append('password', `${process.env.REACT_APP_PASSWORD}`);
        const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/realms/${process.env.REACT_APP_REALMS}/protocol/openid-connect/token`, userCredential);
        await store.dispatch(adminAccess());
        return resolve(response.data.access_token);
      };
      return resolve(RegeneratedAdminToken);
    } catch (err) {
      return reject(err);
    }
  })

}