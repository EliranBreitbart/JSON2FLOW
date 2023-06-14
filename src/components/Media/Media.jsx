import React, { useState } from "react";
import {OverlayTrigger, Popover } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const UploadContent = ({ /*TODO: props*/}) => {
    return (
        <div className="upload-container" style={{ textAlign: 'center' }}>
            /*TODO: media upload UI*/
        </div>
    );
};

const Media = ({ onClick, show }) => {
    /*TODO: useState values*/
    return (
        <OverlayTrigger
            trigger="click"
            key="top"
            placement="top"
            overlay={
                <Popover id="popover-positioned-top">
                    <Popover.Header as="h3">Upload</Popover.Header>
                    <Popover.Body>
                        <UploadContent
                            /*TODO:  - use states*/
                        />
                    </Popover.Body>
                </Popover>
            }
        >
            <Button
                active={show}
                type="checkbox"
                variant="outline-secondary"
                id="button-addon2"
                onClick={onClick}
            >
                Upload
            </Button>
        </OverlayTrigger>
    );
};

export default Media;
