import { AxiosResponse } from "axios";
import { Endpoints } from "../../apis";
import { get } from "../../../lib/utils/requests";

const getUsers: () => Promise<AxiosResponse> = () => {
  return get(`${Endpoints.USERSPROFILE}`, {}, true);
};

export {
  getUsers,
}
