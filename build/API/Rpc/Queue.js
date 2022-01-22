"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RpcQueue {
    constructor(api, requestLimit = 4) {
        this.api = api;
        this.requestLimit = requestLimit;
        this.elements = [];
        this.interval = null;
        this.preloadedCollections = {};
    }
    async fetchAsset(owner, assetID, useCache = true) {
        return await this.fetch_single_row('assets', owner, assetID, (data) => {
            return (useCache || typeof data !== 'undefined') ? this.api.cache.getAsset(assetID, data) : null;
        });
    }
    async fetchAccountAssets(account) {
        const rows = await this.fetch_all_rows('assets', account, 'asset_id');
        return rows.map((asset) => {
            return this.api.cache.getAsset(asset.asset_id, asset);
        });
    }
    async fetchTemplate(collectionName, templateID, useCache = true) {
        return await this.fetch_single_row('templates', collectionName, templateID, (data) => {
            return (useCache || typeof data !== 'undefined') ? this.api.cache.getTemplate(collectionName, templateID, data) : null;
        });
    }
    async fetchSchema(collectionName, schemaName, useCache = true) {
        return await this.fetch_single_row('schemas', collectionName, schemaName, (data) => {
            return (useCache || typeof data !== 'undefined') ? this.api.cache.getSchema(collectionName, schemaName, data) : null;
        });
    }
    async fetchCollection(collectionName, useCache = true) {
        return await this.fetch_single_row('collections', this.api.contract, collectionName, (data) => {
            return (useCache || typeof data !== 'undefined') ? this.api.cache.getCollection(collectionName, data) : null;
        });
    }
    async fetchCollectionSchemas(collectionName) {
        const rows = await this.fetch_all_rows('schemas', collectionName, 'schema_name');
        return rows.map((schema) => {
            return this.api.cache.getSchema(collectionName, schema.schema_name, schema);
        });
    }
    async fetchCollectionTemplates(collectionName) {
        const rows = await this.fetch_all_rows('templates', collectionName, 'template_id');
        return rows.map((template) => {
            return this.api.cache.getTemplate(collectionName, String(template.template_id), template);
        });
    }
    async preloadCollection(collectionName, useCache = true) {
        if (!useCache || !this.preloadedCollections[collectionName] || this.preloadedCollections[collectionName] + 15 * 60 * 1000 < Date.now()) {
            await this.fetchCollectionSchemas(collectionName);
            await this.fetchCollectionTemplates(collectionName);
        }
    }
    async fetchOffer(offerID, useCache = true) {
        return await this.fetch_single_row('offers', this.api.contract, offerID, (data) => {
            return (useCache || typeof data !== 'undefined') ? this.api.cache.getOffer(offerID, data) : null;
        });
    }
    async fetchAccountOffers(account) {
        const rows = await Promise.all([
            this.fetch_all_rows('offers', this.api.contract, 'offer_sender', account, account, 2, 'name'),
            this.fetch_all_rows('offers', this.api.contract, 'offer_recipient', account, account, 3, 'name')
        ]);
        const offers = rows[0].concat(rows[1]);
        return offers.map((offer) => {
            return this.api.cache.getOffer(offer.offer_id, offer);
        });
    }
    dequeue() {
        if (this.interval) {
            return;
        }
        this.interval = setInterval(async () => {
            if (this.elements.length > 0) {
                this.elements.shift()();
            }
            else {
                clearInterval(this.interval);
                this.interval = null;
            }
        }, Math.ceil(1000 / this.requestLimit));
    }
    async fetch_single_row(table, scope, match, cacheFn, indexPosition = 1, keyType = '') {
        return new Promise((resolve, reject) => {
            let data = cacheFn();
            if (data !== null) {
                return resolve(data);
            }
            this.elements.push(async () => {
                data = cacheFn();
                if (data !== null) {
                    return resolve(data);
                }
                try {
                    const options = {
                        code: this.api.contract, table, scope,
                        limit: 1, lower_bound: match, upper_bound: match,
                        index_position: indexPosition, key_type: keyType
                    };
                    const resp = await this.api.getTableRows(options);
                    if (resp.rows.length === 0) {
                        return reject(new Error('Row not found for ' + JSON.stringify(options)));
                    }
                    return resolve(cacheFn(resp.rows[0]));
                }
                catch (e) {
                    return reject(e);
                }
            });
            this.dequeue();
        });
    }
    async fetch_all_rows(table, scope, tableKey, lowerBound = '', upperBound = '', indexPosition = 1, keyType = '') {
        return new Promise(async (resolve, reject) => {
            this.elements.push(async () => {
                const resp = await this.api.getTableRows({
                    code: this.api.contract, scope, table,
                    lower_bound: lowerBound, upper_bound: upperBound, limit: 1000,
                    index_position: indexPosition, key_type: keyType
                });
                if (resp.more && indexPosition === 1) {
                    this.elements.unshift(async () => {
                        try {
                            const next = await this.fetch_all_rows(table, scope, tableKey, resp.rows[resp.rows.length - 1][tableKey], upperBound, indexPosition, keyType);
                            if (next.length > 0) {
                                next.shift();
                            }
                            resolve(resp.rows.concat(next));
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    this.dequeue();
                }
                else {
                    resolve(resp.rows);
                }
            });
            this.dequeue();
        });
    }
}
exports.default = RpcQueue;
