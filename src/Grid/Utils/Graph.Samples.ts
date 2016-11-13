import App from "../Main";
import * as Events from "../GraphEvent";
import {constructLatestState} from "../../Dispatcher/Dispatcher";

export function sampleEmptyGraph(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();

    return constructLatestState(prevState, [
        createGraphEvent
    ]);
}

export function sampleEmptyContainer(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();
    const createContainerEvent = new Events.CreateContainerEvent(createGraphEvent.graphId, createGraphEvent.nodeId);

    return constructLatestState(prevState, [
        createGraphEvent, createContainerEvent
    ]);
}

export function sampleEmptyRow(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();
    const createContainerEvent = new Events.CreateContainerEvent(createGraphEvent.graphId, createGraphEvent.nodeId);
    const createRowEvent = new Events.CreateRowEvent(createGraphEvent.graphId, createContainerEvent.nodeId, 0);

    return constructLatestState(prevState, [
        createGraphEvent, createContainerEvent, createRowEvent
    ]);
}

export function sampleEmptyColumn(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();
    const createContainerEvent = new Events.CreateContainerEvent(createGraphEvent.graphId, createGraphEvent.nodeId);
    const createRowEvent = new Events.CreateRowEvent(createGraphEvent.graphId, createContainerEvent.nodeId, 0);
    const createColumnEvent = new Events.CreateColumnEvent(createGraphEvent.graphId, createRowEvent.nodeId, 0);

    return constructLatestState(prevState, [
        createGraphEvent, createContainerEvent, createRowEvent, createColumnEvent
    ]);
}

export function sampleEmptyContentHolder(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();
    const createContainerEvent = new Events.CreateContainerEvent(createGraphEvent.graphId, createGraphEvent.nodeId);
    const createRowEvent = new Events.CreateRowEvent(createGraphEvent.graphId, createContainerEvent.nodeId, 0);
    const createColumnEvent = new Events.CreateColumnEvent(createGraphEvent.graphId, createRowEvent.nodeId, 0);
    const createContentHolderEvent = new Events.CreateContentHolderEvent(createGraphEvent.graphId, createColumnEvent.nodeId, 'contentIdentifier');

    return constructLatestState(prevState, [
        createGraphEvent, createContainerEvent, createRowEvent, createColumnEvent, createContentHolderEvent
    ]);
}

export function sampleEmptyContainerNested(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();
    const createContainerEvent = new Events.CreateContainerEvent(createGraphEvent.graphId, createGraphEvent.nodeId);
    const createRowEvent = new Events.CreateRowEvent(createGraphEvent.graphId, createContainerEvent.nodeId, 0);
    const createColumnEvent = new Events.CreateColumnEvent(createGraphEvent.graphId, createRowEvent.nodeId, 0);
    const createContainer2Event = new Events.CreateContainerEvent(createGraphEvent.graphId, createColumnEvent.nodeId);

    return constructLatestState(prevState, [
        createGraphEvent, createContainerEvent, createRowEvent, createColumnEvent, createContainer2Event
    ]);
}

export function sample2Rows2ColumnsEmptyContentHolder(prevState: App) {
    const createGraphEvent = new Events.CreateGraphEvent();
    const createContainerEvent = new Events.CreateContainerEvent(createGraphEvent.graphId, createGraphEvent.nodeId);
    const createRowEvent = new Events.CreateRowEvent(createGraphEvent.graphId, createContainerEvent.nodeId, 0);
    const createRow2Event = new Events.CreateRowEvent(createGraphEvent.graphId, createContainerEvent.nodeId, 1);

    const createColumnEvent = new Events.CreateColumnEvent(createGraphEvent.graphId, createRowEvent.nodeId, 0);
    const createColumn2Event = new Events.CreateColumnEvent(createGraphEvent.graphId, createRowEvent.nodeId, 1);
    const createColumn3Event = new Events.CreateColumnEvent(createGraphEvent.graphId, createRow2Event.nodeId, 0);

    const createContentHolderEvent = new Events.CreateContentHolderEvent(createGraphEvent.graphId, createColumnEvent.nodeId, 'contentIdentifier');

    return constructLatestState(prevState, [
        createGraphEvent, createContainerEvent, createRowEvent, createRow2Event,
        createColumnEvent, createColumn2Event, createColumn3Event, createContentHolderEvent
    ]);
}