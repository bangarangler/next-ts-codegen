import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { verify } from "jsonwebtoken";
import { REST_BASE_ENDPOINT } from "../../../constants";
import useGetRefreshToken from "../../react-query-hooks/useGetRefreshToken";

export const UserContext = createContext();

export function UserProvider(props) {
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [inMemToken, setInMemToken] = useState(null);
  const [countDown, setCountDown] = useState(null);
  // const { mutate, data, status } = useGetRefreshToken();
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
      // const accessToken = JSON.parse(localStorage?.getItem("accessToken"));
      console.log("accessToken from useEffect", accessToken);
      setToken(accessToken);
      // }
    }
  }, [token]);

  useEffect(() => {
    console.log("useremail useEffect running");
    if (!userEmail && token) {
      console.log("JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
      // const data = verify(token, process.env.JWT_SECRET_KEY);
      console.log("data from useEffect!!!", data);
    }
  }, [userEmail, token]);

  // useEffect(() => {
  //   if (data?.accessToken && data?.accessTokenExp) {
  //     console.log("refresh useEffect running");
  //     setInMemToken(data.accessToken);
  //     const timerNumber = Number(data.accessTokenExp.replace("m", ""));
  //     // console.log("timerNumber", timerNumber);
  //     const date = new Date();
  //     // console.log("date", date);
  //     const time = date.setMinutes(date.getMinutes() + timerNumber);
  //     // console.log("time", time);
  //     setCountDown(time);
  //   }
  // }, [data]);
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("countDown", countDown)
  //   }, countDown)
  // }, [])

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
        inMemToken,
        countDown,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
