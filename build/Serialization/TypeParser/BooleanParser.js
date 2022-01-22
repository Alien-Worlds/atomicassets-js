"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FixedParser_1 = __importDefault(require("./FixedParser"));
class BooleanParser extends FixedParser_1.default {
    constructor() {
        super(1);
    }
    deserialize(state) {
        const data = super.deserialize(state);
        return data[0] === 1 ? 1 : 0;
    }
    serialize(data) {
        return super.serialize(new Uint8Array([data ? 1 : 0]));
    }
}
exports.default = BooleanParser;
