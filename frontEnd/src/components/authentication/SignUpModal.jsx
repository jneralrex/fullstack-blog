import React, { useContext, useState } from 'react'
import '../styles/authentications/SignUpModal.css';
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from '../buttons/Login';
import { GlobalDataContext } from '../../context/GlobalData';


const SignUpModal = ({closeModal}) => {
    const {setReloadPage,  setLoggedUser, isModalOpen, setIsModalOpen } = useContext(GlobalDataContext);

    const [newUser, setNewUser] = useState({firstName:"", lastName:"", email:"", phone:"", password:""})
    const navigate = useNavigate()

    console.log(newUser)

    const regNewUser = async(e)=>{
        e.preventDefault()
        const res = await axios.post("http://localhost:9000/api/blog/users", newUser);
        setNewUser(newUser=>({...newUser, ...res.data}));
        console.log("sign up resonse",res.data);
        if(res.data.message === "User registered successfully"){
            localStorage.setItem("Blog_User", JSON.stringify(res.data.data));
            setLoggedUser(res.data);
            setIsModalOpen('');
            setReloadPage(true);
            navigate('/');
        }else{
            alert('Not good')
            return
        }
        
    }
  return (
    <>
        <div className="modal-outter">
            <div className="modal-inner">
                <div className="close-modal" onClick={closeModal}>
                     <IoCloseOutline style={{margin:'1px'}}size={30}/>
                </div>
                <div className="action-title">
                Sign Up
                </div>
                <div className="t-and-c">
                By continuing, you agree to our <span>User Agreement</span> and acknowledge that you understand the <span>Privacy Policy</span>.
                </div>
                <div className="form-area">
                    <form action="" onSubmit={regNewUser}>
                        <div className="form-block">
                            <input type="text" className='form-input' placeholder='Full name' 
                            value={newUser.firstName}
                            onChange={e =>  setNewUser({...newUser, firstName: e.target.value})}/>
                        </div>
                        <div className="form-block">
                            <input type="text"  className='form-input' placeholder='Last name' 
                            value={newUser.lastName}
                            onChange={e =>  setNewUser({...newUser, lastName: e.target.value})}/>
                        </div>
                        <div className="form-block">
                            <input type="email"  className='form-input' placeholder='Email' 
                             value={newUser.email}
                             onChange={e =>  setNewUser({...newUser, email: e.target.value})}
                            />
                        </div>
                        <div className="form-block">
                            <input type="tel"  className='form-input' placeholder='Phone number' 
                             value={newUser.phone}
                             onChange={e =>  setNewUser({...newUser, phone: e.target.value})}
                            />
                        </div>
                        <div className="form-block">
                            <input type="password"  className='form-input' placeholder='password' 
                             value={newUser.password}
                             onChange={e =>  setNewUser({...newUser, password: e.target.value})}
                            />
                        </div>
                        <div className="form-block">
                            <input type="password" className='form-input'placeholder='confirm password' />
                        </div>
                        <div className="form-block">
                            <input type="submit" className='form-input' value='Continue' />
                        </div>
                    </form>
                </div>
                <div className='login-route'>Already have an account? <span><Login/></span></div>
            </div>
        </div>

    </>
  )
}

export default SignUpModal