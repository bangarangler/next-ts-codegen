import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../../constants";

export const UserContext = createContext();

export function UserProvider(props) {
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);
  const { mutate, data, status, reset } = useMutation(async (loginInput) => {
    console.log("loginInput from useMutation", loginInput);
    const data = await fetch(`${REST_BASE_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
      body: JSON.stringify(loginInput),
    });

    const json = await data.json();

    return json.data;
  });

  useEffect(() => {
    if (!token) {
      // if (typeof window !== "undefined") {
      const accessToken = localStorage?.getItem("accessToken");
      console.log("accessToken from useEffect", accessToken);
      setToken(accessToken);
      // }
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        mutate,
        data,
        status,
        reset,
        userEmail,
        setUserEmail,
        token,
        setToken,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
