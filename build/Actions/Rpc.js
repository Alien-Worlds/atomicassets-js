"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("./Generator");
/* tslint:disable:variable-name */
class RpcActionGenerator extends Generator_1.ActionGenerator {
    constructor(api) {
        super(api.contract);
        this.api = api;
    }
    async createcol(authorization, author, collection_name, allow_notify, authorized_accounts, notify_accounts, market_fee, data) {
        const config = await this.api.config();
        return super.createcol(authorization, author, collection_name, allow_notify, authorized_accounts, notify_accounts, market_fee, Generator_1.toAttributeMap(data, config.collection_format));
    }
    async createtempl(authorization, authorized_creator, collection_name, schema_name, transferable, burnable, max_supply, immutable_data) {
        const schema = await this.api.getSchema(collection_name, schema_name);
        const immutable_attribute_map = Generator_1.toAttributeMap(immutable_data, await schema.rawFormat());
        return super.createtempl(authorization, authorized_creator, collection_name, schema_name, transferable, burnable, max_supply, immutable_attribute_map);
    }
    async mintasset(authorization, authorized_minter, collection_name, schema_name, template_id, new_owner, immutable_data, mutable_data, tokens_to_back) {
        const template = await this.api.getTemplate(collection_name, template_id);
        const immutable_attribute_map = Generator_1.toAttributeMap(immutable_data, await (await template.schema()).rawFormat());
        const mutable_attribute_map = Generator_1.toAttributeMap(mutable_data, await (await template.schema()).rawFormat());
        return super.mintasset(authorization, authorized_minter, collection_name, schema_name, template_id, new_owner, immutable_attribute_map, mutable_attribute_map, tokens_to_back);
    }
    async setassetdata(authorization, authorized_editor, owner, asset_id, mutable_data) {
        const asset = await this.api.getAsset(owner, asset_id);
        const schema = await asset.schema();
        const mutable_attribute_map = Generator_1.toAttributeMap(mutable_data, await schema.rawFormat());
        return super.setassetdata(authorization, authorized_editor, owner, asset_id, mutable_attribute_map);
    }
    async setcoldata(authorization, collection_name, data) {
        const mdata = Generator_1.toAttributeMap(data, (await this.api.config()).collection_format);
        return super.setcoldata(authorization, collection_name, mdata);
    }
}
exports.default = RpcActionGenerator;
