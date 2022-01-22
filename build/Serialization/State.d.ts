export default class SerializationState {
    readonly data: Uint8Array;
    position: number;
    constructor(data: Uint8Array, position?: number);
}
export declare function prepare(data: Uint8Array): SerializationState;
