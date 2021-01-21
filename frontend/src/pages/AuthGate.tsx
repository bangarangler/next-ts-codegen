import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAxiosContext } from "../context/allContexts";

// can't be dynamic as this component shows them one or the other and therefore
// dynamic importing won't work
import AuthenticatedApp from "../components/AuthenticatedApp/AuthenticatedApp";
import UnauthenticatedApp from "../components/UnauthenticatedApp/UnauthenticatedApp";

const AuthGate = () => {
  const { user } = useAxiosContext();
  const history = useHistory();
  // will need tweaks in real app possible currently handling if user manually
  // goes to / in url for whatever reason... if user pass go if not show login
  useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
      history.push("/private-area");
    }
  });

  if (!user) {
    return <UnauthenticatedApp />;
  } else {
    return <AuthenticatedApp />;
  }
};

export default AuthGate;
