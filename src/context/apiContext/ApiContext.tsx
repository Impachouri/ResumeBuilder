import { ReactNode, createContext, useReducer, Dispatch, FC } from "react";
import { ApiActionType, ApiStateType } from "./types";
import { UserType } from "../userContext/types";
import { SectionDataType } from "../appContext/types";
import initialState from "./InitialState";
import apiReducer from "./apiReducer";

type ApiDataProviderProps = {
  children: ReactNode;
};

const ApiContext = createContext<{
  state: ApiStateType<UserType | SectionDataType>;
  dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>;
}>({
  state: initialState,
  dispatch: () => {},
});

const ApiDataProvider: FC<ApiDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiDataProvider };
