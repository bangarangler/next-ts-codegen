import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";
import { useMeQuery, MeDocument } from "../generated/graphql";
import { GQL_ENDPOINT } from "../../constants";

// const AuthenticatedComponent = dynamic(
//   () => import("../components/Authenticated")
// );

const PrivateArea = () => {
  const router = useRouter();

  const dataSource = {
    endpoint: GQL_ENDPOINT,
    fetchParams: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  };

  const vars = {
    email: "jack@jack.com",
  };
  const { data, error, isFetching } = useMeQuery(dataSource, vars);
  // const { data, error, isFetching } = useMeQuery({}, MeDocument, vars);

  const logout = async () => {
    const options: any = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      // body: JSON.stringify(),
    };

    const out = await fetch("http://localhost:4000/logout", options);
    console.log("out", out);
    if (!out.ok) {
      return <div>Couldn't log out at this time</div>;
    }
    if (out.ok) {
      router.reload();
    }
  };
  // if (!Cookies.get("token")) {
  if (!Cookies.get("signedin")) {
    if (!isServer()) {
      router.push("/");
    }
  }

  if (isFetching) {
    return <div>Fetching user data...</div>;
  }

  if (error) {
    return <div>Error fetching user data</div>;
  }

  if (data) {
    console.log("data for user", data);
  }
  const { name, email } = data.me.user;

  return (
    <>
      <div>Private Area!</div>
      <div>UserName: {name}</div>
      <div>Email: {email}</div>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default PrivateArea;
