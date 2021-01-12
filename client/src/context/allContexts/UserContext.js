import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useMutation, useQueryClient } from "react-query";
// import { verify } from "jsonwebtoken";
// import { REST_BASE_ENDPOINT } from "../../../constants";
import { useLogin } from "../../react-query-hooks/useLogin";
import { useQuery } from "react-query";
import { GQL_ENDPOINT } from "../../../constants";
import { useAxiosContext } from "../allContexts";
// import useGetRefreshToken from "../../react-query-hooks/useGetRefreshToken";

export const UserContext = createContext();

export function UserProvider(props) {
  // const { axios } = useAxiosContext();
  // const qClient = useQueryClient();
  // const [userEmail, setUserEmail] = useState(null);
  // const [token, setToken] = useState(null);
  // const router = useRouter();
  // const [inMemToken, setInMemToken] = useState(null);
  // const [countDown, setCountDown] = useState(null);
  // const {
  //   mutate: refMutate,
  //   data: refData,
  //   status: refStatus,
  // } = useGetRefreshToken(token);
  // const {mutate, data, status } = useLogin(loginInput)
  // const { mutate, data, status, reset } = useMutation(async (loginInput) => {
  //   console.log("loginInput from useMutation", loginInput);
  //   // const data = await fetch(`${REST_BASE_ENDPOINT}/auth/login`, {
  //   const data = await axios.post(`${REST_BASE_ENDPOINT}/auth/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify(loginInput),
  //   });
  //
  //   const json = await data.json();
  //
  //   return json.data;
  // });

  // useEffect(() => {
  //   if (!token) {
  //     const accessToken = localStorage?.getItem("accessToken");
  //     // console.log("accessToken from useEffect", accessToken);
  //     if (!accessToken) {
  //       router.push("/");
  //       return;
  //     }
  //     setToken(accessToken);
  //   }
  // }, [token]);
  //
  // useEffect(() => {
  //   if (!userEmail && token) {
  //     try {
  //       const data = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
  //       // console.log("data from useEffect!!!", data);
  //       setUserEmail(data.email);
  //     } catch (err) {
  //       console.log("err from UserContext err", err);
  //       if (err.name === "TokenExpiredError") {
  //         // console.log("hit refresh here");
  //         // console.log("token", token);
  //         refMutate();
  //         // testing
  //         qClient.invalidateQueries();
  //       }
  //     }
  //   }
  // }, [userEmail, token]);
  //
  // useEffect(() => {
  //   console.log("refData useEffect running...");
  //   console.log("refStatus", refStatus);
  //   switch (refStatus) {
  //     case "error":
  //       console.log("error from usercontext switch", error);
  //       break;
  //     case "success":
  //       console.log("data refresh", refData);
  //       setUserEmail(refData?.email);
  //       setToken(refData?.accessToken);
  //       // console.log("userEmail", userEmail);
  //       // console.log("token", token);
  //       break;
  //   }
  // }, [refData, userEmail, token]);

  const { axios, user } = useAxiosContext();
  const userEmail = user?.email;

  const query = `
  query Me($email: String!) {
    me(email: $email) {
      user {
        _id
        name
        email
      }
      error {
        message
      }
    }
  }
  `;

  const fetchMeData = async (query, variables) => {
    // const { data, error, status } = await axios.post(GQL_ENDPOINT, {
    const data = await axios.post(GQL_ENDPOINT, {
      query,
      variables,
      body: JSON.stringify({ query, variables }),
    });

    if (!data) {
      console.log("error from me", data);
    }
    if (data) {
      return data.data.data;
    }
  };

  const useMeData = (userEmail) =>
    useQuery("ME", () => fetchMeData(query, { email: userEmail }), {
      enabled: !!userEmail,
    });

  const refreshToken = async () => {
    const data = await axios.get(`${REST_BASE_ENDPOINT}/auth/refresh`);

    console.log("data from refreshToken", data);
    const json = await data.json();
    console.log("json from refreshToken", json);

    console.log("json data from refreshToken", json.data);
    return json.data;
  };

  const useGetRefreshToken = () => {
    return useMutation("refresh", () => refreshToken());
  };

  return (
    <UserContext.Provider
      value={{
        useMeData,
        useGetRefreshToken,
        // mutate,
        // data,
        // status,
        // reset,
        useLogin,
        // userEmail,
        // setUserEmail,
        // token,
        // setToken,
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
