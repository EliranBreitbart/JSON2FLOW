import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { update as updateFlow, reset as resetFlow } from "../diagram/flowSlice";
import { update as updateNode, reset as resetNode } from "../Node/nodeSlice";
import "./diagram.scss";


/*
* TODO:
*  Update create nodes
*  Validate Flow (circles, speakers)
*  */


const Diagram = () => {
  const sentences = useSelector((state) => state.sentences.value);
  const dispatch = useDispatch();
  const nodes = Object.values(sentences.sentences).map((sentence,index) => {
    return {
      id: sentence["id_"].toString(),
      position: {x:index*100, y:index*100},
      data: {label: sentence["hebrew"]},
    }
  })
  const flow = useSelector((state) => state.flow.value);
  const edges = Object.keys(flow.flow).map(key =>{
    return flow.flow[key].map(iid => ({id:key + "-" + iid, source:key, target:iid}))}).flat()

  return (
      <div className={"diagram_container"}>
        <ReactFlow nodes={nodes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
        {/*<button onClick={() =>dispatch(updateFlow("1000", "1001", "remove"))}>test</button>*/}
      </div>
  );
};

export default Diagram;