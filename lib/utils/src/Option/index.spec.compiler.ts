import {Some} from "./index";

function a() {
    const a = "Something";

    let b:string;

    const subject = new Some(a);

    b = subject.unwrap();

    console.log(b);
}
console.log(a);

function b() {
    const
        a:string[] = ['a', 'b', 'c'],
        outOfBoundIndex = a.length + 1;

    let b:string;

    const subject = new Some(a[outOfBoundIndex]);

    b = subject.unwrap();

    console.log(b);
}
console.log(b);

function c() {
    const a = "Value";

    let b:string, c:string;

    const subject = new Some(a);

    b = subject.unwrap_or(null);
    c = subject.unwrap_or(undefined);

    console.log(b);
    console.log(c);
}
console.log(c);
