import {expect} from "chai";
import {forEach} from "ramda";
import {TitleProperty, LabelProperty, HtmlContentProperty} from "./Properties";
import {MercuryUoISample} from "./Mercury/Main";

describe('UoI/Main', () => {
    describe('getTitleProperty', () => {
        it('should correctly extract the TitleProperty', () => {
            const uoi = MercuryUoISample();

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
        });

        it('should correctly extract the first TitleProperty if more are present', () => {
            const uoi = MercuryUoISample();
            uoi.properties.push(new TitleProperty('Title Added By Mistake'));

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
            expect(uoi.getTitleProperty().property).to.equal('Title');
        });

        it('should correctly extract a TitleProperty with empty title if no TitleProperty was found', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
            expect(uoi.getTitleProperty().property).to.equal('');
        });
    });

    describe('getHtmlContentProperty', () => {
        it('should correctly extract the HtmlContentProperty', () => {
            const uoi = MercuryUoISample();

            expect(uoi.getHtmlContentProperty() instanceof HtmlContentProperty).to.equal(true);
        });

        it('should correctly extract the first HtmlContentProperty if more are present', () => {
            const uoi = MercuryUoISample();
            uoi.properties.push(new HtmlContentProperty('<small></small>'));

            expect(uoi.getHtmlContentProperty() instanceof HtmlContentProperty).to.equal(true);
            expect(uoi.getHtmlContentProperty().property).to.equal('<div></div>');
        });

        it('should correctly extract a HtmlContentProperty with empty content if no HtmlContentProperty was found', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];

            expect(uoi.getHtmlContentProperty() instanceof HtmlContentProperty).to.equal(true);
            expect(uoi.getHtmlContentProperty().property).to.equal('');
        });
    });

    describe('getLabelProperty', () => {
        it('should correctly extract a list of LabelProperties', () => {
            const uoi = MercuryUoISample();

            uoi.properties.push(new LabelProperty('Another Label'));
            uoi.properties.push(new LabelProperty('Yet Another Label'));

            const functor = (property:LabelProperty) => {
                expect(property instanceof LabelProperty).to.equal(true);
            };

            forEach(functor, uoi.getLabelProperties());

            expect(uoi.getLabelProperties().length).to.equal(3);
        });

        it('should correctly return an empty list if no LabelProperty has been found', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];

            expect(uoi.getLabelProperties().length).to.equal(0);
        });
    });
});