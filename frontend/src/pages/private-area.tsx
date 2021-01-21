import React, { useEffect } from "react";
import { TodosSubProvider } from "../context/composibleContext/TodosSubContext";
import Cookies from "js-cookie";
import Todos from "../components/Todos/Todos";
import Me from "../components/Me/me";
import Test from "../components/Test/Test";
import { useHistory } from "react-router-dom";
import { isServer } from "../utils/isServer";
import useLogout from "../react-query-hooks/useLogout";

const PrivateArea = () => {
  const history = useHistory();

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
          history.go(0);
          // history.push("/");
        }
    }
  }, [logoutStatus, logoutData]);

  // this may not be needed anymore
  if (!Cookies.get("signedin")) {
    if (!isServer()) {
      history.push("/");
    }
  }

  return (
    <>
      <div>Private Area!</div>
      <button onClick={() => logout()}>Logout</button>
      <Me />
      <TodosSubProvider>
        <Todos />
        <Test />
      </TodosSubProvider>
    </>
  );
};

export default PrivateArea;
