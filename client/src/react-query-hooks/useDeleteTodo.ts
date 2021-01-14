import { useMutation, useQueryClient } from "react-query";
import { GQL_ENDPOINT } from "../../constants";
import { axios } from "../utils/axiosConfig";

const query = `
mutation DeleteTodo($todoId: String!) {
  deleteTodo(todoId: $todoId)
}
`;

const postDeleteTodo = async (query: any, variables: any) => {
  const data = await axios.post(GQL_ENDPOINT, {
    query,
    variables,
    body: JSON.stringify({ query, variables }),
  });

  if (!data) {
    console.log("error from deleteTodo", data);
  }

  if (data) {
    return data.data.data;
  }
};

export const useDeleteTodo = (variables: any, onUpdates?: any) => {
  return useMutation(
    ["DeleteTodos", variables],
    () => postDeleteTodo(query, variables),
    onUpdates
  );
};
