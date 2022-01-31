import React from "react";
import axios from "axios";
import '../modal/popup.scss';

const DeleteImage = ({ setDelete }) => {
    const deleteFile = async (e) => {
        const correntData = JSON.parse(localStorage.getItem('setImage'))
        const newObject = {
            imageId: correntData.imageId,
            id: correntData.id
        };
        localStorage.removeItem('setImage');
        try {
            let res = await axios.post('/api/add/delete',
                newObject
            );
            console.log(res)
            setDelete(res.data.message)
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <button className="btn-files-delete popup-button-files waves-effect waves-light btn" onClick={deleteFile}>Delete</button>
        </>
    );
}


export default DeleteImage;