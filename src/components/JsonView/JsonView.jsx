import React from "react";
import ReactJson from "react-json-view";
import "./JsonView.scss";
import { useSelector } from 'react-redux'

//TODO: add Flow and Sentences features to the Redux store.
const JsonView = (props) => {
    const json = useSelector(state => state.fileInfo.value)
    return (
    <div className={"JsonView"}>
      <ReactJson name={false} displayDataTypes={false} src={json} />
    </div>
  );
};

export default JsonView;
