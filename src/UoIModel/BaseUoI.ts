import { Option, None } from 'tsp-monads';

export interface IBaseUoIRaw { id: string }
export interface IBaseUoI { id: Option<string> }

export class BaseUoI implements IBaseUoI {
  id: Option<string>;

  constructor() {
    this.id = None;
  }
}
