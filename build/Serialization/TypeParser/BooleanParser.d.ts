import SerializationState from '../State';
import FixedParser from './FixedParser';
export default class BooleanParser extends FixedParser {
    constructor();
    deserialize(state: SerializationState): number;
    serialize(data: boolean): Uint8Array;
}
