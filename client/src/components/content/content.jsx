import React from 'react';
import './content.scss'

const Content = () => {
    const listActive = {
        home: window.location.pathname === '/',
        chat: window.location.pathname === '/chat',
        setting: window.location.pathname === '/setting'
    }
    const barMenu = {
        homeContent: <><h1 className='head-title'>Home title</h1>
            <h2 className='page-content'>Home page content</h2></>,
        chatContent: <><h1 className='head-title'>Chat title</h1>
            <h2 className='page-content'>Chat page content</h2></>,
        settingContent: <><h1 className='head-title'>Setting title</h1>
            <h2 className='page-content'>Setting page content</h2></>,
    }
    return (
        <div className='content'>
            <div className="content-header">
                {listActive.home && barMenu.homeContent}
                {listActive.chat && barMenu.chatContent}
                {listActive.setting && barMenu.settingContent}
            </div >
        </div>
    );
}

export default Content;
