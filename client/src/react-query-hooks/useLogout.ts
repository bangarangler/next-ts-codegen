import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../constants";
import { axios } from "../utils/axiosConfig";

const postLogout = async () => {
  const data = await axios.post(`${REST_BASE_ENDPOINT}/auth/logout`);

  // console.log("data from useLogout", data);
  // const json = await data.json();
  // console.log("json from useLogout", json);
  // console.log("json.data from useLogout", json.data);

  // return json.data;
  if (data) {
    return data.data.data;
  }
};

export default function useLogout() {
  return useMutation("logout", () => postLogout());
}

// const {mutate, data, status, reset} = useMutation((registerInput) => {
//   console.log("loginInput from useMutation", registerInput);
//     fetch(`${REST_BASE_ENDPOINT}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(registerInput),
//     });
//     return {mutate, data, status, reset}
// });
