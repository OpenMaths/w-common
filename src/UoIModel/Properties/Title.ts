import { IUoIProperty, IUoIPropertyRaw, UoIProperty } from '.';

export class TitleUoIProperty extends UoIProperty<string> implements IUoIProperty<string> {
  constructor() {
    super();
    this.propertyType = 'Title';
  }

  fromRaw(r: IUoIPropertyRaw<string>): TitleUoIProperty {
    return this.set(r.property);
  }
}
