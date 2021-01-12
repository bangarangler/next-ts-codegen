import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import Axios from "axios";
import useGetRefreshToken from "../../react-query-hooks/useGetRefreshToken";
import { useQueryClient } from "react-query";
import { verify, decode } from "jsonwebtoken";
import { useRouter } from "next/router";
// import { useUserContext } from '../allContexts'

export const AxiosContext = createContext();

export function AxiosProvider(props) {
  // const {useGetRefreshToken} = useUserContext()
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const qClient = useQueryClient();
  const {
    mutate: refMutate,
    data: refData,
    status: refStatus,
    error: refError,
  } = useGetRefreshToken(token);
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      withCredentials: true,
      // body: JSON.stringify({ query, variables }),
    });

    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        console.log("error from interceptors", error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // const token = localStorage.getItem("accessToken");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        // Do something with response error
        if (401 === error.response.status) {
          console.log("DO SOMETHING HERE");
          refMutate();
        }
        return Promise.reject(error);
      }
    );

    return axios;
  }, []);

  useEffect(() => {
    if (!token) {
      // if (!token) {
      const accessToken = localStorage?.getItem("accessToken");
      // console.log("accessToken from useEffect", accessToken);
      if (!accessToken) {
        router.push("/");
        return;
      }
      const data = decode(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      console.log("data from axios useEffect", data);
      setUser(data);
      setToken(accessToken);
    }
  }, [token]);

  useEffect(() => {
    // if (!userEmail && token) {
    if (!user && token) {
      try {
        const data = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
        // console.log("data from useEffect!!!", data);
        setUser(data);
      } catch (err) {
        console.log("err from UserContext err", err);
        if (err.name === "TokenExpiredError") {
          // console.log("hit refresh here");
          // console.log("token", token);
          refMutate();
          // testing
          qClient.invalidateQueries();
        }
      }
    }
    // }, [userEmail, token]);
  }, [user, token]);

  useEffect(() => {
    console.log("refData useEffect running...");
    console.log("refStatus", refStatus);
    switch (refStatus) {
      case "error":
        console.log("error from usercontext switch", refError);
        break;
      case "success":
        console.log("data refresh", refData);
        // setUserEmail(refData?.email);
        localStorage.setItem("accessToken", refData?.accessToken);
        setUser(refData);
        setToken(refData?.accessToken);
        console.log("user", user);
        console.log("token", token);
        break;
    }
    // }, [refData, userEmail, token]);
  }, [refData, user, token]);

  return (
    <AxiosContext.Provider value={{ axios, user, setUser, token, setToken }}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export const useAxiosContext = () => {
  return useContext(AxiosContext);
};
