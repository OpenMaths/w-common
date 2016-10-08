import {expect} from 'chai'
import * as R from 'ramda'
import * as sinon from 'sinon'
import {RawSegmentDelimiter, UoIConstructor} from './Constructor'
import {ContentType} from './Main'
import * as ReadabilityUtils from '../ContentTypes/Readability/Utils'
import * as StringUtils from '../_Utils/String'

describe('Models/UoI/Constructor', () => {
    it('exports correct rawSegmentDelimiter', () => {
        expect(RawSegmentDelimiter).to.equal(':');
    });

    describe('getRawContentType', () => {
        const getRawContentTypeScenarios = [
            ['readability:url', 'readability'],
            ['anotherSource:http://test.com', 'anotherSource'],
            ['differentSource:http://test.com?query=something&anotherQuery=a:b', 'differentSource'],
            ['', ''],
            [':', '']
        ];

        const testGetRawContentType = (scenario:string[]) => {
            it('correctly gets raw content type for ' + R.head(scenario), () => {
                const rawContentType = UoIConstructor.getRawContentType(R.head(scenario));
                expect(rawContentType).to.equal(R.last(scenario));
            });
        };

        R.forEach(testGetRawContentType, getRawContentTypeScenarios);
    });

    describe('getRawContentIdentifier', () => {
        const getRawContentIdentifierScenarios = [
            ['readability:url', 'url'],
            ['anotherSource:http://test.com', 'http://test.com'],
            ['differentSource:http://test.com?query=something&anotherQuery=a:b', 'http://test.com?query=something&anotherQuery=a:b'],
            ['', ''],
            [':', '']
        ];

        const testGetRawContentIdentifier = (scenario:string[]) => {
            it('correctly gets raw content identifier for ' + R.head(scenario), () => {
                const rawContentIdentifier = UoIConstructor.getRawContentIdentifier(R.head(scenario));
                expect(rawContentIdentifier).to.equal(R.last(scenario));
            });
        };

        R.forEach(testGetRawContentIdentifier, getRawContentIdentifierScenarios);
    });

    describe('getContentType', () => {
        const getContentTypeScenarios = [
            ['readability', ContentType.ReadabilityContent],
            ['unknown', ContentType.Unknown],
            ['', ContentType.Unknown]
        ];

        const testGetContentType = (scenario:string[]) => {
            it('correctly gets content type from raw content type for ' + R.head(scenario), () => {
                const contentType = UoIConstructor.getContentTypeFromRaw(R.head(scenario));
                expect(contentType).to.equal(R.last(scenario));
            });
        };

        R.forEach(testGetContentType, getContentTypeScenarios);
    });

    describe('getContentIdentifier', () => {
        let sandbox:any;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('correctly gets content identifier from raw content identifier for SGVsbG8sIFdvcmxkIQ==', () => {
            const spy = sandbox.spy(StringUtils, 'decodeBase64');

            // Has to be valid base64 string to pass
            const contentIdentifier = UoIConstructor.getContentIdentifierFromRaw('SGVsbG8sIFdvcmxkIQ==');
            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof contentIdentifier, 'string')).to.equal(true);
        });
    });

    describe('getObservable', () => {
        let sandbox:any;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('calls ReadabilityUtils.getApiInstance() and returns an Observable when ContentType is Readability', () => {
            const spy = sandbox.spy(ReadabilityUtils, 'getApiInstance');

            // Has to be valid href to pass
            const promise = UoIConstructor.getObservable(ContentType.ReadabilityContent, 'http://theguardian.com');
            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof promise, 'object')).to.equal(true);
        });

        it('returns an Observable that throws an error when identifier invalid', (done) => {
            const spy = sandbox.spy(ReadabilityUtils, 'getApiInstance');

            const Observable = UoIConstructor.getObservable(ContentType.ReadabilityContent, 'google.com');
            expect(spy.calledOnce).to.equal(false);

            Observable.subscribe(success => {
                done();
            }, (error:Error) => {
                // @TODO test correct error message is returned => abstract all errors into a const
                expect(R.equals(error.message, undefined)).to.equal(false);
                done();
            })
        });

        it('returns an Observable that throws an error when ContentType is Unknown', (done) => {
            const spy = sandbox.spy(ReadabilityUtils, 'getApiInstance');

            const Observable = UoIConstructor.getObservable(ContentType.Unknown, 'identifier');
            expect(spy.calledOnce).to.equal(false);

            Observable.subscribe(success => {
                done();
            }, (error:Error) => {
                // @TODO test correct error message is returned => abstract all errors into a const
                expect(R.equals(error.message, undefined)).to.equal(false);
                done();
            })
        });
    });

    describe('constructor', () => {
        let sandbox:any,
            validHrefBase64Encoded = 'aHR0cDovL3RoZWd1YXJkaWFuLmNvbQ=='; // http://theguardian.com

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('correctly assigns contentType upon construction', () => {
            const
                spy = sandbox.spy(UoIConstructor, 'getContentTypeFromRaw'),
                constructor = new UoIConstructor('readability:' + validHrefBase64Encoded);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentType, undefined)).to.equal(false);
        });

        it('correctly assigns contentIdentifier upon construction', () => {
            const
                spy = sandbox.spy(UoIConstructor, 'getContentIdentifierFromRaw'),
                constructor = new UoIConstructor('readability:' + validHrefBase64Encoded);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.contentIdentifier, undefined)).to.equal(false);
        });

        it('correctly assigns resolveObservable upon construction', () => {
            const
                spy = sandbox.spy(UoIConstructor, 'getObservable'),
                constructor = new UoIConstructor('readability:' + validHrefBase64Encoded);

            expect(spy.calledOnce).to.equal(true);
            expect(R.equals(typeof constructor.resolveObservable, undefined)).to.equal(false);
        });
    });
});