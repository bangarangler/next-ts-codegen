// @ts-nocheck
import { GraphQLClient } from "graphql-request";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type GeneralError = {
  __typename?: "GeneralError";
  message: Scalars["String"];
};

export type InputError = {
  __typename?: "InputError";
  source: Scalars["String"];
  message: Scalars["String"];
};

export type Todo = {
  __typename?: "Todo";
  _id: Scalars["ID"];
  userId: Scalars["String"];
  name: Scalars["String"];
};

export type TodoRes = {
  __typename?: "TodoRes";
  errors?: Maybe<Array<Maybe<InputError>>>;
  error?: Maybe<GeneralError>;
  todo?: Maybe<Todo>;
};

export type TodosRes = {
  __typename?: "TodosRes";
  error?: Maybe<GeneralError>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type AddTodoInput = {
  name: Scalars["String"];
  userId: Scalars["String"];
};

export type EditTodoInput = {
  name: Scalars["String"];
  userId: Scalars["String"];
  todoId: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  todo: TodoRes;
  todos: TodosRes;
  me: MeRes;
};

export type QueryTodoArgs = {
  todoId: Scalars["String"];
};

export type QueryMeArgs = {
  email: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addTodo: TodoRes;
  editTodo: TodoRes;
  deleteTodo: Scalars["Boolean"];
  test?: Maybe<Scalars["String"]>;
};

export type MutationAddTodoArgs = {
  options: AddTodoInput;
};

export type MutationEditTodoArgs = {
  options: EditTodoInput;
};

export type MutationDeleteTodoArgs = {
  todoId: Scalars["String"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
};

export type MeRes = {
  __typename?: "MeRes";
  error?: Maybe<GeneralError>;
  user?: Maybe<User>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type TodoDataFragment = { __typename?: "Todo" } & Pick<
  Todo,
  "_id" | "userId" | "name"
>;

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "_id" | "email" | "name"
>;

export type AddTodoMutationVariables = Exact<{
  options: AddTodoInput;
}>;

export type AddTodoMutation = { __typename?: "Mutation" } & {
  addTodo: { __typename?: "TodoRes" } & {
    errors?: Maybe<
      Array<
        Maybe<
          { __typename?: "InputError" } & Pick<InputError, "source" | "message">
        >
      >
    >;
    error?: Maybe<
      { __typename?: "GeneralError" } & Pick<GeneralError, "message">
    >;
    todo?: Maybe<{ __typename?: "Todo" } & TodoDataFragment>;
  };
};

export type DeleteTodoMutationVariables = Exact<{
  todoId: Scalars["String"];
}>;

export type DeleteTodoMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteTodo"
>;

export type EditTodoMutationVariables = Exact<{
  options: EditTodoInput;
}>;

export type EditTodoMutation = { __typename?: "Mutation" } & {
  editTodo: { __typename?: "TodoRes" } & {
    errors?: Maybe<
      Array<
        Maybe<
          { __typename?: "InputError" } & Pick<InputError, "source" | "message">
        >
      >
    >;
    error?: Maybe<
      { __typename?: "GeneralError" } & Pick<GeneralError, "message">
    >;
    todo?: Maybe<{ __typename?: "Todo" } & TodoDataFragment>;
  };
};

export type MeQueryVariables = Exact<{
  email: Scalars["String"];
}>;

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "MeRes" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "_id" | "name" | "email">
    >;
    error?: Maybe<
      { __typename?: "GeneralError" } & Pick<GeneralError, "message">
    >;
  };
};

export type TodoQueryVariables = Exact<{
  todoId: Scalars["String"];
}>;

export type TodoQuery = { __typename?: "Query" } & {
  todo: { __typename?: "TodoRes" } & {
    error?: Maybe<
      { __typename?: "GeneralError" } & Pick<GeneralError, "message">
    >;
    errors?: Maybe<
      Array<
        Maybe<
          { __typename?: "InputError" } & Pick<InputError, "source" | "message">
        >
      >
    >;
    todo?: Maybe<{ __typename?: "Todo" } & TodoDataFragment>;
  };
};

export type TodosQueryVariables = Exact<{ [key: string]: never }>;

export type TodosQuery = { __typename?: "Query" } & {
  todos: { __typename?: "TodosRes" } & {
    error?: Maybe<
      { __typename?: "GeneralError" } & Pick<GeneralError, "message">
    >;
    todos?: Maybe<Array<Maybe<{ __typename?: "Todo" } & TodoDataFragment>>>;
  };
};

export const TodoDataFragmentDoc = `
    fragment TodoData on Todo {
  _id
  userId
  name
}
    `;
export const UserInfoFragmentDoc = `
    fragment UserInfo on User {
  _id
  email
  name
}
    `;
export const AddTodoDocument = `
    mutation AddTodo($options: AddTodoInput!) {
  addTodo(options: $options) {
    errors {
      source
      message
    }
    error {
      message
    }
    todo {
      ...TodoData
    }
  }
}
    ${TodoDataFragmentDoc}`;
// export const useAddTodoMutation = <TError = unknown, TContext = unknown>(
//   client: GraphQLClient,
//   options?: UseMutationOptions<
//     AddTodoMutation,
//     TError,
//     AddTodoMutationVariables,
//     TContext
//   >
// ) =>
//   useMutation<AddTodoMutation, TError, AddTodoMutationVariables, TContext>(
//     (variables?: AddTodoMutationVariables) =>
//       fetcher<AddTodoMutation, AddTodoMutationVariables>(
//         client,
//         AddTodoDocument,
//         variables
//       )(),
//     options
//   );
// export const DeleteTodoDocument = `
//     mutation DeleteTodo($todoId: String!) {
//   deleteTodo(todoId: $todoId)
// }
//     `;
// export const useDeleteTodoMutation = <TError = unknown, TContext = unknown>(
//   client: GraphQLClient,
//   options?: UseMutationOptions<
//     DeleteTodoMutation,
//     TError,
//     DeleteTodoMutationVariables,
//     TContext
//   >
// ) =>
//   useMutation<
//     DeleteTodoMutation,
//     TError,
//     DeleteTodoMutationVariables,
//     TContext
//   >(
//     (variables?: DeleteTodoMutationVariables) =>
//       fetcher<DeleteTodoMutation, DeleteTodoMutationVariables>(
//         client,
//         DeleteTodoDocument,
//         variables
//       )(),
//     options
//   );
// export const EditTodoDocument = `
//     mutation EditTodo($options: EditTodoInput!) {
//   editTodo(options: $options) {
//     errors {
//       source
//       message
//     }
//     error {
//       message
//     }
//     todo {
//       ...TodoData
//     }
//   }
// }
//     ${TodoDataFragmentDoc}`;
// export const useEditTodoMutation = <TError = unknown, TContext = unknown>(
//   client: GraphQLClient,
//   options?: UseMutationOptions<
//     EditTodoMutation,
//     TError,
//     EditTodoMutationVariables,
//     TContext
//   >
// ) =>
//   useMutation<EditTodoMutation, TError, EditTodoMutationVariables, TContext>(
//     (variables?: EditTodoMutationVariables) =>
//       fetcher<EditTodoMutation, EditTodoMutationVariables>(
//         client,
//         EditTodoDocument,
//         variables
//       )(),
//     options
//   );
// export const MeDocument = `
//     query Me($email: String!) {
//   me(email: $email) {
//     user {
//       _id
//       name
//       email
//     }
//     error {
//       message
//     }
//   }
// }
//     `;
// export const useMeQuery = <TData = MeQuery, TError = unknown>(
//   client: GraphQLClient,
//   variables: MeQueryVariables,
//   options?: UseQueryOptions<MeQuery, TError, TData>
// ) =>
//   useQuery<MeQuery, TError, TData>(
//     ["Me", variables],
//     fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables),
//     options
//   );
// export const TodoDocument = `
//     query Todo($todoId: String!) {
//   todo(todoId: $todoId) {
//     error {
//       message
//     }
//     errors {
//       source
//       message
//     }
//     todo {
//       ...TodoData
//     }
//   }
// }
//     ${TodoDataFragmentDoc}`;
// export const useTodoQuery = <TData = TodoQuery, TError = unknown>(
//   client: GraphQLClient,
//   variables: TodoQueryVariables,
//   options?: UseQueryOptions<TodoQuery, TError, TData>
// ) =>
//   useQuery<TodoQuery, TError, TData>(
//     ["Todo", variables],
//     fetcher<TodoQuery, TodoQueryVariables>(client, TodoDocument, variables),
//     options
//   );
// export const TodosDocument = `
//     query Todos {
//   todos {
//     error {
//       message
//     }
//     todos {
//       ...TodoData
//     }
//   }
// }
//     ${TodoDataFragmentDoc}`;
// export const useTodosQuery = <TData = TodosQuery, TError = unknown>(
//   client: GraphQLClient,
//   variables?: TodosQueryVariables,
//   options?: UseQueryOptions<TodosQuery, TError, TData>
// ) =>
//   useQuery<TodosQuery, TError, TData>(
//     ["Todos", variables],
//     fetcher<TodosQuery, TodosQueryVariables>(client, TodosDocument, variables),
//     options
//   );
//

