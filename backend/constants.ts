export const __prod_cors__ =
  process.env.NODE_ENV !== "production"
    ? {
        origin: [
          "http://localhost:3000",
          "http://localhost:4000",
          "http://localhost:4000/graphql",
          "ws://localhost:4000/graphql",
          // "ws://localhost:5050/graphql",
        ],
        credentials: true,
      }
    : // : { origin: ["https://nodereacttesting.nowigence.ai"], credentials: true };
      {
        origin: [
          "https://bang-k8s.com",
          "ws://backend-service.next-app:4000",
          "https://backend-service.next-app:4000",
        ],
        credentials: true,
      };

export const URL =
  process.env.NODE_ENV === "production"
    ? "backend-service.next-app"
    : "localhost";

export const __prod__ = process.env.NODE_ENV === "production" ? true : false;

export const COOKIE_NAME = "voldemort";

export const REDIS_COOKIE_NAME = "redis-riddle";

export const REFRESH_COOKIE_NAME = "riddle";

export const ACCESS_TOKEN_EXPIRES = "15m";
// TESTING
// export const ACCESS_TOKEN_EXPIRES = "5s";
