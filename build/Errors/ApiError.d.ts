export default class ApiError extends Error {
    readonly message: any;
    readonly status: number;
    isApiError: boolean;
    constructor(message: any, status: number);
}
