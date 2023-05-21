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
        load: (state, action) => {
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
            reducer(state, action) {
                const {id, field, data} = action.payload;
                    state.json["sentences"][id][field] = data;

            },
            prepare(id, field, data , update) {
                return {
                    payload: {
                        id,
                        field,
                        data,
                        update,
                    },
                };
            },
        },
        removeField: {
            reducer(state, action) {
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
        reset: (state) => {
            state.locations = { 1000: { x: 0, y: 0 } };
            state.nextId = 1001;
        },
        /**
         * Updates sentences (nodes)
         * @param {Object} newNode - The source node ID
         * @param {any} state - current state
         */
        addNode: (state, newNode) => {
            const {sentences} = state.json;
            newNode = newNode.payload;

            state.json["sentences"] = {...sentences, [newNode["id_"]]: newNode};
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateField, reset, load, removeField, addNode} = nodeDataSlice.actions;

export default nodeDataSlice.reducer;
