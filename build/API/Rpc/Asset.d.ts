import { IAssetRow } from './Cache';
import RpcCollection from './Collection';
import RpcApi from './index';
import RpcSchema from './Schema';
import RpcTemplate from './Template';
export default class RpcAsset {
    private readonly api;
    readonly owner: string;
    readonly id: string;
    private readonly _data;
    private readonly _template;
    private readonly _collection;
    private readonly _schema;
    constructor(api: RpcApi, owner: string, id: string, data?: IAssetRow, collection?: RpcCollection, schema?: RpcSchema, template?: RpcTemplate, cache?: boolean);
    template(): Promise<RpcTemplate | null>;
    collection(): Promise<RpcCollection>;
    schema(): Promise<RpcSchema>;
    backedTokens(): Promise<string[]>;
    immutableData(): Promise<object>;
    mutableData(): Promise<object>;
    data(): Promise<object>;
    toObject(): Promise<object>;
}
