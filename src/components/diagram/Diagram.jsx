import React, {useCallback, useEffect, useState} from "react";
import ReactFlow, {
  applyNodeChanges,
  Background,
  ControlButton,
  Controls,
  ReactFlowProvider,
  useKeyPress
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { update as updateFlow } from "../diagram/flowSlice";
import { update as updateNode, addNode } from "../Node/nodeSlice";
import "./diagram.scss";

/*
 * TODO:
 *  Update create nodes
 *  Validate Flow (circles, speakers)
 *  Update useEffect for deletion to work for Nodes
 *  Node Location fix
 *  Node removal
 *  Custom Node with side handles so that it can be more readable
 *  */

const Diagram = () => {

  //get and load Nodes
  const { sentences } = useSelector((state) => state.sentences.value);
  const nextId = useSelector((state) => state.sentences.nextId);
  const dispatch = useDispatch();
  const nodes = Object.values(sentences).map((sentence, index) => {
    //const speaker = sentence["speaker"] === "bot" ? "bot" : "user";
    return {
      id: sentence["id_"].toString(),
      position: { x: index * 100, y: index * 100 },
      data: { label: sentence["hebrew"] },
      className: sentence["speaker"],
    };
  });

  //Handle moving nodes
  const [actualNodes, setActualNodes] = useState(nodes);
  const onNodesChange = useCallback(
      (changes) => setActualNodes((nds) => applyNodeChanges(changes, nds)),
      []
  );
  useEffect(() =>{
    setActualNodes(nodes)
  },[sentences])

  const add_Node = () => {
    dispatch(addNode())
    dispatch(updateFlow(nextId.toString(),"0", -1))
  }
  //get and load Flow
  const flow = useSelector((state) => state.flow.value);
  const edges = Object.keys(flow.flow)
    .map((key) => {
      return flow.flow[key].map((iid) => ({
        id: key + "-" + iid,
        source: key,
        target: iid,
      }));
    })
    .flat();

  //Handle Connect and delete nodes
  const onConnect = (params) => {

    if (sentences[params.source]["speaker"] !== sentences[params.target]["speaker"]) {
      if( sentences[params.target]["speaker"] === "None"){
        dispatch(updateNode(sentences[params.target]["id_"], "speaker", sentences[params.source]["speaker"] === "bot" ? "speaker" : "bot" ))
      } else if( sentences[params.source]["speaker"] === "None"){
        dispatch(updateNode(sentences[params.source]["id_"], "speaker", sentences[params.target]["speaker"] === "bot" ? "speaker" : "bot" ))
      }
      dispatch(updateFlow(params.source, params.target, 1));
    }
  };
  const [clickedElement, setClickedElement] = useState({id: "1000-0", source: "1000", target:"0"})
  const [iconDelete, setIconDelete] = useState(true)
  const deletePressed = useKeyPress('Delete');
  useEffect(() => {
    console.log()
    dispatch(updateFlow(clickedElement.source, clickedElement.target, 0));
    setClickedElement({id: "1000-0", source: "0", target:"0"})
  }, [deletePressed,iconDelete]);

  return (
    <div className={"diagram_container"} >
      <ReactFlowProvider>
        <ReactFlow nodes={actualNodes}
                   edges={edges} onConnect={onConnect}
                   onEdgeClick ={(event,edge) => setClickedElement(edge)}
                   onNodesChange={onNodesChange}>
          <Background />
          <Controls>
            <ControlButton onClick={() => setIconDelete(!iconDelete) } title="To delete selected, or click 'delete'">
              <div className={"delete"}>🗑️</div>
            </ControlButton>
            <ControlButton className={"Add-Button"} onClick={() => add_Node() } title="To delete selected, or click 'delete'"/>
          </Controls>
        </ReactFlow>
      </ReactFlowProvider>
      {/*<button onClick={() => console.log(sentences)}>test</button>*/}
    </div>
  );
};

export default Diagram;
