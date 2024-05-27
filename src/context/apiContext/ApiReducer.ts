// import { ApiResponsetype } from "../../service/types";
import { SectionDataType } from "../appContext/types";
import { FETCH_REQUEST, FETCH_ERROR, FETCH_SUCCESS } from "../constant";
import { ApiActionType, ApiStateType } from "./types";
import { UserType } from "../userContext/types";

export const ApiReducer = (
  state: ApiStateType<SectionDataType | UserType>,
  action: ApiActionType<UserType | SectionDataType>
) => {
  switch (action.type) {
    case FETCH_REQUEST:
      console.log("fetch request called");
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      console.log("fetch request called");
      console.log("action.payload", " ", action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
        actionType: action.actionType,
      };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default ApiReducer;
