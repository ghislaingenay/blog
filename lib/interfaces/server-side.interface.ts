export type Response<T = any> = {
  data: T;
  errorMessage?: string;
  isSuccess: boolean;
};

export type AsyncResponse<T> = Promise<Response<T>>;
