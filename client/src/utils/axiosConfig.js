import Axios from "axios";

export const axios = Axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  // credentials: "include",
  withCredentials: true,
  // body: JSON.stringify({ query, variables }),
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    console.log("error from interceptors", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // Do something with response error
    if (401 === error.response.status) {
      console.log("DO SOMETHING HERE");
      refMutate();
    }
    return Promise.reject(error);
  }
);
