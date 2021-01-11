export interface AddNewTodoState {
  name: string;
  userId: string;
}

export type AddNewTodoActions =
  | { type: "input"; field: string; value: string }
  | { type: "reset" }
  | { type: "identifier"; payload: string };
