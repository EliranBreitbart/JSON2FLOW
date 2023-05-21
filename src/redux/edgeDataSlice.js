import { createSlice } from "@reduxjs/toolkit";

export const edgeDataSlice = createSlice({
    name: "flowSlice",
    initialState: {
        json: require("./jsonTemplates/edgeData.json"),
    },
    reducers: {
        /**
         * Adds a node ID to the flow
         * @param {any} state - The flow state
         * @param {any} action - the action
         * @param {String} action.payload - the id of the node we removed
         */
        addNode: (state, action) =>{
            const newNode = action.payload;
            state.json["flow"] = {...state.json["flow"], [newNode]: []}
        },
        deleteNode: (state, action) =>{
            const nodeToDelete = action.payload;
            const {flow} = state.json;
            delete flow[nodeToDelete];
            state.json["flow"] = flow;
        },
        /**
         * Updates the flow Table
         * @param {string} fromID - The source node ID
         * @param {string} toID - The target node ID
         * @param {int} logic - the action
         */
        updateEdge: {
            reducer(state, action) {
                const { flow } = state.json;
                const {fromID, toID, logic} = action.payload;
                if(logic === 0){ //add edge
                    if(!flow[fromID].includes(toID))
                        flow[fromID].push(toID);
                }
                if(logic === 1) { //remove edge - to check
                    const index = flow[fromID].indexOf(toID);
                    if (index !== -1)
                        flow[fromID].splice(index, 1);
                }
                state.json["flow"] = flow;

            },
            prepare(fromID, toID, logic) {
                return {
                    payload: {
                        fromID,
                        toID,
                        logic: logic,
                    },
                };
            },
        },
        /**
         * Resets the flow to default state
         */
        reset: (state) => {
            state.value = require("./jsonTemplates/edgeData.json");
        },
        /**
         * Loads flow from JSON file
         * @param {any} state - The flow state
         * @param {any} action - The new flow
         */
        load: (state, action) => {
            state.json["flow"] = action.payload["flow"];
        },
        /**
         * Loads flow from JSON file
         * @param {any} state - The flow state
         * @param {any} action - the id of the node we removed
         */
        removeFlow: (state, action) =>{
            if(action.payload === "1000")
                return
            const { flow } = state.value;
            delete flow[action.payload]
            Object.keys(flow).map(id => {
                const index = flow[id].indexOf(action.payload)
                if(index !== -1 )
                    flow[id] = flow[id].filter(x => x !== action.payload)
            })
            state.value["flow"] = flow
        }
    },
});

// Action creators are generated for each case reducer function
export const { updateEdge, reset, load, removeFlow, addNode} = edgeDataSlice.actions;

export default edgeDataSlice.reducer;
