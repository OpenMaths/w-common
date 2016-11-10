import {UoIId} from './Main'

export enum ConnectionType { }

export default class Connection {
    connectionType:ConnectionType;
    refs:UoIId[];
}