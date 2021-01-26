import { useEffect, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import { TodoDocument } from "../../generated/graphql";
import { useTodos } from "../../react-query-hooks/useTodos";
// import { useTodosSubContext } from "../../context/composibleContext/TodosSubContext";
import Todo from "./Todo";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";
import { TodosState, TodosActions } from "./TodosTypes";
//@ts-ignore
import styles from "./Todos.module.css";

const todosReducer = (state: TodosState, action: TodosActions) => {
  switch (action.type) {
    case "todoToEdit":
      return {
        ...state,
        todoToEdit: action.selectedTodo,
      };
    default:
      return {
        ...state,
      };
  }
};

const initState: TodosState = {
  todoToEdit: {},
};

// const TodoAddedToast = () => {
//   const { newTodoFromSub } = useTodosSubContext();
//   // console.log("newTodoFromSub", newTodoFromSub);
//   return (
//     <>
//       <p>{newTodoFromSub?.name} was added</p>
//     </>
//   );
// };

const Todos = () => {
  // const { newTodoFromSub } = useTodosSubContext();
  const { data, status, error } = useTodos();
  const [todosState, todosDispatch] = useReducer(todosReducer, initState);
  const { todoToEdit } = todosState;
  // const notify = () => toast("Wow so easy !");
  // const displayTodoAddedToast = () => {
  //   toast.success(<TodoAddedToast />);
  // };

  // useEffect(() => {
  //   // notify();
  //   if (newTodoFromSub) {
  //     displayTodoAddedToast();
  //   }
  // }, [newTodoFromSub]);

  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("todos loading...");
        break;
      case "idle":
        console.log("todos isIdle");
        break;
      case "error":
        console.log("todos error", error);
        // console.log(error);
        break;
      case "success":
        console.log("todos", data);
        if (data?.todos?.error) {
          console.log("error from todos");
          // do some visual stuff or something for errors
        }
        break;
      default:
        break;
    }
  }, [status, data]);

  const selectTodo = (todo: any) => {
    console.log({ todo });
    todosDispatch({ type: "todoToEdit", selectedTodo: todo });
  };

  return (
    <div className={styles.todosContainer}>
      <ToastContainer />
      <div className={styles.todosListWrapper}>
        <div>List of Todos</div>
        {data?.todos?.todos?.map((todo: TodoDocument) => {
          return <Todo key={todo._id} todo={todo} selectTodo={selectTodo} />;
        })}
        <AddNewTodo />
      </div>
      <div className={styles.singleTodo}>
        {todoToEdit && <Todo todo={todoToEdit} />}
        <EditTodo todoToEdit={todoToEdit} />
      </div>
    </div>
  );
};

export default Todos;
