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
     * @param {int} action - The action. 1 will add, 0 will remove connection.
     */
    update: {
      reducer(state, action) {
        const temp = { ...state.value };
        if(temp["flow"][action.payload.fromID] !== undefined) { // make the id exists.
          const index = temp["flow"][action.payload.fromID].indexOf(action.payload.toID);

          // perform add / remove if toID doesn't exist / exists respectively
          if (action.payload.action === 1 && index === -1) {
            temp["flow"][action.payload.fromID].push(action.payload.toID);
          } else if (action.payload.action === 0) {
            if (index > -1) {
              temp["flow"][action.payload.fromID].splice(index, 1);
            }
          }
          state.value = temp;
        }
      },
      prepare(fromID, toID, action) {
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
     * @param {any} state - The flow state
     * @param {any} action - The new flow
     */
    load: (state, action) => {
      state.value["flow"] = action.payload["flow"];
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load } = flowSlice.actions;

export default flowSlice.reducer;
