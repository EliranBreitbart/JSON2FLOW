import React, { useState } from "react";
import {
  Container,
  Modal,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { load as loadNodeData } from "../../redux/nodeDataSlice";
import { load as loadFlow } from "../diagram/flowSlice";
import { load as loadSentences } from "../Node/nodeSlice";
import Example from "./Example.json";

const Header = ({updateStepsEnabled}) => {
  /* element functions */
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleLoadExampleFile = () => {
    // Create a File object with the pre-existing file
    const file = new File([JSON.stringify(Example)], "Example.json", {
      type: "application/json",
    });

    // Create an event object with the file
    const event = {
      target: {
        files: [file],
      },
    };

    // Call the handleChange function with the event
    handleChange(event);
  };
  const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {props.msg}
      </Tooltip>
  );

  /* handle load */
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        [loadNodeData, loadFlow, loadSentences].map((func) =>
            dispatch(func(json)));
        //wait(0).then(() => dispatch(updateLoaded())); //wait for items to load before dispatching
      } catch (e) {
        console.log(e);
        setShow(true);
      }
    };
  };
  /*HandleLoad modal error */
  const [show, setShow] = useState(false);

  /* get states and export */
  const data = useSelector((state) => state.fileInfo.value);
  const flow = useSelector((state) => state.edges.json);
  const sentences = useSelector((state) => state.nodes.json);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify({ ...data, ...flow, ...sentences })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Conversation editor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <div style={{display:"flex"}} className={"load-export"}>
                <OverlayTrigger
                    id="load-tooltip"
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ msg: "Load Json File" })}
                >
                  <Nav.Link href="#load" onClick={handleClick}>
                    Load
                  </Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ msg: "Export Json File" })}
                >
                  <Nav.Link href="#export" onClick={exportData}>
                    Export
                  </Nav.Link>
                </OverlayTrigger>
              </div>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ msg: "Load example File" })}
                >
                  <Nav.Link className={"example"} href="#example" onClick={handleLoadExampleFile}>
                    Example
                  </Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ msg: "Take a tour through the site" })}
                >
                  <Nav.Link onClick={updateStepsEnabled} href="#tour" >
                    Tour
                  </Nav.Link>
                </OverlayTrigger>
              </Nav>
            </Navbar.Collapse>
            <div style={{ position: "absolute", bottom: "5px", right: "5px", fontSize: "12px", color: "lightgray" }}>
              ver2, by Eliran Breitbard
            </div>
          </Container>
        </Navbar>
        {/* hidden input box for files */}
        <input
            type="file"
            id="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            onClick={(event) => {
              event.target.value = null;
            }}
            style={{ display: "none" }}
        />
        {/* Error message popup when wrong json file is uploaded */}
        <Modal
            show={show}
            onShow={() => setShow(true)}
            onHide={() => setShow(false)}
            size="sm"
        >
          <Modal.Body>
            <div align="center">Loaded file is not a valid JSON</div>
          </Modal.Body>
        </Modal>
      </>
  );
};

export default Header;
