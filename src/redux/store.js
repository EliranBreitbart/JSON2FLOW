import { configureStore } from "@reduxjs/toolkit";
import fileInfoReducer from "../components/FileInfo/fileInfoSlice";
import flowReducer from "../components/diagram/flowSlice";
import nodeReducer from "../components/Node/nodeSlice";
import nodeDataSlice from "./nodeDataSlice";
import edgeDataSlice from "./edgeDataSlice";

export default configureStore({
  reducer: {
    fileInfo: fileInfoReducer,
    flow: flowReducer,
    sentences: nodeReducer,
    nodes: nodeDataSlice,
    edges: edgeDataSlice,
  },
});
