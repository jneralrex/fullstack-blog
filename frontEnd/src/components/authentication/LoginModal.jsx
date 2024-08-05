import '../styles/authentications/LoginModal.css';
import { IoCloseOutline } from "react-icons/io5";
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalDataContext } from '../../context/GlobalData';

const LoginModal = () => {
    const {setReloadPage, setIsLoginModalOpen, setLoggedUser } = useContext(GlobalDataContext);
    const [userLogin, setLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post("http://localhost:9000/api/blog/users/login", userLogin);
            console.log("Login response:", res.data);
            if (res.data.message === 'Login successful') {
                setLogin(userLogin => ({ ...userLogin, ...res.data.data }));
                alert('Login successfully');
                localStorage.setItem("Blog_User", JSON.stringify(res.data.data));
                setLoggedUser(res.data);
                setIsLoginModalOpen('');
                setReloadPage(true);
                navigate('/');
            } else {
                alert('Login unsuccessful');
                return;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert('Error occurred during login');
        }
    }
    

    return (
        <div>
            <div className="login-modal-outter">
                <div className="login-modal-inner">
                    <div className="login-close-modal" onClick={()=>setIsLoginModalOpen('')}>
                        <IoCloseOutline style={{ margin: '1px' }} size={30} />
                    </div>
                    <div className="login-action-title">
                        Log in
                    </div>
                    <div className="login-t-and-c">
                        By continuing, you agree to our <span>User Agreement</span> and acknowledge that you understand the <span>Privacy Policy</span>.
                    </div>
                    <div className="login-form-area">
                        <form onSubmit={validate}>
                            <div className="login-form-block">
                                <input
                                    type="email"
                                    className='login-form-input'
                                    placeholder='Email'
                                    value={userLogin.email}
                                    onChange={e => setLogin({ ...userLogin, email: e.target.value })}
                                />
                            </div>
                            <div className="login-form-block">
                                <input
                                    type="password"
                                    className='login-form-input'
                                    placeholder='Password'
                                    value={userLogin.password}
                                    onChange={e => setLogin({ ...userLogin, password: e.target.value })}
                                />
                            </div>
                            <div className="login-form-block">
                                <input type="submit" className='login-form-input' value='Continue' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
