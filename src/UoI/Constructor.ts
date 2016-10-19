import {head, join, split, tail, trim} from "ramda";
import {ContentType, UoIId} from "./Main";
import * as StringUtils from "../_Utils/String";

export const RawSegmentDelimiter = ":";

export class UoIConstructor {
    readonly contentType:ContentType;
    readonly contentIdentifier:UoIId;

    constructor(raw:string) {
        this.contentType =
            UoIConstructor.getContentTypeFromRaw(UoIConstructor.getRawContentType(raw));
        this.contentIdentifier =
            UoIConstructor.getContentIdentifierFromRaw(UoIConstructor.getRawContentIdentifier(raw));
    }

    /**
     * Processes raw input and returns raw content type
     * @param {string} raw
     * @returns {RawContentType}
     */
    static getRawContentType(raw:string):RawContentType {
        const segments = split(RawSegmentDelimiter, raw);
        return trim(head(segments));
    }

    /**
     * Processes raw input and returns raw content identifier
     * @param {string} raw
     * @returns {RawContentIdentifier}
     */
    static getRawContentIdentifier(raw:string):RawContentIdentifier {
        const segments = split(RawSegmentDelimiter, raw);
        return trim(join(RawSegmentDelimiter, tail(segments)));
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
}

export type RawContentType = string;
export type RawContentIdentifier = string;