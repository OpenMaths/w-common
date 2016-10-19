import {expect} from "chai";
import * as Utils from "./Utils";

describe("Models/ContentTypes/Radability/Utils", () => {
    describe("originAllowed", () => {
        it("correctly identifies whether an origin is allowed", () => {
            expect(Utils.originAllowed("http://theguardian.com")).to.equal(true);
            expect(Utils.originAllowed("http://wikipedia.com")).to.equal(true);
            expect(Utils.originAllowed("http://google.com")).to.equal(false);
            expect(Utils.originAllowed("")).to.equal(false);
        });
    });
});