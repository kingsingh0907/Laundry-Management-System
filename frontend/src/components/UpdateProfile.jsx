import React, { useState } from 'react';
import "../css/updateProfile.css"
import axios from 'axios';
import { SERVER_URL } from '../constants'

function UpdateProfile() {

    const [showModal, setShowModal] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [imageURL, setImageURL] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            setShowModal(false);
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);

            reader.onloadend = () => {
                setImageURL(reader.result);
            };

            let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

            axios.post(`${SERVER_URL}/user/updateProfile`, { data: imageURL , cookieValue})
                .then(res => console.log(res))
                .catch(err => console.log(err));
            axios.post(`${SERVER_URL}/staff/updateProfile`, { data: imageURL , cookieValue})
                .then(res => console.log(res))
                .catch(err => console.log(err));

        } else {
            console.log('No file selected');
        }
        setSelectedFile(null);
    };

    return (
        <div>
            <button className="update-imageBtn" onClick={(e) => { e.preventDefault(); setShowModal(true) }}>
                Update Photo
            </button>
            {showModal && (
                <>
                    <div className="modal-parent" onClick={e => setShowModal(false)}></div>
                    <div className="modal-child">
                        <h1 className="modal-heading">Select Image</h1>
                        <form encType="multipart/form-data" method="POST" >
                            <label htmlFor="fileInput" className="up-custom-file-upload">
                            </label>
                            <input
                                className="up-custom-file-upload"
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={(e) => { setSelectedFile(e.target.files[0]) }}
                                name="avatar"
                            />
                            {selectedFile && (
                                <div className="up-selected-file">
                                    Selected File: {selectedFile.name}
                                </div>
                            )}
                            <button onClick={handleSubmit} className="modal-close-btn" type="submit">Upload</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default UpdateProfile;