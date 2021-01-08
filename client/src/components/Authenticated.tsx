import { GQL_ENDPOINT } from "../../constants";
// import { useMeQuery } from '../generated'

export default function Authenticated() {
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
    email: "jack@test.com",
  };

  // const { data, error, isFetching } = useMeQuery(dataSource, vars)
}
