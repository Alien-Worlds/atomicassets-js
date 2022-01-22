import RpcActionGenerator from '../../Actions/Rpc';
import RpcAsset from './Asset';
import RpcCache, { IConfigRow } from './Cache';
import RpcCollection from './Collection';
import RpcOffer from './Offer';
import RpcQueue from './Queue';
import RpcSchema from './Schema';
import RpcTemplate from './Template';
declare type Fetch = (input?: Request | string, init?: RequestInit) => Promise<Response>;
declare type ApiArgs = {
    fetch?: Fetch;
    rateLimit?: number;
};
export default class RpcApi {
    readonly queue: RpcQueue;
    readonly cache: RpcCache;
    readonly action: RpcActionGenerator;
    readonly endpoint: string;
    readonly contract: string;
    private readonly fetchBuiltin;
    private readonly _config;
    constructor(endpoint: string, contract: string, args?: ApiArgs);
    config(): Promise<IConfigRow>;
    getAsset(owner: string, id: string, cache?: boolean): Promise<RpcAsset>;
    getTemplate(collectionName: string, templateID: string, cache?: boolean): Promise<RpcTemplate>;
    getCollection(collectionName: string, cache?: boolean): Promise<RpcCollection>;
    getCollectionTemplates(collectionName: string): Promise<RpcTemplate[]>;
    getCollectionsSchemas(collectionName: string): Promise<RpcSchema[]>;
    getSchema(collectionName: string, schemaName: string, cache?: boolean): Promise<RpcSchema>;
    getOffer(offerID: string, cache?: boolean): Promise<RpcOffer>;
    getAccountOffers(account: string): Promise<RpcOffer[]>;
    getAccountAssets(account: string): Promise<RpcAsset[]>;
    getCollectionInventory(collectionName: string, account: string): Promise<RpcAsset[]>;
    preloadCollection(collectionName: string, cache?: boolean): Promise<void>;
    getTableRows({ code, scope, table, table_key, lower_bound, upper_bound, index_position, key_type }: any): Promise<any>;
    fetchRpc(path: string, body: any): Promise<any>;
}
export {};
