import React from "react";
import Diagram2 from "../../components/diagram";
import JsonView from "../../components/JsonView";
import FileInfo from "../../components/FileInfo";
import "./EditorPage.scss";
import {useSelector} from "react-redux";

const EditorPage = () => {

  const key = useSelector((state) => state.nodes.load); //important!! for re-render!!
  return (
    <>
      <div className={"editor-container"}>
        <Diagram2 key={key.toString()}/>
        <JsonView />
      </div>
      <FileInfo />
    </>
  );
};

export default EditorPage;
