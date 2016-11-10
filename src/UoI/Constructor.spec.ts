import {expect} from "chai";
import * as R from "ramda";
import * as sinon from "sinon";
import {RawSegmentDelimiter, UoIConstructor} from "./Constructor";
import * as StringUtils from "../Utils/String";
import {ReadabilityUoIType} from "./Readability/Main";
import {BorgUoIType} from "./Borg/Main";
import {UnknownUoIType} from "./Unknown/Main";

describe("Models/UoI/Constructor", () => {
    it("exports correct rawSegmentDelimiter", () => {
        expect(RawSegmentDelimiter).to.equal(":");
    });

    describe("getRawContentType", () => {
        const getRawContentTypeScenarios = [
            ["readability:url", "readability"],
            ["borg:identifier", "borg"],
            [" borg:query", "borg"],
            ["anotherSource:http://test.com", "anotherSource"],
            ["differentSource:http://test.com?query=something&anotherQuery=a:b", "differentSource"],
            ["", ""],
            [":", ""]
        ];

        const testGetRawContentType = (scenario:string[]) => {
            it("correctly gets raw content type for " + R.head(scenario), () => {
                const rawContentType = UoIConstructor.getRawContentType(R.head(scenario));
                expect(rawContentType).to.equal(R.last(scenario));
            });
        };

        R.forEach(testGetRawContentType, getRawContentTypeScenarios);
    });

    describe("getRawContentIdentifier", () => {
        const getRawContentIdentifierScenarios = [
            ["readability:url", "url"],
            ["borg: query ", "query"],
            ["anotherSource:http://test.com", "http://test.com"],
            ["differentSource:http://test.com?query=something&anotherQuery=a:b", "http://test.com?query=something&anotherQuery=a:b"],
            ["", ""],
            [":", ""]
        ];

        const testGetRawContentIdentifier = (scenario:string[]) => {
            it("correctly gets raw content identifier for " + R.head(scenario), () => {
                const rawContentIdentifier = UoIConstructor.getRawContentIdentifier(R.head(scenario));
                expect(rawContentIdentifier).to.equal(R.last(scenario));
            });
        };

        R.forEach(testGetRawContentIdentifier, getRawContentIdentifierScenarios);
    });

    describe("getContentType", () => {
        const getContentTypeScenarios = [
            ["readability", ReadabilityUoIType.ReadabilityContent],
            ["borg", BorgUoIType.BorgAnswer],
            ["Borg", UnknownUoIType.Unknown],
            ["unknown", UnknownUoIType.Unknown],
            ["", UnknownUoIType.Unknown]
        ];

        const testGetContentType = (scenario:string[]) => {
            it("correctly gets content type from raw content type for " + R.head(scenario), () => {
                const contentType = UoIConstructor.getContentTypeFromRaw(R.head(scenario));
                expect(contentType).to.equal(R.last(scenario));
            });
        };

        R.forEach(testGetContentType, getContentTypeScenarios);
    });

    describe("getContentIdentifier", () => {
        let sandbox:any;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        const rawIdentifier = StringUtils.encodeBase64("Hello, World!");

        it("correctly gets content identifier from raw content identifier for " + rawIdentifier, () => {
            const spy = sandbox.spy(StringUtils, "decodeBase64");

            const contentIdentifier = UoIConstructor.getContentIdentifierFromRaw(rawIdentifier);
            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof contentIdentifier, "string")).to.equal(true);
            expect(contentIdentifier).to.equal("Hello, World!");
        });

        it("throws if invalid base64 string provided", () => {
            expect(UoIConstructor.getContentIdentifierFromRaw("  ")).to.equal('');
        });
    });

    describe("constructor", () => {
        let sandbox:any,
            rawReadabilityIdentifier = StringUtils.encodeBase64("http://theguardian.com"),
            rawBorgIdentifier = StringUtils.encodeBase64("How to do this?");

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("[ReadabilityContent] correctly assigns contentType upon construction", () => {
            const
                spy = sandbox.spy(UoIConstructor, "getContentTypeFromRaw"),
                constructor = new UoIConstructor("readability:" + rawReadabilityIdentifier);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentType, undefined)).to.equal(false);
        });

        it("[BorgContent] correctly assigns contentType upon construction", () => {
            const
                spy = sandbox.spy(UoIConstructor, "getContentTypeFromRaw"),
                constructor = new UoIConstructor("borg:" + rawBorgIdentifier);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentType, undefined)).to.equal(false);
        });

        it("[ReadabilityContent] correctly assigns contentIdentifier upon construction", () => {
            const
                spy = sandbox.spy(UoIConstructor, "getContentIdentifierFromRaw"),
                constructor = new UoIConstructor("readability:" + rawReadabilityIdentifier);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentIdentifier, undefined)).to.equal(false);
        });

        it("[BorgContent] correctly assigns contentIdentifier upon construction", () => {
            const
                spy = sandbox.spy(UoIConstructor, "getContentIdentifierFromRaw"),
                constructor = new UoIConstructor("borg:" + rawBorgIdentifier);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentIdentifier, undefined)).to.equal(false);
        });

        it("correctly assigns contentIdentifier upon construction when unknown content type provided", () => {
            const
                spy = sandbox.spy(UoIConstructor, "getContentIdentifierFromRaw"),
                constructor = new UoIConstructor("not-implemented:" + rawBorgIdentifier);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentIdentifier, undefined)).to.equal(false);
        });
    });
});