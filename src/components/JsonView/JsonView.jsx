import React from "react";
import ReactJson from "react-json-view";
import "./JsonView.scss";
import { useSelector } from "react-redux";

const JsonView = () => {
  /* load all data to view */
  const data = useSelector((state) => state.fileInfo.value);
  const flow = useSelector((state) => state.edges.json);
  const sentences = useSelector((state) => state.nodes.json);
  return (
    <div className={"JsonView"}>
      <ReactJson
        name={false}
        displayDataTypes={false}
        src={{ ...data, ...flow, ...sentences }}
      />
    </div>
  );
};

export default JsonView;
