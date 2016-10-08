export enum PropertyType {Title = 1, HtmlContent}

export default class Property {
    propertyType:PropertyType;
    property:string;
}

export class TitleProperty extends Property {
    constructor(title:string) {
        super();

        this.propertyType = PropertyType.Title;
        this.property = title;
    }
}

export class HtmlContentProperty extends Property {
    constructor(htmlContent:string) {
        super();

        this.propertyType = PropertyType.HtmlContent;
        this.property = htmlContent;
    }
}