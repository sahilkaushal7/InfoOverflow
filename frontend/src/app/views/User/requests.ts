import { AxiosResponse } from 'axios';
import { get, put } from '../../../lib/utils/requests';
import { Endpoints } from '../../apis';

const getProfile: (userId: number) => Promise<AxiosResponse> = (userId) => {
  return get(`${Endpoints.USERSPROFILE}/${userId}`, {}, true);
};

const updateProfile: (form_data: FormData, userId: number) => Promise<AxiosResponse> =
  (form_data, userId) => {
    return put(`${Endpoints.USERSPROFILE}/${userId}/`, form_data, true);
  }

export {
  getProfile,
  updateProfile
}
