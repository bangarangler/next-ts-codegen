import { useQuery, UseQueryOptions } from "react-query";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: "POST",
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
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
  id: Scalars["ID"];
  user: Scalars["Int"];
  name: Scalars["String"];
};

export type TodoRes = {
  __typename?: "TodoRes";
  errors?: Maybe<InputError>;
  todo?: Maybe<Todo>;
};

export type TodosRes = {
  __typename?: "TodosRes";
  error?: Maybe<GeneralError>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type AddTodoInput = {
  title: Scalars["String"];
  body: Scalars["String"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type MeRes = {
  __typename?: "MeRes";
  error?: Maybe<GeneralError>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: "Query";
  me: MeRes;
};

export type QueryMeArgs = {
  email: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  test?: Maybe<Scalars["String"]>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "_id" | "email" | "name"
>;

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

export const UserInfoFragmentDoc = `
    fragment UserInfo on User {
  _id
  email
  name
}
    `;
export const MeDocument = `
    query Me($email: String!) {
  me(email: $email) {
    user {
      _id
      name
      email
    }
    error {
      message
    }
  }
}
    `;
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>
) =>
  useQuery<MeQuery, TError, TData>(
    ["Me", variables],
    fetcher<MeQuery, MeQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      MeDocument,
      variables
    ),
    options
  );

