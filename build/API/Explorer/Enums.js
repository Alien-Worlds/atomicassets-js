"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersSort = exports.TemplatesSort = exports.SchemasSort = exports.OffersSort = exports.CollectionsSort = exports.AssetsSort = exports.OrderParam = exports.OfferState = void 0;
var OfferState;
(function (OfferState) {
    OfferState[OfferState["Pending"] = 0] = "Pending";
    OfferState[OfferState["Invalid"] = 1] = "Invalid";
    OfferState[OfferState["Unknown"] = 2] = "Unknown";
    OfferState[OfferState["Accepted"] = 3] = "Accepted";
    OfferState[OfferState["Declined"] = 4] = "Declined";
    OfferState[OfferState["Canceled"] = 5] = "Canceled";
})(OfferState = exports.OfferState || (exports.OfferState = {}));
var OrderParam;
(function (OrderParam) {
    OrderParam["Asc"] = "asc";
    OrderParam["Desc"] = "desc";
})(OrderParam = exports.OrderParam || (exports.OrderParam = {}));
var AssetsSort;
(function (AssetsSort) {
    AssetsSort["AssetId"] = "asset_id";
    AssetsSort["Updated"] = "updated";
    AssetsSort["Transferred"] = "transferred";
    AssetsSort["Minted"] = "minted";
    AssetsSort["TemplateMint"] = "template_mint";
    AssetsSort["Name"] = "name";
})(AssetsSort = exports.AssetsSort || (exports.AssetsSort = {}));
var CollectionsSort;
(function (CollectionsSort) {
    CollectionsSort["Created"] = "created";
    CollectionsSort["CollectionName"] = "collection_name";
})(CollectionsSort = exports.CollectionsSort || (exports.CollectionsSort = {}));
var OffersSort;
(function (OffersSort) {
    OffersSort["Created"] = "created";
    OffersSort["Updated"] = "updated";
})(OffersSort = exports.OffersSort || (exports.OffersSort = {}));
var SchemasSort;
(function (SchemasSort) {
    SchemasSort["Created"] = "created";
    SchemasSort["SchemaName"] = "schema_name";
})(SchemasSort = exports.SchemasSort || (exports.SchemasSort = {}));
var TemplatesSort;
(function (TemplatesSort) {
    TemplatesSort["Created"] = "created";
    TemplatesSort["Name"] = "name";
})(TemplatesSort = exports.TemplatesSort || (exports.TemplatesSort = {}));
var TransfersSort;
(function (TransfersSort) {
    TransfersSort["Created"] = "created";
})(TransfersSort = exports.TransfersSort || (exports.TransfersSort = {}));
