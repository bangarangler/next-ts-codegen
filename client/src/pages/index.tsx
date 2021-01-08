import { useState } from "react";
import dynamic from "next/dynamic";

// COMPONENTS
// Code Splitting / Only loaded when called on.  not a good usecase here but
// wanted example
const FormComponent = dynamic(() => import("../components/Form"));
const RegisterComponent = dynamic(() => import("../components/Register"));

const Home = () => {
  const [showForm, setShowForm] = useState("login");
  return (
    <div>
      <p>Home Page</p>
      {showForm === "login" && (
        <>
          <FormComponent />
          <button onClick={() => setShowForm("register")}>Register Me!</button>
        </>
      )}
      {showForm === "register" && (
        <>
          <RegisterComponent />
          <button onClick={() => setShowForm("login")}>Go Login!</button>
        </>
      )}
    </div>
  );
};

export default Home;
