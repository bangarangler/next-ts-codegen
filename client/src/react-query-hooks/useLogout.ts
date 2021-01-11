import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../constants";

const postLogout = async () => {
  const data = await fetch(`${REST_BASE_ENDPOINT}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    // body: JSON.stringify(registerInput),
  });

  // console.log("data from useLogout", data);
  const json = await data.json();
  // console.log("json from useLogout", json);
  // console.log("json.data from useLogout", json.data);

  return json.data;
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
