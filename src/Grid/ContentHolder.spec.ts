import {expect} from 'chai'
import * as Events from './GraphEvent'
import ContentHolder from './ContentHolder'

describe('Models/Grid/ContentHolder', () => {
    describe('constructor', () => {
        it('assigns nodeId upon construction', () => {
            const CreateContentHolderEvent = new Events.CreateContentHolderEvent('graphId', 'parentId', 'RawUoIConstructor');

            const contentHolder = new ContentHolder(CreateContentHolderEvent);
            expect(contentHolder.nodeId).to.equal(CreateContentHolderEvent.nodeId);
        });

        it('assigns rawUoIConstructor upon construction', () => {
            const CreateContentHolderEvent = new Events.CreateContentHolderEvent('graphId', 'parentId', 'RawUoIConstructor');

            const contentHolder = new ContentHolder(CreateContentHolderEvent);
            expect(contentHolder.rawUoIConstructor).to.equal(CreateContentHolderEvent.rawUoIConstructor);
        });
    });
});