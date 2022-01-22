"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = __importDefault(require("../Errors/SchemaError"));
const __1 = require("..");
class ValueSchema {
    constructor(type) {
        if (typeof __1.ParserTypes[type] === 'undefined') {
            throw new SchemaError_1.default(`attribute type '${type}' not defined`);
        }
        this.parser = __1.ParserTypes[type];
    }
    deserialize(state) {
        return this.parser.deserialize(state);
    }
    serialize(value) {
        return this.parser.serialize(value);
    }
}
exports.default = ValueSchema;
