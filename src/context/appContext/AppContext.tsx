import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { SectionDataAction, useSectionReducers } from "./AppReducer";
import { SectionDataType } from "./types";

export type SectionContext = {
  sectionState: SectionDataType;
  dispatch: Dispatch<SectionDataAction>;
  activeSection: keyof SectionDataType;
  setActiveSection: Dispatch<SetStateAction<keyof SectionDataType>>;
};

type SectionDataProviderProps = {
  children: ReactNode;
};

export const SectionDataContext = createContext<SectionContext | null>(null);

export const SectionDataProvider: FC<SectionDataProviderProps> = ({
  children,
}) => {
  const { sectionState, dispatch } = useSectionReducers();
  const [activeSection, setActiveSection] =
    useState<keyof SectionDataType>("personalInfo");

  return (
    <SectionDataContext.Provider
      value={{ sectionState, dispatch, activeSection, setActiveSection }}
    >
      {children}
    </SectionDataContext.Provider>
  );
};
