import {IResponse as BorgAnswer} from "../ContentTypes/Borg/Main";
export enum PropertyType {Title = 1, HtmlContent, BorgAnswer}

export default class Property<T> {
    propertyType:PropertyType;
    property:T;

    constructor(property:T) {
        this.property = property;
    }
}

export class TitleProperty extends Property<string> {
    constructor(title:string) {
        super(title);

        this.propertyType = PropertyType.Title;
    }
}

export class HtmlContentProperty extends Property<string> {
    constructor(htmlContent:string) {
        super(htmlContent);

        this.propertyType = PropertyType.HtmlContent;
    }
}

export class BorgAnswerProperty extends Property<BorgAnswer[]> {
    constructor(data:BorgAnswer[]) {
        super(data);

        this.propertyType = PropertyType.BorgAnswer;
    }
}