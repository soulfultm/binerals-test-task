import React, { useState, useContext } from 'react';
import '../popup.scss';
import axios from 'axios';
import { authContext } from '../../../../context/authContext';



const Popup = ({ active, setActive }) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [responseLog, setResponseLog] = useState({
        reportLog: '',
    })

    const { login } = useContext(authContext)

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    login(response.data.token, response.data.userId)
                })
            const correntLink = window.location.pathname;
            document.location.href = correntLink + "chat";
        } catch (error) {
            setResponseLog({
                reportLog: error.response.data.message
            })
        }
    }
    return (
        <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                <div className='popup-span'>LOGIN</div>
                <form action="" className='popup-form' onSubmit={e => e.preventDefault()}>
                    <input onChange={changeHandler} type="email" name="email" className="popup-input" placeholder='Email' />
                    <input onChange={changeHandler} type="password" name="password" className="popup-input" placeholder='Password' />
                    <button onClick={loginHandler} className="waves-effect waves-light btn">Autorization</button>
                </form>
                <div className='popup-inform'>{responseLog.reportLog}</div>
            </div>
        </div>
    );
}

export default Popup;
