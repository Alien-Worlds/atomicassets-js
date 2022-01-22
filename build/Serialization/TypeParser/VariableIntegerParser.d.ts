import SerializationState from '../State';
import { ITypeParser } from './index';
export default class VariableIntegerParser implements ITypeParser {
    readonly size: number;
    private readonly unsigned;
    constructor(size: number, unsigned: boolean);
    deserialize(state: SerializationState): number | string;
    serialize(data: any): Uint8Array;
}
