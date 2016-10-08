export interface INode<T> {
    readonly nodeId:string;
    children:T[];
    insertChild(node:T, insertIndex:number):void;
    removeChild(nodeId:string):void;
}

export interface ISingleChildNode<T> {
    readonly nodeId:string;
    child:T;
    insertChild(node:T):void;
    // remove(node:T):void;
}

export interface IContentHolderChildNode {
    readonly nodeId:string;
    rawUoIConstructor:string;
}