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
            expect(R.equals(typeof container.children[insertIndex], 'undefined')).to.equal(false);

            container.removeChild(row.nodeId);
            expect(R.equals(typeof container.children[insertIndex], 'undefined')).to.equal(true);
        });

        it('only removes a child when correct nodeId found in children list', () => {
            container.children[insertIndex] = row;
            expect(R.equals(typeof container.children[insertIndex], 'undefined')).to.equal(false);

            // @TODO should the below throw when index not found? Currently there is only an if statement
            container.removeChild('non-existent-id');
            expect(R.equals(typeof container.children[insertIndex], 'undefined')).to.equal(false);
        });
    });
});