import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flowSlice",
  initialState: {
    value: require("./template.json"),
  },
  reducers: {
    /**
     * Updates the flow Table
     * @param {string} fromID - The source node ID
     * @param {string} toID - The target node ID
     * @param {string} action - The action. "add", "remove" will add or remove connections respectively
     */
    update: {
      reducer(state, action) {
        const temp = {...state.value}
        if(action.payload.action == "add"){
        temp["flow"][action.payload.fromID].push(action.payload.toID)
        } else if(action.payload.action == "remove"){
          const index = temp["flow"][action.payload.fromID].indexOf(action.payload.toID)
          if (index > -1){
            temp["flow"][action.payload.fromID].splice(index,1)
          }
        }
        state.value = temp
      },
      prepare(fromID, toID,action) {
        return {
          payload: {
            fromID,
            toID,
            action,
          },
        };
      },
    },
    /**
     * Resets the flow to default state
     */
    reset: (state) => {
      state.value = require("./template.json");
    },
    /**
     * Loads flow from JSON file
     * @param {JSON} data - JSON file
     */
    load: (state, action) => {
      state.value["flow"] = action.payload["flow"];
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load } = flowSlice.actions;

export default flowSlice.reducer;
