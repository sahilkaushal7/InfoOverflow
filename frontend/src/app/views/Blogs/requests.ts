import { get, post } from "../../../lib/utils/requests";
import { Endpoints } from "../../apis";
import { AxiosResponse } from 'axios';

const getBlogs: () => Promise<AxiosResponse> = () => {
  return get(Endpoints.BLOGS, {}, true)
};

const getPersonalBlogs: (userId: number) => Promise<AxiosResponse> = (userId) => {
  return get(`${Endpoints.BLOGS}?search=${userId}`, {}, true)
};

const createBlog: (form_data: FormData) => Promise<AxiosResponse> = (form_data) => {
  return post(`${Endpoints.BLOGS}/`, form_data, true)
}

export {
  getBlogs,
  getPersonalBlogs,
  createBlog
}
