import React, { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const UploadContent = ({ onUpload }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setSelectedFile(file);
        }
    };

    const handleUploadClick = () => {
        onUpload(selectedFile);
        setPreviewUrl(null); // clear the preview
        setSelectedFile(null); // clear the selected file
    };

    return (
        <div className="upload-container" style={{ textAlign: 'center' }}>
            <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
            />
            {previewUrl && (
                <div style={{ marginTop: '15px' }}>
                    {selectedFile && selectedFile.type.startsWith('image') ? (
                        <img src={previewUrl} alt="Uploaded Preview" style={{ maxWidth: '100%',height:'100%', maxHeight: '200px' }} />
                    ) : (
                        <video width="100%" height="100%" controls>
                            <source src={previewUrl} type={selectedFile.type} />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            )}
            {selectedFile && (
                <div style={{ marginTop: '15px' }}>
                    <Button onClick={handleUploadClick}>Finalize Upload</Button>
                </div>
            )}
        </div>
    );
};


const Media = ({ onClick, show }) => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUpload = (file) => {
        setUploadedFile(file);
        // Now you can process this file, e.g. send it to a server
    };

    return (
        <OverlayTrigger
            trigger="click"
            key="top"
            placement="top"
            overlay={
                <Popover id="popover-positioned-top">
                    <Popover.Header as="h3">Upload Media</Popover.Header>
                    <Popover.Body>
                        <UploadContent onUpload={handleUpload} />
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
