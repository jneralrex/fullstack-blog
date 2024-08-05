import React, { useContext, useState } from 'react'
import '../../components/styles/buttons/Join.css'
import SignUpModal from '../../components/authentication/SignUpModal'
import  { GlobalDataContext } from '../../context/GlobalData';

const Join = () => {
    const {isModalOpen, setIsModalOpen, loggedUser} = useContext(GlobalDataContext)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = ''; 
        }
      };
      
      const alertUser =()=>{
        alert('hello')
      }
  return (
    <div>
        <button onClick={ loggedUser._id  ? alertUser : toggleModal}>
            Join
        </button>
        {isModalOpen && <SignUpModal closeModal={toggleModal} />}
    </div>
  )
}

export default Join