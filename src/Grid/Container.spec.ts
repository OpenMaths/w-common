import {expect} from 'chai'
import * as R from 'ramda'
import * as Events from './GraphEvent'
import Container from './Container'
import Row from './Row'

describe('Models/Grid/Container', () => {
    describe('constructor', () => {
        it('assigns nodeId upon construction', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent('graphId', 'graphId');

            const container = new Container(CreateContainerEvent);
            expect(container.nodeId).to.equal(CreateContainerEvent.nodeId);
        });

        it('assigns parentId upon construction', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent('graphId', 'parentId');

            const container = new Container(CreateContainerEvent);
            expect(container.parentId).to.equal(CreateContainerEvent.parentId);
        });

        it('creates empty list of children upon construction', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent('graphId', 'parentId');

            const container = new Container(CreateContainerEvent);
            expect(R.equals(typeof container.children, 'object')).to.equal(true);
            expect(container.children.length).to.equal(0);
        });
    });

    describe('insertChild', () => {
        const
            graphId = 'graphId',
            CreateContainerEvent = new Events.CreateContainerEvent(graphId, graphId),
            container = new Container(CreateContainerEvent);

        it('correctly inserts a child', () => {
            const insertIndex = 0;

            const CreateRowEvent = new Events.CreateRowEvent(graphId, graphId, insertIndex);
            const row = new Row(CreateRowEvent);

            container.insertChild(row, insertIndex);
            expect(container.children[insertIndex] instanceof Row).to.equal(true);
        });
    });

    describe('removeChild', () => {
        const
            graphId = 'graphId',
            CreateContainerEvent = new Events.CreateContainerEvent(graphId, graphId),
            container = new Container(CreateContainerEvent);

        const
            insertIndex = 0,
            CreateRowEvent = new Events.CreateRowEvent(graphId, graphId, insertIndex),
            row = new Row(CreateRowEvent);

        it('correctly removes a child', () => {
            container.children[insertIndex] = row;
            expect(typeof container.children[insertIndex]).not.to.equal('undefined');

            container.removeChild(row.nodeId);
            expect(typeof container.children[insertIndex]).to.equal('undefined');
        });

        it('throws if nodeId not found in children list', () => {
            expect(() => container.removeChild('non-existent-id')).to.throw();
        });
    });
});