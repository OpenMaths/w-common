import {expect} from "chai";
import {Some, None, is_some, is_none} from "./index";

describe("Option", () => {
    interface IScenario<T> {
        value:T;
    }

    function getAssertion<T>(type:string) {
        return (scenario:IScenario<T>) => {
            it("correctly creates an instance of Option with value '" + scenario.value + "'", () => {
                const subject = new Some(scenario.value);

                expect(subject instanceof Some).to.equal(true);

                expect(subject.is_some()).to.equal(true);
                expect(subject.is_none()).to.equal(false);
                expect(subject.unwrap_or(scenario.value)).to.deep.equal(scenario.value);

                expect(typeof (subject.unwrap())).to.equal(type.toLowerCase());
                expect(subject.unwrap()).to.deep.equal(scenario.value);
            });
        };
    }

    describe("Some", () => {
        describe("Boolean", () => {
            const type = "Boolean";

            const scenarios:IScenario<boolean>[] = [
                {value: true},
                {value: false},
                {value: Boolean(true)}
            ];

            const assertion = getAssertion<boolean>(type);

            scenarios.forEach(assertion);
        });

        describe("Number", () => {
            const type = "Number";

            const scenarios:IScenario<number>[] = [
                {value: 37},
                {value: 3.14},
                {value: 0},
                {value: Math.LN2},
                {value: Infinity},
                {value: NaN},
                {value: Number(1)},
            ];

            const assertion = getAssertion<number>(type);

            scenarios.forEach(assertion);
        });

        describe("String", () => {
            const type = "String";

            const scenarios:IScenario<string>[] = [
                {value: ""},
                {value: "bla"},
                {value: typeof 1},
                {value: String("abc")},
            ];

            const assertion = getAssertion<string>(type);

            scenarios.forEach(assertion);
        });

        describe("Function", () => {
            const type = "Function";

            const scenarios:IScenario<Function>[] = [
                {
                    value: function () {
                    }
                },
                {
                    value: class C {
                    }
                },
                {value: Math.sin},
            ];

            const assertion = getAssertion<Function>(type);

            scenarios.forEach(assertion);
        });

        describe("Object", () => {
            const type = "Object";

            const scenarios:IScenario<Object>[] = [
                {value: {a: 1}},
                {value: [1, 2, 4]},
                {value: new Date()},
                {value: new Boolean(true)},
                {value: new Number(1)},
                {value: new String("abc")},
            ];

            const assertion = getAssertion<Object>(type);

            scenarios.forEach(assertion);
        });

        describe("RegEx", () => {
            const val = /s/;
            it("correctly creates an instance of Option with value '" + val + "'", () => {
                const subject = new Some(val);

                expect(subject instanceof Some).to.equal(true);

                expect(subject.is_some()).to.equal(true);
                expect(subject.is_none()).to.equal(false);
                expect(subject.unwrap_or(val)).to.deep.equal(val);

                const type = typeof (subject.unwrap());

                expect(type === 'function' || type === 'object').to.equal(true);
                expect(subject.unwrap()).to.deep.equal(val);
            });
        });

        describe("Undefined, Null", () => {
            let array:string[] = ['a', 'b'];
            const outOfBoundIndex = array.length + 1;

            let object = {
                a: '_a',
                b: '_b'
            };
            const outOfBoundProperty = 'z';

            const scenarios:IScenario<undefined|null>[] = [
                {value: undefined},
                {value: null},
                {value: array[outOfBoundIndex]},
                {value: [null][0]},
                {value: (object as any)[outOfBoundProperty]},
                {value: ({_: null} as any)._},
            ];

            const assertion = (scenario:IScenario<any>) => {
                it("is None when trying to access out of bound index, property or variable, calling unwrap() throws", () => {
                    const subject = new Some(scenario.value);

                    expect(subject instanceof Some).to.equal(true);

                    expect(subject.is_none()).to.equal(true);
                    expect(subject.is_some()).to.equal(false);
                    expect(() => subject.unwrap()).to.throw();
                });
            };

            scenarios.forEach(assertion);
        });
    });

    describe("None", () => {
        it("correctly creates its instance, returns correct value when calling unwrap_or()", () => {
            const subject = new None<string>();

            expect(subject instanceof None).to.equal(true);

            expect(subject.is_none()).to.equal(true);
            expect(subject.is_some()).to.equal(false);

            expect(subject.unwrap_or("string")).to.deep.equal("string");
        });
    });

    describe("Option", () => {
        describe("unwrap_or", () => {
            it("should correctly throw if trying to call with undefined or null", () => {
                const subject = new None<string>();

                const
                    array = ["a"],
                    outOfBoundIndex = array.length + 1;

                expect(() => subject.unwrap_or(array[outOfBoundIndex])).to.throw();
            });
        });
    });
});

describe("is_some", () => {
    it("should unwrap after a successful preliminary check", () => {
        let a:number;

        const subject = new Some<number>(42);

        if (is_some(subject)) {
            a = subject.unwrap();
        } else {
            a = 0;
        }

        expect(a).to.equal(42);
    });

    it("should not unwrap after a failing preliminary check", () => {
        const
            a:string[] = ['a', 'b', 'c'],
            outOfBoundIndex = a.length + 1;

        let b:string;

        const subject = new Some<string>(a[outOfBoundIndex]);

        if (is_some(subject)) {
            b = subject.unwrap();
        } else {
            b = "This Is None";
        }

        expect(b).to.equal("This Is None");
    });
});

describe("is_none", () => {
    it("should return true if Option is None", () => {
        const
            a:string[] = ['a', 'b', 'c'],
            outOfBoundIndex = a.length + 1;

        let b:string;

        const subject = new Some(a[outOfBoundIndex]);

        if (is_none(subject)) {
            b = "Correct";
        } else {
            b = "Fail";
        }

        expect(is_none(subject)).to.equal(true);
        expect(b).to.equal("Correct");
    });

    it("should return false if Option is Some", () => {
        const a = () => null;

        let b:string;

        const subject = new Some(a);

        if (is_none(subject)) {
            b = "Fail";
        } else {
            b = "Correct";
        }

        expect(is_none(subject)).to.equal(false);
        expect(b).to.equal("Correct");
    });

    it("should return true if value is None", () => {
        let a:string;

        const subject = new None();

        if (is_none(subject)) {
            a = "Correct";
        } else {
            a = "Fail";
        }

        expect(is_none(subject)).to.equal(true);
        expect(a).to.equal("Correct");
    });
});
