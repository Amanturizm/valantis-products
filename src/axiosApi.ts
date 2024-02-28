import axios, { AxiosHeaders } from 'axios';
import { API_URL } from './constants';
import md5 from 'md5';

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((config) => {
  const password = process.env.REACT_APP_PRODUCTS_API_PASSWORD;
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);

  const headers = config.headers as AxiosHeaders;
  headers.set('X-Auth', authString);

  return config;
});

export default axiosApi;
