import { useReducer } from "react";
import { AppActionType, AppStateType } from "./types";
import { initialState } from "./initialState";
import { appReducer } from "./appReducer";

export const useSectionReducers = () => {
  const [sectionState, dispatch] = useReducer(appReducer, initialState);
  return { sectionState, dispatch } as {
    sectionState: AppStateType;
    dispatch: React.Dispatch<AppActionType>;
  };
};
