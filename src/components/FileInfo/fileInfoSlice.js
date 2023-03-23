import { createSlice } from "@reduxjs/toolkit";

export const fileInfoSlice = createSlice({
  name: "fileInfo",
  initialState: {
    value: require("./template.json"),
  },
  reducers: {
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
    reset: (state) => {
      state.value = require("./template.json");
    },
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
