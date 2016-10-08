import {expect} from 'chai'
import * as Events from './GraphEvent'
import Graph from './Graph'
import Container from './Container'

describe('Models/Grid/Graph', () => {
    describe('constructor', () => {
        it('assigns nodeId upon construction', () => {
            const CreateGraphEvent = new Events.CreateGraphEvent();

            const graph = new Graph(CreateGraphEvent);
            expect(graph.nodeId).to.equal(CreateGraphEvent.nodeId);
        });
    });

    describe('insertChild', () => {
        const CreateGraphEvent = new Events.CreateGraphEvent();
        const graph = new Graph(CreateGraphEvent);

        it('correctly assigns child', () => {
            const CreateContainerEvent = new Events.CreateContainerEvent(graph.nodeId, graph.nodeId);
            const container = new Container(CreateContainerEvent);

            graph.insertChild(container);
            expect(graph.child instanceof Container).to.equal(true);
        });
    });
});