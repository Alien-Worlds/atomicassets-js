import ExplorerActionGenerator from '../../Actions/Explorer';
import { IAccountCollectionStats, IAccountStats, IAsset, IAssetStats, ICollection, ICollectionStats, IConfig, ILog, IOffer, ISchema, ISchemaStats, ITemplate, ITemplateStats, ITransfer } from './Objects';
import { AccountApiParams, AssetsApiParams, CollectionApiParams, GreylistParams, HideOffersParams, OfferApiParams, SchemaApiParams, TemplateApiParams, TransferApiParams } from './Params';
declare type Fetch = (input?: Request | string, init?: RequestInit) => Promise<Response>;
declare type ApiArgs = {
    fetch?: Fetch;
};
export declare type DataOptions = Array<{
    key: string;
    value: any;
    type?: string;
}>;
export default class ExplorerApi {
    readonly action: Promise<ExplorerActionGenerator>;
    private readonly endpoint;
    private readonly namespace;
    private readonly fetchBuiltin;
    constructor(endpoint: string, namespace: string, args: ApiArgs);
    getConfig(): Promise<IConfig>;
    getAssets(options?: AssetsApiParams, page?: number, limit?: number, data?: DataOptions): Promise<IAsset[]>;
    countAssets(options: AssetsApiParams, data?: DataOptions): Promise<number>;
    getAsset(id: string): Promise<IAsset>;
    getAssetStats(id: string): Promise<IAssetStats>;
    getAssetLogs(id: string, page?: number, limit?: number, order?: string): Promise<ILog[]>;
    getCollections(options?: CollectionApiParams, page?: number, limit?: number): Promise<ICollection[]>;
    countCollections(options?: CollectionApiParams): Promise<number>;
    getCollection(name: string): Promise<ICollection>;
    getCollectionStats(name: string): Promise<ICollectionStats>;
    getCollectionLogs(name: string, page?: number, limit?: number, order?: string): Promise<ILog[]>;
    getSchemas(options?: SchemaApiParams, page?: number, limit?: number): Promise<ISchema[]>;
    countSchemas(options?: SchemaApiParams): Promise<number>;
    getSchema(collection: string, name: string): Promise<ISchema>;
    getSchemaStats(collection: string, name: string): Promise<ISchemaStats>;
    getSchemaLogs(collection: string, name: string, page?: number, limit?: number, order?: string): Promise<ILog[]>;
    getTemplates(options?: TemplateApiParams, page?: number, limit?: number, data?: DataOptions): Promise<ITemplate[]>;
    countTemplates(options?: TemplateApiParams, data?: DataOptions): Promise<number>;
    getTemplate(collection: string, id: string): Promise<ITemplate>;
    getTemplateStats(collection: string, name: string): Promise<ITemplateStats>;
    getTemplateLogs(collection: string, id: string, page?: number, limit?: number, order?: string): Promise<ILog[]>;
    getTransfers(options?: TransferApiParams, page?: number, limit?: number): Promise<ITransfer[]>;
    countTransfers(options?: TransferApiParams): Promise<number>;
    getOffers(options?: OfferApiParams, page?: number, limit?: number): Promise<IOffer[]>;
    countOffers(options?: OfferApiParams): Promise<number>;
    getOffer(id: string): Promise<IOffer>;
    getAccounts(options?: AccountApiParams, page?: number, limit?: number): Promise<Array<{
        account: string;
        assets: string;
    }>>;
    getBurns(options?: AccountApiParams, page?: number, limit?: number): Promise<Array<{
        account: string;
        assets: string;
    }>>;
    countAccounts(options?: AccountApiParams): Promise<number>;
    getAccount(account: string, options?: GreylistParams & HideOffersParams): Promise<IAccountStats>;
    getAccountCollection(account: string, collection: string): Promise<IAccountCollectionStats>;
    getAccountBurns(account: string, options?: GreylistParams & HideOffersParams): Promise<IAccountStats>;
    fetchEndpoint<T>(path: string, args: any): Promise<T>;
    countEndpoint(path: string, args: any): Promise<number>;
}
export {};
