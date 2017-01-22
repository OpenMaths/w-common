import {ISingleChildNode} from './Node'
import {CreateColumnEvent} from './GraphEvent'
import Container from './Container'
import ContentHolder from './ContentHolder'

export default class Column implements ISingleChildNode<Container|ContentHolder|null> {
    readonly nodeId:string;
    readonly parentId:string;
    child:Container|ContentHolder|null; // @TODO this should be optional / possibly undefined......

    constructor(event:CreateColumnEvent) {
        this.nodeId = event.nodeId;
        this.parentId = event.parentId;
    }

    insertChild(child:Container|ContentHolder) {
        this.child = child;
    }

    // @TODO add tests
    removeChild() {
        this.child = null;
    }
}