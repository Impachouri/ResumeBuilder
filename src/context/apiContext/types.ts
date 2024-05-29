import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from "../constant";

type ApiStateType<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
};

type ApiActionType<T> =
  | { type: typeof FETCH_REQUEST }
  | { type: typeof FETCH_SUCCESS; payload: T | null }
  | { type: typeof FETCH_ERROR; payload: string };

export type { ApiStateType, ApiActionType };
