import {Observable} from "@reactivex/rxjs";

export enum ApiMethod {UNKNOWN = 1, GET, POST, PUT, DELETE}

export interface ApiParams {
    [key: string]: string;
}

export interface IApi<T, U> {
    readonly operation:U;
    readonly params:ApiParams|undefined;
    readonly data:T|undefined;
    getMethod:() => ApiMethod;
    getBaseUrl:() => string;
    getUrl:() => string;
    getParams:() => Object|undefined;
    getData:() => T|undefined;
    isProtected:() => boolean;
    getSampleData:() => any;
}

export interface AxiosErrorResponse<T> {
    response:Axios.AxiosXHR<T>
}

export interface AxiosSuccessResponse<T> extends Axios.AxiosXHR<T> {
}

export interface INetwork<C> {
    getHttpInstance:(config:C) => Axios.AxiosInstance;
    request:<T,U>(operation:T, params?:Object, data?:U) => Observable<any>;
}