import UoI from "../Main";

export enum UnknownUoIType {Unknown = 1010}

export class UnknownUoI extends UoI {
    constructor(id:string) {
        super(id);

        this.type = UnknownUoIType.Unknown;
    }
}

export const UnknownUoISample = new UoI('id');