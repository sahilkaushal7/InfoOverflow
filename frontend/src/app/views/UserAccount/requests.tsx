import axios, { AxiosResponse } from 'axios';

const getUserProfile: (userId: number) => Promise<AxiosResponse> = (userId) => {
  return axios.get(`http://192.168.99.100:8000/apis/userprofile/?search=${userId}`);
};

export {
  getUserProfile,
}