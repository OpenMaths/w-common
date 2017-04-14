import { Option, Some, None } from 'tsp-monads';

import { TitleUoIProperty } from './Title';

export type UoIPropertyType = 'Title';

export interface IUoIProperty<T> {
  propertyType: UoIPropertyType;
  property: Option<T>;
  fromRaw: (r: IUoIPropertyRaw<T>) => IUoIProperty<T>;
  set: (val: T) => IUoIProperty<T>;
}

export interface IUoIPropertyRaw<T> { propertyType: UoIPropertyType, property: T }

export class UoIProperty<T> implements IUoIProperty<T> {
  propertyType: UoIPropertyType;
  property: Option<T>;

  constructor() {
    this.property = None;
  }

  fromRaw(r: IUoIPropertyRaw<T>): IUoIProperty<T> {
    return this.set(r.property);
  }

  set(val: T): IUoIProperty<T> {
    this.property = Some(val);
    return this;
  }

  static initFromRaw(r: IUoIPropertyRaw<any>): IUoIProperty<any> {
    switch (r.propertyType) {
      case 'Title':
        return new TitleUoIProperty().fromRaw(r);
      default:
        return new UoIProperty().fromRaw(r);
    }
  }
}
