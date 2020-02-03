import { AxiosResponse } from 'axios';
import { get } from '../../../lib/utils/requests';
import { Endpoints } from '../../apis';

const getQuestionsList: () => Promise<AxiosResponse> = () => {
  return get(`${Endpoints.QUESTIONS}`, {}, true);
};

const getQuestionDetail: (id: number) => Promise<AxiosResponse> = (id) => {
  return get(`${Endpoints.ANSWERS}/?search=${id}`, {}, true);
}

export {
  getQuestionsList,
  getQuestionDetail
}
