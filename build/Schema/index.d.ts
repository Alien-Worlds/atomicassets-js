import SerializationState from '../Serialization/State';
export interface ISchema {
    serialize(data: any): Uint8Array;
    deserialize(state: SerializationState): Uint8Array;
}
export declare type SchemaObject = {
    name: string;
    type: string;
    parent?: number;
};
export declare type MappingAttribute = {
    name: string;
    value: ISchema;
};
export declare function ObjectSchema(schema: SchemaObject[]): ISchema;
