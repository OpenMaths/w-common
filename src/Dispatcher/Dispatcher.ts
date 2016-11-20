import * as Events from '../Grid/GraphEvent'
import App from '../Grid/Main'

/**
 * Gets the latest instance of App {Main} based on the previous state and an event to modify the state
 * @param prev {Main}
 * @param event {Events.GraphEvent}
 * @returns {Main}
 */
export const getLatestState = (prev:App, event:Events.GraphEvent):App => {
    // @TODO might need to use clone due to Redux here..
    return prev.applyEvent(event);
};

/**
 * Gets the latest instance of App {Main} after a list of events has been applied
 * @param prev {Main}
 * @param events {Events.GraphEvent[]}
 * @returns {Main}
 */
export const constructLatestState = (prev:App, events:Events.GraphEvent[]):App => {
    // @TODO might need to use clone due to Redux here..
    let latestState = prev;

    events.forEach((event:Events.GraphEvent, index:number) => {
        latestState = getLatestState(latestState, event);
    });

    return latestState;
};
