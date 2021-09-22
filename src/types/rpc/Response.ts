export type Response<T> = ErrorResponse | (SuccessResponse & T);

export interface ErrorResponse {
    success: false;
    error: string;
}

export interface SuccessResponse {
    success: true;
}
