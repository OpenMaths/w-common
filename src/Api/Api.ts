import {Observable} from "@reactivex/rxjs";
import {AxiosInstance} from "axios";

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

export interface INetwork<C> {
    getHttpInstance:(config:C) => AxiosInstance;
    request:<T,U>(operation:T, params?:Object, data?:U) => Observable<any>;
}