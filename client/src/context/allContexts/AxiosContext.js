import React, { createContext, useContext, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";

export const AxiosContext = createContext();

export function AxiosProvider(props) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // if there is not a token take us to home page
  // if there is one set the user and token in state
  useEffect(() => {
    if (!token) {
      // if (!token) {
      const accessToken = localStorage?.getItem("accessToken");
      // console.log("accessToken from useEffect", accessToken);
      if (!accessToken) {
        // router.push("/");
        return;
      }
      const data = decode(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      console.log("data from axios useEffect", data);
      setUser(data);
      setToken(accessToken);
    }

    if (token && !user) {
      const accessToken = localStorage?.getItem("accessToken");
      const data = decode(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      console.log("data from axios useEffect", data);
      setUser(data);
      setToken(accessToken);
    }
  }, [token, user]);

  return (
    <AxiosContext.Provider value={{ user, setUser, token, setToken }}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export const useAxiosContext = () => {
  return useContext(AxiosContext);
};
