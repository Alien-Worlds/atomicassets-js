"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = require("../../Schema");
const Collection_1 = __importDefault(require("./Collection"));
class RpcSchema {
    constructor(api, collection, name, data, cache = true) {
        this.api = api;
        this.collection = collection;
        this.name = name;
        this._data = new Promise(async (resolve, reject) => {
            if (data) {
                resolve(data);
            }
            else {
                try {
                    resolve(await api.queue.fetchSchema(collection, name, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
        this._collection = new Promise(async (resolve, reject) => {
            try {
                resolve(new Collection_1.default(api, collection, undefined, cache));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async format() {
        return Schema_1.ObjectSchema((await this._data).format);
    }
    async rawFormat() {
        return (await this._data).format;
    }
    async toObject() {
        return {
            collection_name: this.collection,
            schema_name: this.name,
            format: await this.rawFormat()
        };
    }
}
exports.default = RpcSchema;
