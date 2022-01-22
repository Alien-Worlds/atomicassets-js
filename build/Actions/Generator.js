"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAttributeMap = exports.ActionGenerator = void 0;
const SerializationError_1 = __importDefault(require("../Errors/SerializationError"));
/* tslint:disable:variable-name */
class ActionGenerator {
    constructor(contract) {
        this.contract = contract;
    }
    async acceptoffer(authorization, offer_id) {
        return this._pack(authorization, 'acceptoffer', { offer_id });
    }
    async addcolauth(authorization, collection_name, account_to_add) {
        return this._pack(authorization, 'addcolauth', { collection_name, account_to_add });
    }
    async addconftoken(authorization, token_contract, token_symbol) {
        return this._pack(authorization, 'addconftoken', { token_contract, token_symbol });
    }
    async addnotifyacc(authorization, collection_name, account_to_add) {
        return this._pack(authorization, 'addnotifyacc', { collection_name, account_to_add });
    }
    async announcedepo(authorization, owner, symbol_to_announce) {
        return this._pack(authorization, 'announcedepo', { owner, symbol_to_announce });
    }
    async backasset(authorization, payer, asset_owner, asset_id, token_to_back) {
        return this._pack(authorization, 'backasset', { payer, asset_owner, asset_id, token_to_back });
    }
    async burnasset(authorization, asset_owner, asset_id) {
        return this._pack(authorization, 'burnasset', { asset_owner, asset_id });
    }
    async canceloffer(authorization, offer_id) {
        return this._pack(authorization, 'canceloffer', { offer_id });
    }
    async createcol(authorization, author, collection_name, allow_notify, authorized_accounts, notify_accounts, market_fee, data) {
        return this._pack(authorization, 'createcol', {
            author,
            collection_name,
            allow_notify,
            authorized_accounts,
            notify_accounts,
            market_fee,
            data
        });
    }
    async createoffer(authorization, sender, recipient, sender_asset_ids, recipient_asset_ids, memo) {
        return this._pack(authorization, 'createoffer', { sender, recipient, sender_asset_ids, recipient_asset_ids, memo });
    }
    async createtempl(authorization, authorized_creator, collection_name, schema_name, transferable, burnable, max_supply, immutable_data) {
        return this._pack(authorization, 'createtempl', {
            authorized_creator, collection_name, schema_name, transferable, burnable, max_supply, immutable_data
        });
    }
    async createschema(authorization, authorized_creator, collection_name, schema_name, schema_format) {
        return this._pack(authorization, 'createschema', { authorized_creator, collection_name, schema_name, schema_format });
    }
    async declineoffer(authorization, offer_id) {
        return this._pack(authorization, 'declineoffer', { offer_id });
    }
    async extendschema(authorization, authorized_editor, collection_name, schema_name, schema_format_extension) {
        return this._pack(authorization, 'extendschema', { authorized_editor, collection_name, schema_name, schema_format_extension });
    }
    async forbidnotify(authorization, collection_name) {
        return this._pack(authorization, 'forbidnotify', { collection_name });
    }
    async locktemplate(authorization, authorized_editor, collection_name, template_id) {
        return this._pack(authorization, 'locktemplate', { authorized_editor, collection_name, template_id });
    }
    async mintasset(authorization, authorized_minter, collection_name, schema_name, template_id, new_asset_owner, immutable_data, mutable_data, tokens_to_back) {
        return this._pack(authorization, 'mintasset', {
            authorized_minter, collection_name, schema_name, template_id, new_asset_owner, immutable_data, mutable_data, tokens_to_back
        });
    }
    async payofferram(authorization, payer, offer_id) {
        return this._pack(authorization, 'payofferram', { payer, offer_id });
    }
    async remcolauth(authorization, collection_name, account_to_remove) {
        return this._pack(authorization, 'remcolauth', { collection_name, account_to_remove });
    }
    async remnotifyacc(authorization, collection_name, account_to_remove) {
        return this._pack(authorization, 'remnotifyacc', { collection_name, account_to_remove });
    }
    async setassetdata(authorization, authorized_editor, asset_owner, asset_id, new_mutable_data) {
        return this._pack(authorization, 'setassetdata', { authorized_editor, asset_owner, asset_id, new_mutable_data });
    }
    async setcoldata(authorization, collection_name, data) {
        return this._pack(authorization, 'setcoldata', { collection_name, data });
    }
    async setmarketfee(authorization, collection_name, market_fee) {
        return this._pack(authorization, 'setmarketfee', { collection_name, market_fee });
    }
    async transfer(authorization, account_from, account_to, asset_ids, memo) {
        return this._pack(authorization, 'transfer', { from: account_from, to: account_to, asset_ids, memo });
    }
    async withdraw(authorization, owner, token_to_withdraw) {
        return this._pack(authorization, 'withdraw', { owner, token_to_withdraw });
    }
    _pack(authorization, name, data) {
        return [{ account: this.contract, name, authorization, data }];
    }
}
exports.ActionGenerator = ActionGenerator;
function toAttributeMap(obj, schema) {
    const types = {};
    const result = [];
    for (const row of schema) {
        types[row.name] = row.type;
    }
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (typeof types[key] !== 'undefined') {
            throw new SerializationError_1.default('field not defined in schema');
        }
        result.push({ key, value: [types[key], obj[key]] });
    }
    return result;
}
exports.toAttributeMap = toAttributeMap;
