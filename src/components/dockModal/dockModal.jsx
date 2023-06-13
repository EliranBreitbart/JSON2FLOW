import React, { useEffect, useState } from "react";
import "./dockModal.scss";
import { useDispatch } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { updateField } from "../../redux/nodeDataSlice";

const DockModal = ({ node, updateLabel }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(node !== undefined);
  }, [node]);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const splitText = (text) => text.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");

  const startRecording = (event) => {
    event.preventDefault();
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = (event) => {
    event.preventDefault();
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const downloadAudio = (event) => {
    event.preventDefault();
    const downloadLink = document.createElement("a");
    downloadLink.href = audioURL;
    downloadLink.setAttribute("download", "audio");
    downloadLink.click();
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          const chunks = [];
          recorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            chunks.length = 0; // Clear the chunks array
          };
        })
        .catch((error) => {
          console.log("Following error has occurred: ", error);
        });
    }
  }, []);

  const renderControls = () => {
    if (!mediaRecorder) {
      return <p>Your browser does not support media devices.</p>;
    }

    if (!audioURL && !isRecording) {
      return (
        <>
        <label>Record</label>
          <button onClick={startRecording}>Start Recording</button>
          <p>Click the button to start recording.</p>
        </>
      );
    }

    if (isRecording) {
      return (
        <>
          <p>Recording in progress...</p>
          <button onClick={stopRecording}>Stop Recording</button>
        </>
      );
    }

    return (
      <>
        <audio controls src={audioURL}></audio>
        <button type = "button" onClick={startRecording}>Record Again</button>
        <button type = "button" onClick={downloadAudio}>Download Audio</button>
      </>
    );
  };

  return (
    <div className={"modal-container"}>
      <div className={"modal-header"}>
        {/* Modal header content */}
      </div>
      {show && (
        <div className={"modal-body"} key={node !== undefined ? node["id_"] : "1"}>
          <Form style={{ marginTop: 5 }}>
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
                    <Col size="sm" style={{ marginRight: 5 }}>
                      {key === "record" ? (
                      renderControls()
                      ) : (
                        <Form.Control
                          dir={key === "voiceRecPath" ? "ltr" : "rtl"}
                          autoComplete="off"
                          size="sm"
                          type="text"
                          placeholder={key}
                          defaultValue={value}
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
                          }}
                        />
                      )}
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