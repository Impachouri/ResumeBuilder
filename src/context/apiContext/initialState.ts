import { AppStateType } from "../appContext";
import { UserType } from "../userContext/types";
import { ApiStateType } from "./types";

const initialState: ApiStateType<UserType | AppStateType> = {
  loading: false,
  data: null,
  error: null,
};

export default initialState;
