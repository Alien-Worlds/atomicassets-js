import { ISchema, SchemaObject } from '../../Schema';
import { ISchemaRow } from './Cache';
import RpcApi from './index';
export default class RpcSchema {
    private readonly api;
    readonly collection: string;
    readonly name: string;
    private readonly _data;
    private readonly _collection;
    constructor(api: RpcApi, collection: string, name: string, data?: ISchemaRow, cache?: boolean);
    format(): Promise<ISchema>;
    rawFormat(): Promise<SchemaObject[]>;
    toObject(): Promise<object>;
}
