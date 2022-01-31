import React, { useState, useContext } from 'react';
import './header.scss'
import AuthForm from './modal/authForm'
import Profile from './profile/profile'
import Upload from './upload/upload'

import { authContext } from '../../context/authContext';


const Header = ({ open, setOpen }) => {
    const { isLogin } = useContext(authContext)
    const [modalActivePhoto, setModalActivePhoto] = useState(false)

    const newOb = isLogin ? <Profile setActivePhoto={setModalActivePhoto} /> : <AuthForm />;
    const mediaQuery = window.matchMedia('(max-width: 480px)')

    return (
        <div className='false-header-top'>
            <div className='header-top'>
                <div className="header-side">
                    <a className='logo' href="/">Logo</a>
                    <div className="sidebar-toggle">
                        <div className="menu-1">
                            <div onClick={() => setOpen(open ? false : true)} className="vector"></div>
                        </div>
                    </div>
                </div>
                <div className="header-content">
                    <div className="user">
                        {!mediaQuery.matches ? newOb : ''}
                    </div>
                    {!mediaQuery.matches ? <Upload activePhoto={modalActivePhoto} setActivePhoto={setModalActivePhoto} /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Header;
