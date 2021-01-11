import { useMutation, useQuery } from "react-query";
import { GQL_ENDPOINT } from "../../constants";
import { GraphQLClient } from "graphql-request";

// const graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: token ? `Bearer ${token}` : "",
//   },
//   credentials: "include",
// });
const fetchTodos = async (token: string) => {
  const data = await fetch(GQL_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  console.log("data from fetchTodos", data);
  const json = await data.json();
  console.log("json from fetchTodos", json);

  console.log("json data from fetchTodos", json.data);
  return json.data;
};

export default function useTodos(token: string) {
  return useQuery("Todos", () => fetchTodos(token));
}
