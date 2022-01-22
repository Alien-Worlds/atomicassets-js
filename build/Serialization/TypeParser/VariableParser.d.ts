import SerializationState from '../State';
import { ITypeParser } from './index';
export default class VariableParser implements ITypeParser {
    deserialize(state: SerializationState): any;
    serialize(data: any): Uint8Array;
}
