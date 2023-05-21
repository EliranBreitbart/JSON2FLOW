import React, {useCallback, useEffect, useState} from "react";
import ReactFlow, {
    Background, ControlButton, Controls, ReactFlowProvider, useNodesState,
    useEdgesState, useReactFlow,
} from "reactflow";
import ConnectionLine from "../Node/ConnectionLine";
import "./diagram.scss";
import CustomNode from "../Node/node";
import {useDispatch, useSelector} from "react-redux";
import dagre from "dagre";
import {wait} from "@testing-library/user-event/dist/utils";
import {addNode} from "../../redux/nodeDataSlice";
import {addNode as addNodeToFlow, updateEdge} from "../../redux/edgeDataSlice";
/*
 * TODO:
 *  Add remove functionality.
 *  Add logic to adding new edges (or add logic and display issues).
 *
 *  */

function findMissingNumber(ids) {
    // Convert the IDs from strings to numbers
    const numbers = ids.map(Number);

    // Sort the numbers in ascending order
    numbers.sort((a, b) => a - b);

    // Find the first missing number
    let missingNumber = null;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== numbers[i + 1] - 1) {
            missingNumber = numbers[i] + 1;
            break;
        }
    }

    // If no missing number found, the missing number is the next number in the sequence
    if (missingNumber === null) {
        missingNumber = numbers[numbers.length - 1] + 1;
    }

    return missingNumber.toString(); // Convert the missing number back to a string
}
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
    markerEnd: { type: 'arrowclosed', color: '#b1b1b7'},
    type: "step",
})
const nodeTypes = {
    customNode: CustomNode,
};
const Flow = () => {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    //region /* NODES */
    const {sentences} = useSelector((state) => state.nodes.json);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const memoizedCreateNode = useCallback(
        (sentence) => createNode(sentence),
        []
    );

    const add_node = () => {
        const newNode = {
            id_: findMissingNumber(Object.keys(sentences)),
            arabic: "",
            arabicWithoutDiacritics: "",
            hebrew: "טקסט",
            transcription: "",
            voiceRecPath: "",
            keywords: [],
            speaker: "None"
        };
        dispatch(addNode(newNode));
        dispatch(addNodeToFlow(newNode["id_"]));
        setNodes(nds => nds.concat(memoizedCreateNode(newNode)));
    };
    useEffect(() =>{console.log(Object.keys(sentences))},[sentences])
    //endregion
    //region /* Edges */
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {flow} = useSelector((state) => state.edges.json);
    const memoizedCreateEdge = useCallback(
        (source, target) => createEdge(source, target),
        []
    );
    const onConnect = (params) => {
        console.log(params)
        dispatch(updateEdge(params.source, params.target,0));
        const edge = memoizedCreateEdge(params.source, params.target);
        if(!edges.some((element) => element.id === edge.id)) {
            setEdges((eds) => eds.concat(edge));
        }
    }

    useEffect(() => {
        if(nodes.length !== 0)
            return;
        console.log("Create");
        Object.values(sentences).map((sentence) => { // creating  nodes
            setNodes((nds) =>
                nds.concat(memoizedCreateNode(sentence)))
        })
        for (const [source, value] of Object.entries(flow)){  // creating edges
            value.forEach((target) => {
                    const edge = memoizedCreateEdge(source.toString(), target.toString());
                    if(!edges.some((element) => element.id === edge.id)){
                        setEdges((eds) => eds.concat(edge));
                    }
                }
            );
        }

    },[])



    //endregion
    //region    /* Tree */
    useEffect(()=> {
        if(!loaded && Object.values(sentences).length === nodes.length && Object.values(flow).flat().length === edges.length){
            wait(1).then(() =>Tree())
            setLoaded(true);
        }
    },[edges])

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
    //endregion

    return (
            <div className={"diagram_container"}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
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
                            onClick={() => {add_node()}}
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
