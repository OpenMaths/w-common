import {ReadabilityUoI, UoIId} from "../../UoI/Main";
import Connection from "../../UoI/Connections";
import Property, {TitleProperty, HtmlContentProperty} from "../../UoI/Properties";
import * as StringUtils from "../../_Utils/String";

interface IResponse {
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

export interface ReadabilitySuccessResponse extends Axios.AxiosXHR<IResponse> {
}

export interface ReadabilityErrorResponse {
    response:Axios.AxiosXHR<{
        messages:string;
        error:boolean;
    }>
}

export class ReadabilityContent {
    readonly id:string;
    properties:Property[];
    connections:Connection[];

    constructor(data:IResponse, id:UoIId) {
        this.id = StringUtils.encodeBase64(id);

        this.properties = [];
        this.properties.push(new TitleProperty(data.title));
        this.properties.push(new HtmlContentProperty(data.content));
    }

    getUoI():ReadabilityUoI {
        return new ReadabilityUoI(this.id, this.properties, this.connections);
    }
}

