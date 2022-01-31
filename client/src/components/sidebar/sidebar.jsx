import React, { useState, useContext } from 'react';
import './sidebar.scss'
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { RiLogoutBoxFill } from 'react-icons/ri';

import { authContext } from '../../context/authContext';
import Profile from '../header/profile/profile'
import AuthForm from '../header/modal/authForm'
import Upload from '../header/upload/upload'

const Sidebar = ({ open }) => {
    const [modalActivePhoto, setModalActivePhoto] = useState(false)
    const listActive = {
        home: window.location.pathname === '/',
        chat: window.location.pathname === '/chat',
        setting: window.location.pathname === '/setting'
    }

    const { logout, isLogin } = useContext(authContext)

    const logoutToggle = {
        data: <div className='listBar lb-logout'><a onClick={logout} href='/' className="Logout"><RiLogoutBoxFill /><span>Logout</span></a></div>
    }

    const newOb = isLogin ? <Profile setActivePhoto={setModalActivePhoto} /> : <AuthForm />;
    const mediaQuery = window.matchMedia('(max-width: 480px)')

    const barMenu = {
        data: <div className={open ? 'open sidebar' : 'close sidebar'}>
            <div className='listBar'>
                {mediaQuery.matches ? newOb : ''}
                <Upload activePhoto={modalActivePhoto} setActivePhoto={setModalActivePhoto} />
            </div>
            <div className={listActive.home ? 'listActive listBar' : 'listBar'}>
                <a href='/' className="Home"><AiFillHome /><span>Home</span></a>
            </div>
            <div className={listActive.chat ? 'listActive listBar' : 'listBar'}>
                <a href='chat' className="Chat"><BsFillChatLeftTextFill /><span>Chat</span></a>
            </div>
            <div className={listActive.setting ? 'listActive listBar' : 'listBar'}>
                <a href='setting' className="Setting"><AiFillSetting /><span>Setting</span></a>
            </div>
            {isLogin ? logoutToggle.data : ''}
        </div>
    }
    return (
        <>
            {barMenu.data}
        </>
    );
}

export default Sidebar;
