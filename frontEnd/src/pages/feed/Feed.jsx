import '../../pages/styles/Feed.css'
import { IoIosSearch } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import { RxViewHorizontal } from "react-icons/rx";
import PostCard from '../../components/post/PostCard';
import Login from '../../components/buttons/Login';
import Logo from '../../assests/images/15707772.png'
import SideNav from '../../components/Navbar/SideNav';
import { FcAdvertising } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import avatar from '../../assests/images/avatar_default_1.png'
import { Outlet, useNavigate } from 'react-router-dom';
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useContext, useEffect } from 'react';
import { GlobalDataContext } from '../../context/GlobalData';


const Feed = () => {
    const {reloadPage, setReloadPage, loggedUser} = useContext(GlobalDataContext);

    const navigate = useNavigate()

    useEffect(() => {
        if (reloadPage) {
            window.location.reload(); 
            setReloadPage(false); 
        }
    }, [reloadPage, setReloadPage]);

    const postNavigation = () =>{
        navigate('submit')
    }
    return (
        <div>
            <nav>
                <div className="logo-area">
                    <div className="logo-img">
                        <img src={Logo} alt="" srcSet="" />
                    </div>
                    <div className="platform-name">
                        Reddit
                    </div>
                </div>
                <div className="search-area">
                    <div className="search-icon">
                        <IoIosSearch size={26} style={{ color: 'black' }} />
                    </div>
                    <input type="text" name="" id="" placeholder='Search Reddit' className='search-input' />
                </div>
                {loggedUser._id ? (
                     <div className="av-right-side">
                     <div className='nav-btn createPost'>
                         <FcAdvertising size={25} />
                     </div>
                     <div className='nav-btn createPost'>
                         <FaRegCommentDots size={25} />
                     </div>
                     <div className='nav-btn createPost' onClick={postNavigation}>
                         <IoIosAdd size={30} />
                         <p>Create</p>
                     </div>
                     <div className='nav-btn createPost' >
                         <IoIosNotificationsOutline size={25} />
                     </div>
                     <div className="  nav-btn profile-img">
                         <img src={avatar} alt="" srcset="" />
                     </div>
                 </div>
                ) : (
                    <div className="nav-right-side">
                        <div className="get-app-btn">
                            Get the app
                        </div>
                        <div className="login-Btn"> 
                            <Login />
                        </div>
                        <div className="option-btn">
                            <IoEllipsisHorizontalSharp/>
                        </div>
                    </div>
                )}

            </nav>
            <div className="splitter">
                <div className="left-side">
                    {/* <div className="left-sec-one">
                    <div className="left-sec-one-items">
                    <GrHomeRounded size={20} style={{color:'black'}}/>
                    <p>Home</p>
                    </div>
                    <div className="left-sec-one-items">
                    <LuArrowUpRightFromCircle size={20} style={{color:'black'}}/>
                    <p>Popular</p>
                    </div>
                </div> */}
                    <SideNav />
                </div>
                <div className="right-side">
                    <div className="right-item">
                        <div className="right-nav">
                            <RxViewHorizontal size={15} style={{ color: 'grey' }} />
                        </div>
                      <main>
                      <Outlet/>
                      </main>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Feed;