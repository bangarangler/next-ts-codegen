import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { verify } from "jsonwebtoken";
import { REST_BASE_ENDPOINT } from "../../../constants";
import useGetRefreshToken from "../../react-query-hooks/useGetRefreshToken";
import useLogout from "../../react-query-hooks/useLogout";

export const UserContext = createContext();

export function UserProvider(props) {
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  // const [inMemToken, setInMemToken] = useState(null);
  // const [countDown, setCountDown] = useState(null);
  const {
    mutate: refMutate,
    data: refData,
    status: refStatus,
  } = useGetRefreshToken(token);
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
      const accessToken = localStorage?.getItem("accessToken");
      // console.log("accessToken from useEffect", accessToken);
      if (!accessToken) {
        router.push("/");
        return;
      }
      setToken(accessToken);
    }
  }, [token]);

  useEffect(() => {
    console.log("useremail useEffect running");
    if (!userEmail && token) {
      try {
        const data = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
        // console.log("data from useEffect!!!", data);
        setUserEmail(data.email);
      } catch (err) {
        console.log("err from UserContext err", err);
        if (err.name === "TokenExpiredError") {
          // console.log("hit refresh here");
          // console.log("token", token);
          refMutate();
        }
      }
    }
  }, [userEmail, token]);

  useEffect(() => {
    console.log("refData useEffect running...");
    console.log("refStatus", refStatus);
    switch (refStatus) {
      case "error":
        console.log("error from usercontext switch", error);
        break;
      case "success":
        console.log("data refresh", refData);
        setUserEmail(refData?.email);
        setToken(refData?.accessToken);
        // console.log("userEmail", userEmail);
        // console.log("token", token);
        break;
    }
  }, [refData, userEmail, token]);

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
        // inMemToken,
        // countDown,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
