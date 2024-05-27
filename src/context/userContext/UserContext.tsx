import { Dispatch, ReactNode, createContext, useReducer, FC } from "react";
import initialState from "./InitialState";
import UserReducer from "./UserReducer";
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
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserDataProvider };
