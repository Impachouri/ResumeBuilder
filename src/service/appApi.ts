import { Dispatch } from "react";
import { ApiActionType } from "../context/apiContext/types";
import {
  AchievementType,
  AppStateType,
  EducationType,
  ExperienceType,
  PersonalInfoType,
  ProjectType,
  SkillType,
} from "../context/appContext/types";
import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from "../context/constant";
import { axiosInstance } from "./axiosConfig";

const ResumeAPI = {
  create: async function (
    endpoint: string,
    data:
      | PersonalInfoType
      | ExperienceType
      | EducationType
      | ProjectType
      | SkillType
      | AchievementType,
    dispatch: Dispatch<ApiActionType<AppStateType>>
  ) {
    try {
      dispatch({ type: FETCH_REQUEST });
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
    data:
      | PersonalInfoType
      | ExperienceType
      | EducationType
      | ProjectType
      | SkillType
      | AchievementType,
    dispatch: Dispatch<ApiActionType<AppStateType>>
  ) {
    try {
      dispatch({ type: FETCH_REQUEST });
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
      dispatch({ type: FETCH_REQUEST });
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
