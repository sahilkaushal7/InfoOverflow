import axios, { AxiosResponse } from 'axios';

const getUsers: Promise<AxiosResponse> = axios.get('http://localhost:8000/apis/users/');

export {
  getUsers,
}
