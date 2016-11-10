import {find, filter} from "ramda";
import Connection from "./Connections";
import Property, {TitleProperty, LabelProperty} from "./Properties";
import {BorgUoIType} from "./Borg/Main";
import {ReadabilityUoIType} from "./Readability/Main";
import {UnknownUoIType} from "./Unknown/Main";
import * as StringUtils from "../Utils/String";

export type UoIId = string;
export type UoIType = BorgUoIType | ReadabilityUoIType | UnknownUoIType;

export interface IUoI {
    id:UoIId;
    type:UoIType;
    properties:Property<any>[];
    connections:Connection[];
    getTitleProperty:() => TitleProperty;
    getLabelProperties:() => LabelProperty[];
}

export default class UoI implements IUoI {
    id:UoIId;
    type:UoIType;
    properties:Property<any>[];
    connections:Connection[];

    constructor(id:UoIId) {
        this.id = StringUtils.encodeBase64(id);
        // this.type = undefined;
        this.properties = [];
        this.connections = [];
    }

    /**
     * Returns the TitleProperty of this UoI Instance, empty title when none found
     * @returns {TitleProperty}
     */
    getTitleProperty():TitleProperty {
        const
            functor = (property:Property<any>) => property instanceof TitleProperty,
            prop = find(functor, this.properties);

        // @TODO change to "Untitled" rather than empty string?
        return prop ? (prop as TitleProperty) : (new TitleProperty(''));
    }

    /**
     * Returns all LabelProperties of this UoI Instance, empty list when none found
     * @returns {LabelProperty[]}
     */
    getLabelProperties():LabelProperty[] {
        const functor = (property:Property<any>) => property instanceof LabelProperty;

        return filter(functor, this.properties);
    }
}