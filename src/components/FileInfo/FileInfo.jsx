import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./fileInfoSlice";
import Form from "react-bootstrap/Form";

/* //TODO:
 *       When file is loaded populate form fields
 * */

const FileInfo = () => {
  /* Show /Unshow the OffCanvas */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = useSelector((state) => state.fileInfo.value);
  const dispatch = useDispatch();


  return (
    <>
      <Button className={"button"} variant="primary" onClick={handleShow}>
        File Info
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Basic File Information</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form>
            <Table borderless size="sm">
              <tbody>
                {/* Dynamically creates the fields from the Json file and onChange functions */}
                {Object.keys(data).map((field, index) => {
                  if (index < 10)
                    return (
                      <tr key={index}>
                        <td>{`${field}:`}</td>
                        <td>
                          { (field === "enable" || field === "draft") &&
                              <Form.Switch tabIndex="-1"
                                           style={{marginInlineEnd:5 ,textAlign:"left"}}
                                           type="switch"
                                           id={`isBot-switch`}
                                           defaultChecked={data[field]}
                                           onChange={() =>
                                               dispatch(update(field, field === "enable" ? !data[field] : !data[field]))}
                              /> ||
                              <input
                                  value={data[field]}
                                  onChange={(e) =>
                                      dispatch(update(field, e.target.value))
                                  }
                              />}
                        </td>
                      </tr>
                    );
                  return null;
                })}
              </tbody>
            </Table>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FileInfo;
