import { Some } from 'tsp-monads';

import { BaseUoI, IBaseUoI, IBaseUoIRaw } from './BaseUoI';
import { IUoIPropertyRaw, UoIProperty } from './Properties';

export interface IUoIWithoutConnectionsRaw extends IBaseUoIRaw { properties: IUoIPropertyRaw<any>[] }
export interface IUoIWithoutConnections extends IBaseUoI {
  properties: UoIProperty<any>[];
  fromRaw(r: IUoIWithoutConnectionsRaw): this;
}

export class UoIWithoutConnections extends BaseUoI implements IUoIWithoutConnections {
  properties: UoIProperty<any>[];

  constructor() {
    super();
    this.properties = [];
  }

  fromRaw(r: IUoIWithoutConnectionsRaw): this {
    this.id = Some(r.id);
    this.properties = r.properties.map(_ => UoIProperty.initFromRaw(_));
    return this;
  }
}
