import { LOGGED_IN, LOGGED_OUT } from "../constant";

type UserStateType = {
  user: UserType | null;
};

type UserType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  refreshToken: string;
  __v: number;
};

type LOGGED_IN_TYPE = {
  type: typeof LOGGED_IN;
  payload: UserType;
};

type LOGGED_OUT_TYPE = {
  type: typeof LOGGED_OUT;
  payload: null;
};

type UserActionType = LOGGED_IN_TYPE | LOGGED_OUT_TYPE;

export type { UserStateType, UserType, UserActionType };
