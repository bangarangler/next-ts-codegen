import dotenv from "dotenv-safe";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
// import { createServer } from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import http from "http";
import https from "https";
import path from "path";
import { redirectToHTTPS } from "express-http-to-https";
import cookieParser from "cookie-parser";
// import { __prod_cors__, __prod__, REDIS_COOKIE_NAME } from "./constants";
import { __prod_cors__, __prod__, URL } from "./constants";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { ServerContext } from "./ServerContext";
import { db } from "./mongoConfig/mongo";
import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
// import session from "express-session";
// import connectRedis from "connect-redis";

// REST IMPORTS
import { authRoutes } from "./routes/auth";
import { authMiddleware } from "./middleware/auth.middleware";

// old secret = secret! or Secret!

try {
  const redisOptions = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || "6379",
    password: process.env.REDIS_PASSWORD,
    tls: true,
    retryStrategy: (times: any) => {
      return Math.min(times * 50, 2000);
    },
  };

  const pubsub = new RedisPubSub({
    publisher: new Redis(redisOptions as any),
    subscriber: new Redis(redisOptions as any),
  });
  const app = express();
  // Note: Order of app.use matters here. We want our React app to be displayed on page load, so the build folder should be loaded first as it will also contain index.html. If we add public folder first then index.html from server/public folder will be loaded as Express.js reads the file from top to bottom and it stops rendering when it finds the first matching file.
  // app.use(express.static(path.join(__dirname, "..", "build")));
  app.use(express.static(path.join(__dirname, "build")));
  app.use(express.static("public"));

  const corsConfig = __prod_cors__;
  app.use(cors(corsConfig));
  // Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
  // TODO: possible remove this after behind SSL LB may not need it all
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // REST ROUTES LOOK HERE FOR LOGIN, REGISTER, LOGOUT
  // app.get("/", (req, res) => {
  //   res.send("NODE GRAPHQL API HERE WE GO...");
  // });

  app.use("/auth", authRoutes);
  // This line is for react-router basically... so that any dynamic route will
  // not match and end up here so react routing will pick up and route them
  // correctly
  app.get("/*", (req, res) => {
    console.log("dir to serve", path.join(__dirname, "build", "index.html"));
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  app.use(authMiddleware);

  const privateKey = fs.readFileSync(
    `/etc/letsencrypt/live/bang-k8s.com/privkey.pem`,
    "utf8"
  );

  const certificate = fs.readFileSync(
    `/etc/letsencrypt/live/bang-k8s.com/cert.pem`,
    "utf8"
  );

  const ca = fs.readFileSync(
    `/etc/letsencrypt/live/bang-k8s.com/chain.pem`,
    "utf8"
  );

  const credentials: any = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const context = async ({ req, res, connection, redis }: ServerContext) => {
    if (connection) {
      connection.pubsub = pubsub;
      return { connection };
    }
    // check accessToken
    // const authHeaders = req?.headers?.authorization || "";
    // const token = authHeaders.split(" ")[1];
    // console.log("authHeaders", authHeaders);
    // // console.log("req?.cookies", req?.cookies);
    // // const token = req?.cookies[COOKIE_NAME] || "";
    // console.log("token from context", token);
    // try {
    //   const payload: JWTData | any = jwt.verify(
    //     token,
    //     process.env.JWT_SECRET_KEY!
    //   );
    //   console.log("payload", payload);
    //   // return payload;
    //   return { req, res, db, payload };
    // return { req, res, db, redis, pubsub };
    return { req, res, db, pubsub };
    // } catch (e) {
    //   throw new AuthenticationError(
    //     "Authentication token is invalid, please log in"
    //   );
    // }
  };
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    playground: {
      endpoint: "/graphql",
      settings: { "request.credentials": "include" },
    },
  });

  server.applyMiddleware({ app, cors: false });

  server.installSubscriptionHandlers(httpServer);
  server.installSubscriptionHandlers(httpsServer);

  try {
    // const port = process.env.PORT;
    // const port = 80;
    httpServer.listen(process.env.PORT_HTTP, () => {
      console.log(
        // `Subscription ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
        `Subscription ready at ws://${URL}:${process.env.PORT_HTTP}${server.subscriptionsPath}`
      );
      console.log(
        // `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
        `Server ready at http://${URL}:${process.env.PORT_HTTP}${server.graphqlPath}`
      );
    });
    httpsServer.listen(process.env.PORT_HTTPS, () => {
      console.log(
        // `Subscription ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
        `HTTPS Subscription ready at wss://${URL}:${process.env.PORT_HTTPS}${server.subscriptionsPath}`
      );
      console.log(
        // `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
        `HTTPS Server ready at http://${URL}:${process.env.PORT_HTTPS}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log("Hold up main is busted");
  }
} catch (err) {
  console.log("err", err);
}
