import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../constants";

interface RegisterInputArgs {
  name: string;
  email: string;
  password: string;
  confirmPW: string;
}

const postRegister = async (registerInput: RegisterInputArgs) => {
  const data = await fetch(`${REST_BASE_ENDPOINT}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(registerInput),
  });

  const json = await data.json();

  return json.data;
};

export default function useRegister(registerInput: RegisterInputArgs) {
  return useMutation("register", () => postRegister(registerInput));
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
