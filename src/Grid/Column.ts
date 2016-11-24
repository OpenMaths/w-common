import {ISingleChildNode} from './Node'
import {CreateColumnEvent} from './GraphEvent'
import Container from './Container'
import ContentHolder from './ContentHolder'

export default class Column implements ISingleChildNode<Container|ContentHolder> {
    readonly nodeId:string;
    readonly parentId:string;
    child:Container|ContentHolder; // @TODO this should be optional / possibly undefined......

    constructor(event:CreateColumnEvent) {
        this.nodeId = event.nodeId;
    }

    insertChild(child:Container|ContentHolder) {
        this.child = child;
    }
}