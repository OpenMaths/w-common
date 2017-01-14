import {expect} from "chai";
import {TitleProperty, LabelProperty, HtmlContentProperty, PropertyType} from "./Properties";
import {MercuryUoISample} from "./Mercury/Main";
import {Some} from "../../lib/utils/src/Option/index";

describe('UoI/Main', () => {
    describe('getTitleProperty', () => {
        it('should correctly extract the TitleProperty', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];
            uoi.properties.push(new TitleProperty('Test Title'));

            const property = uoi.getTitleProperty();
            expect(property instanceof Some).to.equal(true);

            const subject = property
                .unwrap_or(new TitleProperty(''));
            expect(subject instanceof TitleProperty).to.equal(true);
            expect(subject.propertyType).to.equal(PropertyType.Title);
            expect(subject.property).to.equal('Test Title');
        });

        it('should correctly extract the first TitleProperty if more are present', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];
            uoi.properties.push(new TitleProperty('Test Title'));
            uoi.properties.push(new TitleProperty('Title Added By Mistake'));

            const property = uoi.getTitleProperty();
            expect(property instanceof Some).to.equal(true);

            const subject = property
                .unwrap_or(new TitleProperty(''));
            expect(subject instanceof TitleProperty).to.equal(true);
            expect(subject.propertyType).to.equal(PropertyType.Title);
            expect(subject.property).to.equal('Test Title');
        });

        it('should correctly extract a TitleProperty with empty title if no TitleProperty was found', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];

            const property = uoi.getTitleProperty();
            expect(property instanceof Some).to.equal(true);

            const subject = property
                .unwrap_or(new TitleProperty(''));
            expect(subject instanceof TitleProperty).to.equal(true);
            expect(subject.propertyType).to.equal(PropertyType.Title);
            expect(subject.property).to.equal('');
        });
    });

    describe('getHtmlContentProperty', () => {
        it('should correctly extract the HtmlContentProperty', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];
            uoi.properties.push(new HtmlContentProperty('<div></div>'));

            const property = uoi.getHtmlContentProperty();
            expect(property instanceof Some).to.equal(true);

            const subject = property
                .unwrap_or(new HtmlContentProperty(''));
            expect(subject instanceof HtmlContentProperty).to.equal(true);
            expect(subject.propertyType).to.equal(PropertyType.HtmlContent);
            expect(subject.property).to.equal('<div></div>');
        });

        it('should correctly extract the first HtmlContentProperty if more are present', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];
            uoi.properties.push(new HtmlContentProperty('<div></div>'));
            uoi.properties.push(new HtmlContentProperty('<small></small>'));

            const property = uoi.getHtmlContentProperty();
            expect(property instanceof Some).to.equal(true);

            const subject = property
                .unwrap_or(new HtmlContentProperty(''));
            expect(subject instanceof HtmlContentProperty).to.equal(true);
            expect(subject.propertyType).to.equal(PropertyType.HtmlContent);
            expect(subject.property).to.equal('<div></div>');
        });

        it('should correctly extract a HtmlContentProperty with empty content if no HtmlContentProperty was found', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];

            const property = uoi.getHtmlContentProperty();
            expect(property instanceof Some).to.equal(true);

            const subject = property
                .unwrap_or(new HtmlContentProperty(''));
            expect(subject instanceof HtmlContentProperty).to.equal(true);
            expect(subject.propertyType).to.equal(PropertyType.HtmlContent);
            expect(subject.property).to.equal('');
        });
    });

    describe('getLabelProperty', () => {
        it('should correctly extract a list of LabelProperties', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];
            uoi.properties.push(new LabelProperty('Another Label'));
            uoi.properties.push(new LabelProperty('Yet Another Label'));

            const functor = (subject:LabelProperty, index:number) => {
                expect(subject instanceof LabelProperty).to.equal(true);
                expect(subject.propertyType).to.equal(PropertyType.Label);
                expect(subject.property).to.equal(uoi.properties[index].property);
            };

            uoi.getLabelProperties()
                .forEach(functor);

            expect(uoi.getLabelProperties().length).to.equal(uoi.properties.length);
        });

        it('should correctly return an empty list if no LabelProperty has been found', () => {
            const uoi = MercuryUoISample();
            uoi.properties = [];

            expect(uoi.getLabelProperties().length).to.equal(0);
        });
    });
});