import SerializationState from '../Serialization/State';
import { ISchema } from './index';
export default class VectorSchema implements ISchema {
    private readonly element;
    constructor(element: ISchema);
    deserialize(state: SerializationState): any;
    serialize(array: any[]): Uint8Array;
}
