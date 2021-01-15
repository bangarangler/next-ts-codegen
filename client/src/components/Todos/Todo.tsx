import { FC, useEffect } from "react";
//@ts-ignore
import { TodoDocument } from "../../generated/graphql";
import { useDeleteTodo } from "../../react-query-hooks/useDeleteTodo";
import { useQueryClient } from "react-query";
//@ts-ignore
import styles from "./Todo.module.css";

const Todo: FC<TodoDocument> = ({ todo, selectTodo }) => {
  const qClient = useQueryClient();
  const vars = { todoId: todo._id };
  const { mutate, status, data, error } = useDeleteTodo(vars);

  const handleDelete = (todoId: string) => {
    console.log({ todoId });
    mutate();
  };

  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("loading deleteTodo");
        break;
      case "error":
        console.log("error deleteTodo", error);
        break;
      case "success":
        console.log("success deleteTodo", data);
        qClient.invalidateQueries("Todos");
        break;
    }
  }, [status, data]);

  return (
    <div key={todo._id} className={styles.todoContainer}>
      <p onClick={() => selectTodo(todo)}>{todo.name}</p>
      {selectTodo && (
        <span
          className={styles.fakeIcon}
          onClick={() => handleDelete(todo._id)}>
          X
        </span>
      )}
    </div>
  );
};

export default Todo;
