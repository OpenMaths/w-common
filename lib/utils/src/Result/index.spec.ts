// import {expect} from "chai";
// import Result, {is_ok, is_err} from "./index";
//
// describe("Result", () => {
//     interface IScenario {
//         value:any;
//     }
//
//     const scenarios: IScenario[] = [
//         {value: ""},
//         {value: []},
//         {value: null},
//         {value: 7},
//         {value: undefined},
//         {value: ["a", 1, null]},
//         {value: typeof 1},
//         {value: {z: Math.random()}},
//         {value: () => null},
//         {value: true},
//         {value: new Date()},
//         {value: NaN},
//         {value: /regex/},
//         {value: false},
//         {value: Infinity},
//     ];
//
//     describe("Ok", () => {
//         function assertion(scenario:IScenario) {
//             it("should construct correct Result type with '" + scenario.value + "'", () => {
//                 const subject = Result.Ok(scenario.value);
//
//                 expect(subject instanceof Result).to.equal(true);
//
//                 expect(subject.is_ok()).to.equal(true);
//                 expect(subject.is_err()).to.equal(false);
//                 expect(subject.unwrap_or(scenario.value)).to.deep.equal(scenario.value);
//
//                 expect(subject.unwrap()).to.deep.equal(scenario.value);
//                 expect(() => subject.unwrap_err()).to.throw();
//             });
//         }
//
//         scenarios.forEach(assertion);
//     });
//
//     describe("Err", () => {
//         function assertion(scenario:IScenario) {
//             it("should construct correct Result type with '" + scenario.value + "'", () => {
//                 const subject = Result.Err(scenario.value);
//
//                 expect(subject instanceof Result).to.equal(true);
//
//                 expect(subject.is_err()).to.equal(true);
//                 expect(subject.is_ok()).to.equal(false);
//                 expect(subject.unwrap_or(scenario.value)).to.deep.equal(scenario.value);
//
//                 expect(subject.unwrap_err()).to.deep.equal(scenario.value);
//                 expect(() => subject.unwrap()).to.throw();
//             });
//         }
//
//         scenarios.forEach(assertion);
//     });
// });
//
// describe("is_ok", () => {
//     it("should unwrap after successful preliminary check", () => {
//         const val = false;
//
//         const subject = Result.Ok(val);
//
//         let a:boolean;
//
//         if (is_ok(subject)) {
//             a = subject.unwrap();
//         } else {
//             a = true;
//         }
//
//         expect(a).to.equal(val);
//     });
//
//     it("should not unwrap after failing preliminary check", () => {
//         const val = 42;
//
//         let subject = Result.Err(val);
//
//         let a:number|undefined;
//
//         if (is_ok(subject)) {
//             a = subject.unwrap();
//         } else {
//             a = 84;
//         }
//
//         expect(a).to.equal(84);
//     });
// });
//
// describe("is_err", () => {
//     it("should correctly determine whether a Result is Err", () => {
//         const val = "a";
//
//         const subject = Result.Err(val);
//
//         let a:string;
//
//         if (is_err(subject)) {
//             a = subject.unwrap_err();
//         } else {
//             a = "FAIL!";
//         }
//
//         expect(a).to.equal(val);
//     });
//
//     it("should not unwrap Err after failing preliminary check", () => {
//         const val = {_: "Success"};
//
//         let subject = Result.Ok(val);
//
//         let a:Object;
//
//         if (is_err(subject)) {
//             a = {_: "Error"};
//         } else {
//             a = subject.unwrap();
//         }
//
//         expect(a).to.equal(val);
//     });
// });
//
// // describe("unwrap_or", () => {
// //     it("should correctly unwrap provided value if Result is Err", () => {
// //         const val = "a";
// //
// //         let a: IResult<string, string>;
// //
// //         if (false == false) {
// //             a = Result.Err(val);
// //         } else {
// //             a = Result.Ok(val);
// //         }
// //
// //         const b = a.unwrap_or("b");
// //
// //         // expect(a).to.equal("a");
// //         expect(b).to.equal("b");
// //     });
// // });
