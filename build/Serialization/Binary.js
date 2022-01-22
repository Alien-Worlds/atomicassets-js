"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byte_vector_to_int = exports.int_to_byte_vector = exports.concat_byte_arrays = exports.hex_encode = exports.hex_decode = exports.base58_encode = exports.base58_decode = exports.zigzag_decode = exports.zigzag_encode = exports.integer_unsign = exports.integer_sign = exports.varint_decode = exports.varint_encode = void 0;
const big_integer_1 = __importDefault(require("big-integer"));
const DeserializationError_1 = __importDefault(require("../Errors/DeserializationError"));
const SerializationError_1 = __importDefault(require("../Errors/SerializationError"));
const Base_1 = __importDefault(require("./Coders/Base"));
function varint_encode(input) {
    const bytes = [];
    let n = big_integer_1.default(input);
    if (n.lesser(0)) {
        throw new SerializationError_1.default('cant pack negative integer');
    }
    while (true) {
        const byte = n.and(0x7F);
        n = n.shiftRight(7);
        if (n.equals(0)) {
            bytes.push(byte.toJSNumber());
            break;
        }
        bytes.push(byte.toJSNumber() + 128);
    }
    return new Uint8Array(bytes);
}
exports.varint_encode = varint_encode;
function varint_decode(state) {
    let result = big_integer_1.default(0);
    for (let i = 0; true; i++) {
        if (state.position >= state.data.length) {
            throw new DeserializationError_1.default('failed to unpack integer');
        }
        const byte = big_integer_1.default(state.data[state.position]);
        state.position += 1;
        if (byte.lesser(128)) {
            result = result.plus(byte.shiftLeft(7 * i));
            break;
        }
        result = result.plus(byte.and(0x7F).shiftLeft(7 * i));
    }
    return result;
}
exports.varint_decode = varint_decode;
function integer_sign(input, size) {
    const n = big_integer_1.default(input);
    if (n.greaterOrEquals(big_integer_1.default(2).pow(8 * size - 1))) {
        throw new Error('cannot sign integer: too big');
    }
    if (n.greaterOrEquals(0)) {
        return n;
    }
    return n.negate().xor(big_integer_1.default(2).pow(8 * size).minus(1)).plus(1);
}
exports.integer_sign = integer_sign;
function integer_unsign(input, size) {
    const n = big_integer_1.default(input);
    if (n.greater(big_integer_1.default(2).pow(8 * size))) {
        throw new Error('cannot unsign integer: too big');
    }
    if (n.greater(big_integer_1.default(2).pow(8 * size - 1))) {
        return n.minus(1).xor(big_integer_1.default(2).pow(8 * size).minus(1)).negate();
    }
    return n;
}
exports.integer_unsign = integer_unsign;
function zigzag_encode(input) {
    const n = big_integer_1.default(input);
    if (n.lesser(0)) {
        return n.plus(1).multiply(-2).plus(1);
    }
    return n.multiply(2);
}
exports.zigzag_encode = zigzag_encode;
function zigzag_decode(input) {
    const n = big_integer_1.default(input);
    if (n.mod(2).equals(0)) {
        return n.divmod(2).quotient;
    }
    return n.divmod(2).quotient.multiply(-1).minus(1);
}
exports.zigzag_decode = zigzag_decode;
const bs58 = new Base_1.default('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
function base58_decode(data) {
    return bs58.decode(data);
}
exports.base58_decode = base58_decode;
function base58_encode(data) {
    return bs58.encode(data);
}
exports.base58_encode = base58_encode;
function hex_decode(hex) {
    const bytes = hex.match(/.{1,2}/g);
    if (!bytes) {
        return new Uint8Array(0);
    }
    return new Uint8Array(bytes.map((byte) => parseInt(byte, 16)));
}
exports.hex_decode = hex_decode;
function hex_encode(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}
exports.hex_encode = hex_encode;
function concat_byte_arrays(arr) {
    // concat all bytearrays into one array
    const data = new Uint8Array(arr.reduce((acc, val) => acc + val.length, 0));
    let offset = 0;
    for (const bytes of arr) {
        data.set(bytes, offset);
        offset += bytes.length;
    }
    return data;
}
exports.concat_byte_arrays = concat_byte_arrays;
function int_to_byte_vector(n) {
    const bytes = [];
    let num = big_integer_1.default(n);
    while (num.notEquals(0)) {
        bytes.push(num.and(0xFF).toJSNumber());
        num = num.shiftRight(8);
    }
    return new Uint8Array(bytes);
}
exports.int_to_byte_vector = int_to_byte_vector;
function byte_vector_to_int(bytes) {
    let num = big_integer_1.default(0);
    for (let i = 0; i < bytes.length; i++) {
        num = num.plus(big_integer_1.default(bytes[i]).shiftLeft(8 * i));
    }
    return num.toJSNumber();
}
exports.byte_vector_to_int = byte_vector_to_int;
