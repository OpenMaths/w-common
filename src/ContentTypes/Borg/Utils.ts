import * as axios from "axios";

export const BaseURL = "https://ok-b.org:9993";
export const QueryUrl = "/v1/query";

/**
 * Returns Borg Api Instance
 * @param {string} query
 * @returns {AxiosInstance}
 */
export const getApiInstance = (query:string):Axios.AxiosInstance => {
    return axios.create({
        baseURL: BaseURL,
        params: {
            q: query
        }
    });
};

/**
 * Returns "Borg" axios promise to resolve
 * @param {string} query
 * @returns {Axios.IPromise<any>}
 */
export const getPromise = (query:string):Axios.IPromise<any> => {
    return getApiInstance(query).get(QueryUrl);
};