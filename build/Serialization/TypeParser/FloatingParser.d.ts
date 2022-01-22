import SerializationState from '../State';
import FixedParser from './FixedParser';
export default class FloatingParser extends FixedParser {
    private readonly isDouble;
    constructor(isDouble: boolean);
    deserialize(state: SerializationState): number;
    serialize(data: number): Uint8Array;
}
