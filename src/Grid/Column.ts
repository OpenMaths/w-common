import {ISingleChildNode} from './Node'
import {CreateColumnEvent} from './GraphEvent'
import Container from './Container'
import ContentHolder from './ContentHolder'

export default class Column implements ISingleChildNode<Container|ContentHolder|null> {
    readonly nodeId:string;
    readonly parentId:string;
    child:Container|ContentHolder|null;

    constructor(event:CreateColumnEvent) {
        this.nodeId = event.nodeId;
        this.parentId = event.parentId;
        this.child = null;
    }

    insertChild(child:Container|ContentHolder) {
        this.child = child;
    }

    removeChild() {
        this.child = null;
    }
}