import {BorgUoI, UoIId} from "../../UoI/Main";
import Connection from "../../UoI/Connections";
import Property, {TitleProperty, BorgAnswerProperty} from "../../UoI/Properties";
import * as StringUtils from "../../_Utils/String";
import {AxiosResponse, AxiosError} from "axios/axios";

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

// @TODO figure out if we use it
export interface BorgSuccessResponse extends AxiosResponse<IResponse[]> {
}

// @TODO figure out if we use it
export interface BorgErrorResponse extends AxiosError<{}> {
}

export class BorgAnswer {
    readonly id:string;
    properties:Property<any>[];
    connections:Connection[];

    constructor(data:IResponse[], id:UoIId) {
        this.id = StringUtils.encodeBase64(id);

        this.properties = [];
        this.properties.push(new TitleProperty(id));
        this.properties.push(new BorgAnswerProperty(data));
    }

    getUoI():BorgUoI {
        return new BorgUoI(this.id, this.properties, this.connections);
    }
}

