import dotenv from "dotenv-safe";
dotenv.config();
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { createServer } from "http";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { __prod_cors__, __prod__, COOKIE_NAME } from "./constants";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { ServerContext } from "./ServerContext";
import { db } from "./mongoConfig/mongo";

// REST IMPORTS
import { authRoutes } from "./routes/auth";

// old secret = secret! or Secret!

interface JWTData {
  id: string;
  email: string;
}

try {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const corsConfig = __prod_cors__;
  app.use(cors(corsConfig));

  // REST ROUTES LOOK HERE FOR LOGIN, REGISTER, LOGOUT
  app.use("/auth", authRoutes);

  const context = async ({ req, res }: ServerContext) => {
    // const token = <string>req?.headers?.authorization || "";
    console.log("req?.cookies", req?.cookies);
    const token = req?.cookies[COOKIE_NAME] || "";
    console.log("token from context", token);
    try {
      const payload: JWTData | any = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!
      );
      console.log("payload", payload);
      // return payload;
      return { req, res, db, payload };
    } catch (e) {
      throw new AuthenticationError(
        "Authentication token is invalid, please log in"
      );
    }
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

  try {
    const port = process.env.PORT;
    httpServer.listen(port, () => {
      console.log(
        `Subscription ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
      );
      console.log(
        `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log("Hold up main is busted");
  }
} catch (err) {
  console.log("err");
}
