"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeserializationError_1 = __importDefault(require("../../Errors/DeserializationError"));
const Binary_1 = require("../Binary");
class VariableParser {
    deserialize(state) {
        const length = Binary_1.varint_decode(state).toJSNumber();
        state.position += length;
        const data = state.data.slice(state.position - length, state.position);
        if (data.length !== length) {
            throw new DeserializationError_1.default(`VariableParser: read past end`);
        }
        return data;
    }
    serialize(data) {
        return Binary_1.concat_byte_arrays([Binary_1.varint_encode(data.length), data]);
    }
}
exports.default = VariableParser;
