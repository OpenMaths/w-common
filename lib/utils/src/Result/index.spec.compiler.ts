import Result from "./index";

function a() {
    let a;

    if (true == true) {
        a = Result.Ok("Ok!");
    } else {
        a = Result.Err(1);
    }

    let ok:string;

    ok = a.unwrap();

    return ok;
}
console.log(a);

function b() {
    let a;

    if (true == true) {
        a = Result.Ok("Ok!");
    } else {
        a = Result.Err(1);
    }

    let err:number;

    err = a.unwrap_err();

    return err;
}
console.log(b);

function c() {
    const a = Result.Err(1);

    let err:number;

    err = a.unwrap();

    return err;
}
console.log(c);
