import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useRegister from "../react-query-hooks/useRegister";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [name, setName] = useState("");
  // don't love this figure out better pattern but much closer
  const registerInput = { email, password, confirmPW, name };
  const { mutate, data, status } = useRegister(registerInput);

  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("loading...");
        break;
      case "idle":
        console.log("login isIdle");
        break;
      case "error":
        console.log("error");
        break;
      case "success":
        console.log("data", data);
        // on success set cookie and push to somewhere
        // better error checking just don't care right now it's late and this is
        // for testing
        if (data.message === "Must Fill All Forms out Completley") {
          console.log("REGISTER: nope that didn't work");
          return;
        }
        document.cookie = "signedin=true";
        router.push("/private-area");
        break;
      default:
        break;
    }
  }, [status, data]);

  const registerSubmit = (event: any) => {
    const registerInput = {
      email,
      password,
      confirmPW,
      name,
    };
    event.preventDefault();
    mutate(registerInput as any);
  };

  return (
    <div>
      {data?.message === "Must Fill All Forms out Completley" && (
        <>
          <div>Error Registering</div>
        </>
      )}
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

// const options: any = {
//   method: "post",
//   headers: {
//     "Content-type": "application/json",
//   },
//   credentials: "include",
//   body: JSON.stringify({ name, email, password, confirmPW }),
// };
//
// fetch("http://localhost:4000/register", options)
//   .then((response) => {
//     if (!response.ok) {
//       if (response.status === 404) {
//         alert("Email already exists");
//       }
//       // if (response.status === 401) {
//       //   alert("Email and password do not match, please retry");
//       // }
//     }
//     return response;
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.success) {
//       // document.cookie = "token=" + data.token;
//       document.cookie = "signedin=true";
//       router.push("/private-area");
//       // navigate('/private-area')
//     }
//   });
