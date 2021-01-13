// import React, { createContext, useContext, useState, useEffect } from "react";
import React, { createContext, useContext } from "react";
// import { useRouter } from "next/router";
// import { useMutation, useQueryClient } from "react-query";
// import { verify } from "jsonwebtoken";
// import { REST_BASE_ENDPOINT, GQL_ENDPOINT } from "../../../constants";
// import { useGetRefreshToken } from "../../react-query-hooks/useGetRefreshToken";

export const ErrorContext = createContext();

export function ErrorProvider(props) {
  // const [errorStatusCode, setErrorStatusCode] = useState();
  //
  // const qClient = useQueryClient();
  // const [userEmail, setUserEmail] = useState(null);
  // const [token, setToken] = useState(null);
  // const router = useRouter();
  // const {
  //   mutate: refMutate,
  //   data: refData,
  //   status: refStatus,
  // } = useGetRefreshToken(token);
  //
  // const refreshFlow = () => {
  //   console.log("errorStatusCode", errorStatusCode);
  // };

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
  //   console.log("useremail useEffect running");
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

  return (
    <ErrorContext.Provider
      value={
        {
          // mutate,
          // data,
          // status,
          // reset,
          // refreshFlow,
          // errorStatusCode,
          // setErrorStatusCode,
          // userEmail,
          // setUserEmail,
          // token,
          // setToken,
          // inMemToken,
          // countDown,
        }
      }>
      {props.children}
    </ErrorContext.Provider>
  );
}

export const useErrorContext = () => {
  return useContext(ErrorContext);
};
