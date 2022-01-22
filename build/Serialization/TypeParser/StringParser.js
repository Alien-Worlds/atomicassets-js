"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VariableParser_1 = __importDefault(require("./VariableParser"));
class StringParser extends VariableParser_1.default {
    deserialize(state) {
        return new TextDecoder().decode(super.deserialize(state));
    }
    serialize(data) {
        return super.serialize(new TextEncoder().encode(data));
    }
}
exports.default = StringParser;
