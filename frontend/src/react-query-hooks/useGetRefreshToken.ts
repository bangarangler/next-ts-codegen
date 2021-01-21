import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../constants";
import { axios } from "../utils/axiosConfig";

const refreshToken = async () => {
  const data = await axios.get(`${REST_BASE_ENDPOINT}/auth/refresh`);

  if (data) {
    return data.data.data;
  }
};

export const useGetRefreshToken = () => {
  return useMutation("refresh", () => refreshToken());
};
