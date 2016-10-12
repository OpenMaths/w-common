import {BorgUoI, UoIId} from "../../UoI/Main";
import Connection from "../../UoI/Connections";
import Property, {TitleProperty} from "../../UoI/Properties";
import * as StringUtils from "../../_Utils/String";

enum Source {stackoverflow}

interface ImportMeta {
    Source:Source;
    Id:string;
}

interface ISolution {
    Source:string[];
    Score:number;
}

interface IResponse {
    Id:string;
    Title:string;
    Solutions:ISolution[];
    ImportMeta:ImportMeta;
    CreatedBy:string;
    Created:string;
    LastUpdatedBy:string;
    LastUpdated:string;
}

export interface BorgSuccessResponse extends Axios.AxiosXHR<IResponse> {
}

export interface BorgErrorResponse {
    response:Axios.AxiosXHR<{
        messages:string;
        error:boolean;
    }>
}

export class BorgContent {
    readonly id:string;
    properties:Property[];
    connections:Connection[];

    constructor(data:IResponse, id:UoIId) {
        this.id = StringUtils.encodeBase64(id);

        this.properties = [];
        this.properties.push(new TitleProperty(data.Title));
        // this.properties.push(new HtmlContentProperty(''));
    }

    getUoI():BorgUoI {
        return new BorgUoI(this.id, this.properties, this.connections);
    }
}

