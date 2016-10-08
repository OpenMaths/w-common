import {UoIId} from './Main'

export enum ConnectionType { SeeAlso }

export default class Connection {
    connectionType:ConnectionType;
    refs:UoIId[];
}

// export class SeeAlsoConnection extends Connection {
//     constructor(refs:UoIId[]) {
//         super();
//
//         this.connectionType = ConnectionType.SeeAlso;
//         this.refs = refs;
//     }
// }