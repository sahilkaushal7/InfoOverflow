import { AxiosResponse } from 'axios';
import { get } from '../../../lib/utils/requests';
import { Endpoints } from '../../apis';

const getQuestionsList: () => Promise<AxiosResponse> = () => {
  return get(`${Endpoints.QUESTIONS}`, {}, true);
};

export {
  getQuestionsList,
}
