import React, { useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { update as updateFlow, reset as resetFlow } from "../diagram/flowSlice";
import { update as updateNode, reset as resetNode } from "../Node/nodeSlice";
import "./diagram.scss";

/*
 * TODO:
 *  Update create nodes
 *  Validate Flow (circles, speakers)
 *  Edge Removal
 *  Node addition
 *  Node removal
 *  */

const Diagram = () => {
  const { sentences } = useSelector((state) => state.sentences.value);
  const dispatch = useDispatch();
  const nodes = Object.values(sentences).map((sentence, index) => {
    const speaker = sentence["speaker"] === "bot" ? "bot" : "user";
    return {
      id: sentence["id_"].toString(),
      position: { x: index * 100, y: index * 100 },
      data: { label: sentence["hebrew"] },
      className: speaker,
    };
  });

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

  const onConnect = (params) => {
    if (
      sentences[params.source]["speaker"] != sentences[params.target]["speaker"]
    ) {
      dispatch(updateFlow(params.source, params.target, 1));
    }
  };

  return (
    <div className={"diagram_container"}>
      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect}>
        <Background />
        <Controls />
      </ReactFlow>
      {/*<button onClick={() => console.log(sentences)}>test</button>*/}
    </div>
  );
};

export default Diagram;
