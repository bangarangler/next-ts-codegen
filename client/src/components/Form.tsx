import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/allContexts";

const Form = () => {
  const { mutate, data, status, setUserEmail, setToken } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
        // on success set cookie and push to somewhere
        if (data.status === 404) {
          console.log("nope that didn't work");
          return;
        }
        // const json = data.json();
        setUserEmail(data.email);
        setToken(data.accessToken);
        // temp
        localStorage.setItem("accessToken", data.accessToken);
        document.cookie = "signedin=true";
        router.push("/private-area");
        break;
      default:
        break;
    }
  }, [status, data]);

  const submitForm = async (event: any) => {
    event.preventDefault();
    const loginInput = { email, password };
    mutate(loginInput as any);
  };

  return (
    <div>
      {data?.status === 404 && (
        <>
          <div>Error Could not find account</div>
        </>
      )}
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
          <button type="submit" disabled={email === "" || password === ""}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Form;

// const options: any = {
//   method: "post",
//   headers: {
//     "Content-type": "application/json",
//   },
//   credentials: "include",
//   body: JSON.stringify({ email, password }),
// };
//
// fetch("http://localhost:4000/login", options)
//   .then((response) => {
//     if (!response.ok) {
//       if (response.status === 404) {
//         alert("Email not found, please retry");
//       }
//       if (response.status === 401) {
//         alert("Email and password do not match, please retry");
//       }
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
