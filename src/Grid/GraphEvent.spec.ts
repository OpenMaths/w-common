import {expect} from 'chai'

import * as Event from './GraphEvent'

describe('Models/Grid/GraphEvent', () => {
    describe('generateNodeId', () => {
        it('generates appropriate nodeId for Graph', () => {
            const nodeId = Event.generateNodeId(Event.Action.CreateGraph);
            expect(nodeId.substring(0, Event.GraphNodeIdPrefix.length)).to.equal(Event.GraphNodeIdPrefix);
        });

        it('generates appropriate nodeId for Container', () => {
            const nodeId = Event.generateNodeId(Event.Action.CreateContainer);
            expect(nodeId.substring(0, Event.ContainerNodeIdPrefix.length)).to.equal(Event.ContainerNodeIdPrefix);
        });

        it('generates appropriate nodeId for Row', () => {
            const nodeId = Event.generateNodeId(Event.Action.CreateRow);
            expect(nodeId.substring(0, Event.RowNodeIdPrefix.length)).to.equal(Event.RowNodeIdPrefix);
        });

        it('generates appropriate nodeId for Column', () => {
            const nodeId = Event.generateNodeId(Event.Action.CreateColumn);
            expect(nodeId.substring(0, Event.ColumnNodeIdPrefix.length)).to.equal(Event.ColumnNodeIdPrefix);
        });

        it('generates appropriate nodeId for ContentHolder', () => {
            const nodeId = Event.generateNodeId(Event.Action.CreateContentHolder);
            expect(nodeId.substring(0, Event.ContentHolderNodeIdPrefix.length)).to.equal(Event.ContentHolderNodeIdPrefix);
        });
    });

    describe('CreateGraphEvent', () => {
        it('returns appropriate GraphEvent', () => {
            const event = new Event.CreateGraphEvent();

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId.substring(0, Event.GraphNodeIdPrefix.length)).to.equal(Event.GraphNodeIdPrefix);
            expect(event.parentId).to.equal('');
            expect(event.nodeId.substring(0, Event.GraphNodeIdPrefix.length)).to.equal(Event.GraphNodeIdPrefix);
            expect(event.actionType).to.equal(Event.Action.CreateGraph);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });

    describe('CreateContainerEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new Event.CreateContainerEvent(graphId, graphId);

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal(graphId);
            expect(event.nodeId.substring(0, Event.ContainerNodeIdPrefix.length)).to.equal(Event.ContainerNodeIdPrefix);
            expect(event.actionType).to.equal(Event.Action.CreateContainer);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });

    describe('CreateRowEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new Event.CreateRowEvent(graphId, 'parentId', 1);

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId.substring(0, Event.RowNodeIdPrefix.length)).to.equal(Event.RowNodeIdPrefix);
            expect(event.actionType).to.equal(Event.Action.CreateRow);
            expect(event.timestamp instanceof Date).to.equal(true);
            expect(event.insertIndex).to.equal(1);
        });
    });

    describe('CreateColumnEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new Event.CreateColumnEvent(graphId, 'parentId', 0);

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId.substring(0, Event.ColumnNodeIdPrefix.length)).to.equal(Event.ColumnNodeIdPrefix);
            expect(event.actionType).to.equal(Event.Action.CreateColumn);
            expect(event.timestamp instanceof Date).to.equal(true);
            expect(event.insertIndex).to.equal(0);
        });
    });

    describe('CreateContentHolderEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new Event.CreateContentHolderEvent(graphId, 'parentId', 'UoIConstructDefinition');

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId.substring(0, Event.ContentHolderNodeIdPrefix.length)).to.equal(Event.ContentHolderNodeIdPrefix);
            expect(event.actionType).to.equal(Event.Action.CreateContentHolder);
            expect(event.timestamp instanceof Date).to.equal(true);
            expect(event.rawUoIConstructor).to.equal('UoIConstructDefinition');
        });
    });

    describe('RemoveRowEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new Event.RemoveRowEvent(graphId, 'parentId', 'nodeId');

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId).to.equal('nodeId');
            expect(event.actionType).to.equal(Event.Action.RemoveRow);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });

    describe('RemoveContentHolderEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new Event.RemoveContentHolderEvent(graphId, 'parentId', 'nodeId');

            expect(event instanceof Event.GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId).to.equal('nodeId');
            expect(event.actionType).to.equal(Event.Action.RemoveContentHolder);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });
});