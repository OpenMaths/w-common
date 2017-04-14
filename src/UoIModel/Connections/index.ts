import { SeeAlsoUoIConnection } from './SeeAlso';

import { IUoIWithoutConnections, IUoIWithoutConnectionsRaw, UoIWithoutConnections } from '..';

export type UoIConnectionType = 'Unknown' | 'SeeAlso';

export interface IUoIConnection {
  connectionType: UoIConnectionType;
  refs: IUoIWithoutConnections[];
  fromRaw: (r: IUoIConnectionRaw) => IUoIConnection;
  add: (val: IUoIWithoutConnections) => IUoIConnection;
}

export interface IUoIConnectionRaw { connectionType: UoIConnectionType, refs: IUoIWithoutConnectionsRaw[] }

export class UoIConnection implements IUoIConnection {
  connectionType: UoIConnectionType;
  refs: IUoIWithoutConnections[];

  constructor() {
    this.connectionType = 'Unknown';
    this.refs           = [];
  }

  fromRaw(r: IUoIConnectionRaw): IUoIConnection {
    this.refs = [];
    r.refs.forEach(_ => this.add(new UoIWithoutConnections().fromRaw(_)));
    return this;
  }

  add(val: IUoIWithoutConnections): IUoIConnection {
    this.refs.push(val);
    return this;
  }

  static initFromRaw(r: IUoIConnectionRaw): IUoIConnection {
    switch (r.connectionType) {
      case 'SeeAlso':
        return new SeeAlsoUoIConnection().fromRaw(r);
      default:
        return new UoIConnection().fromRaw(r);
    }
  }
}
