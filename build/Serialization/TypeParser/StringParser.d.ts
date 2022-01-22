import SerializationState from '../State';
import VariableParser from './VariableParser';
export default class StringParser extends VariableParser {
    deserialize(state: SerializationState): any;
    serialize(data: string): Uint8Array;
}
