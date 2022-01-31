import React, { useState } from 'react';
import '../popup.scss';
import axios from 'axios';

const Popup = ({ active, setActive }) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [validate, setValidate] = useState({
        correctEmail: '',
        correctPassword: '',
    })
    const [responseReg, setResponseReg] = useState({
        reportReg: '',
    })

    function validateValue(name, value) {
        const patternEmail = /^[a-z0-9_-]+@[a-z0-9-]+?\.[a-z]{2,3}$/;
        const patternPassword = /^[A-Za-zА-Яа-яЁё0-9_-]{5,15}$/;
        const resultEmail = name === 'email' ? patternEmail.test(value) === true ? 'valid' : 'invalid' : validate.correctEmail
        const resultPassword = name === 'password' ? patternPassword.test(value) === true ? 'valid' : 'invalid' : validate.correctPassword
        setValidate({
            correctEmail: resultEmail,
            correctPassword: resultPassword,
        })
    }

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
        validateValue(event.target.name, event.target.value)
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    setResponseReg({
                        reportReg: response.data.message
                    })
                })
        } catch (error) {
            setResponseReg({
                reportReg: error.response.data.message
            })
        }
    }
    return (
        <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                <div className='popup-span'>REGISTRATION</div>
                <form action="" className='popup-form' onSubmit={e => e.preventDefault()}>
                    <label className={validate.correctEmail + 'Email label-email'} htmlFor="popup-email"></label>
                    <input onChange={changeHandler} type="email" name="email" id="popup-email" className="popup-input" placeholder='Email' />
                    <label className={validate.correctPassword + 'Password label-password'} htmlFor="popup-password"></label>
                    <input onChange={changeHandler} type="password" name="password" id="popup-password" className="popup-input" placeholder='Password' />
                    <button onClick={registerHandler} className={'registration-button waves-effect waves-light btn ' + validate.correctEmail + validate.correctPassword}>Go</button>
                </form>
                <div className='popup-inform'>{responseReg.reportReg}</div>
            </div>
        </div>
    );
}

export default Popup;