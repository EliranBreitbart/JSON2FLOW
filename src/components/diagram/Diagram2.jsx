import React, {useEffect, useState} from "react";
import ReactFlow, {
    Background, ControlButton, Controls, ReactFlowProvider, useNodesState,
    useEdgesState, useReactFlow, useKeyPress,
} from "reactflow";
import ConnectionLine from "../Node/ConnectionLine";
import "./diagram.scss";
import CustomNode from "../Node/node";
import {useDispatch, useSelector} from "react-redux";
import dagre from "dagre";
import {wait} from "@testing-library/user-event/dist/utils";
import {addNode, removeNode} from "../../redux/nodeDataSlice";
import {addNode as addNodeToFlow, removeEdges, updateFlowEdge} from "../../redux/edgeDataSlice";
import DockModal from "../dockModal";
/*
 * TODO:
 *  Add logic to adding new edges (or add logic and display issues).
 *  word-break
 *  voice
 *  backend
 *  react context menu
 *  lock dock modal
 *  float label for modal?
 *  */

function findMissingNumber(ids) {
    // Convert the IDs from strings to numbers and sort them in ascending order
    const numbers = ids.map(Number).sort((a, b) => a - b);

    let expectedNumber = 1000;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > expectedNumber) {
            break;
        }
        expectedNumber++;
    }

    return expectedNumber.toString();
}
const createNode = (sentence, updateClass) => ({
    id: sentence["id_"],
    type: "customNode",
    data: { label: sentence["hebrew"], speaker: sentence["speaker"], sentence: sentence, updateClass: updateClass },
    position: { x: 0, y: 0 },
    className: sentence["speaker"] === "bot" ? "customNodeBot" : "customNodeSpeaker",
})

const createEdge = (source, target) => ({
    id: source + "-" + target,
    source: source,
    target: target,
    markerEnd: { type: 'arrowclosed', color: '#b1b1b7' },
    type: "step",
})

const nodeTypes = {
    customNode: CustomNode,
};

const Flow = () => {
    const [loaded, setLoaded] = useState(false);
    const [clickedElement, setClickedElement] = useState(null);
    const dispatch = useDispatch();

    //region /* NODES */
    const {sentences} = useSelector((state) => state.nodes.json);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const updateClass = (id, newClass) => {
        setNodes((prevNodes) => {
            return prevNodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        className: newClass,
                    };
                }
                return node;
            });
        });
    };

    const updateLabel = (id, newLabel) => {
        setNodes((prevNodes) => {
            return prevNodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: newLabel,
                        },
                    };
                }
                return node;
            });
        });
    };
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
        setNodes(nds => nds.concat(createNode(newNode, updateClass)));
    };
    //endregion
    //region /* Edges */
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {flow} = useSelector((state) => state.edges.json);

    const onConnect = (params) => {
        dispatch(updateFlowEdge(params.source, params.target,0));
        const edge = createEdge(params.source, params.target);
        if(!edges.some((element) => element.id === edge.id)) {
            setEdges((eds) => eds.concat(edge));
        }
    }

    useEffect(() => {
        Object.values(sentences).map((sentence) => { // creating nodes
            setNodes(existingNodes =>
                existingNodes.concat(createNode(sentence, updateClass)))
        });
        for (const [source, value] of Object.entries(flow)) {  // creating edges
            value.forEach((target) => {
                const edge = createEdge(source.toString(), target.toString());
                if (!edges.some((element) => element.id === edge.id)) {
                    setEdges(existingEdges => existingEdges.concat(edge));
                }
            });
        }
    }, []);

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

        dagre.layout(graph);

        setNodes(existingNodes =>
            existingNodes.map((node) => {
                const nodeWithPosition = graph.node(node.id);
                return {
                    ...node,
                    position: {
                        x: nodeWithPosition.x - nodeWithPosition.width / 2,
                        y: nodeWithPosition.y - nodeWithPosition.height / 2
                    }
                }
            })
        );
    };
    //endregion
    //region /*Delete*/
    const deletePressed = useKeyPress("Delete");

    const deleteEdgeFromDiagram = () => {
        dispatch(updateFlowEdge(clickedElement.source, clickedElement.target, 1));
        setEdges(existingEdges => existingEdges.filter(edge => edge.id !== clickedElement.id));
    }
    const deleteNodeFromDiagram = () => {
        dispatch(removeNode(clickedElement.id));
        dispatch(removeEdges(clickedElement.id));
        setNodes(existingNodes => existingNodes.filter(node => node.id !== clickedElement.id));
        setEdges(existingEdges => existingEdges.filter(edge => edge.source !== clickedElement.id && edge.target !== clickedElement.id));
    }

    const deleteElementFromDiagram = () => {
        if (clickedElement && clickedElement.type === 'customNode') {
            deleteNodeFromDiagram();
        }
        if (clickedElement && clickedElement.type === 'step') {
            deleteEdgeFromDiagram();
        }
    }
    useEffect( deleteElementFromDiagram,[deletePressed]);
    //endregion


    return (
            <div className={"diagram_container"}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onEdgeClick={(event, edge) => setClickedElement(edge)}
                    onNodeClick={(event, node) => setClickedElement(node)}
                    onPaneClick={() => setClickedElement(null)}
                    onConnect={onConnect}
                    connectionLineComponent={ConnectionLine}
                    nodeTypes={nodeTypes}

                >
                    <Background />
                    <Controls>
                        <div   className={"buttons_"}>
                        <ControlButton
                            onClick={() => {}}
                            title="To delete selected, or click 'delete'"
                        >
                            <div className={"delete"} onClick={deleteElementFromDiagram}>🗑️</div>
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
                        </div>
                    </Controls>

                </ReactFlow>
                <DockModal node={clickedElement !== null ? sentences[clickedElement.id] : undefined} updateLabel={updateLabel}/>
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
