import React, {useEffect, useState} from "react";
import "./dockModal.scss";
import {useDispatch} from "react-redux";
import {Col, Form, InputGroup, Row} from "react-bootstrap";
import {updateField} from "../../redux/nodeDataSlice";
import Recorder from "../Media/Recorder";
import Media from "../Media/Media";

const DockModal = ({node, updateLabel}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [showRecorderOverlay, setShowRecorderOverlay] = useState(false);
    const [showMediaOverlay, setShowMediaOverlay] = useState(false);

    useEffect(() => {
        setShow(node !== undefined);
        setShowRecorderOverlay(show);
        setShowMediaOverlay(show);
    }, [node]);

    const splitText = (text) => text.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");

    const handleOverlayButtonClick = (event, setFunction) => {
        event.preventDefault();
        setFunction((prevValue) => !prevValue);
    };
    return (
        <div className={"modal-container"}>
            <div className={"modal-header"}>
                <div className={"modal_minimize"} onClick={() => setShow(!show)}/>
                <div className={"modal-header-title"}>
                    {node === undefined
                        ? ""
                        : node["hebrew"].length > 30
                            ? `${node["hebrew"].substring(0, 30)}...`
                            : node["hebrew"]}
                </div>
            </div>
            {show && (
                <div className={"modal-body"} key={node !== undefined ? node["id_"] : "1"}>
                    <Form style={{marginTop: 5}}>
                        {node !== undefined &&
                            Object.entries(node).map(([key, value]) => {
                                if (key === "speaker" || key === "id_" || key === "isCorrectAnswer") {
                                    return null; // Skip rendering the speaker, id_, and isCorrectAnswer fields
                                }
                                return (
                                    <Form.Group as={Row} className="mb-0" controlId={`formControl${key}`} key={key}>
                                        <Form.Label size="sm" xs={3} column>
                                            {key.substring(0, 13)}
                                        </Form.Label>
                                        <Col size="sm" style={{marginRight: 5}}>
                                            <InputGroup size="sm">
                                                <Form.Control
                                                    dir={["mediaPath","voiceRecPath"].includes(key) ? "ltr" : "rtl"}
                                                    autoComplete="off"
                                                    type="text"
                                                    placeholder={key}
                                                    defaultValue={value}
                                                    disabled={["mediaPath","voiceRecPath"].includes(key)}
                                                    onChange={(e) => {
                                                        dispatch(
                                                            updateField(
                                                                node["id_"],
                                                                key,
                                                                key === "keywords" ? splitText(e.target.value) : e.target.value
                                                            )
                                                        );
                                                        if (key === "hebrew") {
                                                            updateLabel(node["id_"], e.target.value);
                                                        }
                                                    }}/>
                                                {key === "voiceRecPath" &&
                                                    <Recorder show={showRecorderOverlay}   onClick={(event) => handleOverlayButtonClick(event, setShowRecorderOverlay)}
                                                    />
                                                }
                                                {key === "mediaPath" &&
                                                    <Media show={showMediaOverlay}   onClick={(event) => handleOverlayButtonClick(event, setShowMediaOverlay)}
                                                    />
                                                }
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                );
                            })}
                    </Form>
                </div>
            )}
        </div>
    );
};

export default DockModal;