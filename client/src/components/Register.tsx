import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [name, setName] = useState("");

  const registerSubmit = (event: any) => {
    event.preventDefault();

    const options: any = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password, confirmPW }),
    };

    fetch("http://localhost:4000/register", options)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            alert("Email already exists");
          }
          // if (response.status === 401) {
          //   alert("Email and password do not match, please retry");
          // }
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
      <form onSubmit={registerSubmit}>
        <p>
          Name:
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </p>
        <p>
          Email:
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </p>
        <p>
          Password:
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <p>
          Confirm Password:
          <input
            type="password"
            onChange={(event) => setConfirmPW(event.target.value)}
          />
        </p>
        <p>
          <button type="submit">Register</button>
        </p>
      </form>
    </div>
  );
};

export default Register;
