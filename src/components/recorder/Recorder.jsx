import React, {useEffect, useState} from "react";
import {ButtonGroup, OverlayTrigger, Popover} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const RecorderContent = ({mediaRecorder, audioURL, isRecording, startRecording, stopRecording, downloadAudio}) => {
    return (
        <div className="recorder-container" style={{textAlign: 'center'}}>
            {!mediaRecorder && <p>Your browser does not support media devices.</p>}

            {!audioURL && !isRecording && (
                <d>
                    <Button size={"sm"} onClick={startRecording}>Start Recording</Button>
                </d>
            )}

            {isRecording && (
                <>
                    <p>Recording in progress...</p>
                    <Button size={"sm"} onClick={stopRecording}>Stop Recording</Button>
                </>
            )}

            {audioURL && !isRecording && (
                <>
                    <audio controls src={audioURL} style={{height: '30px', width: "250px"}}/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ButtonGroup aria-label="Basic example" size="sm">
                            <Button type="button" onClick={startRecording}>
                                Record Again
                            </Button>
                            <Button type="button" onClick={downloadAudio}>
                                Download Audio
                            </Button>
                        </ButtonGroup>
                    </div>

                </>
            )}
        </div>
    );
};

const Recorder = ({onClick, show}) => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);

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
                .getUserMedia({audio: true})
                .then((stream) => {
                    const recorder = new MediaRecorder(stream);
                    setMediaRecorder(recorder);

                    const chunks = [];
                    recorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                    };

                    recorder.onstop = () => {
                        const audioBlob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
                        const url = URL.createObjectURL(audioBlob);
                        setAudioURL(url);
                        chunks.length = 0; // Clear the chunks array
                    };
                })
                .catch((error) => {
                    console.log("Following error has occurred: ", error);
                });
        }
        console.log("re-render-recorder");
    }, []);

    return (
        <OverlayTrigger
            trigger="click"
            key={"top"}
            placement={"top"}
            overlay={
                <Popover id={`popover-positioned-top`}>
                    <Popover.Header as="h3">{`Audio Recording`}</Popover.Header>
                    <Popover.Body>
                        <RecorderContent
                            mediaRecorder={mediaRecorder}
                            audioURL={audioURL}
                            isRecording={isRecording}
                            startRecording={startRecording}
                            stopRecording={stopRecording}
                            downloadAudio={downloadAudio}
                        />
                    </Popover.Body>
                </Popover>
            }
        >
            <Button active={show} type="checkbox" variant="outline-secondary" id="button-addon2" onClick={onClick}>
                Record
            </Button>
        </OverlayTrigger>
    );
};

export default Recorder;
