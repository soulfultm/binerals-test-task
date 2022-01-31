import React, { useState } from 'react';
import PopupLogin from './login/popupLogin'
import PopupRegistration from './registration/popupRegistration'
import './authForm.scss'

const Authform = () => {
    const [modalActiveLogin, setModalActiveLogin] = useState(false)
    const [modalActiveRegistration, setModalActiveRegistration] = useState(false)

    return (
        <>
            <div className="link-auth d-flex justify-content-end mt-2">
                <button onClick={() => setModalActiveLogin(true)} className="btn-auth btn btn-secondary me-1" as="a">Login</button>
                <button onClick={() => setModalActiveRegistration(true)} className="btn-auth btn btn-secondary" as="a">Registration</button>
            </div>
            <PopupLogin active={modalActiveLogin} setActive={setModalActiveLogin} />
            <PopupRegistration active={modalActiveRegistration} setActive={setModalActiveRegistration} />
        </>
    );
}

export default Authform;