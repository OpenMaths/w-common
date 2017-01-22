import * as R from 'ramda'
import {INode} from './Node'
import {CreateRowEvent} from './GraphEvent'
import Column from './Column'

export default class Row implements INode<Column> {
    readonly nodeId:string;
    readonly parentId:string;
    children:Column[];

    constructor(event:CreateRowEvent) {
        this.nodeId = event.nodeId;
        this.parentId = event.parentId;
        this.children = [];
    }

    insertChild(node:Column, insertIndex:number|null) {
        if (R.isNil(insertIndex)) {
            this.children.push(node);
        } else {
            this.children.splice(insertIndex as number, 0, node);
        }
    };

    removeChild(nodeId:string) {
        let index = R.findIndex((child:Column) => R.equals(child.nodeId, nodeId), this.children);

        if (!R.equals(index, -1))
            this.children.splice(index, 1);
        else
            throw new ReferenceError(`Column ${nodeId} not found in ${this.nodeId}'s children`);
    };
}