import Connection from "./Connections";

export type UoIId = string;
export enum ContentType { Unknown = 1, ReadabilityContent, BorgAnswer }

export default class UoI<T> {
    id:UoIId;
    contentType:ContentType;
    properties:T;
    connections:Connection[];

    constructor(id:UoIId) {
        this.id = id;
    }
}

export class ReadabilityUoI<T> extends UoI<T> {
    constructor(id:UoIId, properties:T, connections:Connection[]) {
        super(id);

        this.contentType = ContentType.ReadabilityContent;
        this.properties = properties || [];
        this.connections = connections || [];
    }
}

export class BorgUoI<T> extends UoI<T> {
    constructor(id:UoIId, properties:T, connections:Connection[]) {
        super(id);

        this.contentType = ContentType.BorgAnswer;
        this.properties = properties || [];
        this.connections = connections || [];
    }
}