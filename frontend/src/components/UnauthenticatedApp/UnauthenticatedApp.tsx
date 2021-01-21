import React, { Suspense, useState } from "react";

// COMPONENTS Dynamic Imports
const LoginComponent = React.lazy(() => import("../Login/Login"));
const RegisterComponent = React.lazy(() => import("../Register/Register"));

const UnauthenticatedApp = () => {
  const [showForm, setShowForm] = useState("login");
  return (
    <>
      <div>
        <p>Home Page</p>
        {showForm === "login" && (
          <>
            <Suspense fallback={<div>Suspense Login Loading...</div>}>
              <LoginComponent />
            </Suspense>
            <button onClick={() => setShowForm("register")}>
              Register Me!
            </button>
          </>
        )}
        {showForm === "register" && (
          <>
            <Suspense fallback={<div>Suspense Register Loading...</div>}>
              <RegisterComponent />
            </Suspense>
            <button onClick={() => setShowForm("login")}>Go Login!</button>
          </>
        )}
      </div>
    </>
  );
};

export default UnauthenticatedApp;
