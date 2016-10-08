import * as axios from 'axios'
import * as R from 'ramda'
import * as UrlUtils from '../../_Utils/Url'

export const AllowedHostnames = ['theguardian.com', 'wikipedia.com'];
export const BaseURL = 'https://readability.com';
export const ParserUrl = '/api/content/v1/parser';

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

    return R.contains(origin, AllowedHostnames);
};

/**
 * Returns Readability Api Instance
 * @param {string} href
 * @returns {AxiosInstance}
 */
export const getApiInstance = (href:string):Axios.AxiosInstance => {
    return axios.create({
        baseURL: BaseURL,
        params: {
            // @TODO token undefined when running tests
            token: process.env.READABILITY_TOKEN,
            url: href
        }
    });
};

/**
 * Returns "Readability Parse" axios promise to resolve
 * @param {string} href
 * @returns {Axios.IPromise<any>}
 */
export const getPromise = (href:string):Axios.IPromise<any> => {
  return getApiInstance(href).get(ParserUrl);
};