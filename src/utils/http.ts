import axios from 'axios';
import localStorageUtil from './localStorageUtil';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication configuration
http.interceptors.request.use(
  (config) => {
    const token = localStorageUtil.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
