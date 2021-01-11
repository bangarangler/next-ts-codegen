import { useReducer, useEffect } from "react";
import { useAddTodoMutation } from "../../generated/graphql";
import { GraphQLClient } from "graphql-request";
import { useQueryClient } from "react-query";
import { GQL_ENDPOINT } from "../../../constants";
import { useUserContext } from "../../context/allContexts";
import { decode } from "jsonwebtoken";
import { AddNewTodoState, AddNewTodoActions } from "./AddNewTodoTypes";

const addNewTodoReducer = (
  state: AddNewTodoState,
  action: AddNewTodoActions
) => {
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "identifier":
      return {
        ...state,
        userId: action.payload,
      };
    case "reset":
      return {
        ...state,
        name: "",
        // userId: "",
      };
    default:
      return {
        ...state,
      };
  }
};

const initState: AddNewTodoState = {
  name: "",
  userId: "",
};

const AddNewTodo = () => {
  // used to invalidate cache after adding new todo
  const qClient = useQueryClient();
  // needed for headers
  const { token } = useUserContext();
  // need global way to do this
  const graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });
  const [addNewTodoState, addNewTodoDispatch] = useReducer(
    addNewTodoReducer,
    initState
  );
  // local state
  const { name, userId } = addNewTodoState;
  // variables for mutations
  const vars = { options: { name, userId } };
  // react-query hook
  const { mutate, status, data, error } = useAddTodoMutation(graphQLClient, {
    variables: vars,
  });

  const submitAddNewTodo = async (e: any) => {
    e.preventDefault();
    // console.log("SubmitNewTodo running...");
    await mutate();
  };

  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("addNewTodo loading...");
        break;
      case "error":
        console.log("addNewTodo error...", error);
        break;
      case "success":
        console.log("AddNewTodo", data);
        addNewTodoDispatch({ type: "reset" });
        qClient.invalidateQueries("Todos");
        break;
    }
  }, [status]);

  // if they refresh makes sure we get the id out of token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = decode(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY!);
    // console.log("user", user);
    addNewTodoDispatch({ type: "identifier", payload: user?.id });
  }, []);

  return (
    <>
      {status === "error" &&
        data?.addTodo?.errors[0].message === "userId must be provided" && (
          <div>FrontEnd Error</div>
        )}
      <form onSubmit={(e) => submitAddNewTodo(e)}>
        <div>
          <label htmlFor="Name">Todo Name</label>
          <input
            type="text"
            placeholder="enter new todo..."
            value={name}
            onChange={(e) =>
              addNewTodoDispatch({
                type: "input",
                field: "name",
                value: e.target.value,
              })
            }
          />
          <button type="submit">Add Todo!</button>
        </div>
      </form>
    </>
  );
};

export default AddNewTodo;
