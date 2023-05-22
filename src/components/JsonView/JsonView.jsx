import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import "./JsonView.scss";
import { useSelector } from "react-redux";

/**
 * The JsonView component displays JSON data in a collapsible and interactive format.
 * It listens to changes in the Redux store for fileInfo, edges, and nodes,
 * and renders the combined JSON data using the ReactJson component.
 */
const JsonView = () => {
    // Retrieve data from the Redux store
    const data = useSelector((state) => state.fileInfo.value);
    const flow = useSelector((state) => state.edges.json);
    const sentences = useSelector((state) => state.nodes.json);

    // The source object to be displayed by ReactJson
    const [src, setSrc] = useState({});

    // Update the source object when data changes
    useEffect(() => {
        setSrc((prevSrc) => ({
            ...prevSrc,
            ...data,
        }));
    }, [data]);

    // Update the source object when flow changes
    useEffect(() => {
        setSrc((prevSrc) => ({
            ...prevSrc,
            ...flow,
        }));
    }, [flow]);

    // Update the source object when sentences change
    useEffect(() => {
        setSrc((prevSrc) => ({
            ...prevSrc,
            ...sentences,
        }));
    }, [sentences]);

    return (
        <div className="JsonView">
            {/* Render the JSON data using ReactJson */}
            <ReactJson name={false} displayDataTypes={false} src={src} />
        </div>
    );
};

export default React.memo(JsonView);
