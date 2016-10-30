import {expect} from "chai";
import {TitleProperty} from "./Properties";
import StubReadabilityUoI from "./Stubs/ReadabilityUoI";

describe('UoI/Main', () => {
    describe('getTitleProperty', () => {
        it('should correctly extract the TitleProperty', () => {
            const uoi = StubReadabilityUoI;

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
        });

        it('should correctly extract the first TitleProperty if more are present', () => {
            const uoi = StubReadabilityUoI;
            uoi.properties.push(new TitleProperty('Title Added By Mistake'));

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
            expect(uoi.getTitleProperty().property).to.equal('Title');
        });

        it('should correctly extract a TitleProperty with empty title if no TitleProperty was found', () => {
            const uoi = StubReadabilityUoI;
            uoi.properties = [];

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
            expect(uoi.getTitleProperty().property).to.equal('');
        });
    });
});