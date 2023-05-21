import React, {useCallback, useEffect} from "react";
import ReactFlow, {
    Background, ControlButton, Controls, ReactFlowProvider, useNodesState,
    useEdgesState, useReactFlow,
} from "reactflow";
import ConnectionLine from "../Node/ConnectionLine";
import "./diagram.scss";
import CustomNode from "../Node/node";
import {useSelector} from "react-redux";
import dagre from "dagre";
import {wait} from "@testing-library/user-event/dist/utils";

const createNode = (sentence) => ({
    id: sentence["id_"],
    type: "customNode",
    data: {label: sentence["hebrew"], speaker: sentence["speaker"], sentence: sentence},
    position: {x: 0, y:0},
    className: "customNode",
})

const createEdge = (source, target) => ({
    id: source +"-" + target,
    source: source,
    target: target,
    markerEnd: { type: 'arrowclosed', color: '#b1b1b7' },
    type: "step",

})
const nodeTypes = {
    customNode: CustomNode,
};
const Flow = () => {
    /* NODES */
    const {sentences} = useSelector((state) => state.nodes.json);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const memoizedCreateNode = useCallback(
        (sentence) => createNode(sentence),
        []
    );
    /* Edges */
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {flow} = useSelector((state) => state.edges.json);
    const memoizedCreateEdge = useCallback(
        (source, target) => createEdge(source, target),
        []
    );
    useEffect(() => {
        if(nodes.length !== 0)
            return;
        console.log("create");
        Object.values(sentences).map((sentence) => {
            setNodes((nds) =>
                nds.concat(memoizedCreateNode(sentence)))
        })
        for (const [source, value] of Object.entries(flow)){
            value.forEach((target) => {
                    const edge = memoizedCreateEdge(source.toString(), target.toString());
                    if(!edges.some((element) => element.id === edge.id)){
                        setEdges((eds) => eds.concat(edge));
                    }
                }
            );
        }

    },[])

    useEffect(()=> {
            if(Object.values(sentences).length === nodes.length && Object.values(flow).flat().length === edges.length){
            console.log("ddd")
            wait(1).then(() =>Tree())
        }
    },[edges])

    /* Tree */
    const reactFlowInstance = useReactFlow();
    let graph = new dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(function () { return {} });

    const Tree = () => {
        const realNodes = reactFlowInstance.getNodes();
        realNodes.forEach((node) => {
            graph.setNode(node.id, { width: node.width, height: node.height });
        });
        const realEdges = reactFlowInstance.getEdges();
        realEdges.forEach((edge) => {
            graph.setEdge(edge.source, edge.target);
        });
        dagre.layout(graph) ;
            setNodes((nds) =>
                nds.map((node) => {
                    const nodeWithPosition = graph.node(node.id);
                    return {...node, position:{x: nodeWithPosition.x - nodeWithPosition.width / 2,
                            y:nodeWithPosition.y - nodeWithPosition.height / 2}}}
                ))
    }
    return (
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
                            onClick={() => Tree()}
                            title="Rearrange Nodes to Tree"/>
                    </Controls>

                </ReactFlow>
                {/* <DockModal node={sentences[clickedElement.id]}/> */}
            </div>
    );
};
const Diagram = () => {

  return (
      <ReactFlowProvider>
          <Flow/>
      </ReactFlowProvider>
  );
};
export default Diagram;
