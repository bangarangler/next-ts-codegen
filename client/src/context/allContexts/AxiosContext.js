import React, { createContext, useContext, useMemo } from "react";
import Axios from "axios";

export const AxiosContext = createContext();

export function AxiosProvider(props) {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      // body: JSON.stringify({query, variables})
    });

    // axios.interceptors.request.use((config) => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // });

    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={{ axios }}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export const useAxiosContext = () => {
  return useContext(AxiosContext);
};
