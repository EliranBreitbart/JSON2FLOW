import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "./diagram.scss";

const Diagram = () => {
  const nodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hello" },
      type: "input",
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: "World" },
    },
  ];

  const edges = [{ id: "1-2", source: "1", target: "2" }];

  return (
    <div className={"diagram_container"}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
