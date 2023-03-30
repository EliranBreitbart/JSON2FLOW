import { createSlice } from "@reduxjs/toolkit";
export const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState: {
    value: require("./template.json"),
    nextId: 1001,
  },
  reducers: {
    /**
     * Updates sentences (nodes)
     * @param {_} _ - The source node ID
     */
    update: {
      reducer(state, action) {
        state.value["sentences"][action.payload.id][action.payload.field] = action.payload.data;
      },
      prepare(id, field, data) {
        return {
          payload: {
            id,
            field,
            data,
          },
        };
      },
    },
    /**
     * Resets the nodes to default state
     */
    addNode: (state) => {
      const { sentences } = state.value
      const newNode = {
        id_: state.nextId.toString(),
        arabic: "",
        arabicWithoutDiacritics: "",
        hebrew: "טקסט",
        transcription: "",
        voiceRecPath: "",
        keywords: [
        ],
        speaker: "None"
      }
      state.value["sentences"] = {...sentences, [state.nextId] : newNode}
      state.nextId = state.nextId + 1
    },
    reset: (state) => {
      state.value = require("./template.json");
      state.nextId = 1001
    },
    /**
     * loads the nodes from JSON file
     * @param {JSON} data - JSON file
     */
    load: (state, action) => {
      state.value["sentences"] = action.payload["sentences"];
      state.nextId = Math.max(...Object.keys(state.value["sentences"]).map(key => parseInt(key))) + 1
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load, addNode } = nodeSlice.actions;

export default nodeSlice.reducer;
