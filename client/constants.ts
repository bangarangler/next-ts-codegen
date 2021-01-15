export const GQL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://nodereacttesting.nowigence.ai/graphql"
    : "http://localhost:4000/graphql";

// export const GQL_ENDPOINT =
//   process.env.NODE_ENV === "production"
//     ? "https://nodereacttesting.nowigence.ai/graphql"
//     : "http://backend:4000/graphql";

export const GQL_SUBSCRIPTION_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "ws://nodereacttesting.nowigence.ai/graphql"
    : "ws://localhost:4000/graphql";

// export const GQL_SUBSCRIPTION_ENDPOINT =
//   process.env.NODE_ENV === "production"
//     ? "ws://nodereacttesting.nowigence.ai/graphql"
//     : "ws://backend:4000/graphql";

export const REST_BASE_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://nodereacttesting.nowigence.ai"
    : "http://localhost:4000";

// export const REST_BASE_ENDPOINT =
//   process.env.NODE_ENV === "production"
//     ? "https://nodereacttesting.nowigence.ai"
//     : "http://backend:4000";
