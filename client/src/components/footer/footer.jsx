import React from 'react';
import './footer.scss'
import { AiOutlineCopyright } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-wrapper">
                <div className="fw-first-block">
                    <a href='home' className="home fw-link">Home</a>
                    <a href='chat' className="chat fw-link">Chat</a>
                    <a href='setting' className="setting fw-link">Setting</a>
                </div>
                <div className="fw-second-block">
                    <span className='notice-copyright'><AiOutlineCopyright /> Copyright 2022</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
