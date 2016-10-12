import {expect} from "chai";
import * as R from "ramda";
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

    describe("getApiInstance", () => {
        it("returns axios instance", () => {
            const instance = Utils.getApiInstance("http://theguardian.com/article/identifier");
            expect(instance.defaults.baseURL).to.equal(Utils.BaseURL);
            expect(R.equals(typeof instance.defaults.params, "undefined")).to.equal(false);

            const params = instance.defaults.params as any;

            // @TODO token undefined when running tests
            expect(params.token).to.equal(process.env.READABILITY_TOKEN);
            expect(params.url).to.equal("http://theguardian.com/article/identifier");
        });
    });

    describe("getPromise", () => {
        it("returns \"Readability Parse\" axios promise", () => {
            const promise = Utils.getPromise("http://theguardian.com/article/identifier");
            expect(R.equals(typeof promise, "object")).to.equal(true);
        });
    });
});