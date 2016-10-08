import * as url from 'url'
import * as R from 'ramda'

/**
 * Returns Url instance
 * @param href
 * @returns {Url}
 */
export function getUrlInstance(href:string):url.Url {
    return url.parse(href);
}

/**
 * Gets origin (omitting www.) from a Url instance
 * @param {Url} UrlInstance
 * @returns {string}
 */
export function getOriginFromUrlInstance(UrlInstance:url.Url):string {
    const hostname = UrlInstance.hostname;

    if (hostname && hostname.length > 0)
        return R.replace('www.', '', hostname);
    else
        throw new Error('Hostname "' + hostname + '" not valid');
}