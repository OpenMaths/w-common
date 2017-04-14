import { Some } from 'tsp-monads';

import { UoIProperty } from './Properties';
import { IUoIConnectionRaw, UoIConnection } from './Connections';

import { IUoIWithoutConnectionsRaw, UoIWithoutConnections } from './UoIWithoutConnections';

export interface IUoIRaw extends IUoIWithoutConnectionsRaw { connections: IUoIConnectionRaw[] }
export interface IUoI extends UoIWithoutConnections {
  connections: UoIConnection[];
  fromRaw(r: IUoIRaw): this;
}

export class UoI extends UoIWithoutConnections implements IUoI {
  connections: UoIConnection[];

  constructor() {
    super();
    this.connections = [];
  }

  fromRaw(r: IUoIRaw): this {
    this.id = Some(r.id);
    this.properties = r.properties.map(_ => UoIProperty.initFromRaw(_));
    this.connections= r.connections.map(_ => UoIConnection.initFromRaw(_));
    return this;
  }
}
