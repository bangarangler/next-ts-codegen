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
    : {
        origin: [
          // "https://client-cookies-test.vercel.app/",
          // "ws://client-cookies-test.vercel.app/",
          "https://bang-k8s.com/*",
          "https://bang-k8s.com/auth/login",
          "https://bang-k8s.com/auth/*",
          "https://bang-k8s.com/graphql",
          "ws://bang-k8s.com/graphql",
        ],
        credentials: true,
      };

export const URL =
  process.env.NODE_ENV === "production"
    ? // ? "backend-service.next-app"
      "bang-k8s.com"
    : "localhost";

// export const __prod_cors__ =
//   process.env.NODE_ENV !== "production"
//     ? {
//         origin: [
//           "http://frontend:3000",
//           "http://backend:4000",
//           "http://backend:4000/graphql",
//           "ws://backend:4000/graphql",
//         ],
//         credentials: true,
//       }
//     : { origin: ["https://nodereacttesting.nowigence.ai"], credentials: true };

export const __prod__ = process.env.NODE_ENV === "production" ? true : false;

export const COOKIE_NAME = "voldemort";

export const REDIS_COOKIE_NAME = "redis-riddle";

export const REFRESH_COOKIE_NAME = "riddle";

export const ACCESS_TOKEN_EXPIRES = "15m";
// TESTING
// export const ACCESS_TOKEN_EXPIRES = "5s";
