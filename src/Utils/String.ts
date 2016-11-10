import * as Crypto from "crypto-js";

/**
 * Encodes Base64 string (UTF8)
 * @param {string} raw
 * @returns {string}
 */
export const encodeBase64 = (raw:string):string => {
    try {
        const words = Crypto.enc.Utf8.parse(raw);
        return Crypto.enc.Base64.stringify(words);
    } catch (e) {
        // @TODO add error log
        return '';
    }

};

/**
 * Decodes Base64 string (UTF8)
 * @param {string} raw
 * @returns {string}
 */
export const decodeBase64 = (raw:string):string => {
    try {
        const words = Crypto.enc.Base64.parse(raw);
        return Crypto.enc.Utf8.stringify(words);
    } catch (e) {
        // @TODO add error log
        return '';
    }
};