"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rpc_1 = __importDefault(require("../../Actions/Rpc"));
const RpcError_1 = __importDefault(require("../../Errors/RpcError"));
const Asset_1 = __importDefault(require("./Asset"));
const Cache_1 = __importDefault(require("./Cache"));
const Collection_1 = __importDefault(require("./Collection"));
const Offer_1 = __importDefault(require("./Offer"));
const Queue_1 = __importDefault(require("./Queue"));
const Schema_1 = __importDefault(require("./Schema"));
const Template_1 = __importDefault(require("./Template"));
class RpcApi {
    constructor(endpoint, contract, args = { rateLimit: 4 }) {
        this.endpoint = endpoint;
        this.contract = contract;
        if (args.fetch) {
            this.fetchBuiltin = args.fetch;
        }
        else {
            this.fetchBuiltin = global.fetch;
        }
        this.queue = new Queue_1.default(this, args.rateLimit);
        this.cache = new Cache_1.default();
        this.action = new Rpc_1.default(this);
        this._config = new Promise((async (resolve, reject) => {
            try {
                const resp = await this.getTableRows({
                    code: this.contract, scope: this.contract, table: 'config'
                });
                if (resp.rows.length !== 1) {
                    return reject('invalid config');
                }
                return resolve(resp.rows[0]);
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    async config() {
        return await this._config;
    }
    async getAsset(owner, id, cache = true) {
        if (!cache) {
            this.cache.deleteAsset(id);
        }
        const data = await this.queue.fetchAsset(owner, id, cache);
        return new Asset_1.default(this, owner, id, data, undefined, undefined, undefined, cache);
    }
    async getTemplate(collectionName, templateID, cache = true) {
        if (!cache) {
            this.cache.deleteTemplate(collectionName, templateID);
        }
        const data = await this.queue.fetchTemplate(collectionName, templateID, cache);
        return new Template_1.default(this, collectionName, templateID, data, undefined, cache);
    }
    async getCollection(collectionName, cache = true) {
        if (!cache) {
            this.cache.deleteCollection(collectionName);
        }
        const data = await this.queue.fetchCollection(collectionName, cache);
        return new Collection_1.default(this, collectionName, data, cache);
    }
    async getCollectionTemplates(collectionName) {
        return (await this.queue.fetchCollectionTemplates(collectionName)).map((templateRow) => {
            return new Template_1.default(this, collectionName, String(templateRow.template_id), templateRow, undefined);
        });
    }
    async getCollectionsSchemas(collectionName) {
        return (await this.queue.fetchCollectionSchemas(collectionName)).map((schemaRow) => {
            return new Schema_1.default(this, collectionName, schemaRow.schema_name, undefined);
        });
    }
    async getSchema(collectionName, schemaName, cache = true) {
        if (!cache) {
            this.cache.deleteSchema(collectionName, schemaName);
        }
        const data = await this.queue.fetchSchema(collectionName, schemaName, cache);
        return new Schema_1.default(this, collectionName, schemaName, data, cache);
    }
    async getOffer(offerID, cache = true) {
        if (!cache) {
            this.cache.deleteOffer(offerID);
        }
        const data = await this.queue.fetchOffer(offerID, cache);
        return new Offer_1.default(this, offerID, data, undefined, undefined, cache);
    }
    async getAccountOffers(account) {
        return (await this.queue.fetchAccountOffers(account)).map((offerRow) => {
            return new Offer_1.default(this, offerRow.offer_id, offerRow, undefined, undefined);
        });
    }
    async getAccountAssets(account) {
        return (await this.queue.fetchAccountAssets(account)).map((assetRow) => {
            return new Asset_1.default(this, account, assetRow.asset_id, assetRow, undefined, undefined, undefined);
        });
    }
    async getCollectionInventory(collectionName, account) {
        await this.queue.preloadCollection(collectionName, true);
        return (await this.queue.fetchAccountAssets(account))
            .filter(assetRow => assetRow.collection_name === collectionName)
            .map((assetRow) => {
            return new Asset_1.default(this, account, assetRow.asset_id, assetRow, undefined, undefined, undefined);
        });
    }
    async preloadCollection(collectionName, cache = true) {
        await this.queue.preloadCollection(collectionName, cache);
    }
    async getTableRows({ code, scope, table, table_key = '', lower_bound = '', upper_bound = '', index_position = 1, key_type = '' }) {
        return await this.fetchRpc('/v1/chain/get_table_rows', {
            code, scope, table, table_key,
            lower_bound, upper_bound, index_position,
            key_type, limit: 101, reverse: false, show_payer: false, json: true
        });
    }
    async fetchRpc(path, body) {
        let response;
        let json;
        try {
            const f = this.fetchBuiltin;
            response = await f(this.endpoint + path, {
                body: JSON.stringify(body),
                method: 'POST'
            });
            json = await response.json();
        }
        catch (e) {
            e.isFetchError = true;
            throw e;
        }
        if ((json.processed && json.processed.except) || !response.ok) {
            throw new RpcError_1.default(json);
        }
        return json;
    }
}
exports.default = RpcApi;
