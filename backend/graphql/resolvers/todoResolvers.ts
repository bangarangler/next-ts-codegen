import { ObjectID } from "mongodb";
import { ServerContext } from "../../ServerContext";
import {
  MutationResolvers,
  QueryResolvers,
  TodosRes,
  TodoRes,
  // MutationAddTodoArgs,
  // SubscriptionResolvers,
} from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  // Subscription: SubscriptionResolvers;
}

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
    todo: async (_, { todoId }, { db }: ServerContext): Promise<TodoRes> => {
      const errors = [];
      try {
        if (!todoId || todoId === "")
          errors.push({ source: "todoId", message: "bad todoId" });
        if (errors.length > 0) {
          return { errors };
        }
        const foundTodo = await db
          .db("jwtCookie")
          .collection("todos")
          .findOne({ _id: new ObjectID(todoId) });

        if (!foundTodo) {
          return { error: { message: "No Todo found with that Id" } };
        }
        return { todo: foundTodo };
        // return { todo: { _id: "dnmdmd", name: "mdmd", userId: "mdmd" } };
      } catch (err) {
        console.log("err from todo query catch");
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

        const newTodoRes = await db
          .db("jwtCookie")
          .collection("todos")
          .insertOne(newTodo);

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
