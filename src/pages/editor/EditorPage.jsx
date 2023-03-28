import React, { useState } from "react";
import Diagram from "../../components/diagram";
import JsonView from "../../components/JsonView";
import FileInfo from "../../components/FileInfo";
import "./EditorPage.scss";
import Button from "react-bootstrap/Button";
/*import example_conversation_1 from './../../mock/example_conversation_1.json';*/
const EditorPage = () => {
  //redux?
  return (
    <>
      <div className={"container"}>
        <Diagram />
        <JsonView />
      </div>
      <FileInfo />
    </>
  );
};

export default EditorPage;
