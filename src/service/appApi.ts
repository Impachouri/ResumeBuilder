import { Dispatch } from "react";
import { ApiActionType } from "../context/apiContext/types";
import { AppStateType } from "../context/appContext/types";
import { FETCH_ERROR, FETCH_SUCCESS } from "../context/constant";
import { axiosInstance } from "./axiosConfig";

const ResumeAPI = {
  create: async function (
    endpoint: string,
    data: AppStateType,
    dispatch: Dispatch<ApiActionType<AppStateType>>
  ) {
    try {
      const response = await axiosInstance.post(endpoint, data);
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch({ type: FETCH_ERROR, payload: errorMessage });
      console.log(error);
    }
  },

  update: async function (
    endpoint: string,
    data: AppStateType,
    dispatch: Dispatch<ApiActionType<AppStateType>>
  ) {
    try {
      const response = await axiosInstance.put(endpoint, data);
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch({ type: FETCH_ERROR, payload: errorMessage });
      console.log(error);
    }
  },

  delete: async function (
    endpoint: string,
    dispatch: Dispatch<ApiActionType<AppStateType>>
  ) {
    try {
      const response = await axiosInstance.delete(endpoint);
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      dispatch({ type: FETCH_ERROR, payload: errorMessage });
      console.log(error);
    }
  },
};

export default ResumeAPI;
