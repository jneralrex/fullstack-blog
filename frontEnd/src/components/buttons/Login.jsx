import React, { useContext, useState } from 'react'
import '../../components/styles/buttons/Join.css'
import LoginModal from '../../components/authentication/LoginModal';
import { GlobalDataContext } from '../../context/GlobalData';

const Login = () => {
    const {isLoginModalOpen, setIsLoginModalOpen} = useContext(GlobalDataContext);
    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
        if (!isLoginModalOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };

  return (
    <div>
        <div onClick={toggleLoginModal}>
            Log in
        </div>
        {isLoginModalOpen && <LoginModal closeLoginModal={toggleLoginModal} />}
    </div>
  )
}

export default Login