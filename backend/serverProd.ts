import dotenv from "dotenv-safe";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import https from "https";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import { __prod_cors__, __prod__, REDIS_COOKIE_NAME } from "./constants";
import { __prod_cors__, __prod__, URL } from "./constants";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { ServerContext } from "./ServerContext";
import { db } from "./mongoConfig/mongo";
import Redis from "ioredis";
// import { redirectToHTTPS } from "express-http-to-https";
import fs from "fs";
import { RedisPubSub } from "graphql-redis-subscriptions";
// import session from "express-session";
// import connectRedis from "connect-redis";

// REST IMPORTS
import { authRoutes } from "./routes/auth";
import { authMiddleware } from "./middleware/auth.middleware";

// old secret = secret! or Secret!

// interface JWTData {
//   id: string;
//   email: string;
// }

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
  // app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

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

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  // REDIS
  // const RedisStore = connectRedis(session);
  // const redis = new Redis(process.env.REDIS_PORT);
  // if (!redis) throw new Error("Redis Not Connected!!!");
  // app.set("trust proxy", 1) // needed if used with loadbalancer
  // const corsConfig = __prod_cors__;
  // app.use(cors(corsConfig));

  // app.use(
  //   session({
  //     name: REDIS_COOKIE_NAME,
  //     store: new RedisStore({ client: redis, disableTouch: true }),
  //     // cookie: {
  //     //   maxAge: mili,
  //     //   httpOnly: __prod__,
  //     //   sameSite: "lax",
  //     //   secure: __prod__,
  //     //   domain: __prod__ ? "domain here" : undefined
  //     // },
  //     saveUninitialized: false,
  //     secret: process.env.REDIS_SECRET!,
  //     resave: false,
  //   })
  // );

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const corsConfig = __prod_cors__;

  // let whitelist = [
  //   "https://client-cookies-test.vercel.app",
  //   "https://bang-k8s.com/auth/login",
  // ];
  // var corsOptions = {
  //   origin: function (origin: any, callback: any) {
  //     console.log("origin", origin);
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  // };
  // app.use(cors(corsOptions));
  app.use(cors(corsConfig));

  // REST ROUTES LOOK HERE FOR LOGIN, REGISTER, LOGOUT
  app.get("/", (req, res) => {
    res.send("NODE GRAPHQL BACKEND WE IN HERE");
  });

  app.use("/auth", authRoutes);
  app.use(authMiddleware);

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

  const httpServer = createServer(app);
  const httpsServer = https.createServer(credentials, app);
  server.installSubscriptionHandlers(httpServer);

  try {
    // const port = process.env.PORT;
    httpServer.listen(process.env.PORT_HTTP, () => {
      console.log(
        `Subscription ready at ws://${URL}:${process.env.PORT_HTTP}${server.subscriptionsPath}`
      );
      console.log(
        `Server ready at http://${URL}:${process.env.PORT_HTTP}${server.graphqlPath}`
      );
    });

    httpsServer.listen(process.env.PORT_HTTPS, () => {
      console.log(
        `Subscription ready at ws://${URL}:${process.env.PORT_HTTPS}${server.subscriptionsPath}`
      );
      console.log(
        `Server ready at http://${URL}:${process.env.PORT_HTTPS}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log("Hold up main is busted");
  }
} catch (err) {
  console.log("err");
}
