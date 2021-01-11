import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../constants";

const refreshToken = async () => {
  const data = await fetch(`${REST_BASE_ENDPOINT}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export default function useGetRefreshToken() {
  return useMutation("refresh", () => refreshToken());
}
