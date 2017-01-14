type SomeType = boolean | string | number | Function | Object;

const assert_none = (_:any) => (_ == null);
const assert_some = (_:any) => !assert_none(_);

export function is_some<T>(_:Some<T> | None<T>):_ is SomeUnwrappable<T> {
    return _.is_some();
}

export function is_none<T>(_:Some<T> | None<T>):_ is None<T> {
    return _.is_none();
}

export type Option<T> = Some<T> | None<T>;

export class Some<T extends SomeType> {
    protected readonly _:T;

    constructor(_:T) {
        if (assert_none(_)) {
            // Do nothing
        } else {
            this._ = _;
        }
    }

    is_some() {
        return assert_some(this._);
    }

    is_none() {
        return assert_none(this._);
    }

    unwrap():T|undefined {
        if (this.is_none()) {
            throw new ReferenceError("Trying to unwrap 'null' or 'undefined'!");
        }

        return this._;
    }

    unwrap_or(_:T):T {
        let ret = this.is_some() ? this._ : _;

        if (assert_none(ret)) {
            throw new ReferenceError("Trying to unwrap_or 'null' or 'undefined'!");
        }

        return ret;
    }
}

class SomeUnwrappable<T> extends Some<T> {
    unwrap():T {
        if (this.is_none()) {
            throw new ReferenceError("Trying to unwrap 'null' or 'undefined'!");
        }

        return this._;
    }
}

export class None<T extends SomeType> {
    constructor() {
    }

    is_some() {
        return false;
    }

    is_none() {
        return true;
    }

    unwrap_or(_:T):T {
        if (assert_none(_)) {
            throw new ReferenceError("Trying to unwrap 'null' or 'undefined'!");
        }

        return _;
    }
}
