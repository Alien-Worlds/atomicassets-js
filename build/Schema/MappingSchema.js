"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = __importDefault(require("../Errors/SchemaError"));
const Binary_1 = require("../Serialization/Binary");
class MappingSchema {
    constructor(attributes) {
        this.attributes = attributes;
        this.reserved = 4;
    }
    deserialize(state, upwardsCompatible = false) {
        const object = {};
        while (state.position < state.data.length) {
            const identifier = Binary_1.varint_decode(state);
            if (identifier.equals(0)) {
                break;
            }
            const attribute = this.getAttribute(identifier.toJSNumber(), !upwardsCompatible);
            if (attribute) {
                object[attribute.name] = attribute.value.deserialize(state);
            }
        }
        return object;
    }
    serialize(object) {
        const data = [];
        for (let i = 0; i < this.attributes.length; i++) {
            const attribute = this.attributes[i];
            if (typeof object[attribute.name] === 'undefined') {
                continue;
            }
            data.push(Binary_1.varint_encode(i + this.reserved));
            data.push(attribute.value.serialize(object[attribute.name]));
        }
        data.push(Binary_1.varint_encode(0));
        return Binary_1.concat_byte_arrays(data);
    }
    getAttribute(identifier, throwError = true) {
        const attributeID = identifier - this.reserved;
        if (attributeID >= this.attributes.length) {
            if (throwError) {
                throw new SchemaError_1.default('attribute does not exists');
            }
            return;
        }
        return this.attributes[Number(attributeID)];
    }
}
exports.default = MappingSchema;
