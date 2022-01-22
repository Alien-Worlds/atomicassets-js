export declare type SchemaFormat = Array<{
    name: string;
    type: string;
}>;
export interface ICollectionRow {
    collection_name: string;
    author: string;
    allow_notify: boolean;
    authorized_accounts: string[];
    notify_accounts: string[];
    market_fee: number;
    serialized_data: Uint8Array;
}
export interface ISchemaRow {
    schema_name: string;
    format: SchemaFormat;
}
export interface ITemplateRow {
    template_id: number;
    schema_name: string;
    transferable: boolean;
    burnable: boolean;
    max_supply: number;
    issued_supply: number;
    immutable_serialized_data: Uint8Array;
}
export interface IAssetRow {
    asset_id: string;
    collection_name: string;
    schema_name: string;
    template_id: string;
    ram_payer: string;
    backed_tokens: string[];
    immutable_serialized_data: Uint8Array;
    mutable_serialized_data: Uint8Array;
}
export interface IOfferRow {
    offer_id: string;
    sender: string;
    recipient: string;
    sender_asset_ids: string[];
    recipient_asset_ids: string[];
    memo: string;
}
export interface IConfigRow {
    asset_counter: string;
    offer_counter: string;
    collection_format: SchemaFormat;
}
export default class RpcCache {
    private readonly cache;
    constructor();
    getAsset(assetID: string, data?: IAssetRow): IAssetRow | null;
    deleteAsset(assetID: string): void;
    getTemplate(collectionName: string, templateID: string, data?: ITemplateRow): ITemplateRow | null;
    deleteTemplate(collectionName: string, templateID: string): void;
    getSchema(collectionName: string, schemaName: string, data?: ISchemaRow): ISchemaRow | null;
    deleteSchema(collectionName: string, schemaName: string): void;
    getCollection(collectionName: string, data?: ICollectionRow): ICollectionRow | null;
    deleteCollection(collectionName: string): void;
    getOffer(offerID: string, data?: IOfferRow): IOfferRow | null;
    deleteOffer(offerID: string): void;
    private access;
    private delete;
}
