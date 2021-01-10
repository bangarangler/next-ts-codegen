import { fetchRestData } from "./fetchData";

export async function useLogin(key: any, bod: any) {
  console.log("key from useLogin", key);
  const data = await fetchRestData("", bod);
  console.log("data from useLogin", data);
  if (data) {
    return data;
  } else {
    console.log("returning null from useLogin");
    return null;
  }
}
