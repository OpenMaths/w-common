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

        // it('creates empty list of children upon construction', () => {
        //     const CreateRowEvent = new Events.CreateRowEvent('graphId', 'parentId', 0);
        //
        //     const row = new Row(CreateRowEvent);
        //     expect(R.equals(typeof row.children, 'object')).to.equal(true);
        //     expect(row.children.length).to.equal(0);
        // });
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

    // describe('removeChild', () => {
    //     const
    //         graphId = 'graphId',
    //         parentId = 'parentId',
    //         insertIndex = 0,
    //         CreateColumnEvent = new Events.CreateColumnEvent(graphId, parentId, insertIndex),
    //         column = new Column(CreateColumnEvent);
    //
    //     const
    //         CreateContainerEvent = new Events.CreateContainerEvent(graphId, CreateColumnEvent.nodeId),
    //         container = new Container(CreateContainerEvent);
    //
    //     it('correctly removes a child', () => {
    //         column.child = container;
    //         expect(R.equals(typeof column.child, 'undefined')).to.equal(false);
    //
    //         column.removeChild(column.nodeId);
    //         expect(R.equals(typeof column.child, 'undefined')).to.equal(true);
    //     });
    //
    //     it('only removes a child when correct nodeId found in children list', () => {
    //         column.child = container;
    //         expect(R.equals(typeof column.child, 'undefined')).to.equal(false);
    //
    //         // @TODO should the below throw when index not found? Currently there is only an if statement
    //         column.removeChild('non-existent-id');
    //         expect(R.equals(typeof column.child, 'undefined')).to.equal(false);
    //     });
    // });
});