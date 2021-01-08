import { useState } from "react";
import Form from "../components/Form";
import Register from "../components/Register";

const Home = () => {
  const [showForm, setShowForm] = useState("login");
  return (
    <div>
      <p>Home Page</p>
      {showForm === "login" && (
        <>
          <Form />
          <button onClick={() => setShowForm("register")}>Register Me!</button>
        </>
      )}
      {showForm === "register" && (
        <>
          <Register />
          <button onClick={() => setShowForm("login")}>Go Login!</button>
        </>
      )}
    </div>
  );
};

export default Home;
