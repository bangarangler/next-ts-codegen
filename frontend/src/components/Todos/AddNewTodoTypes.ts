export interface AddNewTodoState {
  name: string;
  uiError: string | Record<string, string>;
}

export type AddNewTodoActions =
  | { type: "input"; field: string; value: string }
  | { type: "reset" }
  | { type: "uiError"; payload: string };
