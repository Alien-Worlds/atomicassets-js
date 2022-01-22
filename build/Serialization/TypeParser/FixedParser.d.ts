import SerializationState from '../State';
import { ITypeParser } from './index';
export default class FixedParser implements ITypeParser {
    readonly size: number;
    constructor(size: number);
    deserialize(state: SerializationState): any;
    serialize(data: any): Uint8Array;
}
