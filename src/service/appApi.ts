import { Dispatch } from "react";
import { FETCH_REQUEST, FETCH_SUCCESS } from "../context/constant";
import asyncHandler from "../utils/asyncHanlder";
import { ApiActionType } from "../context/apiContext/types";
import { UserType } from "../context/userContext/types";
import { SectionDataType } from "../context/appContext/types";
import { api } from "./axios.config";
import { ApiResponsetype } from "./types";

const fetchResume = asyncHandler(
  async (dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>) => {
    dispatch({ type: FETCH_REQUEST });
    const response: ApiResponsetype<SectionDataType> = await api.get(
      "/resume/fetch-resume"
    );
    const data = response.data;
    console.log(data);
    dispatch({ type: FETCH_SUCCESS, payload: data });
  }
);

export { fetchResume };
