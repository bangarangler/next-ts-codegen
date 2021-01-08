// import { ObjectID } from "mongodb";
import { ServerContext } from "../../ServerContext";
import {
  MutationResolvers,
  QueryResolvers,
  QueryMeArgs,
  TodosRes,
  TodoRes,
  MutationAddTodoArgs,
  // SubscriptionResolvers,
} from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  // Subscription: SubscriptionResolvers;
}

// const SOMETHING_CHANGED = "something_changed";

export const todoResolvers: Resolvers = {
  Query: {
    todos: async (_, __, { db }: ServerContext): Promise<TodosRes> => {
      try {
        const todosRes = await db
          .db("jwtCookie")
          .collection("todos")
          .find()
          .toArray();
        console.log({ todosRes });
        if (!todosRes) {
          return { error: { message: "Error fetching todos" } };
        }
        return { todos: todosRes };
        // return { todos: [] };
      } catch (err) {
        console.log("err", err);
        return { error: { message: "Internal Error" } };
      }
    },
  },
  Mutation: {
    addTodo: async (
      _,
      { options },
      { db }: ServerContext
    ): Promise<TodoRes> => {
      const errors = [];
      console.log("options", options);
      try {
        const { name, userId } = options;
        if (!name || name === "") {
          errors.push({ source: "name", message: "Todo must have a name" });
        }
        if (!userId || userId === "") {
          errors.push({ source: "userId", message: "userId must be provided" });
        }
        const newTodo = {
          name,
          userId,
        };
        console.log("newTodo", newTodo);
        const newTodoRes = await db
          .db("jwtCookie")
          .collection("todos")
          .insertOne(newTodo);
        console.log("newTodoRes", newTodoRes);
        if (errors.length > 0) {
          return { errors };
        }
        if (!newTodoRes) {
          return { error: { message: "Error adding Todo to DB" } };
        }
        return { todo: newTodoRes.ops[0] };
        // return { todo: { _id: "mdmd", userId: "mdmdmd", name: "test" } };
      } catch (err) {
        console.log("err", err);
        return { error: { message: "Internal Error" } };
      }
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
