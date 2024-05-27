import { SectionDataType } from "../appContext/types";
import { ApiStateType } from "./types";
import { UserType } from "../userContext/types";

const initialState: ApiStateType<SectionDataType | UserType> = {
  loading: false,
  data: null,
  error: null,
  actionType: null,
};

export default initialState;
