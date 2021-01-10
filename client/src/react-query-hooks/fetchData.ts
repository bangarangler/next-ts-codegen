import { GQL_ENDPOINT, REST_BASE_ENDPOINT } from "../../constants";

export async function fetchGQLData(
  token: any,
  query: any,
  { variables }: any = {}
) {
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  console.log("res from fetchGQLData", res);
  const json = await res.json();
  console.log("json from fetchGQLData", json);

  if (json.errors) {
    const { message } = json.errors[0] || "Error...";
    throw new Error(message);
  }

  console.log("json.data from fetchGQLData", json.data);
  return json.data;
}

export async function fetchRestData(token: any, bod: any) {
  const res = await fetch(REST_BASE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
    body: JSON.stringify(bod),
  });

  console.log("res from fetchRestData", res);
  const json = await res.json();
  console.log("json from fetchRestData", json);

  if (json.errors) {
    const { message } = json.errors[0] || "Error...";
    throw new Error(message);
  }

  console.log("json.data from fetchRestData", json.data);
  return json.data;
}
