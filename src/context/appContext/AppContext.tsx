import { createContext, FC, useReducer, useState } from "react";
import { appReducer } from "./appReducer";
import { initialState } from "./initialState";
import {
  AppStateType,
  AppDataProviderProps,
  AppContextStateType,
} from "./types";

const AppContext = createContext<AppContextStateType | null>(null);

const AppDataProvider: FC<AppDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [activeSection, setActiveSection] =
    useState<keyof AppStateType>("personalInfo");

  return (
    <AppContext.Provider
      value={{ state, dispatch, activeSection, setActiveSection }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppDataProvider };
