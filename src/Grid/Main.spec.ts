import {expect} from 'chai'
import * as R from 'ramda'
import * as sinon from 'sinon'
import Main from './Main'
import Graph from './Graph'
import Container from './Container'
import Row from './Row'
import Column from './Column'
import ContentHolder from './ContentHolder'
import * as Events from './GraphEvent'

describe('Models/Grid/Main', () => {
    describe('constructor', () => {
        it('initiates nodesTable as an empty object', () => {
            const app = new Main();
            expect(R.equals(typeof app.nodesTable, 'object')).to.equal(true);
        });
    });

    describe('addToNodesTable', () => {
        const graphId = 'graphId';

        it('adds a Graph to nodesTable', () => {
            const CreateGraphEvent = new Events.CreateGraphEvent();

            const app = new Main();
            app.addToNodesTable(CreateGraphEvent.nodeId, new Graph(CreateGraphEvent));

            expect(app.nodesTable[CreateGraphEvent.nodeId] instanceof Graph).to.equal(true);
        });

        it('adds a Container to nodesTable', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent(graphId, graphId);

            const app = new Main();
            app.addToNodesTable(CreateContainerEvent.nodeId, new Container(CreateContainerEvent));

            expect(app.nodesTable[CreateContainerEvent.nodeId] instanceof Container).to.equal(true);
        });

        it('adds a Row to nodesTable', () => {
            const CreateRowEvent = new Events.CreateRowEvent(graphId, 'parentId', 0);

            const app = new Main();
            app.addToNodesTable(CreateRowEvent.nodeId, new Row(CreateRowEvent));

            expect(app.nodesTable[CreateRowEvent.nodeId] instanceof Row).to.equal(true);
        });

        it('adds a Column to nodesTable', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent(graphId, 'parentId', 0);

            const app = new Main();
            app.addToNodesTable(CreateColumnEvent.nodeId, new Column(CreateColumnEvent));

            expect(app.nodesTable[CreateColumnEvent.nodeId] instanceof Column).to.equal(true);
        });

        it('adds a ContentHolder to nodesTable', () => {
            const CreateContentHolderEvent = new Events.CreateContentHolderEvent(graphId, 'parentId', 'RawUoIConstructor');

            const app = new Main();
            app.addToNodesTable(CreateContentHolderEvent.nodeId, new ContentHolder(CreateContentHolderEvent));

            expect(app.nodesTable[CreateContentHolderEvent.nodeId] instanceof ContentHolder).to.equal(true);
        });
    });

    describe('isInNodesTable', () => {
        const graphId = 'graphId';

        it('returns true if node found', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent(graphId, graphId);

            const app = new Main();
            app.addToNodesTable(CreateContainerEvent.nodeId, new Container(CreateContainerEvent));

            expect(app.isInNodesTable(CreateContainerEvent.nodeId)).to.equal(true);
        });

        it('returns false if node not found', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent(graphId, graphId);

            const app = new Main();
            app.addToNodesTable(CreateContainerEvent.nodeId, new Container(CreateContainerEvent));

            expect(app.isInNodesTable('unknownNodeId')).to.equal(false);
        });
    });

    describe('getParentContainerId', () => {
        const CreateGraphEvent = new Events.CreateGraphEvent();
        const insertIndex = 0;

        it('correctly returns the closest (parent) Container nodeId', () => {
            const app = new Main();
            app.createGraph(CreateGraphEvent);
            const CreateContainerEvent = new Events.CreateContainerEvent(CreateGraphEvent.graphId, CreateGraphEvent.graphId);
            app.createContainer(CreateContainerEvent);
            const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, CreateContainerEvent.nodeId, insertIndex);
            app.createRow(CreateRowEvent);
            const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, CreateRowEvent.nodeId, insertIndex);
            app.createColumn(CreateColumnEvent);

            const
                column = app.nodesTable[CreateColumnEvent.nodeId],
                parentContainerId = app.getParentContainerId(column);

            expect(parentContainerId).to.equal(CreateContainerEvent.nodeId);
        });
    });

    describe('createGraph', () => {
        it('creates a Graph given appropriate GraphEvent and updates Main.graph and Main.nodesTable', () => {
            const CreateGraphEvent = new Events.CreateGraphEvent();

            const app = new Main();
            app.createGraph(CreateGraphEvent);

            expect(app.graph instanceof Graph).to.equal(true);
            expect(app.nodesTable[CreateGraphEvent.nodeId] instanceof Graph).to.equal(true);
        });
    });

    describe('createContainer', () => {
        const CreateGraphEvent = new Events.CreateGraphEvent();

        const app = new Main();
        app.createGraph(CreateGraphEvent);

        const graph = app.graph;

        it('creates a Container given appropriate GraphEvent and updates Main.graph.child and Main.nodesTable', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent(CreateGraphEvent.graphId, CreateGraphEvent.graphId);
            app.createContainer(CreateContainerEvent);

            expect(graph.child instanceof Container).to.equal(true);
            expect(app.nodesTable[CreateContainerEvent.nodeId] instanceof Container).to.equal(true);
        });

        it('throws if parent cannot be found in Main.nodesTable', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent('graphId', 'non-existent-parent-id');

            expect(() => app.createContainer(CreateContainerEvent)).to.throw();
        });
    });

    describe('createRow', () => {
        const CreateGraphEvent = new Events.CreateGraphEvent();
        const insertIndex = 0;

        const app = new Main();
        app.createGraph(CreateGraphEvent);

        const CreateContainerEvent = new Events.CreateContainerEvent(CreateGraphEvent.graphId, CreateGraphEvent.graphId);
        app.createContainer(CreateContainerEvent);

        const container = app.graph.child;

        it('inserts a Row given appropriate GraphEvent and updates Main.graph.child.children and Main.nodesTable', () => {
            const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, container.nodeId, insertIndex);
            app.createRow(CreateRowEvent);

            expect(container.children[insertIndex] instanceof Row).to.equal(true);
            expect(app.nodesTable[CreateRowEvent.nodeId] instanceof Row).to.equal(true);
        });

        it('inserts a new Row at specific index (0) and updates Main.nodesTable', () => {
            const customInsertIndex = 0;

            const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, container.nodeId, customInsertIndex);
            app.createRow(CreateRowEvent);

            expect(container.children[customInsertIndex] instanceof Row).to.equal(true);
            expect(container.children[customInsertIndex].nodeId).to.equal(CreateRowEvent.nodeId);
            expect(app.nodesTable[CreateRowEvent.nodeId] instanceof Row).to.equal(true);
        });

        it('inserts a new Row at specific index (1) and updates Main.nodesTable', () => {
            const customInsertIndex = 1;

            const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, container.nodeId, customInsertIndex);
            app.createRow(CreateRowEvent);

            expect(container.children[customInsertIndex] instanceof Row).to.equal(true);
            expect(container.children[customInsertIndex].nodeId).to.equal(CreateRowEvent.nodeId);
            expect(app.nodesTable[CreateRowEvent.nodeId] instanceof Row).to.equal(true);
        });

        it('"appends" a Row if insertIndex is more than the length of children and updates Main.nodesTable', () => {
            const
                customInsertIndex = 10,
                expectedInsertIndex = container.children.length;

            const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, container.nodeId, customInsertIndex);
            app.createRow(CreateRowEvent);

            expect(container.children[expectedInsertIndex] instanceof Row).to.equal(true);
            expect(container.children[expectedInsertIndex].nodeId).to.equal(CreateRowEvent.nodeId);
            expect(app.nodesTable[CreateRowEvent.nodeId] instanceof Row).to.equal(true);
        });

        it('throws if parent cannot be found in Main.nodesTable', () => {
            const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, 'non-existent-parent-id', insertIndex);
            expect(() => app.createRow(CreateRowEvent)).to.throw();
        });
    });

    describe('createColumn', () => {
        const CreateGraphEvent = new Events.CreateGraphEvent();
        const insertIndex = 0;

        const app = new Main();
        app.createGraph(CreateGraphEvent);

        const CreateContainerEvent = new Events.CreateContainerEvent(CreateGraphEvent.graphId, CreateGraphEvent.graphId);
        app.createContainer(CreateContainerEvent);

        const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, CreateContainerEvent.nodeId, insertIndex);
        app.createRow(CreateRowEvent);

        const row = app.graph.child.children[insertIndex];

        it('inserts a Column given appropriate GraphEvent and updates Main.graph.child.children[insertIndex] and Main.nodesTable', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, CreateRowEvent.nodeId, insertIndex);
            app.createColumn(CreateColumnEvent);

            expect(row.children[insertIndex] instanceof Column).to.equal(true);
            expect(app.nodesTable[CreateColumnEvent.nodeId] instanceof Column).to.equal(true);
        });

        it('inserts a Column at specific index (0) and updates Main.nodesTable', () => {
            const customInsertIndex = 0;

            const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, CreateRowEvent.nodeId, customInsertIndex);
            app.createColumn(CreateColumnEvent);

            expect(row.children[customInsertIndex] instanceof Column).to.equal(true);
            expect(row.children[customInsertIndex].nodeId).to.equal(CreateColumnEvent.nodeId);
            expect(app.nodesTable[CreateColumnEvent.nodeId] instanceof Column).to.equal(true);
        });

        it('inserts a Column at specific index (1) and updates Main.nodesTable', () => {
            const customInsertIndex = 1;

            const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, CreateRowEvent.nodeId, customInsertIndex);
            app.createColumn(CreateColumnEvent);

            expect(row.children[customInsertIndex] instanceof Column).to.equal(true);
            expect(row.children[customInsertIndex].nodeId).to.equal(CreateColumnEvent.nodeId);
            expect(app.nodesTable[CreateColumnEvent.nodeId] instanceof Column).to.equal(true);
        });

        it('"appends" a Column if insertIndex is more than the length of children and updates Main.nodesTable', () => {
            const
                customInsertIndex = 10,
                expectedInsertIndex = row.children.length;

            const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, CreateRowEvent.nodeId, customInsertIndex);
            app.createColumn(CreateColumnEvent);

            expect(row.children[expectedInsertIndex] instanceof Column).to.equal(true);
            expect(row.children[expectedInsertIndex].nodeId).to.equal(CreateColumnEvent.nodeId);
            expect(app.nodesTable[CreateColumnEvent.nodeId] instanceof Column).to.equal(true);
        });

        it('throws if parent cannot be found in Main.nodesTable', () => {
            const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, 'non-existent-parent-id', insertIndex);
            expect(() => app.createColumn(CreateColumnEvent)).to.throw();
        });
    });

    describe('createContentHolder', () => {
        const CreateGraphEvent = new Events.CreateGraphEvent();
        const insertIndex = 0;

        const app = new Main();
        app.createGraph(CreateGraphEvent);

        const CreateContainerEvent = new Events.CreateContainerEvent(CreateGraphEvent.graphId, CreateGraphEvent.graphId);
        app.createContainer(CreateContainerEvent);

        const CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.graphId, CreateContainerEvent.nodeId, insertIndex);
        app.createRow(CreateRowEvent);

        const CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.graphId, CreateRowEvent.nodeId, insertIndex);
        app.createColumn(CreateColumnEvent);

        const column = app.graph.child.children[insertIndex].children[insertIndex];

        it('creates a ContentHolder given appropriate GraphEvent and updates Main.graph.child.children[insertIndex].children[insertIndex] and Main.nodesTable', () => {
            const CreateContentHolderEvent = new Events.CreateContentHolderEvent(CreateGraphEvent.graphId, CreateColumnEvent.nodeId, 'RawUoIConstructor');
            app.createContentHolder(CreateContentHolderEvent);

            expect(column.child instanceof ContentHolder).to.equal(true);
            expect(app.nodesTable[CreateContentHolderEvent.nodeId] instanceof ContentHolder).to.equal(true);
        });

        it('throws if parent cannot be found in Main.nodesTable', () => {
            const CreateContentHolderEvent = new Events.CreateContentHolderEvent(CreateGraphEvent.graphId, 'non-existent-parent-id', 'RawUoIConstructor');
            expect(() => app.createContentHolder(CreateContentHolderEvent)).to.throw();
        });
    });

    describe('applyGraphEvent', () => {
        let sandbox:any;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('correctly calls Main.createGraph()', () => {
            const main = new Main();

            const
                createGraphSpy = sandbox.spy(main, 'createGraph'),
                CreateGraphEvent = new Events.CreateGraphEvent();

            try {
                main.applyEvent(CreateGraphEvent);
            } catch (e) {
                // do nothing..
            }

            expect(createGraphSpy.called).to.equal(true);
        });

        it('correctly calls Main.createContainer()', () => {
            const main = new Main();

            const
                createContainerSpy = sandbox.spy(main, 'createContainer'),
                CreateContainerEvent = new Events.CreateContainerEvent('graphId', 'parentId');

            try {
                main.applyEvent(CreateContainerEvent);
            } catch (e) {
                // do nothing..
            }

            expect(createContainerSpy.called).to.equal(true);
        });

        it('correctly calls Main.createRow()', () => {
            const main = new Main();

            const
                createRowSpy = sandbox.spy(main, 'createRow'),
                CreateRowEvent = new Events.CreateRowEvent('graphId', 'parentId', 0);

            try {
                main.applyEvent(CreateRowEvent);
            } catch (e) {
                // do nothing..
            }

            expect(createRowSpy.called).to.equal(true);
        });

        it('correctly calls Main.createColumn()', () => {
            const main = new Main();

            const
                createColumnSpy = sandbox.spy(main, 'createColumn'),
                CreateColumnEvent = new Events.CreateColumnEvent('graphId', 'parentId', 0);

            try {
                main.applyEvent(CreateColumnEvent);
            } catch (e) {
                // do nothing..
            }

            expect(createColumnSpy.called).to.equal(true);
        });

        it('correctly calls Main.createContentHolder()', () => {
            const main = new Main();

            const
                createContentHolderSpy = sandbox.spy(main, 'createContentHolder'),
                CreateContentHolderEvent = new Events.CreateContentHolderEvent('graphId', 'parentId', 'RawUoIConstructor');

            try {
                main.applyEvent(CreateContentHolderEvent);
            } catch (e) {
                // do nothing..
            }

            expect(createContentHolderSpy.called).to.equal(true);
        });
    });
});