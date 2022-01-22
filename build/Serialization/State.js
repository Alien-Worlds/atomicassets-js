"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
class SerializationState {
    constructor(data, position = 0) {
        this.data = data;
        this.position = position;
    }
}
exports.default = SerializationState;
function prepare(data) {
    return new SerializationState(data, 0);
}
exports.prepare = prepare;
