import React from "react";
import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { load as loadData } from "../FileInfo/fileInfoSlice";
import { load as loadFlow } from "../diagram/flowSlice";
import { load as loadSentences } from "../Node/nodeSlice";

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
      dispatch(loadData(JSON.parse(event.target.result)));
      dispatch(loadFlow(JSON.parse(event.target.result)));
      dispatch(loadSentences(JSON.parse(event.target.result)));
    };
  };

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
      <input
        type="file"
        id="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default Header;
