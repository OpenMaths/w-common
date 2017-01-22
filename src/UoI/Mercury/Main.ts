import UoI from "../Main";
import {TitleProperty, LabelProperty, HtmlContentProperty} from "../Properties";

export interface MercuryResponse {
    title:string;
    content:string;
    date_published:string|null;
    lead_image_url:string|null;
    dek:string|null;
    url:string;
    domain:string;
    excerpt:string;
    word_count:number;
    direction:string;
    total_pages:number;
    rendered_pages:number;
    next_page_url:string|null;
}

export enum MercuryUoIType {MercuryContent = 1110}

export class MercuryUoI extends UoI {
    constructor(id:string, title:string, content:string) {
        super(id);

        this.type = MercuryUoIType.MercuryContent;
        this.properties.push(new TitleProperty(title));
        this.properties.push(new LabelProperty('Web Content'));
        this.properties.push(new HtmlContentProperty(content));
    }
}

export class _MercuryUoI extends UoI {
    constructor(uoi:UoI) {
        super(uoi.id);

        this.type = uoi.type;
        this.properties = uoi.properties;
    }
}

export const MercuryUoISample = () => new MercuryUoI('id', 'Title', '<div></div>');
