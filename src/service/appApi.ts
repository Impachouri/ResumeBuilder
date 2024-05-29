// import { Dispatch } from "react";
// import { FETCH_REQUEST, FETCH_SUCCESS } from "../context/constant";
// import asyncHandler from "../utils/asyncHanlder";
// import { ApiActionType } from "../context/apiContext/types";
// import { UserType } from "../context/userContext/types";
// import { AppStateType } from "../context/AppContextType/types";
// import { axiosInstance } from "./axios.config";
// import { ApiResponseType } from "./types";

// const fetchResume = asyncHandler(
//   async (dispatch: Dispatch<ApiActionType<AppStateType | UserType>>) => {
//     dispatch({ type: FETCH_REQUEST });
//     const response: ApiResponseType<AppStateType> = await axiosInstance.get(
//       "/resume/fetch-resume"
//     );
//     const data = response.data;
//     console.log(data);
//     dispatch({ type: FETCH_SUCCESS, payload: data });
//   }
// );

// export { fetchResume };
