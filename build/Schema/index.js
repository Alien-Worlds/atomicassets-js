"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSchema = void 0;
const SchemaError_1 = __importDefault(require("../Errors/SchemaError"));
const MappingSchema_1 = __importDefault(require("./MappingSchema"));
const ValueSchema_1 = __importDefault(require("./ValueSchema"));
const VectorSchema_1 = __importDefault(require("./VectorSchema"));
function buildObjectSchema(objectID, lookup) {
    const attributes = [];
    let fields = lookup[objectID];
    if (typeof fields === 'undefined') {
        fields = [];
    }
    delete lookup[objectID];
    for (const field of fields) {
        attributes.push({ name: field.name, value: buildValueSchema(field.type, lookup) });
    }
    return new MappingSchema_1.default(attributes);
}
function buildValueSchema(type, lookup) {
    if (type.endsWith('[]')) {
        return new VectorSchema_1.default(buildValueSchema(type.substring(0, type.length - 2), lookup));
    }
    // not supported by the contract currently
    if (type.startsWith('object{') && type.endsWith('}')) {
        const objectID = parseInt(type.substring(7, type.length - 1), 10);
        if (isNaN(objectID)) {
            throw new SchemaError_1.default(`invalid type '${type}'`);
        }
        return buildObjectSchema(objectID, lookup);
    }
    return new ValueSchema_1.default(type);
}
function ObjectSchema(schema) {
    const objectLookup = {};
    for (const schemaObject of schema) {
        const objectID = typeof schemaObject.parent === 'undefined' ? 0 : schemaObject.parent;
        if (typeof objectLookup[objectID] === 'undefined') {
            objectLookup[objectID] = [];
        }
        objectLookup[objectID].push(schemaObject);
    }
    return buildObjectSchema(0, objectLookup);
}
exports.ObjectSchema = ObjectSchema;
