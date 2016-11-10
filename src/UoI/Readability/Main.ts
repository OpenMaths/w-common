import UoI from "../Main";
import {TitleProperty, LabelProperty, HtmlContentProperty} from "../Properties";

export interface ReadabilityResponse {
    domain:string;
    next_page_id:string|number|null;
    url:string;
    short_url:string;
    author:string|null;
    excerpt:string;
    direction:string;
    word_count:number;
    total_pages:number;
    content:string;
    date_published:string|null;
    dek:string|null;
    lead_image_url:string|null;
    title:string;
    rendered_pages:number;
}

export enum ReadabilityUoIType {ReadabilityContent = 1110}

export class ReadabilityUoI extends UoI {
    constructor(id:string, title:string, content:string) {
        super(id);

        this.type = ReadabilityUoIType.ReadabilityContent;
        this.properties.push(new TitleProperty(title));
        this.properties.push(new LabelProperty('Website'));
        this.properties.push(new HtmlContentProperty(content));
    }
}

export const ReadabilityUoISample = () => new ReadabilityUoI('id', 'Title', '<div></div>');