import { useMutation } from "react-query";
import { GQL_ENDPOINT } from "../constants";
import { axios } from "../utils/axiosConfig";

const query = `
mutation AddTodo($options: AddTodoInput!) {
  addTodo(options: $options) {
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

const postAddNewTodo = async (query: any, variables: any) => {
  const data = await axios.post(GQL_ENDPOINT, {
    query,
    variables,
    body: JSON.stringify({ query, variables }),
  });

  if (!data) {
    console.log("error from todos", data);
  }

  if (data) {
    return data.data.data;
  }
};

export const useAddNewTodo = (variables: any) => {
  // console.log("variables from useAddNewTodo", variables);
  return useMutation(["Todos", variables], () =>
    postAddNewTodo(query, variables)
  );
};
