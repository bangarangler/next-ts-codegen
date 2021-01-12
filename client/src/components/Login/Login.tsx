import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useUserContext, useAxiosContext } from "../../context/allContexts";
// import { useAxiosContext } from "../../context/allContexts";
// reducer types
import { State, Actions } from "./LoginTypes";

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return {
        ...state,
      };
  }
};

const initState: State = {
  email: "",
  password: "",
};

const Login = () => {
  // context state / react-query mutation data
  // const { mutate, data, status, setUserEmail, setToken } = useUserContext();
  // const { useLogin, setUserEmail, setToken } = useUserContext();
  const { useLogin } = useUserContext();
  const { setUser, setToken } = useAxiosContext();
  const { mutate, data, status, error } = useLogin();
  // local form state
  const [state, dispatch] = useReducer(reducer, initState);
  const { email, password } = state;
  // next-router
  const router = useRouter();

  // this useEffect manages when a user logs in
  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("loading...");
        break;
      case "idle":
        console.log("login isIdle");
        break;
      case "error":
        console.log("error from Login.tsx", error);
        break;
      case "success":
        // on success set cookie and push to somewhere
        console.log("data", data);
        // if (data?.status === 404) {
        //   console.log("nope that didn't work");
        //   return;
        // }
        // console.log("data.email", data.email);
        console.log("data.email", data.email);
        console.log("data.accessToken", data.accessToken);
        // setUserEmail(data.email);
        setUser(data);
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

  // submit login which will run mutate and start up useEffect above logic
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
      {status === "loading" && <div>Loading...</div>}
      <form onSubmit={submitForm}>
        <p>
          Email:{" "}
          <input
            type="text"
            placeholder="jane.smith@example.com"
            value={email}
            onChange={(event) =>
              dispatch({
                type: "input",
                field: "email",
                value: event.target.value,
              })
            }
          />
        </p>
        <p>
          Password:{" "}
          <input
            type="password"
            onChange={(event) =>
              dispatch({
                type: "input",
                field: "password",
                value: event.target.value,
              })
            }
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

export default Login;

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
