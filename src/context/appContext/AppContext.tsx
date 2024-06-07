import { createContext, FC, useReducer, useState } from "react";
import { appReducer } from "./appReducer";
import { initialState } from "./initialState";
import {
  AppStateType,
  AppDataProviderProps,
  AppContextStateType,
} from "./types";

const AppContext = createContext<AppContextStateType>({
  state: initialState,
  dispatch: () => {},
  activeSection: "personalInfo",
  setActiveSection: () => {},
  resumeProfile: "backend",
  setResumeProfile: () => {},
});

const AppDataProvider: FC<AppDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [activeSection, setActiveSection] =
    useState<keyof AppStateType>("personalInfo");
  const [resumeProfile, setResumeProfile] = useState<string>("backend");

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        activeSection,
        setActiveSection,
        resumeProfile,
        setResumeProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppDataProvider };
