import { useReducer, useEffect } from "react";
import { useQueryClient } from "react-query";
import { toErrorMap } from "../../utils/toErrorMap";
import { useAxiosContext } from "../../context/allContexts";
import { useAddNewTodo } from "../../react-query-hooks/useAddNewTodo";
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
    case "uiError":
      return {
        ...state,
        uiError: action.payload,
      };
    case "reset":
      return {
        ...state,
        name: "",
        uiError: "",
      };
    default:
      return {
        ...state,
      };
  }
};

const initState: AddNewTodoState = {
  name: "",
  uiError: "",
};

const AddNewTodo = () => {
  // userData from context
  const { user } = useAxiosContext();
  // used to invalidate cache after adding new todo
  const qClient = useQueryClient();
  const [addNewTodoState, addNewTodoDispatch] = useReducer(
    addNewTodoReducer,
    initState
  );
  // local state
  const { name, uiError } = addNewTodoState;
  // variables for mutations
  const vars = { options: { name, userId: user?.id } };
  // react-query hook
  const { mutate, status, data, error } = useAddNewTodo(vars);

  const submitAddNewTodo = async (e: any) => {
    e.preventDefault();
    addNewTodoDispatch({ type: "reset" });
    mutate();
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
        console.log("here>...", data?.addTodo?.errors);
        if (data?.addTodo?.errors) {
          const errors = toErrorMap(data.addTodo.errors);
          console.log("errors", errors);
          addNewTodoDispatch({
            type: "uiError",
            payload: `${errors?.name}... ${errors?.userId}`,
          });
        } else if (data?.addTodo?.todo) {
          addNewTodoDispatch({ type: "reset" });
          qClient.invalidateQueries("Todos");
        }
        break;
    }
  }, [status]);

  return (
    <>
      {uiError && <div>{uiError}</div>}
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
