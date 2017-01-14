import {Result, Ok, Err, is_ok} from "./index";

// let y: string;

// let x:Result<string, string> = new Ok("str");
// let x:Ok<string> = new Ok("str");
// let x = new Ok<string>("str");
// let x: Result<string, number>; // AMAZING
let x = new Err(new ReferenceError("Error Message")); // Ok
// y = x.unwrap_or("");
console.log(x);
//
// function getResult():Result<string, number> {
//     let x;
//
//     if (true == true) {
//         x = new Ok("Everything fine");
//     } else {
//         x = new Err(1);
//     }
//
//     return x;
// }
//
// function parseResult(res: Result<string, number>) {
//     let result:string;
//
//     if (is_ok(res)) {
//         result = res.unwrap();
//     } else {
//         result = "Other result";
//     }
//
//     return result;
// }
// let x = new Err("err");
// x.unwrap_or("lol");

// let res:string;
//
// let y:Result<string, string> = new Ok("OK");
//
// if (is_ok(y)) {
//     res = y.unwrap();
// } else {
//     res = y.unwrap();
// }