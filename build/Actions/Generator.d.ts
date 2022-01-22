import { SchemaFormat } from '../API/Rpc/Cache';
export declare type EosioAuthorizationObject = {
    actor: string;
    permission: string;
};
export declare type EosioActionObject = {
    account: string;
    name: string;
    authorization: EosioAuthorizationObject[];
    data: any;
};
export declare type AttributeMap = Array<{
    key: string;
    value: [string, any];
}>;
export declare type Format = {
    name: string;
    type: string;
};
export declare class ActionGenerator {
    readonly contract: string;
    constructor(contract: string);
    acceptoffer(authorization: EosioAuthorizationObject[], offer_id: string): Promise<EosioActionObject[]>;
    addcolauth(authorization: EosioAuthorizationObject[], collection_name: string, account_to_add: string): Promise<EosioActionObject[]>;
    addconftoken(authorization: EosioAuthorizationObject[], token_contract: string, token_symbol: string): Promise<EosioActionObject[]>;
    addnotifyacc(authorization: EosioAuthorizationObject[], collection_name: string, account_to_add: string): Promise<EosioActionObject[]>;
    announcedepo(authorization: EosioAuthorizationObject[], owner: string, symbol_to_announce: string): Promise<EosioActionObject[]>;
    backasset(authorization: EosioAuthorizationObject[], payer: string, asset_owner: string, asset_id: string, token_to_back: string): Promise<EosioActionObject[]>;
    burnasset(authorization: EosioAuthorizationObject[], asset_owner: string, asset_id: string): Promise<EosioActionObject[]>;
    canceloffer(authorization: EosioAuthorizationObject[], offer_id: string): Promise<EosioActionObject[]>;
    createcol(authorization: EosioAuthorizationObject[], author: string, collection_name: string, allow_notify: boolean, authorized_accounts: string[], notify_accounts: string[], market_fee: number, data: AttributeMap): Promise<EosioActionObject[]>;
    createoffer(authorization: EosioAuthorizationObject[], sender: string, recipient: string, sender_asset_ids: string[], recipient_asset_ids: string[], memo: string): Promise<EosioActionObject[]>;
    createtempl(authorization: EosioAuthorizationObject[], authorized_creator: string, collection_name: string, schema_name: string, transferable: boolean, burnable: boolean, max_supply: string, immutable_data: AttributeMap): Promise<EosioActionObject[]>;
    createschema(authorization: EosioAuthorizationObject[], authorized_creator: string, collection_name: string, schema_name: string, schema_format: Format[]): Promise<EosioActionObject[]>;
    declineoffer(authorization: EosioAuthorizationObject[], offer_id: string): Promise<EosioActionObject[]>;
    extendschema(authorization: EosioAuthorizationObject[], authorized_editor: string, collection_name: string, schema_name: string, schema_format_extension: Format[]): Promise<EosioActionObject[]>;
    forbidnotify(authorization: EosioAuthorizationObject[], collection_name: string): Promise<EosioActionObject[]>;
    locktemplate(authorization: EosioAuthorizationObject[], authorized_editor: string, collection_name: string, template_id: number): Promise<EosioActionObject[]>;
    mintasset(authorization: EosioAuthorizationObject[], authorized_minter: string, collection_name: string, schema_name: string, template_id: string, new_asset_owner: string, immutable_data: AttributeMap, mutable_data: AttributeMap, tokens_to_back: string[]): Promise<EosioActionObject[]>;
    payofferram(authorization: EosioAuthorizationObject[], payer: string, offer_id: string): Promise<EosioActionObject[]>;
    remcolauth(authorization: EosioAuthorizationObject[], collection_name: string, account_to_remove: string): Promise<EosioActionObject[]>;
    remnotifyacc(authorization: EosioAuthorizationObject[], collection_name: string, account_to_remove: string): Promise<EosioActionObject[]>;
    setassetdata(authorization: EosioAuthorizationObject[], authorized_editor: string, asset_owner: string, asset_id: string, new_mutable_data: AttributeMap): Promise<EosioActionObject[]>;
    setcoldata(authorization: EosioAuthorizationObject[], collection_name: string, data: AttributeMap): Promise<EosioActionObject[]>;
    setmarketfee(authorization: EosioAuthorizationObject[], collection_name: string, market_fee: number): Promise<EosioActionObject[]>;
    transfer(authorization: EosioAuthorizationObject[], account_from: string, account_to: string, asset_ids: string[], memo: string): Promise<EosioActionObject[]>;
    withdraw(authorization: EosioAuthorizationObject[], owner: string, token_to_withdraw: string): Promise<EosioActionObject[]>;
    protected _pack(authorization: EosioAuthorizationObject[], name: string, data: any): EosioActionObject[];
}
export declare function toAttributeMap(obj: any, schema: SchemaFormat): AttributeMap;
