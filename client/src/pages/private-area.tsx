import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
import { useMeQuery } from "../generated/graphql";
import { GQL_ENDPOINT, REST_BASE_ENDPOINT } from "../../constants";
import { useUserContext } from "../context/allContexts";
import { GraphQLClient } from "graphql-request";

// const graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": token ? `Bearer ${token}` : ""
//   },
//   credentials: "include",
// });

const PrivateArea = () => {
  const { userEmail, setUserEmail, token } = useUserContext();
  const graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });
  const { data: meData, status } = useMeQuery(
    graphQLClient,
    {
      email: userEmail,
    },
    { enabled: !!token !== null }
  );
  console.log("status", status);
  console.log("data from useMe", meData);
  const router = useRouter();

  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("meData loading...");
        break;
      case "idle":
        console.log("meData isIdle");
        break;
      case "error":
        console.log("meData error");
        break;
      case "success":
        console.log("meData", meData);
        if (meData.status === 404) {
          console.log("nope that didn't work");
          return;
        }
        break;
      default:
        break;
    }
  }, [status, meData]);

  // convert this to use react-query
  const logout = async () => {
    localStorage.removeItem("accessToken");
    const options: any = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      // body: JSON.stringify(),
    };

    const out = await fetch(`${REST_BASE_ENDPOINT}/auth/logout`, options);
    console.log("out", out);
    if (!out.ok) {
      return <div>Couldn't log out at this time</div>;
    }
    if (out.ok) {
      router.reload();
      setUserEmail(null);
    }
  };
  // if (!Cookies.get("token")) {
  if (!Cookies.get("signedin")) {
    if (!isServer()) {
      router.push("/");
    }
  }

  return (
    <>
      <div>Private Area!</div>
      <div>UserName: {meData?.me?.user?.name}</div>
      <div>Email: {meData?.me?.user?.email}</div>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default PrivateArea;
