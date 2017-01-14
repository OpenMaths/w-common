type SomeType = boolean | string | number | Function | Object | null;

const assert_err = (_:any) => (typeof _ === "undefined");
const assert_ok = (_:any) => !assert_err(_);

export function is_ok<T, U>(_:Ok<T> | Err<U>):_ is OkUnwrappable<T> {
    return _.is_ok();
}

export function is_err<T>(_:Ok<T> | Err<T>):_ is ErrUnwrappable<T> {
    return _.is_err();
}

export type Result<T, U> = Ok<T> | Err<U>;

export class Ok<T extends SomeType> {
    protected readonly _:T;

    constructor(_:T) {
        if (assert_err(_)) {
            // Do nothing
        } else {
            this._ = _;
        }
    }

    is_ok() {
        return assert_ok(this._);
    }

    is_err() {
        return assert_err(this._);
    }

    unwrap():T|undefined {
        if (this.is_err()) {
            throw new ReferenceError("Trying to unwrap 'undefined'!");
        }

        return this._;
    }

    unwrap_or(_:T):T {
        let ret = this.is_ok() ? this._ : _;

        if (assert_err(ret)) {
            throw new ReferenceError("Trying to unwrap_or 'undefined'!");
        }

        return ret;
    }
}

class OkUnwrappable<T> extends Ok<T> {
    unwrap():T {
        if (this.is_err()) {
            throw new ReferenceError("Trying to unwrap 'undefined'!");
        }

        return this._;
    }
}

export class Err<T extends SomeType> {
    protected readonly _:T;

    constructor(_:T) {
        if (assert_err(_)) {
            // Do nothing
        } else {
            this._ = _;
        }
    }

    is_ok() {
        return false;
    }

    is_err() {
        return true;
    }

    unwrap():T|undefined {
        if (this.is_err()) {
            throw new ReferenceError("Trying to unwrap 'undefined'!");
        }

        return this._;
    }

    unwrap_or(_:T):T {
        if (assert_err(_)) {
            throw new ReferenceError("Trying to unwrap_or 'undefined'!");
        }

        return _;
    }
}

class ErrUnwrappable<T> extends Err<T> {
    unwrap():T {
        if (this.is_err()) {
            throw new ReferenceError("Trying to unwrap 'undefined'!");
        }

        return this._;
    }
}
