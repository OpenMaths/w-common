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