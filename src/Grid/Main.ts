import * as R from 'ramda'
import * as Events from './GraphEvent'
import Graph from './Graph'
import Container from './Container'
import Row from './Row'
import Column from './Column'
import ContentHolder from './ContentHolder'

export default class Main {
    nodesTable:any;
    graph:Graph;

    constructor() {
        this.nodesTable = {};
    }

    applyEvent(event:Events.GraphEvent):Main {
        switch (event.actionType) {
            case Events.Action.CreateGraph:
                this.createGraph(event);
                break;
            case Events.Action.CreateContainer:
                this.createContainer(event);
                break;
            case Events.Action.CreateRow:
                this.createRow(event);
                break;
            case Events.Action.CreateColumn:
                this.createColumn(event);
                break;
            case Events.Action.CreateContentHolder:
                this.createContentHolder(event);
                break;
        }

        return this;
    }

    /**
     * Adds a node into nodesTable
     * @param {string} nodeId
     * @param {Graph|Container|Row|Column|ContentHolder} node
     */
    addToNodesTable(nodeId:string, node:Graph|Container|Row|Column|ContentHolder) {
        // @TODO check whether nodeId already present????? and throw if yes??
        this.nodesTable[nodeId] = node;
    }

    /**
     * Checks whether a node is present in nodesTable
     * @param {string|null} nodeId
     * @returns {boolean}
     */
    isInNodesTable(nodeId:string|null) {
        if (nodeId)
            return !R.equals(typeof this.nodesTable[nodeId], 'undefined');
        else
            return false;
    }

    // @TODO TEST the below
    getColumnIndex(column:Column) {
        if (column instanceof Column) {
            const parentRow = this.nodesTable[column.parentId] as Row;

            if (parentRow instanceof Row) {
                const index = R.findIndex((child:Column) => R.equals(child.nodeId, column.nodeId), parentRow.children);

                if (R.lt(index, 0)) {
                    throw new Error('Index of Column not found in Row');
                } else {
                    return index;
                }
            } else {
                throw new Error('Column\'s parent not instance of Row');
            }
        } else {
            throw new Error('Getting Column index can only be instantiated with an instance of Column');
        }
    }

    // @TODO TEST the below
    getRowIndex(column:Column) {
        if (column instanceof Column) {
            const parentRow = this.nodesTable[column.parentId] as Row;

            if (parentRow instanceof Row) {
                const parentContainer = this.nodesTable[parentRow.parentId] as Container;

                if (parentContainer instanceof Container) {
                    const index = R.findIndex((child:Row) => R.equals(child.nodeId, parentRow.nodeId), parentContainer.children);

                    if (R.lt(index, 0)) {
                        throw new Error('Index of Row not found in Container');
                    } else {
                        return index;
                    }
                } else {
                    throw new Error('Row\'s parent not instance of Container');
                }
            } else {
                throw new Error('Column\'s parent not instance of Row');
            }
        } else {
            throw new Error('Getting Column index can only be instantiated with an instance of Column');
        }
    }

    getParentContainerId(column:Column) {
        if (column instanceof Column) {
            const parentRow = this.nodesTable[column.parentId] as Row;

            if (parentRow instanceof Row) {
                return parentRow.parentId;
            } else {
                throw new Error('Column\'s parent not instance of Column');
            }
        } else {
            throw new Error('Getting Parent Container nodeId can only be instantiated with an instance of Column');
        }
    }

    /**
     * Assigns new graph and adds its node to nodesTable
     * @param event {CreateGraphEvent}
     */
    createGraph(event:Events.CreateGraphEvent) {
        if (event instanceof Events.CreateGraphEvent) {
            const graph = new Graph(event);

            this.graph = graph;
            this.addToNodesTable(graph.nodeId, graph);
        } else {
            throw new Error('Event for createGraph not an instance of CreateGraphEvent');
        }
    }

    /**
     * Assigns new container and adds its node to nodesTable
     * @param event {CreateContainerEvent}
     */
    createContainer(event:Events.CreateContainerEvent) {
        if (event instanceof Events.CreateContainerEvent) {
            const container = new Container(event);

            if (this.isInNodesTable(event.parentId)) {
                const
                    parentId = event.parentId as string,
                    parent = this.nodesTable[parentId] as Graph|Column;

                if (parent instanceof Graph) {
                    parent.insertChild(container);
                    this.addToNodesTable(container.nodeId, container);
                } else if (parent instanceof Column) {
                    parent.insertChild(container);
                    this.addToNodesTable(container.nodeId, container);
                } else {
                    // @TODO test the below
                    throw new Error('Container parent can only be Graph or Column instance');
                }
            } else {
                throw new Error('Container parent not found in nodesTable');
            }
        } else {
            throw new Error('Event for createContainer not an instance of CreateContainerEvent');
        }
    }

    /**
     * Assigns new row and adds its node to nodesTable
     * @param event {CreateRowEvent}
     */
    createRow(event:Events.CreateRowEvent) {
        if (event instanceof Events.CreateRowEvent) {
            const row = new Row(event);

            if (this.isInNodesTable(event.parentId)) {
                const
                    parentId = event.parentId as string,
                    parent = this.nodesTable[parentId] as Container;

                if (parent instanceof Container) {
                    parent.insertChild(row, event.insertIndex);
                    this.addToNodesTable(row.nodeId, row);
                } else {
                    // @TODO test the below
                    throw new Error('Row parent can only be Container instance');
                }
            } else {
                throw new Error('Row parent not found in nodesTable');
            }
        } else {
            throw new Error('Event for createRow not an instance of CreateRowEvent');
        }
    }

    /**
     * Assigns new column and adds its node to nodesTable
     * @param event {CreateColumnEvent}
     */
    createColumn(event:Events.CreateColumnEvent) {
        if (event instanceof Events.CreateColumnEvent) {
            const column = new Column(event);

            if (this.isInNodesTable(event.parentId)) {
                const
                    parentId = event.parentId as string,
                    parent = this.nodesTable[parentId] as Row;

                if (parent instanceof Row) {
                    parent.insertChild(column, event.insertIndex);
                    this.addToNodesTable(column.nodeId, column);
                } else {
                    // @TODO test the below
                    throw new Error('Column parent can only be Row instance');
                }
            } else {
                throw new Error('Column parent not found in nodesTable');
            }
        } else {
            throw new Error('Event for createColumn not an instance of CreateColumnEvent');
        }
    }

    /**
     * Assigns new contentHolder and adds its node to nodesTable
     * @param event {CreateContentHolderEvent}
     */
    createContentHolder(event:Events.CreateContentHolderEvent) {
        if (event instanceof Events.CreateContentHolderEvent) {
            const contentHolder = new ContentHolder(event);

            if (this.isInNodesTable(event.parentId)) {
                const
                    parentId = event.parentId as string,
                    parent = this.nodesTable[parentId] as Column;

                if (parent instanceof Column) {
                    parent.insertChild(contentHolder);
                    this.addToNodesTable(contentHolder.nodeId, contentHolder);
                } else {
                    // @TODO test the below
                    throw new Error('ContentHolder parent can only be Column instance');
                }
            } else {
                throw new Error('ContentHolder parent not found in nodesTable');
            }
        } else {
            throw new Error('Event for createContentHolder not an instance of CreateContentHolderEvent');
        }
    }

    // removeRow(event:Events.RemoveRowEvent) {
    //     const parentId = event.parentId || '';
    //     const parent:Container = this.nodesTable[parentId];
    //     parent.remove(event.nodeId);
    //     delete this.nodesTable[event.nodeId];
    //     // @TODO delete all children of this node from nodesTable?
    // }
}