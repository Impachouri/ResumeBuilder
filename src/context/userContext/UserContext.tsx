import { Dispatch, ReactNode, createContext, useReducer, FC } from "react";
import initialState from "./initialState";
import userReducer from "./userReducer";
import { UserActionType, UserStateType } from "./types";

type UserDataProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<{
  state: UserStateType;
  dispatch: Dispatch<UserActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const UserDataProvider: FC<UserDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserDataProvider };
