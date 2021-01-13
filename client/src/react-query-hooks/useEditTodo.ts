import { useMutation, useQueryClient } from "react-query";
import { GQL_ENDPOINT } from "../../constants";
import { axios } from "../utils/axiosConfig";

const query = `
mutation EditTodo($options: EditTodoInput!) {
  editTodo(options: $options) {
    errors {
      source
      message
    }
    error {
      message
    }
    todo {
      _id
      userId
      name
    }
  }
}
`;

const postEditTodo = async (query: any, variables: any) => {
  const data = await axios.post(GQL_ENDPOINT, {
    query,
    variables,
    body: JSON.stringify({ query, variables }),
  });

  if (!data) {
    console.log("error from editTodo", data);
  }

  if (data) {
    return data.data.data;
  }
};

export const useEditTodo = (variables: any, onUpdates?: any) => {
  return useMutation(
    ["EditTodos", variables],
    () => postEditTodo(query, variables),
    onUpdates
  );
};
