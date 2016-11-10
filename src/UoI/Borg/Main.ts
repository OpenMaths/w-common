import UoI from "../Main";
import {TitleProperty, LabelProperty, BorgAnswerProperty} from "../Properties";

enum Source {stackoverflow}

interface ImportMeta {
    Source:Source;
    Id:string;
}

interface ISolution {
    Source:string[];
    Score:number;
}

export interface BorgProblem {
    Id:string;
    Title:string;
    Solutions:ISolution[];
    ImportMeta:ImportMeta;
    CreatedBy:string;
    Created:string;
    LastUpdatedBy:string;
    LastUpdated:string;
}

export enum BorgUoIType {BorgAnswer = 1210}

export class BorgUoI extends UoI {
    constructor(title:string, answer:BorgProblem[]) {
        super(title);

        this.type = BorgUoIType.BorgAnswer;
        this.properties.push(new TitleProperty(title));
        this.properties.push(new LabelProperty('Borg Answer'));
        this.properties.push(new BorgAnswerProperty(answer));
    }
}

export const BorgUoISample = new BorgUoI('How many lines in a file?', []);