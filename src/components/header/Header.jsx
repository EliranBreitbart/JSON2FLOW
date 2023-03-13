import React from 'react';
import {Container, Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";

/* //TODO:
*       Add load functionality
* */
const Header = props => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = event => {
      props.setJson(JSON.parse(event.target.result));
    };
  };
  const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {props.msg}
      </Tooltip>
  );
  return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Conversation editor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip({msg : "Load Json File"})}>
                  <Nav.Link href="#load" onClick={handleClick} >Load</Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip({msg : "Export Json File"})}>
                <Nav.Link href="#export">Export</Nav.Link>
                </OverlayTrigger>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <input type='file' id='file' ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}}/>
      </>
  );
};

export default Header;
