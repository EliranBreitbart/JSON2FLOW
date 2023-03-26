import { createSlice } from "@reduxjs/toolkit";

export const fileInfoSlice = createSlice({
  name: "fileInfo",
  initialState: {
    value: require("./template.json"),
  },
  reducers: {
    /**
     * Updates the flow Table
     * @param {string} field - The field in which we want to update the data
     * @param {string} data - the Data the load to the field
     */
    update: {
      reducer(state, action) {
        state.value[action.payload.field] = action.payload.data;
      },
      prepare(field, data) {
        return {
          payload: {
            field,
            data,
          },
        };
      },
    },
    /**
     * Resets the file info to default state
     */
    reset: (state) => {
      state.value = require("./template.json");
    },
    /**
     * Loads file info to from JSON file
     * @param {JSON} data - JSON file
     */
    load: (state, action) => {
      Object.keys(state.value).map(
        (field) => (state.value[field] = action.payload[field])
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load } = fileInfoSlice.actions;

export default fileInfoSlice.reducer;
