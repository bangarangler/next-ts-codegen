import { useEffect, useReducer } from "react";
import { TodoDocument } from "../../generated/graphql";
import { useTodos } from "../../react-query-hooks/useTodos";
import Todo from "./Todo";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";
import { TodosState, TodosActions } from "./TodosTypes";
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

const Todos = () => {
  const { data, status, error } = useTodos();
  const [todosState, todosDispatch] = useReducer(todosReducer, initState);
  const { todoToEdit } = todosState;

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
