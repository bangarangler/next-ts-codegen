// All resolvers being used are imported here and turned into single reolvers

// array
import { mergeResolvers } from "@graphql-tools/merge";

import { userResolvers } from "./userResolvers";
import { todoResolvers } from "./todoResolvers";
const combinedResolvers = [userResolvers, todoResolvers];

export const resolvers = mergeResolvers(combinedResolvers as []);
