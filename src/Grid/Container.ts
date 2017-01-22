import * as R from 'ramda'
import {INode} from './Node'
import {CreateContainerEvent} from './GraphEvent'
import Row from './Row'

export default class Container implements INode<Row> {
    readonly nodeId:string;
    readonly parentId:string;
    children:Row[];

    constructor(event:CreateContainerEvent) {
        this.nodeId = event.nodeId;
        this.parentId = event.parentId;
        this.children = [];
    }

    insertChild(node:Row, insertIndex:number|null) {
        if (R.isNil(insertIndex)) {
            this.children.push(node);
        } else {
            this.children.splice(insertIndex as number, 0, node);
        }
    };

    // @TODO update tests
    removeChild(nodeId:string) {
        let index = R.findIndex((child:Row) => R.equals(child.nodeId, nodeId), this.children);

        if (!R.equals(index, -1))
            this.children.splice(index, 1);
        else
            throw new ReferenceError(`Row ${nodeId} not found in ${this.nodeId}'s children`);
    };
}