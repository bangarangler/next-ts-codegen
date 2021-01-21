export interface RegisterState {
  email: string;
  password: string;
  confirmPW: string;
  name: string;
}

export type RegisterActions = { type: "input"; field: string; value: string };
