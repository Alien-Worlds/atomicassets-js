import SerializationState from '../Serialization/State';
import { ITypeParser } from '../Serialization/TypeParser';
import { ISchema } from './index';
export default class ValueSchema implements ISchema {
    readonly parser: ITypeParser;
    constructor(type: string);
    deserialize(state: SerializationState): any;
    serialize(value: any): Uint8Array;
}
