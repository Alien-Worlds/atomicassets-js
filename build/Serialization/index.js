"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = exports.serialize = void 0;
const MappingSchema_1 = __importDefault(require("../Schema/MappingSchema"));
const Binary_1 = require("./Binary");
const State_1 = __importDefault(require("./State"));
function serialize(object, schema) {
    const data = schema.serialize(object);
    // remove terminating 0 byte because it is unnecessary
    if (schema instanceof MappingSchema_1.default) {
        return data.slice(0, data.length - 1);
    }
    return data;
}
exports.serialize = serialize;
function deserialize(data, schema) {
    if (schema instanceof MappingSchema_1.default) {
        data = Binary_1.concat_byte_arrays([data, Binary_1.varint_encode(0)]);
    }
    const state = new State_1.default(data, 0);
    return schema.deserialize(state);
}
exports.deserialize = deserialize;
