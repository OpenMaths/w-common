import { IUoIConnection, UoIConnection } from '.';

export class SeeAlsoUoIConnection extends UoIConnection implements IUoIConnection {
  constructor() {
    super();
    this.connectionType = 'SeeAlso';
  }
}
