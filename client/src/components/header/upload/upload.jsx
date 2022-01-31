import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from '../../../context/authContext';
import '../modal/popup.scss';
import DeleteImage from '../deleteImage/deleteImage'

const Upload = ({ activePhoto, setActivePhoto }) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [inform, setInform] = useState("");

    const { userId } = useContext(authContext)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(userId);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            let res = await axios.post('/api/add/upload',
                formData,
                userId
            );
            localStorage.removeItem('setImage');
            localStorage.setItem('setImage', JSON.stringify({
                image: true,
                imageId: res.data.name,
                id: res.data.id
            }))
            console.log(res)
            setInform(res.data.message)
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className={activePhoto ? 'popup active' : 'popup'} onClick={() => setActivePhoto(false)}>
                <div className={activePhoto ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                    <form action="" className='popup-form' onSubmit={e => e.preventDefault()}>
                        <label className="popup-label-file" htmlFor="popup-file"><i className="fa fa-cloud-upload"></i>Выберите изображение</label>
                        <input className="popup-input-file" type="file" name="file" id="popup-file" onChange={saveFile} />
                        <button className="btn-files-upload popup-button-files waves-effect waves-light btn" onClick={uploadFile}>Upload</button>
                        <DeleteImage setDelete={setInform} />
                    </form>
                    <div className='popup-inform'>{inform ? inform : ''}</div>
                </div>
            </div>
            <div className="hello"></div>
        </>
    );
}

export default Upload;