import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing node data.
 */
export const nodeDataSlice = createSlice({
    name: "nodeDataSlice",
    initialState: {
        json: require("./jsonTemplates/nodeData.json"),
        load: 1,
    },
    reducers: {
        /**
         * Updates the state with the provided data.
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {Object} action.payload.sentences - The payload containing the updated sentences.
         */
        load: (state, action) => {
            state.json.sentences = action.payload.sentences;
            state.load = (state.load + 1) % 2;
        },
        /**
         * Updates a specific field in a node.
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {Object} action.payload - The payload containing the update information.
         * @param {string} action.payload.id - The ID of the node.
         * @param {string} action.payload.field - The field to update.
         * @param {string} action.payload.data - The data to put in the field.
         */
        updateField: {
            reducer(state, action) {
                const { id, field, data } = action.payload;
                state.json.sentences[id][field] = data;
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
        /**
         * Removes a field from a node.
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {string} action.payload.id - The ID of the node.
         * @param {string} action.payload.field - The field to remove.
         */
        removeField: {
            reducer(state, action) {
                const { id, field } = action.payload;
                delete state.json.sentences[id][field];
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
         * Resets the node data to default state.
         * @param {Object} state - The current state.
         */
        reset: (state) => {
            state.json = require("./jsonTemplates/nodeData.json");
        },
        /**
         * Adds a new node to the node data.
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {Object} action.payload - The payload containing the new node data.
         */
        addNode: (state, action) => {
            state.json.sentences[action.payload.id_] = action.payload;
        },
        /**
         * Removes a node from the node data.
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {string} action.payload - The ID of the node to remove.
         */
        removeNode: (state, action) => {
            delete state.json.sentences[action.payload];
        },
    },
});

export const {
    updateField,
    reset,
    load,
    removeField,
    addNode,
    removeNode,
} = nodeDataSlice.actions;

export default nodeDataSlice.reducer;
