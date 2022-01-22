"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Binary_1 = require("../Binary");
const VariableParser_1 = __importDefault(require("./VariableParser"));
class IPFSParser extends VariableParser_1.default {
    deserialize(state) {
        return Binary_1.base58_encode(super.deserialize(state));
    }
    serialize(data) {
        return super.serialize(Binary_1.base58_decode(data));
    }
}
exports.default = IPFSParser;
