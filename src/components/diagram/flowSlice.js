import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flowSlice",
  initialState: {
    value: require("./template.json"),
  },
  reducers: {
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
    reset: (state) => {
      state.value = require("./template.json");
    },
    load: (state, action) => {
      state.value["flow"] = action.payload["flow"]
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load } = flowSlice.actions;

export default flowSlice.reducer;
