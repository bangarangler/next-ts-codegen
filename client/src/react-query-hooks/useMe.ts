import { useQuery } from "react-query";
// import gql from "graphql-tag";
import { GQL_ENDPOINT } from "../../constants";
// import axios from "axios";
import { useUserContext, useAxiosContext } from "../context/allContexts";

const query = `
query Me($email: String!) {
  me(email: $email) {
    user {
      _id
      name
      email
    }
    error {
      message
    }
  }
}
`;

const fetchMeData = async (query: any, variables: any) => {
  console.log("getMeData fun running");
  const { axios, user } = useAxiosContext();
  const userEmail = user?.email;
  const data = await axios.post(GQL_ENDPOINT, {
    query,
    variables,
    body: JSON.stringify({ query, variables }),
  });

  if (!data) {
    console.log("error from me", data);
  }
  if (data) {
    // const json = await data.data.json();
    // console.log("json from me", json);
    // console.log("json.data from me", json.data());
    // console.log("data from me", data);
    // return { data, error, status };
    // say my name 3 times react-query plus axios plus graphql SMH
    return data.data.data;
  }
};
export default function useMeData(variables: any) {
  return useQuery("ME", () => fetchMeData(query, variables));
}
