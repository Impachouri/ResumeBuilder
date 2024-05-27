import { useReducer } from "react";
import { SectionDataAction, SectionDataReducers } from "./AppReducer";
import { SectionDataType } from "./types";
import { defaultState } from "./InitialState";

export const useSectionReducers = () => {
  const [sectionState, dispatch] = useReducer(
    SectionDataReducers,
    defaultState
  );
  return { sectionState, dispatch } as {
    sectionState: SectionDataType;
    dispatch: React.Dispatch<SectionDataAction>;
  };
};
