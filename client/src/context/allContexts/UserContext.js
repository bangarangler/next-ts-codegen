import React, { createContext, useContext, useState, useEffect } from "react";
// import { useQuery } from "react-query";
// import { GQL_ENDPOINT } from "../../../constants";
import { useAxiosContext } from "../allContexts";

export const UserContext = createContext();

export function UserProvider(props) {
  const { axios } = useAxiosContext();

  // const query = `
  // query Me($email: String!) {
  //   me(email: $email) {
  //     user {
  //       _id
  //       name
  //       email
  //     }
  //     error {
  //       message
  //     }
  //   }
  // }
  // `;
  //
  // const fetchMeData = async (query, variables) => {
  //   // const { data, error, status } = await axios.post(GQL_ENDPOINT, {
  //   const data = await axios.post(GQL_ENDPOINT, {
  //     query,
  //     variables,
  //     body: JSON.stringify({ query, variables }),
  //   });
  //
  //   if (!data) {
  //     console.log("error from me", data);
  //   }
  //   if (data) {
  //     return data.data.data;
  //   }
  // };
  //
  // const useMeData = (userEmail) =>
  //   useQuery("ME", () => fetchMeData(query, { email: userEmail }), {
  //     enabled: !!userEmail,
  //   });

  // const refreshToken = async () => {
  //   const data = await axios.get(`${REST_BASE_ENDPOINT}/auth/refresh`);
  //
  //   console.log("data from refreshToken", data);
  //   const json = await data.json();
  //   console.log("json from refreshToken", json);
  //
  //   console.log("json data from refreshToken", json.data);
  //   return json.data;
  // };
  //
  // const useGetRefreshToken = () => {
  //   return useMutation("refresh", () => refreshToken());
  // };

  return (
    <UserContext.Provider
      value={
        {
          // useMeData,
          // useGetRefreshToken,
          // mutate,
          // data,
          // status,
          // reset,
          // useLogin,
          // userEmail,
          // setUserEmail,
          // token,
          // setToken,
          // inMemToken,
          // countDown,
        }
      }>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
