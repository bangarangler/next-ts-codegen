import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};









export type GeneralError = {
  __typename?: 'GeneralError';
  message: Scalars['String'];
};

export type InputError = {
  __typename?: 'InputError';
  source: Scalars['String'];
  message: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  userId: Scalars['String'];
  name: Scalars['String'];
};

export type TodoRes = {
  __typename?: 'TodoRes';
  errors?: Maybe<Array<Maybe<InputError>>>;
  error?: Maybe<GeneralError>;
  todo?: Maybe<Todo>;
};

export type TodosRes = {
  __typename?: 'TodosRes';
  error?: Maybe<GeneralError>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type AddTodoInput = {
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type EditTodoInput = {
  name: Scalars['String'];
  userId: Scalars['String'];
  todoId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  todo: TodoRes;
  todos: TodosRes;
  me: MeRes;
};


export type QueryTodoArgs = {
  todoId: Scalars['String'];
};


export type QueryMeArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: TodoRes;
  editTodo: TodoRes;
  deleteTodo: Scalars['Boolean'];
  test?: Maybe<Scalars['String']>;
};


export type MutationAddTodoArgs = {
  options: AddTodoInput;
};


export type MutationEditTodoArgs = {
  options: EditTodoInput;
};


export type MutationDeleteTodoArgs = {
  todoId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type MeRes = {
  __typename?: 'MeRes';
  error?: Maybe<GeneralError>;
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  somethingChanged?: Maybe<Scalars['String']>;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  GeneralError: ResolverTypeWrapper<GeneralError>;
  String: ResolverTypeWrapper<Scalars['String']>;
  InputError: ResolverTypeWrapper<InputError>;
  Todo: ResolverTypeWrapper<Todo>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  TodoRes: ResolverTypeWrapper<TodoRes>;
  TodosRes: ResolverTypeWrapper<TodosRes>;
  AddTodoInput: AddTodoInput;
  EditTodoInput: EditTodoInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  MeRes: ResolverTypeWrapper<MeRes>;
  Subscription: ResolverTypeWrapper<{}>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  GeneralError: GeneralError;
  String: Scalars['String'];
  InputError: InputError;
  Todo: Todo;
  ID: Scalars['ID'];
  TodoRes: TodoRes;
  TodosRes: TodosRes;
  AddTodoInput: AddTodoInput;
  EditTodoInput: EditTodoInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
  User: User;
  MeRes: MeRes;
  Subscription: {};
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GeneralErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralError'] = ResolversParentTypes['GeneralError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InputErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InputError'] = ResolversParentTypes['InputError']> = {
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoRes'] = ResolversParentTypes['TodoRes']> = {
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['InputError']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['GeneralError']>, ParentType, ContextType>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodosResResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodosRes'] = ResolversParentTypes['TodosRes']> = {
  error?: Resolver<Maybe<ResolversTypes['GeneralError']>, ParentType, ContextType>;
  todos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  todo?: Resolver<ResolversTypes['TodoRes'], ParentType, ContextType, RequireFields<QueryTodoArgs, 'todoId'>>;
  todos?: Resolver<ResolversTypes['TodosRes'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['MeRes'], ParentType, ContextType, RequireFields<QueryMeArgs, 'email'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addTodo?: Resolver<ResolversTypes['TodoRes'], ParentType, ContextType, RequireFields<MutationAddTodoArgs, 'options'>>;
  editTodo?: Resolver<ResolversTypes['TodoRes'], ParentType, ContextType, RequireFields<MutationEditTodoArgs, 'options'>>;
  deleteTodo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, 'todoId'>>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeRes'] = ResolversParentTypes['MeRes']> = {
  error?: Resolver<Maybe<ResolversTypes['GeneralError']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  somethingChanged?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "somethingChanged", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  GeneralError?: GeneralErrorResolvers<ContextType>;
  InputError?: InputErrorResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  TodoRes?: TodoResResolvers<ContextType>;
  TodosRes?: TodosResResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  MeRes?: MeResResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    