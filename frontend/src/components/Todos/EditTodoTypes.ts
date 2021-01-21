export interface EditTodoState {
  name: string;
  uiError: string | Record<string, string>;
}

export type EditTodoActions =
  | { type: "input"; field: string; value: string }
  | { type: "reset" }
  | { type: "uiError"; payload: string };
