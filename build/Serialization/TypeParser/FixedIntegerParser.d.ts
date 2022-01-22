import SerializationState from '../State';
import FixedParser from './FixedParser';
export default class FixedIntegerParser extends FixedParser {
    deserialize(state: SerializationState): number | string;
    serialize(data: any): Uint8Array;
}
