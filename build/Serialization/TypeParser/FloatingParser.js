"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FixedParser_1 = __importDefault(require("./FixedParser"));
// tslint:disable-next-line:no-var-requires
const fp = require('../../../lib/float');
class FloatingParser extends FixedParser_1.default {
    constructor(isDouble) {
        super(isDouble ? 8 : 4);
        this.isDouble = isDouble;
    }
    deserialize(state) {
        if (this.isDouble) {
            return fp.readDoubleLE(super.deserialize(state));
        }
        return fp.readFloatLE(super.deserialize(state));
    }
    serialize(data) {
        // tslint:disable-next-line:prefer-const
        let bytes = [];
        if (this.isDouble) {
            fp.writeDoubleLE(bytes, data);
            return super.serialize(new Uint8Array(bytes));
        }
        fp.writeFloatLE(bytes, data);
        return super.serialize(new Uint8Array(bytes));
    }
}
exports.default = FloatingParser;
