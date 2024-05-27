import { LOGGED_IN, LOGGED_OUT } from "../constant";
import { UserActionType, UserStateType } from "./types";

const UserReducer = (state: UserStateType, action: UserActionType) => {
  switch (action.type) {
    case LOGGED_IN:
      console.log("LOGGED_IN called - ", action.payload);
      return { ...state, user: action.payload };
    case LOGGED_OUT:
      console.log("LOGGED_OUT called - ", action.payload);
      return { ...state, user: null };
    default:
      return state;
  }
};

export default UserReducer;
