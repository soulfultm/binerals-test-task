import React, { useState } from 'react';
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import Content from './components/content/content'
import Footer from './components/footer/footer'
import { authContext } from './context/authContext'
import { useAuth } from './hooks/authHook'
import './style.scss';
import './media.scss';

function App() {
  const [sidebarMenu, setSidebarMenu] = useState(false)

  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  const mobileMedia = window.matchMedia('(max-width: 480px)')

  return (
    <authContext.Provider value={{ login, logout, token, userId, isReady, isLogin, mobileMedia }}>
      <div className="App">
        <Header open={sidebarMenu} setOpen={setSidebarMenu} />
        <div className='middle-part'>
          <Sidebar open={sidebarMenu} />
          <div className='content-and-footer'>
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </authContext.Provider>
  );
}

export default App;
