import { REST_BASE_ENDPOINT } from "../../constants";
import { useMutation } from "react-query";
import { axios } from "../utils/axiosConfig";
// import { useAxiosContext } from "../context/allContexts";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin(loginInput: LoginInput) {
  console.log("running useLogin");
  // const { axios } = useAxiosContext();

  return useMutation(async (loginInput: LoginInput) => {
    try {
      const { data } = await axios.post(
        `${REST_BASE_ENDPOINT}/auth/login`,
        loginInput
      );
      console.log("data", data);
      if (data.data) {
        return data.data;
      }
    } catch (err) {
      console.log("err from useLogin", err.response.data);
      throw new Error(err.response.data.message);
    }
  });
}
