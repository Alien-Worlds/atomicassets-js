"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Binary_1 = require("../Serialization/Binary");
class VectorSchema {
    constructor(element) {
        this.element = element;
    }
    deserialize(state) {
        const length = Binary_1.varint_decode(state).toJSNumber();
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(this.element.deserialize(state));
        }
        return array;
    }
    serialize(array) {
        const data = [Binary_1.varint_encode(array.length)];
        for (const element of array) {
            data.push(this.element.serialize(element));
        }
        return Binary_1.concat_byte_arrays(data);
    }
}
exports.default = VectorSchema;
