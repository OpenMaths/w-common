import {expect} from "chai";
import Property, {TitleProperty} from "./Properties";
import UoI, {ReadabilityUoI} from "./Main";

const getUoI = ():UoI => {
    let
        properties:Property<any>[] = [],
        connections = [];

    properties.push(new TitleProperty('Title'));

    return new ReadabilityUoI('id', properties, connections);
};

describe('Components/UoI/Utils', () => {
    describe('getTitleProperty', () => {
        it('should correctly extract the TitleProperty', () => {
            const property = getUoI().getTitleProperty();
            expect(property instanceof TitleProperty).to.equal(true);
        });
    });
});