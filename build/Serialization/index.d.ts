import { ISchema } from '../Schema';
export declare function serialize(object: any, schema: ISchema): Uint8Array;
export declare function deserialize(data: Uint8Array, schema: ISchema): any;
