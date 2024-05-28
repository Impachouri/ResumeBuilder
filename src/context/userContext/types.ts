import { LOGGED_IN, LOGGED_OUT } from "../constant";

type UserType = {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
  refreshToken: string;
  __v: number;
};

type UserStateType = {
  user: UserType | null;
};

type UserActionType =
  | { type: typeof LOGGED_IN; payload: UserType }
  | { type: typeof LOGGED_OUT; payload: null };

export type { UserStateType, UserType, UserActionType };
