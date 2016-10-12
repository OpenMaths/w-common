import {expect} from "chai";
import * as R from "ramda";
import * as Utils from "./Utils";

describe("Models/ContentTypes/Borg/Utils", () => {
    describe("getApiInstance", () => {
        it("returns axios instance", () => {
            const instance = Utils.getApiInstance("query");
            expect(instance.defaults.baseURL).to.equal(Utils.BaseURL);
            expect(R.equals(typeof instance.defaults.params, "undefined")).to.equal(false);

            const params = instance.defaults.params as any;

            expect(params.q).to.equal("query");
        });
    });

    describe("getPromise", () => {
        it("returns \"Borg\" axios promise", () => {
            const promise = Utils.getPromise("query");
            expect(R.equals(typeof promise, "object")).to.equal(true);
        });
    });
});