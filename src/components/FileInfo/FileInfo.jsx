import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
const FileInfo = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /* //TODO:
    *       convert Form to ControlForm from react-bootstrap
    *       Make sure data doesnt disappear from jsonView (redux?)
    * */
    function onFieldChange(field,value){
        props.setJson(oldJson =>{
            //localStorage.setItem(field,value)
            const newJson = {...oldJson}
            newJson[field] = value
            return newJson
        })}


return (
        <>
            <Button style= {{position:"absolute",bottom:20,right:20,alignSelf:'flex-end'}} variant="primary" onClick={handleShow}>
                File Info
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Basic File Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form>
                        <Table borderless size="sm" >
                            <tbody>
                            {/* Dynamically creates the fields from the Json file and onChange functions */}
                            {Object.keys(props.json).map((field,index) =>
                                index<7 ? <tr><td>{`${field}:`}</td> <td> <input onChange={ (e) => onFieldChange(field,e.target.value)}/> </td></tr> : <></>
                            )}
                            {/*<tr><td>id:</td> <td> <input onChange={ (e) => onFieldChange("id",e.target.value)}/> </td></tr>*/}
                            {/*<tr><td>title</td> <td> <input onChange={ (e) =>props.setJson(oldJson =>{ return {...oldJson,title:e.target.value}})}/> </td></tr>*/}
                            {/*<tr><td>description</td> <td> <input /> </td></tr>*/}
                            {/*<tr><td>photo</td> <td> <input /> </td></tr>*/}
                            {/*<tr><td>level</td> <td> <input /> </td></tr>*/}
                            {/*<tr><td>category</td> <td> <input /> </td></tr>*/}
                            {/*<tr><td>CreatedBy</td> <td> <input /> </td></tr>*/}
                            </tbody>
                        </Table>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default FileInfo;
