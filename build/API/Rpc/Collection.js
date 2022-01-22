"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = require("../../Schema");
const Serialization_1 = require("../../Serialization");
class RpcCollection {
    constructor(api, name, data, cache = true) {
        this.api = api;
        this.name = name;
        this._data = new Promise(async (resolve, reject) => {
            if (data) {
                resolve(data);
            }
            else {
                try {
                    resolve(await api.queue.fetchCollection(name, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    }
    async author() {
        return (await this._data).author;
    }
    async allowNotify() {
        return (await this._data).allow_notify;
    }
    async authorizedAccounts() {
        return (await this._data).authorized_accounts;
    }
    async notifyAccounts() {
        return (await this._data).notify_accounts;
    }
    async marketFee() {
        return Number((await this._data).market_fee);
    }
    async data() {
        return Serialization_1.deserialize((await this._data).serialized_data, Schema_1.ObjectSchema((await this.api.config()).collection_format));
    }
    async toObject() {
        return {
            collection_name: this.name,
            author: await this.author(),
            allowNotify: await this.allowNotify(),
            authorizedAccounts: await this.authorizedAccounts(),
            notifyAccounts: await this.notifyAccounts(),
            marketFee: await this.marketFee(),
            data: await this.data()
        };
    }
}
exports.default = RpcCollection;
