import {expect} from "chai";
import {forEach} from "ramda";
import {TitleProperty, LabelProperty} from "./Properties";
import {ReadabilityUoISample} from "./Readability/Main";

describe('UoI/Main', () => {
    describe('getTitleProperty', () => {
        it('should correctly extract the TitleProperty', () => {
            const uoi = ReadabilityUoISample();

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
        });

        it('should correctly extract the first TitleProperty if more are present', () => {
            const uoi = ReadabilityUoISample();
            uoi.properties.push(new TitleProperty('Title Added By Mistake'));

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
            expect(uoi.getTitleProperty().property).to.equal('Title');
        });

        it('should correctly extract a TitleProperty with empty title if no TitleProperty was found', () => {
            const uoi = ReadabilityUoISample();
            uoi.properties = [];

            expect(uoi.getTitleProperty() instanceof TitleProperty).to.equal(true);
            expect(uoi.getTitleProperty().property).to.equal('');
        });
    });

    describe('getLabelProperty', () => {
        it('should correctly extract a list of LabelProperties', () => {
            const uoi = ReadabilityUoISample();

            uoi.properties.push(new LabelProperty('Another Label'));
            uoi.properties.push(new LabelProperty('Yet Another Label'));

            const functor = (property:LabelProperty) => {
                expect(property instanceof LabelProperty).to.equal(true);
            };

            forEach(functor, uoi.getLabelProperties());

            expect(uoi.getLabelProperties().length).to.equal(3);
        });

        it('should correctly return an empty list if no LabelProperty has been found', () => {
            const uoi = ReadabilityUoISample();
            uoi.properties = [];

            expect(uoi.getLabelProperties().length).to.equal(0);
        });
    });
});