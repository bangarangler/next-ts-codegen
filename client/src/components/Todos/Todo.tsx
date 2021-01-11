import { FC } from "react";
import { TodoDocument } from "../../generated/graphql";

const Todo: FC<TodoDocument> = ({ todo }) => {
  return (
    <div key={todo._id}>
      <p>{todo.name}</p>
    </div>
  );
};

export default Todo;
