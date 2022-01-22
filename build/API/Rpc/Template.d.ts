import { ITemplateRow } from './Cache';
import RpcApi from './index';
import RpcSchema from './Schema';
export default class RpcTemplate {
    private readonly api;
    readonly collection: string;
    readonly id: string;
    private readonly _data;
    private readonly _schema;
    constructor(api: RpcApi, collection: string, id: string, data?: ITemplateRow, schema?: RpcSchema, cache?: boolean);
    schema(): Promise<RpcSchema>;
    immutableData(): Promise<object>;
    isTransferable(): Promise<boolean>;
    isBurnable(): Promise<boolean>;
    maxSupply(): Promise<number>;
    circulation(): Promise<number>;
    toObject(): Promise<object>;
}
