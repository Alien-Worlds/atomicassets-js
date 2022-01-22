"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_integer_1 = __importDefault(require("big-integer"));
const FixedParser_1 = __importDefault(require("./FixedParser"));
class FixedIntegerParser extends FixedParser_1.default {
    deserialize(state) {
        const data = super.deserialize(state).reverse();
        let n = big_integer_1.default(0);
        for (const byte of data) {
            n = n.shiftLeft(8);
            n = n.plus(byte);
        }
        if (this.size <= 6) {
            return n.toJSNumber();
        }
        return n.toString();
    }
    serialize(data) {
        let n = big_integer_1.default(data);
        const buffer = [];
        for (let i = 0; i < this.size; i++) {
            buffer.push(n.and(0xFF).toJSNumber());
            n = n.shiftRight(8);
        }
        return super.serialize(new Uint8Array(buffer));
    }
}
exports.default = FixedIntegerParser;
