import { IAssetRow, ICollectionRow, IOfferRow, ISchemaRow, ITemplateRow } from './Cache';
import RpcApi from './index';
export default class RpcQueue {
    private readonly api;
    private readonly requestLimit;
    private elements;
    private interval;
    private preloadedCollections;
    constructor(api: RpcApi, requestLimit?: number);
    fetchAsset(owner: string, assetID: string, useCache?: boolean): Promise<IAssetRow>;
    fetchAccountAssets(account: string): Promise<IAssetRow[]>;
    fetchTemplate(collectionName: string, templateID: string, useCache?: boolean): Promise<ITemplateRow>;
    fetchSchema(collectionName: string, schemaName: string, useCache?: boolean): Promise<ISchemaRow>;
    fetchCollection(collectionName: string, useCache?: boolean): Promise<ICollectionRow>;
    fetchCollectionSchemas(collectionName: string): Promise<ISchemaRow[]>;
    fetchCollectionTemplates(collectionName: string): Promise<ITemplateRow[]>;
    preloadCollection(collectionName: string, useCache?: boolean): Promise<void>;
    fetchOffer(offerID: string, useCache?: boolean): Promise<IOfferRow>;
    fetchAccountOffers(account: string): Promise<IOfferRow[]>;
    private dequeue;
    private fetch_single_row;
    private fetch_all_rows;
}
