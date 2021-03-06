export const __prod_cors__ =
  process.env.NODE_ENV !== "production"
    ? {
        origin: [
          "http://localhost:3000",
          "http://localhost:4000/login",
          "http://localhost:4000/graphql",
        ],
        credentials: true,
      }
    : { origin: ["https://webaddygoeshere.com"], credentials: true };

export const __prod__ = process.env.NODE_ENV === "production" ? true : false;

export const COOKIE_NAME = "voldemort";
