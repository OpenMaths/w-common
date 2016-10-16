import * as R from "ramda";
import {Observable} from "@reactivex/rxjs";
import {ContentType, UoIId} from "./Main";
import * as ReadabilityUtils from "../ContentTypes/Readability/Utils";
import * as BorgUtils from "../ContentTypes/Borg/Utils";
import * as StringUtils from "../_Utils/String";

export const RawSegmentDelimiter = ":";

export class UoIConstructor {
    readonly contentType:ContentType;
    readonly contentIdentifier:UoIId;
    readonly resolveObservable:Observable<any>;

    constructor(raw:string) {
        this.contentType =
            UoIConstructor.getContentTypeFromRaw(UoIConstructor.getRawContentType(raw));
        this.contentIdentifier =
            UoIConstructor.getContentIdentifierFromRaw(UoIConstructor.getRawContentIdentifier(raw));
        this.resolveObservable =
            UoIConstructor.getObservable(this.contentType, this.contentIdentifier);
    }

    /**
     * Processes raw input and returns raw content type
     * @param {string} raw
     * @returns {RawContentType}
     */
    static getRawContentType(raw:string):RawContentType {
        const segments = R.split(RawSegmentDelimiter, raw);
        return R.trim(R.head(segments));
    }

    /**
     * Processes raw input and returns raw content identifier
     * @param {string} raw
     * @returns {RawContentIdentifier}
     */
    static getRawContentIdentifier(raw:string):RawContentIdentifier {
        const segments = R.split(RawSegmentDelimiter, raw);
        return R.trim(R.join(RawSegmentDelimiter, R.tail(segments)));
    }

    /**
     * Assigns correct ContentType based on raw content type
     * @param {RawContentType} raw
     * @returns {ContentType}
     */
    static getContentTypeFromRaw(raw:RawContentType):ContentType {
        switch (raw) {
            case "readability":
                return ContentType.ReadabilityContent;
            case "borg":
                return ContentType.BorgAnswer;
            default:
                return ContentType.Unknown;
        }
    }

    /**
     * Returns decoded string – UoIId – from raw content identifier
     * @param {RawContentIdentifier} raw
     * @returns {UoIId}
     */
    static getContentIdentifierFromRaw(raw:RawContentIdentifier):UoIId {
        return StringUtils.decodeBase64(raw);
    }

    /**
     * Returns appropriate Observable to be subscribed to
     * @param {ContentType} contentType
     * @param {UoIId} contentIdentifier
     * @returns {Rx.Observable<any>}
     */
    static getObservable(contentType:ContentType, contentIdentifier:UoIId):Observable<any> {
        switch (contentType) {
            case ContentType.ReadabilityContent:
                if (ReadabilityUtils.originAllowed(contentIdentifier))
                    return Observable.fromPromise(ReadabilityUtils.getPromise(contentIdentifier));
                else
                    return Observable.throw("Content Identifier " + contentIdentifier + " is invalid");
            case ContentType.BorgAnswer:
                return Observable.fromPromise(BorgUtils.getPromise(contentIdentifier));
            default:
                return Observable.throw("No source found for Content Type " + contentType);
        }
    }
}

export type RawContentType = string;
export type RawContentIdentifier = string;