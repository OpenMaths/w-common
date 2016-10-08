import {CreateGraphEvent} from './GraphEvent'
import {ISingleChildNode} from './Node'
import Container from './Container'

export default class Graph implements ISingleChildNode<Container> {
    readonly nodeId:string;
    child:Container;

    constructor(event:CreateGraphEvent) {
        this.nodeId = event.nodeId;
    }

    insertChild(container:Container) {
        this.child = container;
    }
}