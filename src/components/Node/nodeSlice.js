import { createSlice } from "@reduxjs/toolkit";

export const nodeSlice = createSlice({
  name: "nodeSlice",
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
      state.value["sentences"] = action.payload["sentences"]
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load } = nodeSlice.actions;

export default nodeSlice.reducer;
