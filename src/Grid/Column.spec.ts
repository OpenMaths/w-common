import {expect} from 'chai'
import * as Events from './GraphEvent'
import Column from './Column'
import Container from './Container'
import ContentHolder from './ContentHolder'

describe('Models/Grid/Column', () => {
    describe('constructor', () => {
        it('assigns nodeId upon construction', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent('graphId', 'parentId', 0);

            const column = new Column(CreateColumnEvent);
            expect(column.nodeId).to.equal(CreateColumnEvent.nodeId);
        });

        it('assigns parentId upon construction', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent('graphId', 'parentId', 0);

            const column = new Column(CreateColumnEvent);
            expect(column.parentId).to.equal(CreateColumnEvent.parentId);
        });

        it('creates a null child', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent('graphId', 'parentId', 0);

            const column = new Column(CreateColumnEvent);
            expect(column.child).to.equal(null);
        });
    });

    describe('insertChild', () => {
        const
            graphId = 'graphId',
            parentId = 'parentId',
            insertIndex = 0,
            CreateColumnEvent = new Events.CreateColumnEvent(graphId, parentId, insertIndex),
            column = new Column(CreateColumnEvent);

        it('correctly inserts a container child', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent(graphId, CreateColumnEvent.nodeId);
            const container = new Container(CreateContainerEvent);

            column.insertChild(container);
            expect(column.child instanceof Container).to.equal(true);
        });

        it('correctly inserts a contentHolder child', () => {
            const CreateContentHolderEvent = new Events.CreateContentHolderEvent(graphId, CreateColumnEvent.nodeId, 'RawUoIConstructor');
            const contentHolder = new ContentHolder(CreateContentHolderEvent);

            column.insertChild(contentHolder);
            expect(column.child instanceof ContentHolder).to.equal(true);
        });
    });

    describe('removeChild', () => {
        it('correctly removes a child', () => {
            const
                graphId = 'graphId',
                parentId = 'parentId',
                insertIndex = 0,
                CreateColumnEvent = new Events.CreateColumnEvent(graphId, parentId, insertIndex),
                column = new Column(CreateColumnEvent);

            const CreateContainerEvent = new Events.CreateContainerEvent(graphId, CreateColumnEvent.nodeId);
            const container = new Container(CreateContainerEvent);

            column.insertChild(container);
            expect(column.child instanceof Container).to.equal(true);

            column.removeChild();
            expect(column.child).to.equal(null);
        });
    });
});