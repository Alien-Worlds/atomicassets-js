export default class RpcError extends Error {
    json: any;
    constructor(json: any);
}
