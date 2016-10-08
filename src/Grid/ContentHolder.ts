import {IContentHolderChildNode} from './Node'
import {CreateContentHolderEvent} from './GraphEvent'

export default class ContentHolder implements IContentHolderChildNode {
    readonly nodeId:string;
    rawUoIConstructor:string;

    constructor(event:CreateContentHolderEvent) {
        this.nodeId = event.nodeId;
        // @TODO the below might POSSIBLY be a null!
        this.rawUoIConstructor = event.rawUoIConstructor as string;
    }
}