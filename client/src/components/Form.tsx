import { useRouter } from "next/router";
import { useState } from "react";

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event: any) => {
    event.preventDefault();

    const options: any = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    };

    fetch("http://localhost:4000/login", options)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            alert("Email not found, please retry");
          }
          if (response.status === 401) {
            alert("Email and password do not match, please retry");
          }
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // document.cookie = "token=" + data.token;
          document.cookie = "signedin=true";
          router.push("/private-area");
          // navigate('/private-area')
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <p>
          Email:{" "}
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </p>
        <p>
          Password:{" "}
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
    </div>
  );
};

export default Form;
