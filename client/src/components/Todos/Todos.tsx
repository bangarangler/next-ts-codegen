import { useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import { GQL_ENDPOINT } from "../../../constants";
import { useTodosQuery, TodoDocument } from "../../generated/graphql";
import { useUserContext, useErrorContext } from "../../context/allContexts";
import Todo from "./Todo";
import AddNewTodo from "./AddNewTodo";

const Todos = () => {
  const { token, userEmail } = useUserContext();
  const { errorStatusCode, setErrorStatusCode } = useErrorContext();
  const graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });
  // don't run it until a token is valid
  const { data, status, error } = useTodosQuery(graphQLClient, {
    enabled: !!token && !!userEmail,
  });

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
  return (
    <>
      <div>List of Todos</div>
      {data?.todos?.todos?.map((todo: TodoDocument) => {
        return <Todo key={todo._id} todo={todo} />;
      })}
      <AddNewTodo />
    </>
  );
};

export default Todos;
