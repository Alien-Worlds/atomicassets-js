"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserTypes = void 0;
const BooleanParser_1 = __importDefault(require("./TypeParser/BooleanParser"));
const ByteParser_1 = require("./TypeParser/ByteParser");
const FixedIntegerParser_1 = __importDefault(require("./TypeParser/FixedIntegerParser"));
const FloatingParser_1 = __importDefault(require("./TypeParser/FloatingParser"));
const IPFSParser_1 = __importDefault(require("./TypeParser/IPFSParser"));
const StringParser_1 = __importDefault(require("./TypeParser/StringParser"));
const VariableIntegerParser_1 = __importDefault(require("./TypeParser/VariableIntegerParser"));
// tslint:disable:object-literal-sort-keys
exports.ParserTypes = {
    int8: new VariableIntegerParser_1.default(1, false),
    int16: new VariableIntegerParser_1.default(2, false),
    int32: new VariableIntegerParser_1.default(4, false),
    int64: new VariableIntegerParser_1.default(8, false),
    uint8: new VariableIntegerParser_1.default(1, true),
    uint16: new VariableIntegerParser_1.default(2, true),
    uint32: new VariableIntegerParser_1.default(4, true),
    uint64: new VariableIntegerParser_1.default(8, true),
    fixed8: new FixedIntegerParser_1.default(1),
    fixed16: new FixedIntegerParser_1.default(2),
    fixed32: new FixedIntegerParser_1.default(4),
    fixed64: new FixedIntegerParser_1.default(8),
    bool: new BooleanParser_1.default(),
    bytes: new ByteParser_1.ByteParser(),
    string: new StringParser_1.default(),
    image: new StringParser_1.default(),
    ipfs: new IPFSParser_1.default(),
    float: new FloatingParser_1.default(false),
    double: new FloatingParser_1.default(true)
};
