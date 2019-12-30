import axios, { AxiosResponse } from 'axios';

const getUserProfile: (userId: number) => Promise<AxiosResponse> = (userId) => {
  return axios.get(`http://192.168.99.100:8000/apis/userprofile/?search=${userId}`, {
    headers: {
      'Authorization': `Token ${getAuthToken()}`
    }
  });
};

const getAuthToken = () => localStorage.getItem('token');
const updateUserProfile: (form_data: FormData, userId: number) => Promise<AxiosResponse> =
  (form_data, userId) => {
    return axios.put(`http://192.168.99.100:8000/apis/userprofile/${userId}/`, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Token ${getAuthToken()}`
      }
    });
  }

export {
  getUserProfile,
  updateUserProfile
}