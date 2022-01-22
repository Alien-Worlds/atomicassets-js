"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = __importDefault(require("./Asset"));
class RpcOffer {
    constructor(api, id, data, senderAssets, receiverAssets, cache = true) {
        this.api = api;
        this.id = id;
        this._data = new Promise(async (resolve, reject) => {
            if (data) {
                resolve(data);
            }
            else {
                try {
                    resolve(await this.api.queue.fetchOffer(id, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
        this._senderAssets = new Promise(async (resolve, reject) => {
            if (senderAssets) {
                resolve(senderAssets);
            }
            else {
                try {
                    const row = await this._data;
                    const inventory = await this.api.queue.fetchAccountAssets(row.sender);
                    return resolve(row.sender_asset_ids.map((assetID) => {
                        const asset = inventory.find((assetRow) => assetRow.asset_id === assetID);
                        return asset ? new Asset_1.default(this.api, row.sender, assetID, asset, undefined, undefined, undefined, cache) : assetID;
                    }));
                }
                catch (e) {
                    return reject(e);
                }
            }
        });
        this._recipientAssets = new Promise(async (resolve, reject) => {
            if (receiverAssets) {
                resolve(receiverAssets);
            }
            else {
                try {
                    const row = await this._data;
                    const inventory = await this.api.queue.fetchAccountAssets(row.recipient);
                    return resolve(row.recipient_asset_ids.map((assetID) => {
                        const asset = inventory.find((assetRow) => assetRow.asset_id === assetID);
                        return asset ? new Asset_1.default(this.api, row.recipient, assetID, asset, undefined, undefined, undefined, cache) : assetID;
                    }));
                }
                catch (e) {
                    return reject(e);
                }
            }
        });
    }
    async sender() {
        return (await this._data).sender;
    }
    async recipient() {
        return (await this._data).recipient;
    }
    async senderAssets() {
        return await this._senderAssets;
    }
    async recipientAssets() {
        return await this._recipientAssets;
    }
    async memo() {
        return (await this._data).memo;
    }
    async toObject() {
        return {
            offer_id: this.id,
            sender: {
                account: await this.sender(),
                assets: await Promise.all((await this.senderAssets()).map(async (asset) => typeof asset === 'string' ? asset : await asset.toObject()))
            },
            recipient: {
                account: await this.recipient(),
                assets: await Promise.all((await this.recipientAssets()).map(async (asset) => typeof asset === 'string' ? asset : await asset.toObject()))
            },
            memo: await this.memo()
        };
    }
}
exports.default = RpcOffer;
