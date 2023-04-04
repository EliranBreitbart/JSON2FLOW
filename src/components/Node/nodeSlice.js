import { createSlice } from "@reduxjs/toolkit";
//TODO: create remove Node
export const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState: {
    value: require("./template.json"),
    nextId: 1001,
    locations: { 1000: { x: 0, y: 0 } },
  },
  reducers: {
    /**
     * Updates sentences (nodes)
     * @param {string} payload.id - The source node ID
     * @param {string} payload.field - The field we want to change
     * @param {string} payload.data - the data to put in the field
     */
    update: {
      reducer(state, action) {
        state.value["sentences"][action.payload.id][action.payload.field] =
          action.payload.data;
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
      const { sentences } = state.value;
      const newNode = {
        id_: state.nextId.toString(),
        arabic: "",
        arabicWithoutDiacritics: "",
        hebrew: "טקסט",
        transcription: "",
        voiceRecPath: "",
        keywords: [],
        speaker: "None",
      };
      state.value["sentences"] = { ...sentences, [state.nextId]: newNode };
      const dict = { ...state.locations };
      dict[state.nextId.toString()] = { x: -100, y: -100 };
      state.locations = dict;

      state.nextId = state.nextId + 1;
    },
    /**
     * Loads flow from JSON file
     * @param {any} state - The flow state
     * @param {any} action - the id of the node we want to remove (id 1000 wont be removed)
     */
    removeNode: (state, action) => {
      if(action.payload === "1000")
        return
      const { sentences } = state.value;
      delete sentences[action.payload]
      state.value["sentences"] = sentences
    },
    reset: (state) => {
      state.value = require("./template.json");
      state.locations = { 1000: { x: 0, y: 0 } };
      state.nextId = 1001;
    },
    /**
     * loads the nodes from JSON file
     * @param {JSON} action.payload - JSON file
     */
    load: (state, action) => {
      state.value["sentences"] = action.payload["sentences"];
      const dict = {};
      Object.keys(state.value["sentences"]).map(
        (key, i) => (dict[key] = { x: i * 100, y: i * 100 })
      );
      state.locations = dict;
      state.nextId =
        Math.max(
          ...Object.keys(state.value["sentences"]).map((key) => parseInt(key))
        ) + 1;
    },
    /**
     * Loads flow from JSON file
     * @param {any} state - The node state
     * @param {String} action.payload.id - the Node id
     * @param {{int, int}} action.payload.location - the new location
     */
    updateLocation: {
      reducer(state, action) {
        const dict = { ...state.locations };
        dict[action.payload.id] = action.payload.location;
        state.locations = dict;
      },
      prepare(id, location) {
        return {
          payload: {
            id,
            location,
          },
        };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, reset, load, addNode, updateLocation, removeNode } =
  nodeSlice.actions;

export default nodeSlice.reducer;
