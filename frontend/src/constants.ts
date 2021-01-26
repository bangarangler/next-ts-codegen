// import { Config } from "./config";
// export const GQL_ENDPOINT =
//   process.env.NODE_ENV === "production"
//     ? "https://nodereacttesting.nowigence.ai/graphql"
//     : "http://localhost:4000/graphql";

export const GQL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? // ? "https://nodereacttesting.nowigence.ai/graphql"
      // "http://backend-service.next-app:4000/graphql"
      // `http://${process.env.REACT_APP_API_ADDRESS}/graphql`
      // `http://${Config.api_url}/graphql`
      `https://bang-k8s.com/graphql`
    : // "https://10.245.111.240"
      // "https://bang-k8s.com/graphql"
      "http://localhost:4000/graphql";

// export const GQL_SUBSCRIPTION_ENDPOINT =
//   process.env.NODE_ENV === "production"
//     ? "ws://nodereacttesting.nowigence.ai/graphql"
//     : "ws://localhost:4000/graphql";

export const GQL_SUBSCRIPTION_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? // ? "ws://nodereacttesting.nowigence.ai/graphql"
      // "ws://backend-service.next-app:4000/graphql"
      // `ws://${process.env.REACT_APP_API_ADDRESS}/graphql`
      // `ws://bang-k8s.com/graphql`
      `wss://bang-k8s.com/graphql`
    : // `ws://${Config.api_url}/graphql`
      // "https://10.245.111.240"
      // "ws://bang-k8s.com/graphql"
      "ws://localhost:4000/graphql";

// export const REST_BASE_ENDPOINT =
//   process.env.NODE_ENV === "production"
//     ? "https://nodereacttesting.nowigence.ai"
//     : "http://localhost:4000";

export const REST_BASE_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? // ? "https://nodereacttesting.nowigence.ai"
      // "http://backend-service.next-app:4000"
      // `http://${process.env.REACT_APP_API_ADDRESS}`
      `https://bang-k8s.com`
    : // `http://${Config.api_url}`
      // "https://10.245.111.240" // "https://bang-k8s.com"
      "http://localhost:4000";
