import {contains} from "ramda";
import * as UrlUtils from "../../_Utils/Url";

export const AllowedHostnames = ['theguardian.com', 'wikipedia.com'];

/**
 * Checks if origin from a href is allowed
 * @param {string} href
 * @returns {boolean}
 */
export const originAllowed = (href:string):boolean => {
    let origin:string;

    try {
        const url = UrlUtils.getUrlInstance(href);
        origin = UrlUtils.getOriginFromUrlInstance(url);
    } catch (e) {
        origin = '';
    }

    return contains(origin, AllowedHostnames);
};