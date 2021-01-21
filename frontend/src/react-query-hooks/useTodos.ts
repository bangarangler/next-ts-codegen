import { useQuery } from "react-query";
import { GQL_ENDPOINT } from "../constants";
import { axios } from "../utils/axiosConfig";

const query = `
query Todos {
  todos {
    error {
      message
    }
    todos {
      _id
      userId
      name
    }
  }
}
`;

const fetchTodos = async (query: any, variables: any) => {
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

export const useTodos = () => {
  return useQuery("Todos", () => fetchTodos(query, {}));
};
