import { get } from "../../../lib/utils/requests";
import { Endpoints } from "../../apis";
import { AxiosResponse } from 'axios';

const getBlogs: () => Promise<AxiosResponse> = () => {
  return get(Endpoints.BLOGS, {}, true)
};

const getPersonalBlogs: (userId: number) => Promise<AxiosResponse> = (userId) => {
  return get(`${Endpoints.BLOGS}?search=${userId}`, {}, true)
};

export {
  getBlogs,
  getPersonalBlogs,
}
