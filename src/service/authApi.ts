import { UserType } from "../context/userContext/types";
import { axiosInstance } from "./axiosConfig";
import {
  ApiResponseType,
  SignInFormDataType,
  SignUpFormDataType,
} from "./types";

const handleSignUp = async (
  formData: SignUpFormDataType
): Promise<UserType> => {
  try {
    const response = await axiosInstance.post("/user/signup", formData);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to sign in: " + error.message);
    } else {
      throw new Error("Failed to sign in");
    }
  }
};

const handleSignIn = async (
  formData: SignInFormDataType
): Promise<UserType> => {
  try {
    const response = await axiosInstance.post<ApiResponseType<UserType>>(
      "/user/signin",
      formData
    );
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to sign in: " + error.message);
    } else {
      throw new Error("Failed to sign in");
    }
  }
};

const handleSignOut = async () => {
  try {
    const response = await axiosInstance.post("/user/signout");
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to sign out: " + error.message);
    } else {
      throw new Error("Failed to sign out");
    }
  }
};

export { handleSignUp, handleSignIn, handleSignOut };
