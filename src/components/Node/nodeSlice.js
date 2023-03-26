import { createSlice } from "@reduxjs/toolkit";
export const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState: {
    value: require("./template.json"),
  },
  reducers: {
    /**
     * Updates sentences (nodes)
     * @param {_} _ - The source node ID
     */
    update: {
      reducer(state, action) {
        //Todo update as needed
      },
      prepare(field, data) {
        return {
          payload: {
            //Todo add payloads as needed
          },
        };
      },
    },
    /**
     * Resets the nodes to default state
     */
    reset: (state) => {
      state.value = require("./template.json");
    },
    /**
     * loads the nodes from JSON file
     * @param {JSON} data - JSON file
     */
    load: (state, action) => {
      state.value["sentences"] = action.payload["sentences"];
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load } = nodeSlice.actions;

export default nodeSlice.reducer;
