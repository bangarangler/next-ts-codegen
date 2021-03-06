import { useMutation } from "react-query";
import { GQL_ENDPOINT } from "../../constants";
import { MeQuery, MeQueryVariables, useMeQuery } from "../generated/graphql";

// interface MeInputArgs {
//   email: string;
// }

const getMeData = async ({ email }: MeQueryVariables) => {
  const dataSource = {
    endpoint: GQL_ENDPOINT,
    fetchParams: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  };

  const vars = {
    email,
  };

  const { data, error, isFetching } = useMeQuery(dataSource, vars);
  // const data = await fetch(`${GQL_ENDPOINT}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   // body: JSON.stringify(meInput),
  //   body: JSON.stringify({MeQuery, variables}),
  // });

  //   const json = await data.json();
  //
  //   return json.data;
};

export default function useMeData(variables: MeQueryVariables) {
  return useMutation("Me", () => getMeData(variables));
}
