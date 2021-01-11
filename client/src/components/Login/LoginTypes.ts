export interface State {
  email: string;
  password: string;
}

export type Actions = {
  type: "input";
  field: string;
  value: string;
};
