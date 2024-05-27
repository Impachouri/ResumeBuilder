import { Dispatch } from "react";
import { FETCH_REQUEST, FETCH_SUCCESS } from "../context/constant";
import asyncHandler from "../utils/asyncHanlder";
import { ApiActionType } from "../context/apiContext/types";
import { UserType } from "../context/userContext/types";
import { SectionDataType } from "../context/appContext/types";
import { api } from "./axios.config";
import { ApiResponsetype, FormDataType } from "./types";

const signIn = asyncHandler(
  async (
    dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>,
    formData: FormDataType
  ) => {
    dispatch({ type: FETCH_REQUEST });
    const response = await api.post<ApiResponsetype<UserType>>(
      "/user/signin",
      formData
    );
    console.log(response);
    const data = response.data.data;
    dispatch({ type: FETCH_SUCCESS, payload: data, actionType: "SIGNIN" });
  }
);

const signUp = asyncHandler(
  async (
    dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>,
    formData: FormDataType
  ) => {
    dispatch({ type: FETCH_REQUEST });
    const response = await api.post("/user/signup", formData);
    const data = response.data.data;
    dispatch({ type: FETCH_SUCCESS, payload: data, actionType: "SIGNUP" });
  }
);

const signOut = asyncHandler(
  async (dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>) => {
    dispatch({ type: FETCH_REQUEST });
    const response = await api.post<ApiResponsetype<UserType>>("/user/signout");
    const data = response.data.data;
    dispatch({ type: FETCH_SUCCESS, payload: data, actionType: "SIGNOUT" });
  }
);
export { signIn, signUp, signOut };
