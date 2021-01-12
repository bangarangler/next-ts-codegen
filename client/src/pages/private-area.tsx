import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Me from "../components/Me/me";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
// import { useMeQuery } from "../generated/graphql";
// import { GQL_ENDPOINT } from "../../constants";
import { useAxiosContext } from "../context/allContexts";
// import { GraphQLClient } from "graphql-request";
import useLogout from "../react-query-hooks/useLogout";
// import Todos from "../components/Todos/Todos.tsx";
// import useLogout from '../react-query-hooks/useLogout'

const PrivateArea = () => {
  // next-router
  const router = useRouter();
  // User Context
  const { user, token } = useAxiosContext();

  const {
    mutate: logoutMutate,
    data: logoutData,
    status: logoutStatus,
  } = useLogout();

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
