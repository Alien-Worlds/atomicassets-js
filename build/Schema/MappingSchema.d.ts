import SerializationState from '../Serialization/State';
import { ISchema, MappingAttribute } from './index';
export default class MappingSchema implements ISchema {
    private readonly attributes;
    private readonly reserved;
    constructor(attributes: MappingAttribute[]);
    deserialize(state: SerializationState, upwardsCompatible?: boolean): any;
    serialize(object: any): Uint8Array;
    private getAttribute;
}
