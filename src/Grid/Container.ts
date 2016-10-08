import * as R from 'ramda'
import {INode} from './Node'
import {CreateContainerEvent} from './GraphEvent'
import Row from './Row'

export default class Container implements INode<Row> {
    readonly nodeId:string;
    children:Row[];

    constructor(event:CreateContainerEvent) {
        this.nodeId = event.nodeId;
        this.children = [];
    }

    insertChild(node:Row, insertIndex:number|null) {
        if (R.isNil(insertIndex)) {
            this.children.push(node);
        } else {
            this.children.splice(insertIndex as number, 0, node);
        }
    };

    removeChild(nodeId:string) {
        try {
            const index = R.findIndex((child:Row) => child.nodeId === nodeId, this.children);

            // @TODO should the below throw?
            if (!R.equals(index, -1))
                this.children.splice(index, 1);
        } catch (e) {
            throw new TypeError('Some of the children are not of type Row');
        }
    };
}