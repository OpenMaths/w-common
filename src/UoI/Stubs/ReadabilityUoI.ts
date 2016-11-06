import {ReadabilityUoI} from "../Main";
import Property, {TitleProperty, HtmlContentProperty, LabelProperty} from "../Properties";
import Connection from "../Connections";

function getNewReadabilityUoI() {
    let properties:Property<any>[] = [],
        connections:Connection[] = [];

    properties.push(new TitleProperty('Title'));
    properties.push(new HtmlContentProperty('<div></div>'));
    properties.push(new LabelProperty('Website'));

    return new ReadabilityUoI('id', properties, connections);
}

export default getNewReadabilityUoI;