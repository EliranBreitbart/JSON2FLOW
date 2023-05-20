import React, {useCallback, useEffect} from "react";
import ReactFlow, { Background, ControlButton, Controls, ReactFlowProvider, useNodesState,
    useEdgesState,} from "reactflow";
import ConnectionLine from "../Node/ConnectionLine";
import "./diagram.scss";
import CustomNode from "../Node/node";
import {useSelector} from "react-redux";


const createNode = (tid, title) => ({
    id: tid,
    type: "customNode",
    data: {label: title},
    position: {x: 0, y:0},
    className: "customNode",
})

const nodeTypes = {
    customNode: CustomNode,
};
const Diagram = () => {
    const titles = useSelector((state) => state.nodes.nodeTitles);
    const initialNodes = [];
    const initialEdges = [];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const memoizedCreateNode = useCallback(
        (tid, title) => createNode(tid, title),
        []
    );
    useEffect(() => {
        //Mount initial Nodes
        Object.keys(titles).forEach(tid =>
            setNodes((nds) =>
                nds.concat(memoizedCreateNode(tid, titles[tid]))));
        },[])
  return (
      <ReactFlowProvider>
          <div className={"diagram_container"}>
              <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  connectionLineComponent={ConnectionLine}
                  nodeTypes={nodeTypes}

              >
                  <Background />
                  <Controls>
                      <ControlButton
                          onClick={() => {}}
                          title="To delete selected, or click 'delete'"
                      >
                          <div className={"delete"}>🗑️</div>
                      </ControlButton>
                      <ControlButton
                          className={"Add-Button"}
                          onClick={() => {}}
                          title="To delete selected, or click 'delete'"
                      />
                      <ControlButton
                          className={"Tree-Button"}
                          onClick={() => {
                              console.log("test");
                              const newNode = memoizedCreateNode("1", "11");
                              console.log(nodes);
                              setNodes((nds) => nds.concat(newNode));
                          }}
                          title="Rearrange Nodes to Tree"/>
                  </Controls>
              </ReactFlow>
              {/* <DockModal node={sentences[clickedElement.id]}/> */}
          </div>
      </ReactFlowProvider>
  );
};
export default Diagram;
