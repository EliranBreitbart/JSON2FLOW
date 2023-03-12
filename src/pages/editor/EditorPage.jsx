import React, {useEffect, useState} from "react";
import Diagram from "../../components/diagram";
import JsonView from "../../components/JsonView";
import FileInfo from "../../components/FileInfo";
import "./EditorPage.scss";
/*import example_conversation_1 from './../../mock/example_conversation_1.json';*/
const EditorPage = () => {
    const [json, setJson] = React.useState(require("./template.json"))
    //redux?
    return (
        <>
            <div className={"container"}>
                <Diagram />
                <JsonView json={json} setJson = {setJson} />
            </div>
            <FileInfo json={json} setJson = {setJson} />
        </>
  );
};

export default EditorPage;
