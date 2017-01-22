import {expect} from 'chai'
import * as R from 'ramda'
import * as Events from './GraphEvent'
import Row from './Row'
import Column from './Column'

describe('Models/Grid/Row', () => {
    describe('constructor', () => {
        it('assigns nodeId upon construction', () => {
            const CreateRowEvent = new Events.CreateRowEvent('graphId', 'parentId', 0);

            const row = new Row(CreateRowEvent);
            expect(row.nodeId).to.equal(CreateRowEvent.nodeId);
        });

        it('assigns parentId upon construction', () => {
            const CreateRowEvent = new Events.CreateRowEvent('graphId', 'parentId', 0);

            const row = new Row(CreateRowEvent);
            expect(row.parentId).to.equal(CreateRowEvent.parentId);
        });

        it('creates empty list of children upon construction', () => {
            const CreateRowEvent = new Events.CreateRowEvent('graphId', 'parentId', 0);

            const row = new Row(CreateRowEvent);
            expect(R.equals(typeof row.children, 'object')).to.equal(true);
            expect(row.children.length).to.equal(0);
        });
    });

    describe('insertChild', () => {
        const
            graphId = 'graphId',
            parentId = 'parentId',
            insertIndex = 0,
            CreateRowEvent = new Events.CreateRowEvent(graphId, parentId, insertIndex),
            row = new Row(CreateRowEvent);

        it('correctly inserts a child', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent(graphId, CreateRowEvent.nodeId, insertIndex);
            const column = new Column(CreateColumnEvent);

            row.insertChild(column, insertIndex);
            expect(row.children[insertIndex] instanceof Column).to.equal(true);
        });
    });

    describe('removeChild', () => {
        const
            graphId = 'graphId',
            parentId = 'parentId',
            insertIndex = 0,
            CreateRowEvent = new Events.CreateRowEvent(graphId, parentId, insertIndex),
            row = new Row(CreateRowEvent);

        const
            CreateColumnEvent = new Events.CreateColumnEvent(graphId, CreateRowEvent.nodeId, insertIndex),
            column = new Column(CreateColumnEvent);

        it('correctly removes a child', () => {
            row.children[insertIndex] = column;
            expect(typeof row.children[insertIndex]).not.to.equal('undefined');

            row.removeChild(column.nodeId);
            expect(typeof row.children[insertIndex]).to.equal('undefined');
        });

        it('throws if nodeId not found in children list', () => {
            expect(() => row.removeChild('non-existent-id')).to.throw();
        });
    });
});