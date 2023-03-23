import { configureStore } from "@reduxjs/toolkit";
import fileInfoReducer from '../components/FileInfo/fileInfoSlice'

export default configureStore({
  reducer: {
      fileInfo: fileInfoReducer
  },
});
