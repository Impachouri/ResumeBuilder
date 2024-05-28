import { SectionDataType } from "../appContext/types";
import { UserType } from "../userContext/types";
import { ApiStateType } from "./types";

const initialState: ApiStateType<UserType | SectionDataType> = {
  loading: false,
  data: null,
  error: null,
};

export default initialState;
