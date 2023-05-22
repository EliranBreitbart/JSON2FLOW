import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice for managing file information in Redux store.
 */
export const fileInfoSlice = createSlice({
  name: "fileInfo",
  initialState: {
    value: require("./template.json"),
  },
  reducers: {
    /**
     * Updates the flow table.
     * @param {object} state - The current state.
     * @param {object} action - The Redux action.
     * @param {string} action.payload.field - The field in which to update the data.
     * @param {string} action.payload.data - The data to load into the field.
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
     * Resets the file info to the default state.
     * @param {object} state - The current state.
     */
    reset: (state) => {
      state.value = require("./template.json");
    },
    /**
     * Loads file info from a JSON file.
     * @param {object} state - The current state.
     * @param {object} action - The Redux action.
     * @param {object} action.payload - The JSON file.
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
