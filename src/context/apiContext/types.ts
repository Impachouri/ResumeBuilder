import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from "../constant";

type ApiStateType<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
  actionType: string | null;
};

type FETCH_REQUEST_TYPE = {
  type: typeof FETCH_REQUEST;
};

type FETCH_SUCCESS_TYPE<T> = {
  type: typeof FETCH_SUCCESS;
  payload: T;
  actionType: string;
};

type FETCH_ERROR_TYPE = {
  type: typeof FETCH_ERROR;
  payload: string;
};

type ApiActionType<T> =
  | FETCH_REQUEST_TYPE
  | FETCH_SUCCESS_TYPE<T>
  | FETCH_ERROR_TYPE;

export type { ApiStateType, ApiActionType };
