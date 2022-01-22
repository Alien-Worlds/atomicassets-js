"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RpcError extends Error {
    constructor(json) {
        if (json.error && json.error.details && json.error.details.length && json.error.details[0].message) {
            super(json.error.details[0].message);
        }
        else if (json.processed && json.processed.except && json.processed.except.message) {
            super(json.processed.except.message);
        }
        else {
            super(json.message);
        }
        this.json = json;
    }
}
exports.default = RpcError;
