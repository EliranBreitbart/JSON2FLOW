import { configureStore } from "@reduxjs/toolkit";
import fileInfoReducer from "../components/FileInfo/fileInfoSlice";
import flowReducer from "../components/diagram/flowSlice";
import nodeReducer from "../components/Node/nodeSlice";

export default configureStore({
  reducer: {
    fileInfo: fileInfoReducer,
    flow: flowReducer,
    sentences: nodeReducer,
  },
});
