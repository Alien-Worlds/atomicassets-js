import { ICollectionRow } from './Cache';
import RpcApi from './index';
export default class RpcCollection {
    private readonly api;
    readonly name: string;
    private readonly _data;
    constructor(api: RpcApi, name: string, data?: ICollectionRow, cache?: boolean);
    author(): Promise<string>;
    allowNotify(): Promise<boolean>;
    authorizedAccounts(): Promise<string[]>;
    notifyAccounts(): Promise<string[]>;
    marketFee(): Promise<number>;
    data(): Promise<any>;
    toObject(): Promise<object>;
}
