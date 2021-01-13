import { FC } from "react";
import { TodoDocument } from "../../generated/graphql";

const Todo: FC<TodoDocument> = ({ todo, selectTodo }) => {
  return (
    <div key={todo._id}>
      <p onClick={() => selectTodo(todo)}>{todo.name}</p>
    </div>
  );
};

export default Todo;
