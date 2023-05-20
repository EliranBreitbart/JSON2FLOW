import { createSlice } from "@reduxjs/toolkit";
/*TODO:
    * Store data for nodes.
    *
 *  */
export const nodeDataSlice = createSlice({
    name: "nodeDataSlice",
    initialState: {
        nodeTitles: {1000: "text"},
    },
    reducers: {
        /**
         * Updates sentences (nodes)
         * @param {string} payload.id - The source node ID
         * @param {string} payload.field - The field we want to change
         * @param {string} payload.data - the data to put in the field
         */
        update: {
            reducer(state, action) {
            },
            prepare(id, field, data) {
                return {
                    payload: {
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
    },
});

// Action creators are generated for each case reducer function
export const { update, reset,} = nodeDataSlice.actions;

export default nodeDataSlice.reducer;
