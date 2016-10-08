// import * as Rx from 'rx'
import {expect} from 'chai'
import * as sinon from 'sinon'
import {getLatestState, constructLatestState} from './Dispatcher'
import * as Events from '../Grid/GraphEvent'
import App from '../Grid/Main'
import Graph from '../Grid/Graph'
import Container from '../Grid/Container'
import Row from '../Grid/Row'
import Column from '../Grid/Column'

describe('Models/Dispatcher', () => {
    describe('getLatestState', () => {
        let sandbox:any;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('gets the latest state of an app when previous state and a mutation event provided', () => {
            // const duplicate = (a:number) => {
            //     return [a, a];
            // };
            //
            // const source = Rx.Observable
            //     .range(1, 4)
            //     .selectMany(duplicate);
            //
            // source.subscribe(
            //     function (x) {
            //         console.log('Next: ' + x);
            //     },
            //     function (err) {
            //         console.log('Error: ' + err);
            //     },
            //     function () {
            //         console.log('Completed');
            //     });

            const
                main = new App(),
                CreateGraphEvent = new Events.CreateGraphEvent();

            const applyEventSpy = sandbox.spy(main, 'applyEvent');

            const latestState = getLatestState(main, CreateGraphEvent);

            expect(applyEventSpy.called).to.equal(true);
            expect(latestState.nodesTable[CreateGraphEvent.nodeId] instanceof Graph).to.equal(true);
        });
    });

    describe('constructLatestState', () => {
        it('gets the latest state of an app when previous state and a list of mutation events provided', () => {
            const
                main = new App(),
                CreateGraphEvent = new Events.CreateGraphEvent(),
                CreateContainerEvent = new Events.CreateContainerEvent(CreateGraphEvent.nodeId, CreateGraphEvent.nodeId),
                CreateRowEvent = new Events.CreateRowEvent(CreateGraphEvent.nodeId, CreateContainerEvent.nodeId, 0),
                CreateColumnEvent = new Events.CreateColumnEvent(CreateGraphEvent.nodeId, CreateRowEvent.nodeId, 0);

            const events = [CreateGraphEvent, CreateContainerEvent, CreateRowEvent, CreateColumnEvent];

            const latestState = constructLatestState(main, events);

            expect(latestState.nodesTable[CreateGraphEvent.nodeId] instanceof Graph).to.equal(true);
            expect(latestState.nodesTable[CreateContainerEvent.nodeId] instanceof Container).to.equal(true);
            expect(latestState.nodesTable[CreateRowEvent.nodeId] instanceof Row).to.equal(true);
            expect(latestState.nodesTable[CreateColumnEvent.nodeId] instanceof Column).to.equal(true);
        });
    });
});