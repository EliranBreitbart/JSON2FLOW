import React, {useEffect, useState} from "react";
import "./dockModal.scss";
import Table from "react-bootstrap/Table";
import {update} from "../Node/nodeSlice";
import {useDispatch} from "react-redux";
import InputState from "./inputState";
const DockModal = ({node}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    useEffect( () => setShow(true),[node] )
    return (
        <div className={"modal-container"}>
            <div className={"modal-header"} onClick={() => {if(!show)setShow(true)}}>
                <div className={"modal_minimize"} onClick={() => setShow(!show)}/>
                <div className={"modal-header-title"}>id: {(node !== undefined) ? node["id_"] : ""}</div>
            </div>
            <div className={"modal-body"}>
                <form>
                    <Table className={"table"} borderless size="sm">
                        <tbody>
                        {/* Dynamically creates the fields from the Json file and onChange functions */}
                        {(node !== undefined && show) ? Object.keys(node).filter(x => !["speaker", "id_"].includes(x)).map((field, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{`${field}:`}</td>
                                        <td>
                                            <InputState field ={field} node={node} dispatch={dispatch} id={node["id_"]} value ={node[field]} />
                                        </td>
                                    </tr>
                                );
                        }) : <></>}
                        </tbody>
                    </Table>
                </form>
            </div>
        </div>
    );
};
export default DockModal;

