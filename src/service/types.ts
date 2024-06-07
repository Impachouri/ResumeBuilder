import {
  EducationType,
  ExperienceType,
  PersonalInfoType,
  ProjectType,
} from "../context/appContext/types";

type ApiResponseType<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

type ApiRequestType =
  | PersonalInfoType
  | ExperienceType
  | EducationType
  | ProjectType
  | string;

type SignInFormDataType = {
  email: string;
  password: string;
};

type SignUpFormDataType = {
  fName: string;
  lName: string;
  email: string;
  password: string;
};

export type {
  SignUpFormDataType,
  SignInFormDataType,
  ApiResponseType,
  ApiRequestType,
};
