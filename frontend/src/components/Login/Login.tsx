import { useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useAxiosContext } from "../../context/allContexts";
import { useLogin } from "../../react-query-hooks/useLogin";

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
  const { setUser, setToken } = useAxiosContext();
  // local form state
  const [state, dispatch] = useReducer(reducer, initState);
  const { email, password } = state;
  const { mutate, data, status, error } = useLogin();
  const history = useHistory();

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
        // console.log("data from success login!!!!!!", data);
        // console.log("data.accessToken", data.accessToken);
        setUser(data);
        setToken(data.accessToken);
        // temp
        localStorage.setItem("accessToken", data.accessToken);
        document.cookie = "signedin=true";
        history.push("/private-area");
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
