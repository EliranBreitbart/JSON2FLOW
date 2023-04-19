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
import { load as loadData } from "../FileInfo/fileInfoSlice";
import { load as loadFlow } from "../diagram/flowSlice";
import { load as loadSentences } from "../Node/nodeSlice";
import { updateLoaded } from "../Node/nodeSlice";
import {wait} from "@testing-library/user-event/dist/utils";

const Header = () => {
  /* element functions */
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
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
        [loadData, loadFlow, loadSentences].map((func) =>
            dispatch(func(json)));
        wait(0).then(() => dispatch(updateLoaded())); //wait for items to load before dispatching
      } catch (e) {
        setShow(true);
      }

    };
  };
  /*HandleLoad modal error */
  const [show, setShow] = useState(false);

  /* get states and export */
  const data = useSelector((state) => state.fileInfo.value);
  const flow = useSelector((state) => state.flow.value);
  const sentences = useSelector((state) => state.sentences.value);

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
            </Nav>
          </Navbar.Collapse>
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
      <Modal show={show} onShow={() => setShow(true)} onHide={() => setShow(false)} size="sm">
        <Modal.Body>
          <div align="center">Loaded file is not a valid JSON</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
