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
import { update as updateFlow, reset as resetFlow } from "../diagram/flowSlice";
import { update as updateNode, reset as resetNode, load as loadNodes } from "../Node/nodeSlice";
import "./diagram.scss";

/*
 * TODO:
 *  Update create nodes
 *  Validate Flow (circles, speakers)
 *  Update useEffect for deletion to work for Nodes
 *  Node addition
 *  Node removal
 *  */

const Diagram = () => {

  //get and load Nodes
  const { sentences } = useSelector((state) => state.sentences.value);
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
    if (
      sentences[params.source]["speaker"] !== sentences[params.target]["speaker"]
    ) {
      dispatch(updateFlow(params.source, params.target, 1));
    }
  };
  const [clickedElement, setClickedElement] = useState({id: "0-0", source: "0", target:"0"})
  const [iconDelete, setIconDelete] = useState(true)
  const deletePressed = useKeyPress('Delete');
  useEffect(() => {
    console.log()
    dispatch(updateFlow(clickedElement.source, clickedElement.target, 0));
    setClickedElement({id: "0-0", source: "0", target:"0"})
  }, [deletePressed,iconDelete]);


  return (
    <div className={"diagram_container"}>
      <ReactFlowProvider>
        <ReactFlow nodes={actualNodes} edges={edges} onConnect={onConnect} onEdgeClick ={(event,edge) => setClickedElement(edge)} onNodesChange={onNodesChange}>
          <Background />
          <Controls>
            <ControlButton onClick={() => setIconDelete(!iconDelete) } title="To delete selected, or click 'delete'">
              <div className={"delete"}>🗑️</div>
            </ControlButton>
          </Controls>
        </ReactFlow>
      </ReactFlowProvider>
      {/*<button onClick={() => console.log(sentences)}>test</button>*/}
    </div>
  );
};

export default Diagram;
