import { get } from "../../../lib/utils/requests";
import { Endpoints } from "../../apis";
import { AxiosResponse } from 'axios';

export const getBlogs:() => Promise<AxiosResponse> = () => { return get(Endpoints.BLOGS, {}, true) };
