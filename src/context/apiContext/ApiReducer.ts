import { AppStateType } from "../appContext/types";
import { FETCH_REQUEST, FETCH_ERROR, FETCH_SUCCESS } from "../constant";
import { UserType } from "../userContext/types";
import { ApiActionType, ApiStateType } from "./types";

const apiReducer = (
  state: ApiStateType<AppStateType | UserType>,
  action: ApiActionType<AppStateType | UserType>
): ApiStateType<AppStateType | UserType> => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default apiReducer;
