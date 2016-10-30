import {ReadabilityUoI} from "../Main";
import Property, {TitleProperty, HtmlContentProperty} from "../Properties";
import Connection from "../Connections";

let properties:Property<any>[] = [],
    connections:Connection[] = [];

properties.push(new TitleProperty('Title'));
properties.push(new HtmlContentProperty('<div></div>'));

const UoI = new ReadabilityUoI('id', properties, connections);

export default UoI;