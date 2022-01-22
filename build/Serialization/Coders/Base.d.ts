export default class BaseCoder {
    private readonly ALPHABET;
    private readonly BASE;
    private readonly BASE_MAP;
    private readonly LEADER;
    private readonly FACTOR;
    private readonly iFACTOR;
    constructor(ALPHABET: string);
    encode(source: Uint8Array): string;
    decode(source: string): Uint8Array;
    private decodeUnsafe;
}
