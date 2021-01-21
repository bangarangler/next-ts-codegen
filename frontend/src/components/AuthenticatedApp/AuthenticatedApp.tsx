import React from "react";
import { Route } from "react-router-dom";

const PrivateAreaComponent = React.lazy(
  () => import("../../pages/private-area")
);

const AuthenticatedApp = () => {
  return (
    <>
      <Route exact path="/private-area" component={PrivateAreaComponent} />
    </>
  );
};

export default AuthenticatedApp;
