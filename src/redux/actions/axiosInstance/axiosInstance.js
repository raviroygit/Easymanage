/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import store from '../../store/store';

const axiosInstance = (history = null) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const state = store.getState();
  const token = state.adminAccess;

  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${token.access_token}`;
    headers['content-type'] = 'application/json'
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      if (error.response.status === 403) {
        localStorage.removeItem("token");

        if (history) {
          history.push(`${process.env.AUTH_URL}`);
        } else {
          window.location = `${process.env.AUTH_URL}`;
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  return axiosInstance;
};

export default axiosInstance;