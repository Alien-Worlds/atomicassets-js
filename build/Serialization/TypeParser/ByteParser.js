"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteParser = void 0;
const VariableParser_1 = __importDefault(require("./VariableParser"));
class ByteParser extends VariableParser_1.default {
    deserialize(state) {
        return super.deserialize(state);
    }
    serialize(data) {
        return super.serialize(data);
    }
}
exports.ByteParser = ByteParser;
