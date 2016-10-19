import {BorgUoI, UoIId} from "../../UoI/Main";
import Connection from "../../UoI/Connections";
import {TitleProperty, BorgAnswerProperty} from "../../UoI/Properties";
import * as StringUtils from "../../_Utils/String";
import {AxiosSuccessResponse, AxiosErrorResponse} from "../../_Utils/Api";

enum Source {stackoverflow}

interface ImportMeta {
    Source:Source;
    Id:string;
}

interface ISolution {
    Source:string[];
    Score:number;
}

export interface IResponse {
    Id:string;
    Title:string;
    Solutions:ISolution[];
    ImportMeta:ImportMeta;
    CreatedBy:string;
    Created:string;
    LastUpdatedBy:string;
    LastUpdated:string;
}

export interface BorgSuccessResponse extends AxiosSuccessResponse<IResponse[]> {
}

export interface BorgErrorResponse extends AxiosErrorResponse<{}> {
}

type Properties = Array<TitleProperty|BorgAnswerProperty>;

export class BorgAnswer {
    readonly id:string;
    properties:Properties;
    connections:Connection[];

    constructor(data:IResponse[], id:UoIId) {
        this.id = StringUtils.encodeBase64(id);

        this.properties = [];
        this.properties.push(new TitleProperty(id));
        this.properties.push(new BorgAnswerProperty(data));
    }

    getUoI():BorgUoI<Properties> {
        return new BorgUoI(this.id, this.properties, this.connections);
    }
}

