// import { ObjectID } from "mongodb";
import { ServerContext } from "../../ServerContext";
import {
  MeRes,
  MutationResolvers,
  QueryResolvers,
  QueryMeArgs,
  // SubscriptionResolvers,
} from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  // Subscription: SubscriptionResolvers;
}

// const SOMETHING_CHANGED = "something_changed";

// export const userResolvers: Resolvers = {
export const userResolvers: Resolvers = {
  Query: {
    me: async (
      _: any,
      { email }: QueryMeArgs,
      // { req, res, db, pubsub }: ServerContext
      { db }: ServerContext
    ): Promise<MeRes> => {
      console.log("me route hit");
      console.log("email", email);
      try {
        if (!email) {
          return {
            error: { message: "Sorry No Existing User with that Email" },
          };
        }
        const user = await db
          .db("jwtCookie")
          .collection("users")
          .findOne({ email });
        // pubsub.publish(SOMETHING_CHANGED, {
        //   somethingChanged: "Hey here is the me response",
        // });
        console.log("user from me", user);
        return { user };
      } catch (err) {
        console.log("err from me", err);
        return { error: { message: "Something went wrong Internally" } };
      }
    },
  },
  Mutation: {
    test: async () => {
      return "TESTING";
    },
  },
  // Subscription: {
  //   somethingChanged: {
  //     subscribe: (_: any, __: any, { connection }: any) => {
  //       console.log("connection from subscribe", connection);
  //       console.log("connection.context", connection.context);
  //       return connection.pubsub.asyncIterator(SOMETHING_CHANGED);
  //     },
  //   },
  // },
};
