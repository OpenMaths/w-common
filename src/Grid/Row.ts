import * as R from 'ramda'
import {INode} from './Node'
import {CreateRowEvent} from './GraphEvent'
import Column from './Column'

export default class Row implements INode<Column> {
    readonly nodeId:string;
    children:Column[];

    constructor(event:CreateRowEvent) {
        this.nodeId = event.nodeId;
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
        try {
            const index = R.findIndex((child:Column) => child.nodeId === nodeId, this.children);

            // @TODO should the below throw?
            if (!R.equals(index, -1))
                this.children.splice(index, 1);
        } catch (e) {
            throw new TypeError('Some of the children are not of type Column');
        }
    };
}