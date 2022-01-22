"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Explorer_1 = __importDefault(require("../../Actions/Explorer"));
const ApiError_1 = __importDefault(require("../../Errors/ApiError"));
function buildDataOptions(options, data) {
    var _a;
    const dataFields = {};
    for (const row of data) {
        const dataType = (_a = row.type) !== null && _a !== void 0 ? _a : 'data';
        if (typeof row.value === 'number') {
            dataFields[dataType + ':number.' + row.key] = String(row.value);
        }
        else if (typeof row.value === 'boolean') {
            dataFields[dataType + ':bool.' + row.key] = row.value ? 'true' : 'false';
        }
        else {
            dataFields[dataType + '.' + row.key] = row.value;
        }
    }
    return Object.assign({}, options, dataFields);
}
class ExplorerApi {
    constructor(endpoint, namespace, args) {
        this.endpoint = endpoint;
        this.namespace = namespace;
        if (args.fetch) {
            this.fetchBuiltin = args.fetch;
        }
        else {
            this.fetchBuiltin = window.fetch;
        }
        this.action = (async () => {
            return new Explorer_1.default((await this.getConfig()).contract, this);
        })();
    }
    async getConfig() {
        return await this.fetchEndpoint('/v1/config', {});
    }
    async getAssets(options = {}, page = 1, limit = 100, data = []) {
        return await this.fetchEndpoint('/v1/assets', Object.assign({ page, limit }, buildDataOptions(options, data)));
    }
    async countAssets(options, data = []) {
        return await this.countEndpoint('/v1/assets', buildDataOptions(options, data));
    }
    async getAsset(id) {
        return await this.fetchEndpoint('/v1/assets/' + id, {});
    }
    async getAssetStats(id) {
        return await this.fetchEndpoint('/v1/assets/' + id + '/stats', {});
    }
    async getAssetLogs(id, page = 1, limit = 100, order = 'desc') {
        return await this.fetchEndpoint('/v1/assets/' + id + '/logs', { page, limit, order });
    }
    async getCollections(options = {}, page = 1, limit = 100) {
        return await this.fetchEndpoint('/v1/collections', Object.assign({ page, limit }, options));
    }
    async countCollections(options = {}) {
        return await this.countEndpoint('/v1/collections', options);
    }
    async getCollection(name) {
        return await this.fetchEndpoint('/v1/collections/' + name, {});
    }
    async getCollectionStats(name) {
        return await this.fetchEndpoint('/v1/collections/' + name + '/stats', {});
    }
    async getCollectionLogs(name, page = 1, limit = 100, order = 'desc') {
        return await this.fetchEndpoint('/v1/collections/' + name + '/logs', { page, limit, order });
    }
    async getSchemas(options = {}, page = 1, limit = 100) {
        return await this.fetchEndpoint('/v1/schemas', Object.assign({ page, limit }, options));
    }
    async countSchemas(options = {}) {
        return await this.countEndpoint('/v1/schemas', options);
    }
    async getSchema(collection, name) {
        return await this.fetchEndpoint('/v1/schemas/' + collection + '/' + name, {});
    }
    async getSchemaStats(collection, name) {
        return await this.fetchEndpoint('/v1/schemas/' + collection + '/' + name + '/stats', {});
    }
    async getSchemaLogs(collection, name, page = 1, limit = 100, order = 'desc') {
        return await this.fetchEndpoint('/v1/schemas/' + collection + '/' + name + '/logs', { page, limit, order });
    }
    async getTemplates(options = {}, page = 1, limit = 100, data = []) {
        return await this.fetchEndpoint('/v1/templates', Object.assign({ page, limit }, buildDataOptions(options, data)));
    }
    async countTemplates(options = {}, data = []) {
        return await this.countEndpoint('/v1/templates', buildDataOptions(options, data));
    }
    async getTemplate(collection, id) {
        return await this.fetchEndpoint('/v1/templates/' + collection + '/' + id, {});
    }
    async getTemplateStats(collection, name) {
        return await this.fetchEndpoint('/v1/templates/' + collection + '/' + name + '/stats', {});
    }
    async getTemplateLogs(collection, id, page = 1, limit = 100, order = 'desc') {
        return await this.fetchEndpoint('/v1/templates/' + collection + '/' + id + '/logs', { page, limit, order });
    }
    async getTransfers(options = {}, page = 1, limit = 100) {
        return await this.fetchEndpoint('/v1/transfers', Object.assign({ page, limit }, options));
    }
    async countTransfers(options = {}) {
        return await this.countEndpoint('/v1/transfers', options);
    }
    async getOffers(options = {}, page = 1, limit = 100) {
        return await this.fetchEndpoint('/v1/offers', Object.assign({ page, limit }, options));
    }
    async countOffers(options = {}) {
        return await this.countEndpoint('/v1/offers', options);
    }
    async getOffer(id) {
        return await this.fetchEndpoint('/v1/offers/' + id, {});
    }
    async getAccounts(options = {}, page = 1, limit = 100) {
        return await this.fetchEndpoint('/v1/accounts', Object.assign({ page, limit }, options));
    }
    async getBurns(options = {}, page = 1, limit = 100) {
        return await this.fetchEndpoint('/v1/burns', Object.assign({ page, limit }, options));
    }
    async countAccounts(options = {}) {
        return await this.countEndpoint('/v1/accounts', options);
    }
    async getAccount(account, options = {}) {
        return await this.fetchEndpoint('/v1/accounts/' + account, options);
    }
    async getAccountCollection(account, collection) {
        return await this.fetchEndpoint('/v1/accounts/' + account + '/' + collection, {});
    }
    async getAccountBurns(account, options = {}) {
        return await this.fetchEndpoint('/v1/burns/' + account, options);
    }
    async fetchEndpoint(path, args) {
        let response, json;
        const f = this.fetchBuiltin;
        const queryString = Object.keys(args).map((key) => {
            let value = args[key];
            if (value === true) {
                value = 'true';
            }
            if (value === false) {
                value = 'false';
            }
            return key + '=' + encodeURIComponent(value);
        }).join('&');
        try {
            response = await f(this.endpoint + '/' + this.namespace + path + (queryString.length > 0 ? '?' + queryString : ''));
            json = await response.json();
        }
        catch (e) {
            throw new ApiError_1.default(e.message, 500);
        }
        if (response.status !== 200) {
            throw new ApiError_1.default(json.message, response.status);
        }
        if (!json.success) {
            throw new ApiError_1.default(json.message, response.status);
        }
        return json.data;
    }
    async countEndpoint(path, args) {
        const res = await this.fetchEndpoint(path + '/_count', args);
        return parseInt(res, 10);
    }
}
exports.default = ExplorerApi;
