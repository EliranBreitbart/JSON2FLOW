import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  ReactFlowProvider,
  useKeyPress,
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { update as updateFlow, removeFlow } from "../diagram/flowSlice";
import {
  update as updateNode,
  addNode,
  updateLocation, removeNode,
} from "../Node/nodeSlice";
import "./diagram.scss";

/*
 * TODO:
 *  Update create nodes
 *  Custom nodes (with reset option)
 *  Validate Flow (circles, speakers)
 *  Custom Node with side handles so that it can be more readable
 *  */

const Diagram = () => {
  //get and load Nodes
  const { sentences } = useSelector((state) => state.sentences.value);
  const locations = useSelector((state) => state.sentences.locations);
  const nextId = useSelector((state) => state.sentences.nextId);
  const dispatch = useDispatch();
  const nodes = Object.values(sentences).map((sentence) => {
    return {
      id: sentence["id_"].toString(),
      position: locations[sentence["id_"].toString()],
      data: { label: sentence["hebrew"] },
      className: sentence["speaker"],
    };
  });

  //Handle moving nodes
  const onNodesChange = useCallback((changes) => {
    if (changes[0].dragging) {
      dispatch(updateLocation(changes[0].id, changes[0].position));
    }
  }, []);

  const add_Node = () => {
    dispatch(addNode());
    dispatch(updateFlow(nextId.toString(), "0", -1));
  };

  //get and load Flow
  const { flow } = useSelector((state) => state.flow.value);
  const edges = Object.keys(flow)
    .map((key) => {
      return flow[key].map((iid) => ({
        id: key + "-" + iid,
        source: key,
        target: iid,
      }));
    })
    .flat();

  //Handle Connect nodes
  const onConnect = (params) => {
    if (
      sentences[params.source]["speaker"] !==
      sentences[params.target]["speaker"]
    ) {
      if (sentences[params.target]["speaker"] === "None") {
        dispatch(
          updateNode(
            sentences[params.target]["id_"],
            "speaker",
            sentences[params.source]["speaker"] === "bot" ? "speaker" : "bot"
          )
        );
      } else if (sentences[params.source]["speaker"] === "None") {
        dispatch(
          updateNode(
            sentences[params.source]["id_"],
            "speaker",
            sentences[params.target]["speaker"] === "bot" ? "speaker" : "bot"
          )
        );
      }
      dispatch(updateFlow(params.source, params.target, 1));
    }
  };
  const [clickedElement, setClickedElement] = useState({
    id: "1000-0",
    source: "1000",
    target: "0",
  });

  //Handle deletion of nodes and edges
  const [iconDelete, setIconDelete] = useState(true);
  const deletePressed = useKeyPress("Delete");
  useEffect(() => {
    if(clickedElement["id"].includes("-")) {
      dispatch(updateFlow(clickedElement.source, clickedElement.target, 0));
    } else {
      dispatch(removeNode(clickedElement.id))
      dispatch(removeFlow(clickedElement.id))
    }
    //Turn Disconnected Nodes to none
    Object.keys(flow).filter(id => id !== "1000" && flow[id].length === 0 && !Object.values(flow).flat().includes(id)).map( id => dispatch(updateNode(id, "speaker", "None")))
    setClickedElement({ id: "1000-0", source: "0", target: "0" });
  }, [deletePressed, iconDelete]);

  return (
    <div className={"diagram_container"}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onEdgeClick={(event, edge) => setClickedElement(edge)}
          onNodeClick={(event, node) => setClickedElement(node)}
          onNodesChange={onNodesChange}
        >
          <Background />
          <Controls>
            <ControlButton
              onClick={() => setIconDelete(!iconDelete)}
              title="To delete selected, or click 'delete'"
            >
              <div className={"delete"}>🗑️</div>
            </ControlButton>
            <ControlButton
              className={"Add-Button"}
              onClick={() => add_Node()}
              title="To delete selected, or click 'delete'"
            />
          </Controls>
        </ReactFlow>
      </ReactFlowProvider>
      {/*<button onClick={() => console.log(sentences)}>test</button>*/}
    </div>
  );
};

export default Diagram;
