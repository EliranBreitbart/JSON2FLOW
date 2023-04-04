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
     * @param {int} action - The action. (1-add, 0-remove) connection.
     */
    update: {
      reducer(state, action) {
        const { flow } = state.value;
        if(action.payload.fromID === "0") //default item in the delete state
          return;
        if (flow[action.payload.fromID] === undefined) {
          state.value["flow"] = { ...flow, [action.payload.fromID]: [] };
          return;
        }

        const toIdIndex = flow[action.payload.fromID].indexOf(
          action.payload.toID
        );

        if (action.payload.action === 1 && toIdIndex === -1) {
          flow[action.payload.fromID].push(action.payload.toID);
        } else if (action.payload.action === 0 && toIdIndex > -1) {
          flow[action.payload.fromID].splice(toIdIndex, 1);
        }
        state.value["flow"] = flow;
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
    /**
     * Loads flow from JSON file
     * @param {any} state - The flow state
     * @param {any} action - the id of the node we removed
     */
    removeFlow: (state, action) =>{
      if(action.payload === "1000")
        return
      const { flow } = state.value;
      delete flow[action.payload]
      Object.keys(flow).map(id => {
        const index = flow[id].indexOf(action.payload)
        if(index !== -1 )
          flow[id] = flow[id].filter(x => x !== action.payload)
      })
      state.value["flow"] = flow
    }
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load, removeFlow } = flowSlice.actions;

export default flowSlice.reducer;
