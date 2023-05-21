import { createSlice } from "@reduxjs/toolkit";
/*TODO:
    * remove node functionality
 *  */

export const nodeDataSlice = createSlice({
    name: "nodeDataSlice",
    initialState: {
        json: require("./jsonTemplates/nodeData.json"),
        load: 1, //important!! for re-render of the flow!!!
    },
    reducers: {
        load: (state = this.state, action) => {
            state.json["sentences"] = action.payload["sentences"];
            state.load = (state.load + 1 % 2);
        },
        /**
         * Updates sentences (nodes)
         * @param {string} payload.id - The source node ID
         * @param {string} payload.field - The field we want to change
         * @param {string} payload.data - the data to put in the field
         */
        updateField: {
            reducer(state = this.state, action) {
                const {id, field, data} = action.payload;
                    state.json["sentences"][id][field] = data;

            },
            prepare(id, field, data) {
                return {
                    payload: {
                        id,
                        field,
                        data,
                    },
                };
            },
        },
        removeField: {
            reducer(state = this.state, action) {
                const {id, field} = action.payload;
                delete state.json["sentences"][id][field];

            },
            prepare(id, field) {
                return {
                    payload: {
                        id,
                        field,
                    },
                };
            },
        },
        /**
         * Resets the nodes to default state
         */
        reset: (state = this.state) => {
            state.locations = { 1000: { x: 0, y: 0 } };
            state.nextId = 1001;
        },
        /**
         * Adds a node
         * @param {Object} newNode - The node data
         * @param {any} state - current state
         */
        addNode: (state = this.state, newNode) => {
            const {sentences} = state.json;
            newNode = newNode.payload;

            state.json["sentences"] = {...sentences, [newNode["id_"]]: newNode};
        },
        /**
         * Removes a node from the sentences object in the state.
         * @param {Object} state - The current state object.
         * @param {Object} action - The action object.
         * @param {*} action.payload - The payload containing the ID of the node to be removed.
         * @returns {void}
         */
        removeNode: (state = this.state, action) => {
            const {sentences} = state.json;
            delete sentences[action.payload];
            state.json["sentences"] = sentences;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateField, reset, load, removeField, addNode, removeNode} = nodeDataSlice.actions;

export default nodeDataSlice.reducer;
