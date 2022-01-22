"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        this.isApiError = true;
    }
}
exports.default = ApiError;
