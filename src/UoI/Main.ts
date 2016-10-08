import Property from './Properties'
import Connection from './Connections'

export type UoIId = string;
export enum ContentType { Unknown = 1, ReadabilityContent }

export default class UoI {
    id:UoIId;
    contentType:ContentType;
    properties:Property[];
    connections:Connection[];

    constructor(id:UoIId) {
        this.id = id;
    }
}

export class ReadabilityUoI extends UoI {
    constructor(id:UoIId, properties:Property[], connections:Connection[]) {
        super(id);

        this.contentType = ContentType.ReadabilityContent;
        this.properties = properties || [];
        this.connections = connections || [];
    }
}