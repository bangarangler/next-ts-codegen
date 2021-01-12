import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import Axios from "axios";
// import useGetRefreshToken from "../../react-query-hooks/useGetRefreshToken";
import { useQueryClient } from "react-query";
import { verify, decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { REST_BASE_ENDPOINT } from "../../../constants";
// import { useUserContext } from '../allContexts'

export const AxiosContext = createContext();

export function AxiosProvider(props) {
  // const {useGetRefreshToken} = useUserContext()
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const qClient = useQueryClient();

  // refresh token fired on 401 to go get new tokens and replace current ones
  const refreshToken = async () => {
    const data = await axios.get(`${REST_BASE_ENDPOINT}/auth/refresh`);

    console.log("data from refreshToken", data);
    if (data) {
      return data.data.data;
    }
  };

  const useGetRefreshToken = () => {
    return useMutation("refresh", () => refreshToken(token));
  };

  const {
    mutate: refMutate,
    data: refData,
    status: refStatus,
    error: refError,
  } = useGetRefreshToken();
  // end refresh token get

  // axios config handling headers and 401
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
          // running refresh token router here from up above
          refMutate();
        }
        return Promise.reject(error);
      }
    );

    return axios;
  }, []);

  // if there is not a token take us to home page
  // if there is one set the user and token in state
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

  // if no user but we have a token decode the token for the user and set user
  // handles refresh
  // if token is expired it will also run the refresh route from above to get
  // more token
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

  // final piece based on the response we get back from refresh route we either
  // set new accessToken in localStorage and setUser and Token of console log
  // error.
  // could also log them out here if it fails
  useEffect(() => {
    console.log("refData useEffect running...");
    console.log("refStatus", refStatus);
    switch (refStatus) {
      case "error":
        console.log("error from usercontext switch", refError);
        break;
      case "success":
        console.log("data refresh", refData);
        localStorage.setItem("accessToken", refData?.accessToken);
        setUser(refData);
        setToken(refData?.accessToken);
        console.log("user", user);
        console.log("token", token);
        break;
    }
    // }, [refData, userEmail, token]);
  }, [refData, user, token]);

  // register route also moved in here as i need access to custom axios
  const postRegister = async (registerInput) => {
    const data = await axios.post(
      `${REST_BASE_ENDPOINT}/auth/register`,
      registerInput
    );

    if (data) {
      console.log("data from postRegisteR", data);
      return data.data.data;
    }
  };

  const useRegister = (registerInput) => {
    return useMutation(["register", registerInput], () =>
      postRegister(registerInput)
    );
  };

  return (
    <AxiosContext.Provider
      value={{ axios, user, setUser, token, setToken, useRegister }}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export const useAxiosContext = () => {
  return useContext(AxiosContext);
};
