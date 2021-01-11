import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import { useUserContext } from "../context/allContexts";

// COMPONENTS
// Code Splitting / Only loaded when called on.  not a good usecase here but
// wanted example
const FormComponent = dynamic(() => import("../components/Form"));
const RegisterComponent = dynamic(() => import("../components/Register"));

const Home = () => {
  // const { countDown, inMemToken } = useUserContext();
  const [showForm, setShowForm] = useState("login");

  // useEffect(() => {
  //   console.log("countDown", countDown);
  //   console.log("inMemToken", inMemToken);
  //   const date = new Date();
  //   if (date < countDown) {
  //     console.log("do refresh stuff");
  //   }
  // }, [countDown]);

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
