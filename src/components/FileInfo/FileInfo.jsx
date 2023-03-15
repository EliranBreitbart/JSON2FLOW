import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
/* //TODO:
*       When file is loaded populate form fields
* */

const FileInfo = props => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            {Object.keys(props.json).map((field,index) =>{
                                if(index<7) return <tr key={index}>
                                        <td key={index.toString() + "1"}>{`${field}:`}</td>
                                        <td key={index.toString() +"2"}>
                                            <input key={index.toString() + "3"} value ={{...props.json}[field]} onChange={ (e) => onFieldChange(field,e.target.value)}/>
                                        </td>
                                    </tr>
                                }
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
