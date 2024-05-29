import { LOGGED_IN, LOGGED_OUT } from "../constant";
import { UserActionType, UserStateType } from "./types";

const userReducer = (state: UserStateType, action: UserActionType) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, user: action.payload };
    case LOGGED_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;
