import {ReadabilityUoI, UoIId} from "../../UoI/Main";
import Connection from "../../UoI/Connections";
import {TitleProperty, HtmlContentProperty} from "../../UoI/Properties";
import * as StringUtils from "../../_Utils/String";
import {AxiosSuccessResponse, AxiosErrorResponse} from "../../_Utils/Api";

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

export interface ReadabilitySuccessResponse extends AxiosSuccessResponse<IResponse> {
}

export interface ReadabilityErrorResponse extends AxiosErrorResponse<{messages:string;error:boolean;}> {
}

type Properties = Array<TitleProperty|HtmlContentProperty>;

export class ReadabilityContent {
    readonly id:string;
    properties:Properties;
    connections:Connection[];

    constructor(data:IResponse, id:UoIId) {
        this.id = StringUtils.encodeBase64(id);

        this.properties = [];
        this.properties.push(new TitleProperty(data.title));
        this.properties.push(new HtmlContentProperty(data.content));
    }

    getUoI():ReadabilityUoI<Properties> {
        return new ReadabilityUoI(this.id, this.properties, this.connections);
    }
}

