"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_integer_1 = __importDefault(require("big-integer"));
const DeserializationError_1 = __importDefault(require("../../Errors/DeserializationError"));
const SerializationError_1 = __importDefault(require("../../Errors/SerializationError"));
const Binary_1 = require("../Binary");
class VariableIntegerParser {
    constructor(size, unsigned) {
        this.size = size;
        this.unsigned = unsigned;
    }
    deserialize(state) {
        let n = Binary_1.varint_decode(state);
        if (!this.unsigned) {
            n = Binary_1.zigzag_decode(n);
        }
        if (n.greaterOrEquals(big_integer_1.default(2).pow(this.size * 8 - (this.unsigned ? 0 : 1)))) {
            throw new DeserializationError_1.default('number \'' + n.toString() + '\' too large for given type');
        }
        if (this.size <= 6) {
            return n.toJSNumber();
        }
        return n.toString();
    }
    serialize(data) {
        let n = big_integer_1.default(data);
        if (n.greaterOrEquals(big_integer_1.default(2).pow(this.size * 8 - (this.unsigned ? 0 : 1)))) {
            throw new SerializationError_1.default('number \'' + n.toString() + '\' too large for given type');
        }
        if (!this.unsigned) {
            n = Binary_1.zigzag_encode(n);
        }
        return Binary_1.varint_encode(n);
    }
}
exports.default = VariableIntegerParser;
