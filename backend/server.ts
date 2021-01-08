import dotenv from "dotenv-safe";
dotenv.config();
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { createServer } from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import * as mongodb from "mongodb";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { __prod_cors__, __prod__, COOKIE_NAME } from "./constants";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { ServerContext } from "./ServerContext";

// old secret = secret! or Secret!

const { MongoClient } = mongodb;

const main = async () => {
  interface JWTData {
    id: string;
    email: string;
  }

  try {
    let db: any;
    const database = await MongoClient.connect(`${process.env.MONGO_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!database) throw new Error("Mongo not Connected!!!");
    db = database;

    const app = express();
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const corsConfig = __prod_cors__;
    app.use(cors(corsConfig));

    // TODO extract this into Route once working
    app.post("/login", async (req: Request, res: Response) => {
      const { email, password } = req.body;
      // console.log({ email });
      // console.log({ password });
      const userExists = await db
        .db("jwtCookie")
        .collection("users")
        .findOne({ email });
      console.log("userExists", userExists);

      if (!userExists) {
        res.status(404).json({
          success: false,
          message: `Could not find account: ${email}`,
        });
        return;
      }

      const match = await bcrypt.compare(password, userExists.password);
      if (!match) {
        //return error to user to let them know the password is incorrect
        res.status(401).json({
          success: false,
          message: "Incorrect credentials",
        });
        return;
      }

      const token = <JWTData | string>(
        jwt.sign(
          { email: userExists.email, id: userExists._id },
          process.env.JWT_SECRET_KEY!
        )
      );

      res.cookie(COOKIE_NAME, token, {
        httpOnly: __prod__,
        // domain: "example.com",
      });
      res.json({
        success: true,
        // token: token,
      });
    });

    app.post("/register", async (req: Request, res: Response) => {
      const { email, name, password, confirmPW } = req.body;
      console.log({ email });
      console.log({ name });
      console.log({ password });
      console.log({ confirmPW });
      const userExists = await db
        .db("jwtCookie")
        .collection("users")
        .findOne({ email });
      console.log("userExists", userExists);

      if (userExists) {
        res.status(404).json({
          success: false,
          message: `account already exists: ${email}`,
        });
        return;
      }
      const hashedPW = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: hashedPW,
      };

      const newUserRes = await db
        .db("jwtCookie")
        .collection("users")
        .insertOne(newUser);
      console.log("newUserRes", newUserRes);

      const token = <JWTData | string>(
        jwt.sign(
          { email: newUserRes.ops[0].email, id: newUserRes.ops[0]._id },
          process.env.JWT_SECRET_KEY!
        )
      );

      console.log("token from reg", token);
      res.cookie(COOKIE_NAME, token, {
        httpOnly: __prod__,
        // domain: "example.com",
      });
      res.json({
        success: true,
        // token: token,
      });
    });

    app.post("/logout", (req, res) => {
      res.clearCookie(COOKIE_NAME);
      res.clearCookie("signedin");
      res.json({ success: true });
    });

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
};

main();
