type ApiResponsetype<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

type FormDataType = {
  email: string;
  password: string;
};

export type { FormDataType, ApiResponsetype };
