import axios, { AxiosResponse } from 'axios';

const getUsers: Promise<AxiosResponse> = axios.get('http://192.168.99.100:8000/users/list/');

export {
  getUsers,
}