import React  from "react";
import Diagram2 from "../../components/diagram";
import JsonView from "../../components/JsonView";
import FileInfo from "../../components/FileInfo";
import "./EditorPage.scss";

const EditorPage = () => {
  //redux?
  return (
    <>

      <div className={"container"}>
        <Diagram2 />
        <JsonView />
      </div>
      <FileInfo />
    </>
  );
};

export default EditorPage;
