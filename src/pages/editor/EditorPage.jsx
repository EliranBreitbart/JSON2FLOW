import React from "react";
import Diagram from "../../components/diagram";
import  JsonView from "../../components/JsonView";
import "./EditorPage.scss";

const EditorPage = () => {
  return (
    <div className={"container"}>
        <Diagram />
        <JsonView />
    </div>
  );
};

export default EditorPage;
