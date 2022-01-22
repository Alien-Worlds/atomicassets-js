"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeserializationError_1 = __importDefault(require("../../Errors/DeserializationError"));
const SerializationError_1 = __importDefault(require("../../Errors/SerializationError"));
class FixedParser {
    constructor(size) {
        this.size = size;
    }
    deserialize(state) {
        state.position += this.size;
        const data = state.data.slice(state.position - this.size, state.position);
        if (data.length !== this.size) {
            throw new DeserializationError_1.default('FixedParser: read past end');
        }
        return data;
    }
    serialize(data) {
        if (data.length !== this.size) {
            throw new SerializationError_1.default(`input data does not conform fixed size`);
        }
        return data;
    }
}
exports.default = FixedParser;
