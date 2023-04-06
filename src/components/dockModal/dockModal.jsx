import React, {useEffect, useState} from "react";
import "./dockModal.scss";
import Table from "react-bootstrap/Table";
import {update} from "../Node/nodeSlice";
import {useDispatch} from "react-redux";
const DockModal = ({node}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    useEffect( () => setShow(true),[node] )

    return (
        <div className={"modal-container"}>
            <div className={"modal-header"}>
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
                                            <input className={"sm-input"}
                                                value={node[field]}
                                                onChange={(e) =>
                                                    dispatch(update(node["id_"],field, e.target.value))
                                                }
                                            />
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