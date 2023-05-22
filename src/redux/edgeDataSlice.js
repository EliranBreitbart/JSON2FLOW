import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux Slice to manage edge data
 */
export const edgeDataSlice = createSlice({
    name: "flowSlice",
    initialState: {
        json: require("./jsonTemplates/edgeData.json"),
    },
    reducers: {
        /**
         * Adds a node ID to the flow
         * @param {Object} state - The flow state
         * @param {Object} action - The action
         * @param {string} action.payload - The ID of the node to add
         */
        addNode: (state, action) => {
            const newNode = action.payload;
            state.json.flow[newNode] = [];
        },
        /**
         * Updates the flow edge
         * @param {Object} state - The flow state
         * @param {Object} action - The action
         * @param {string} action.payload.fromID - The source node ID
         * @param {string} action.payload.toID - The target node ID
         * @param {number} action.payload.logic - The action logic
         */
        updateFlowEdge: {
            reducer(state, action) {
                const { fromID, toID, logic } = action.payload;
                if(logic === 0 && !state.json.flow[fromID].includes(toID)) {
                    state.json.flow[fromID].push(toID);
                }
                if(logic === 1) {
                    const index = state.json.flow[fromID].indexOf(toID);
                    if (index !== -1)
                        state.json.flow[fromID].splice(index, 1);
                }
            },
            prepare(fromID, toID, logic) {
                return {
                    payload: {
                        fromID,
                        toID,
                        logic,
                    },
                };
            },
        },
        /**
         * Resets the flow to default state
         * @param {Object} state - The flow state
         */
        reset: (state) => {
            state.json = require("./jsonTemplates/edgeData.json");
        },
        /**
         * Loads flow from JSON file
         * @param {Object} state - The flow state
         * @param {Object} action - The action
         * @param {Object} action.payload - The new flow
         */
        load: (state, action) => {
            state.json.flow = action.payload.flow;
        },
        /**
         * Removes edges of the given node ID from the flow
         * @param {Object} state - The flow state
         * @param {Object} action - The action
         * @param {string} action.payload - The ID of the node for which edges are to be removed
         */
        removeEdges: (state, action) => {
            const id = action.payload;
            delete state.json.flow[id];
            for (let key in state.json.flow) {
                state.json.flow[key] = state.json.flow[key].filter(item => item !== id);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateFlowEdge, reset, load, removeEdges, addNode } = edgeDataSlice.actions;

export default edgeDataSlice.reducer;



//unused?
// deleteNode: (state = this.state, action) =>{
//     const nodeToDelete = action.payload;
//     const {flow} = state.json;
//     delete flow[nodeToDelete];
//     state.json["flow"] = flow;
// },