import axios from 'axios';
import { GenericObj } from './types';

// http methods
enum HTTPMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DEL = 'delete',
  PATCH = 'patch',
}

// default settings 
const getAuthToken = () => localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:8000';

// configured request

const configRequest = (method: HTTPMethods) => (url: string, data ?: any, needsAuth ?: boolean) => {
  const headers = {} as GenericObj<String>;
  let withCredentials = false;

  if (needsAuth) {
    withCredentials = true;
    headers.Authorization = `Token ${getAuthToken()}`;
  }

  const config = {
    method,
    data: data || {},
    withCredentials,
    headers,
    url,
  }

  return axios.request(config)
}

// our methods
export const get = configRequest(HTTPMethods.GET);
export const post = configRequest(HTTPMethods.POST);
export const put = configRequest(HTTPMethods.PUT);
export const del = configRequest(HTTPMethods.DEL);
export const patch = configRequest(HTTPMethods.PATCH);
