"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serialization_1 = require("../../Serialization");
const Schema_1 = __importDefault(require("./Schema"));
class RpcTemplate {
    constructor(api, collection, id, data, schema, cache = true) {
        this.api = api;
        this.collection = collection;
        this.id = id;
        this._data = new Promise(async (resolve, reject) => {
            if (data) {
                resolve(data);
            }
            else {
                try {
                    resolve(await api.queue.fetchTemplate(collection, id, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
        this._schema = new Promise(async (resolve, reject) => {
            if (schema) {
                resolve(schema);
            }
            else {
                try {
                    const row = await this._data;
                    resolve(new Schema_1.default(this.api, collection, row.schema_name, undefined, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    }
    async schema() {
        return await this._schema;
    }
    async immutableData() {
        const schema = await this._schema;
        return Serialization_1.deserialize((await this._data).immutable_serialized_data, await schema.format());
    }
    async isTransferable() {
        return (await this._data).transferable;
    }
    async isBurnable() {
        return (await this._data).burnable;
    }
    async maxSupply() {
        return (await this._data).max_supply;
    }
    async circulation() {
        return (await this._data).issued_supply;
    }
    async toObject() {
        return {
            collection_name: this.collection,
            template_id: this.id,
            schema: await (await this.schema()).toObject(),
            immutableData: await this.immutableData(),
            transferable: await this.isTransferable(),
            burnable: await this.isBurnable(),
            maxSupply: await this.maxSupply(),
            circulation: await this.circulation()
        };
    }
}
exports.default = RpcTemplate;
