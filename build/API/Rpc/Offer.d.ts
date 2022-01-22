import RpcAsset from './Asset';
import { IOfferRow } from './Cache';
import RpcApi from './index';
export default class RpcOffer {
    private readonly api;
    readonly id: string;
    private readonly _data;
    private readonly _senderAssets;
    private readonly _recipientAssets;
    constructor(api: RpcApi, id: string, data?: IOfferRow, senderAssets?: RpcAsset[], receiverAssets?: RpcAsset[], cache?: boolean);
    sender(): Promise<string>;
    recipient(): Promise<string>;
    senderAssets(): Promise<Array<RpcAsset | string>>;
    recipientAssets(): Promise<Array<RpcAsset | string>>;
    memo(): Promise<string>;
    toObject(): Promise<object>;
}
