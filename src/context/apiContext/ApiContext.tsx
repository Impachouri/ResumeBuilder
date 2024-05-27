import { ReactNode, createContext, useReducer, Dispatch, FC } from "react";
import { ApiReducer } from "./ApiReducer";
import { ApiActionType, ApiStateType } from "./types";
import { UserType } from "../userContext/types";
import { SectionDataType } from "../appContext/types";
import initialState from "./InitialState";

type ApiDataProviderProps = {
  children: ReactNode;
};

const ApiContext = createContext<{
  state: ApiStateType<SectionDataType | UserType>;
  dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>;
}>({
  state: initialState,
  dispatch: () => {},
});

const ApiDataProvider: FC<ApiDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ApiReducer, initialState);

  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiDataProvider };
