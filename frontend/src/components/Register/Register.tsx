import { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useAxiosContext } from "../../context/allContexts";
import { useRegister } from "../../react-query-hooks/useRegister";
import { RegisterState, RegisterActions } from "./RegisterTypes";

const regReducer = (state: RegisterState, action: RegisterActions) => {
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

const initState: RegisterState = {
  email: "",
  password: "",
  confirmPW: "",
  name: "",
};

const Register = () => {
  const history = useHistory();
  const { setUser, setToken } = useAxiosContext();
  // local form state
  const [regState, regDispatch] = useReducer(regReducer, initState);
  const { email, password, confirmPW, name } = regState;
  // don't love this figure out better pattern but much closer
  const registerInput = { email, password, confirmPW, name };
  // useRegister hook
  const { mutate, data, status } = useRegister(registerInput);

  // useEffect deals with useRegister hook / react-query data
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
        // set email and token in context
        setUser(data);
        setToken(data.accessToken);
        // set token in localStorage for refresh logic
        localStorage.setItem("accessToken", data.accessToken);
        document.cookie = "signedin=true";
        history.push("/private-area");
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
      {status === "loading" && <div>Loading...</div>}
      <form onSubmit={registerSubmit}>
        <p>
          Name:
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) =>
              regDispatch({
                type: "input",
                field: "name",
                value: e.target.value,
              })
            }
          />
        </p>
        <p>
          Email:
          <input
            type="text"
            placeholder="jane.smith@example.com"
            value={email}
            onChange={(e) =>
              regDispatch({
                type: "input",
                field: "email",
                value: e.target.value,
              })
            }
          />
        </p>
        <p>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) =>
              regDispatch({
                type: "input",
                field: "password",
                value: e.target.value,
              })
            }
          />
        </p>
        <p>
          Confirm Password:
          <input
            type="password"
            value={confirmPW}
            onChange={(e) =>
              regDispatch({
                type: "input",
                field: "confirmPW",
                value: e.target.value,
              })
            }
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
