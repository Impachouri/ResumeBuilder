/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { FETCH_ERROR } from "../context/constant";
import { ApiActionType } from "../context/apiContext/types";
import { UserType } from "../context/userContext/types";
import { SectionDataType } from "../context/appContext/types";

const asyncHandler = (
  fn: (
    dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>,
    ...args: any
  ) => Promise<void>
) => {
  return async (
    dispatch: Dispatch<ApiActionType<SectionDataType | UserType>>,
    ...args: any
  ) => {
    try {
      await fn(dispatch, ...args);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.log(errorMessage);
      dispatch({ type: FETCH_ERROR, payload: errorMessage });
    }
  };
};

export default asyncHandler;
