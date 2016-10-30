import {find} from "ramda";
import Connection from "./Connections";
import Property, {TitleProperty} from "./Properties";

export type UoIId = string;
export enum ContentType { Unknown = 1, ReadabilityContent, BorgAnswer }

export interface IUoI {
    id:UoIId;
    contentType:ContentType;
    properties:Property<any>[];
    connections:Connection[];
    getTitleProperty:() => TitleProperty;
}

export default class UoI implements IUoI {
    id:UoIId;
    contentType:ContentType;
    properties:Property<any>[];
    connections:Connection[];

    constructor(id:UoIId) {
        this.id = id;
    }

    // @TODO add tests
    getTitleProperty():TitleProperty {
        const
            functor = (property:Property<any>) => property instanceof TitleProperty,
            prop = find(functor, this.properties);

        return prop ? (prop as TitleProperty) : (new TitleProperty(''));
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