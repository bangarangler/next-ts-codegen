import { useReducer, useEffect } from "react";
import { useQueryClient } from "react-query";
// import { toErrorMap } from "../../utils/toErrorMap";
import { useAxiosContext } from "../../context/allContexts";
import { useEditTodo } from "../../react-query-hooks/useEditTodo";
import { EditTodoState, EditTodoActions } from "./EditTodoTypes";

const editTodoReducer = (state: EditTodoState, action: EditTodoActions) => {
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
      };
    default:
      return {
        ...state,
      };
  }
};

const initState: EditTodoState = {
  name: "",
  uiError: "",
};

const EditTodo = ({ todoToEdit }: any) => {
  console.log({ todoToEdit });
  // userData from context
  const { user } = useAxiosContext();
  // used to invalidate cache after updating todo
  const qClient = useQueryClient();
  const [editTodoState, editTodoDispatch] = useReducer(
    editTodoReducer,
    initState
  );
  // local state
  const { name, uiError } = editTodoState;
  // variables for mutations
  const vars = { options: { name, userId: user?.id, todoId: todoToEdit?._id } };
  // react-query hook
  const { mutate, status, data, error } = useEditTodo(vars);

  const submitEditTodo = async (e: any) => {
    e.preventDefault();
    if (!name || !user?.id || !todoToEdit?._id) {
      editTodoDispatch({ type: "uiError", payload: "Must Fill Form Out!" });
    }
    // mutate({ name, userId: user?.id, todoId: todoToEdit?._id } as any);
    mutate();
  };

  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("editTodo loading...");
        break;
      case "error":
        console.log("editTodo error...", error);
        break;
      case "success":
        console.log("editTodo", data);
        if (data?.editTodo?.todo) {
          editTodoDispatch({ type: "reset" });
          qClient.invalidateQueries("Todos");
        }
        break;
    }
  }, [status]);

  return (
    <>
      {uiError && <div>{uiError}</div>}
      <form onSubmit={(e) => submitEditTodo(e)}>
        <div>
          <label htmlFor="Name">Edit Todo Name</label>
          <input
            type="text"
            placeholder="edit todo name..."
            value={name}
            onChange={(e) =>
              editTodoDispatch({
                type: "input",
                field: "name",
                value: e.target.value,
              })
            }
          />
          <button
            type="submit"
            disabled={!name || !user?.id || !todoToEdit._id}>
            Edit Todo!
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTodo;
