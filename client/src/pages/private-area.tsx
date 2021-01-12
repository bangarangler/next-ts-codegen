import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Me from "../components/Me/me";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
import { useMeQuery } from "../generated/graphql";
import { GQL_ENDPOINT } from "../../constants";
// import { useQuery } from "react-query";
// import gql from "graphql-tag";
// import { useUserContext } from "../context/allContexts";
import { useAxiosContext } from "../context/allContexts";
import { GraphQLClient } from "graphql-request";
import useLogout from "../react-query-hooks/useLogout";
// import useMeData from "../react-query-hooks/useMe";
// import Todos from "../components/Todos/Todos.tsx";

const PrivateArea = () => {
  // next-router
  const router = useRouter();
  // const { axios } = useAxiosContext();
  // User Context
  // const { userEmail, token } = useUserContext();
  const { user, token } = useAxiosContext();

  // const { data: meData, status } = useMeData({ email: user?.email });
  // Must be a way to extract this with react-query if not turn into custom hook
  // const graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  //   credentials: "include",
  // });
  // const { data: meData, status } = useMeQuery(
  //   graphQLClient,
  //   {
  //     email: user?.email,
  //   },
  //   // will not run until it has token and userEmail (both of which required)
  //   { enabled: !!token && !!user.email }
  // );
  // console.log("status", status);
  // console.log("data from useMe", meData);

  // useEffect(() => {
  //   console.log("user from private", user);
  //   console.log("meData from private", meData);
  //   console.log("status from private", status);
  // }, [user, token, status, meData]);
  // renamed so not to cause a conflict
  const {
    mutate: logoutMutate,
    data: logoutData,
    status: logoutStatus,
  } = useLogout();

  // useEffect to deal with meData
  // useEffect(() => {
  //   switch (status) {
  //     case "loading":
  //       console.log("meData loading...");
  //       break;
  //     case "idle":
  //       console.log("meData isIdle");
  //       break;
  //     case "error":
  //       console.log("meData error");
  //       break;
  //     case "success":
  //       console.log("meData", meData);
  //       if (meData.status === 404) {
  //         console.log("nope that didn't work");
  //         return;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }, [status, meData]);

  // logout function to run using custom react-query hook
  const logout = async () => {
    localStorage.removeItem("accessToken");
    logoutMutate();
  };

  useEffect(() => {
    switch (logoutStatus) {
      case "error":
        console.log("error logging out");
        break;
      case "success":
        console.log("logoutData", logoutData);
        if (logoutData.success) {
          router.reload();
        }
    }
  }, [logoutStatus, logoutData]);

  // this may not be needed anymore
  if (!Cookies.get("signedin")) {
    if (!isServer()) {
      router.push("/");
    }
  }

  return (
    <>
      <div>Private Area!</div>
      <button onClick={() => logout()}>Logout</button>
      <Me />
      {/*<Todos />*/}
    </>
  );
};

export default PrivateArea;
// <div>UserName: {meData?.me?.user?.name}</div>
// <div>Email: {meData?.me?.user?.email}</div>
