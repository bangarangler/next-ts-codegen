import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../constants";

// old no longer being used as it is inside AxiosProvider
// i like it better here but i don't have axios to axiosConfig here which is why
// it's in context

const refreshToken = async (token: string) => {
  const data = await fetch(`${REST_BASE_ENDPOINT}/auth/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
    // body: JSON.stringify()
  });

  console.log("data from refreshToken", data);
  const json = await data.json();
  console.log("json from refreshToken", json);

  console.log("json data from refreshToken", json.data);
  return json.data;
};

export default function useGetRefreshToken(token: string) {
  return useMutation("refresh", () => refreshToken(token));
}

// import { useMutation } from "react-query";
// import { REST_BASE_ENDPOINT } from "../../constants";
// import { axios } from "../utils/axiosConfig";
//
// const refreshToken = async (token: string) => {
//   const data = await axios.get(`${REST_BASE_ENDPOINT}/auth/refresh`);
//
//   console.log("data from refreshToken", data);
//   const json = await data.json();
//   console.log("json from refreshToken", json);
//
//   console.log("json data from refreshToken", json.data);
//   return json.data;
// };
//
// export default function useGetRefreshToken(token: string) {
//   return useMutation("refresh", () => refreshToken(token));
// }
