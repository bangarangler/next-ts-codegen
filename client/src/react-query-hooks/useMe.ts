import { useQuery } from "react-query";
import gql from "graphql-tag";
import { GQL_ENDPOINT } from "../../constants";
// import axios from "axios";
import { useUserContext, useAxiosContext } from "../context/allContexts";
// import { MeQuery, MeQueryVariables, useMeQuery } from "../generated/graphql";

// interface MeInputArgs {
//   email: string;
// }
const query = gql`
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

const getMeData = async (query: any, variables: any) => {
  console.log("getMeData fun running");
  const axios = useAxiosContext();
  const data = await axios.post(GQL_ENDPOINT, {
    query,
    variables: {
      variables,
    },
  });
  console.log("data from getMeData", data);
  // const json = await data.json();
  // console.log("json from getMeData", json);
  // console.log("json.data from getMeData", json.data);
  // return json.data;
  return data;
};

export default function useMeData(variables: any) {
  return useQuery("Me", () => getMeData(query, variables));
}
