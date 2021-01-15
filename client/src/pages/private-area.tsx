import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Todos from "../components/Todos/Todos";
import Me from "../components/Me/me";
import Test from "../components/Test/Test";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
import useLogout from "../react-query-hooks/useLogout";

const PrivateArea = () => {
  // next-router
  const router = useRouter();

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
      <Todos />
      <Test />
    </>
  );
};

export default PrivateArea;
// <div>UserName: {meData?.me?.user?.name}</div>
// <div>Email: {meData?.me?.user?.email}</div>
