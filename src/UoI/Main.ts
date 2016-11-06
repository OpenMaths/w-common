import {find, filter} from "ramda";
import Connection from "./Connections";
import Property, {TitleProperty, LabelProperty} from "./Properties";

export type UoIId = string;
export enum ContentType { Unknown = 1, ReadabilityContent, BorgAnswer }

export interface IUoI {
    id:UoIId;
    contentType:ContentType;
    properties:Property<any>[];
    connections:Connection[];
    getTitleProperty:() => TitleProperty;
    getLabelProperties:() => LabelProperty[];
}

export default class UoI implements IUoI {
    id:UoIId;
    contentType:ContentType;
    properties:Property<any>[];
    connections:Connection[];

    constructor(id:UoIId) {
        this.id = id;
        this.contentType = ContentType.Unknown;
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

export class ReadabilityUoI extends UoI {
    constructor(id:UoIId, properties:Property<any>[], connections:Connection[]) {
        super(id);

        this.contentType = ContentType.ReadabilityContent;
        this.properties = properties || [];
        this.connections = connections || [];
    }
}

export class BorgUoI extends UoI {
    constructor(id:UoIId, properties:Property<any>[], connections:Connection[]) {
        super(id);

        this.contentType = ContentType.BorgAnswer;
        this.properties = properties || [];
        this.connections = connections || [];
    }
}