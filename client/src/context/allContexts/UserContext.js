import React, { createContext, useContext, useState } from "react";
import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../../constants";

export const UserContext = createContext();

export function UserProvider(props) {
  const [userEmail, setUserEmail] = useState(null);
  const { mutate, data, status, reset } = useMutation(async (loginInput) => {
    console.log("loginInput from useMutation", loginInput);
    const data = await fetch(`${REST_BASE_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginInput),
    });

    const json = await data.json();

    return json.data;
  });

  return (
    <UserContext.Provider
      value={{ mutate, data, status, reset, userEmail, setUserEmail }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
