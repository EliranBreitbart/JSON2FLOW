import React, from "react";
import Diagram from "../../components/diagram";
import JsonView from "../../components/JsonView";
import FileInfo from "../../components/FileInfo";
import "./EditorPage.scss";

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
