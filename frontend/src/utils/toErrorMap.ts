import { InputError } from "../generated/graphql";

export const toErrorMap = (errors: InputError[]) => {
  const errorMap: Record<string, string> = {};
  errors?.forEach(({ source, message }) => {
    errorMap[source] = message;
  });
  return errorMap;
};
