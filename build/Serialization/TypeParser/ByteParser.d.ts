import SerializationState from '../State';
import VariableParser from './VariableParser';
export declare class ByteParser extends VariableParser {
    deserialize(state: SerializationState): Uint8Array;
    serialize(data: Uint8Array): Uint8Array;
}
