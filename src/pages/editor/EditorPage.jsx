import React from "react";
import Diagram from "../../components/diagram";
import JsonView from "../../components/JsonView";
import FileInfo from "../../components/FileInfo";
import "./EditorPage.scss";
/*import example_conversation_1 from './../../mock/example_conversation_1.json';*/
const EditorPage = (props) => {
  //redux?
  return (
    <>
      <div className={"container"}>
        <Diagram />
        <JsonView json={props.json} />
      </div>
      <FileInfo json={props.json} setJson={props.setJson} />
    </>
  );
};

export default EditorPage;
