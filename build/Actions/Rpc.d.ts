import RpcApi from '../API/Rpc';
import { ActionGenerator, EosioActionObject, EosioAuthorizationObject } from './Generator';
export default class RpcActionGenerator extends ActionGenerator {
    readonly api: RpcApi;
    constructor(api: RpcApi);
    createcol(authorization: EosioAuthorizationObject[], author: string, collection_name: string, allow_notify: boolean, authorized_accounts: string[], notify_accounts: string[], market_fee: number, data: object): Promise<EosioActionObject[]>;
    createtempl(authorization: EosioAuthorizationObject[], authorized_creator: string, collection_name: string, schema_name: string, transferable: boolean, burnable: boolean, max_supply: string, immutable_data: object): Promise<EosioActionObject[]>;
    mintasset(authorization: EosioAuthorizationObject[], authorized_minter: string, collection_name: string, schema_name: string, template_id: string, new_owner: string, immutable_data: object, mutable_data: object, tokens_to_back: string[]): Promise<EosioActionObject[]>;
    setassetdata(authorization: EosioAuthorizationObject[], authorized_editor: string, owner: string, asset_id: string, mutable_data: object): Promise<EosioActionObject[]>;
    setcoldata(authorization: EosioAuthorizationObject[], collection_name: string, data: object): Promise<EosioActionObject[]>;
}
