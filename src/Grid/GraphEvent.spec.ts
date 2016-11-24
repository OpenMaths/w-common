import {expect} from 'chai'

import {
    GraphEvent, Action, generateNodeId,
    GraphNodeIdPrefix, ContainerNodeIdPrefix, RowNodeIdPrefix, ColumnNodeIdPrefix, ContentHolderNodeIdPrefix,
    CreateGraphEvent,
    CreateContainerEvent,
    CreateRowEvent,
    CreateColumnEvent,
    CreateContentHolderEvent,
    RemoveRowEvent
} from './GraphEvent'

describe('Models/Grid/GraphEvent', () => {
    describe('generateNodeId', () => {
        it('generates appropriate nodeId for Graph', () => {
            const nodeId = generateNodeId(Action.CreateGraph);
            expect(nodeId.substring(0, GraphNodeIdPrefix.length)).to.equal(GraphNodeIdPrefix);
        });

        it('generates appropriate nodeId for Container', () => {
            const nodeId = generateNodeId(Action.CreateContainer);
            expect(nodeId.substring(0, ContainerNodeIdPrefix.length)).to.equal(ContainerNodeIdPrefix);
        });

        it('generates appropriate nodeId for Row', () => {
            const nodeId = generateNodeId(Action.CreateRow);
            expect(nodeId.substring(0, RowNodeIdPrefix.length)).to.equal(RowNodeIdPrefix);
        });

        it('generates appropriate nodeId for Column', () => {
            const nodeId = generateNodeId(Action.CreateColumn);
            expect(nodeId.substring(0, ColumnNodeIdPrefix.length)).to.equal(ColumnNodeIdPrefix);
        });

        it('generates appropriate nodeId for ContentHolder', () => {
            const nodeId = generateNodeId(Action.CreateContentHolder);
            expect(nodeId.substring(0, ContentHolderNodeIdPrefix.length)).to.equal(ContentHolderNodeIdPrefix);
        });
    });

    describe('CreateGraphEvent', () => {
        it('returns appropriate GraphEvent', () => {
            const event = new CreateGraphEvent();

            expect(event instanceof GraphEvent).to.equal(true);
            expect(event.graphId.substring(0, GraphNodeIdPrefix.length)).to.equal(GraphNodeIdPrefix);
            expect(event.parentId).to.equal('');
            expect(event.nodeId.substring(0, GraphNodeIdPrefix.length)).to.equal(GraphNodeIdPrefix);
            expect(event.actionType).to.equal(Action.CreateGraph);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });

    describe('CreateContainerEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new CreateContainerEvent(graphId, graphId);

            expect(event instanceof GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal(graphId);
            expect(event.nodeId.substring(0, ContainerNodeIdPrefix.length)).to.equal(ContainerNodeIdPrefix);
            expect(event.actionType).to.equal(Action.CreateContainer);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });

    describe('CreateRowEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new CreateRowEvent(graphId, 'parentId', 1);

            expect(event instanceof GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId.substring(0, RowNodeIdPrefix.length)).to.equal(RowNodeIdPrefix);
            expect(event.actionType).to.equal(Action.CreateRow);
            expect(event.timestamp instanceof Date).to.equal(true);
            expect(event.insertIndex).to.equal(1);
        });
    });

    describe('CreateColumnEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new CreateColumnEvent(graphId, 'parentId', 0);

            expect(event instanceof GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId.substring(0, ColumnNodeIdPrefix.length)).to.equal(ColumnNodeIdPrefix);
            expect(event.actionType).to.equal(Action.CreateColumn);
            expect(event.timestamp instanceof Date).to.equal(true);
            expect(event.insertIndex).to.equal(0);
        });
    });

    describe('CreateContentHolderEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new CreateContentHolderEvent(graphId, 'parentId', 'UoIConstructDefinition');

            expect(event instanceof GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId.substring(0, ContentHolderNodeIdPrefix.length)).to.equal(ContentHolderNodeIdPrefix);
            expect(event.actionType).to.equal(Action.CreateContentHolder);
            expect(event.timestamp instanceof Date).to.equal(true);
            expect(event.rawUoIConstructor).to.equal('UoIConstructDefinition');
        });
    });

    describe('RemoveRowEvent', () => {
        const graphId = 'graphId';

        it('returns appropriate GraphEvent', () => {
            const event = new RemoveRowEvent(graphId, 'parentId', 'nodeId');

            expect(event instanceof GraphEvent).to.equal(true);
            expect(event.graphId).to.equal(graphId);
            expect(event.parentId).to.equal('parentId');
            expect(event.nodeId).to.equal('nodeId');
            expect(event.actionType).to.equal(Action.RemoveRow);
            expect(event.timestamp instanceof Date).to.equal(true);
        });
    });
});