import {equals, find, filter} from "ramda";
import Connection from "./Connections";
import Property, {TitleProperty, LabelProperty, HtmlContentProperty, PropertyType} from "./Properties";
import {BorgUoIType} from "./Borg/Main";
import {MercuryUoIType} from "./Mercury/Main";
import {UnknownUoIType} from "./Unknown/Main";
import * as StringUtils from "../Utils/String";
import {Some, Option} from "../../lib/utils/src/Option/index";

export type UoIId = string;
export type UoIType = BorgUoIType | UnknownUoIType | MercuryUoIType;

export interface IUoI {
    id:UoIId;
    type:UoIType;
    properties:Property<any>[];
    connections:Connection[];
    getTitleProperty:() => Option<TitleProperty>;
    getHtmlContentProperty:() => Option<HtmlContentProperty>;
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
     * Returns the TitleProperty of this UoI Instance, wrapped in an Option
     * @returns {Option<TitleProperty>}
     */
    getTitleProperty():Option<TitleProperty> {
        const
            functor = (property:Property<any>) => equals(property.propertyType, PropertyType.Title),
            prop = find(functor, this.properties);

        return new Some(prop as TitleProperty);
    }

    /**
     * Returns the HtmlContentProperty of this UoI Instance, wrapped in an Option
     * @returns {Option<HtmlContentProperty>}
     */
    getHtmlContentProperty():Option<HtmlContentProperty> {
        const
            functor = (property:Property<any>) => equals(property.propertyType, PropertyType.HtmlContent),
            prop = find(functor, this.properties);

        return new Some(prop as HtmlContentProperty);
    }

    /**
     * Returns all LabelProperties of this UoI Instance, empty list when none found
     * @returns {LabelProperty[]}
     */
    getLabelProperties():LabelProperty[] {
        const functor = (property:Property<any>) => equals(property.propertyType, PropertyType.Label);

        return filter(functor, this.properties);
    }
}