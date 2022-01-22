"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serialization_1 = require("../../Serialization");
const Collection_1 = __importDefault(require("./Collection"));
const Schema_1 = __importDefault(require("./Schema"));
const Template_1 = __importDefault(require("./Template"));
class RpcAsset {
    constructor(api, owner, id, data, collection, schema, template, cache = true) {
        this.api = api;
        this.owner = owner;
        this.id = id;
        this._data = new Promise(async (resolve, reject) => {
            if (data) {
                resolve(data);
            }
            else {
                try {
                    resolve(await api.queue.fetchAsset(owner, id, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
        this._template = new Promise(async (resolve, reject) => {
            if (template) {
                resolve(template);
            }
            else {
                try {
                    const row = await this._data;
                    if (Number(row.template_id) < 0) {
                        return resolve(null);
                    }
                    resolve(new Template_1.default(api, row.collection_name, row.template_id, undefined, undefined, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
        this._collection = new Promise(async (resolve, reject) => {
            if (collection) {
                resolve(collection);
            }
            else {
                try {
                    const row = await this._data;
                    resolve(new Collection_1.default(api, row.collection_name, undefined, cache));
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
                    resolve(new Schema_1.default(api, row.collection_name, row.schema_name, undefined, cache));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    }
    async template() {
        return await this._template;
    }
    async collection() {
        return await this._collection;
    }
    async schema() {
        return await this._schema;
    }
    async backedTokens() {
        return (await this._data).backed_tokens;
    }
    async immutableData() {
        const schema = await this.schema();
        const row = await this._data;
        return Serialization_1.deserialize(row.immutable_serialized_data, await schema.format());
    }
    async mutableData() {
        const schema = await this.schema();
        const row = await this._data;
        return Serialization_1.deserialize(row.mutable_serialized_data, await schema.format());
    }
    async data() {
        const mutableData = await this.mutableData();
        const immutableData = await this.immutableData();
        const template = await this.template();
        const templateData = template ? await template.immutableData() : {};
        return Object.assign({}, mutableData, immutableData, templateData);
    }
    async toObject() {
        const template = await this.template();
        const collection = await this.collection();
        const schema = await this.schema();
        return {
            asset_id: this.id,
            collection: await collection.toObject(),
            schema: await schema.toObject(),
            template: template ? await template.toObject() : null,
            backedTokens: await this.backedTokens(),
            immutableData: await this.immutableData(),
            mutableData: await this.mutableData(),
            data: await this.data()
        };
    }
}
exports.default = RpcAsset;
