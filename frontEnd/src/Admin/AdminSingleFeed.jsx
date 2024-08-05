import * as React from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { TbAward } from "react-icons/tb";
import { PiArrowFatUpThin, PiPencil } from "react-icons/pi";
import { PiArrowFatDownThin } from "react-icons/pi";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/singleFeed/styles/SingleFeed.css'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { IoEllipsisHorizontalSharp, IoPencil, IoTrashBin } from "react-icons/io5";
import { Tooltip } from '@mui/material';
import { AdminGlobalDataContext } from './AdminGlobalDataProvider';



const AdminSingleFeed = () => {
  const {loggedAdmin, setReloadPage} = React.useContext(AdminGlobalDataContext)
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate();
  // const [details, setDetails] = useState({});
  const [getComment, setGetComment] = useState([])

  console.log('Single product Id', id)

  const details = useLoaderData()


  const [comment, setComment] = useState({ user_id: loggedAdmin._id, post_id: id, comment: ''  });


  const postComment = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:9000/api/blog/post/comment', comment);  
      setComment({ post_id: '', comment: '' });
      // setReloadPage(true)
    } catch (error) {
      console.error(error);
    }
  };


  const displayComment = async() =>{
    try{
      const res = await axios.get(`http://localhost:9000/api/blog/post/comment/my_com?post_id=${id}`)
      console.log(res.data)
      if(Array.isArray(res.data.data)){
        setGetComment(res.data.data)
        // setReloadPage(false)
      }
    }
    catch(error){
      console.error(error)
    }
  }


  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/blog/post/${id}`);
      if (res.data.message === 'Post deleted successful') {
        alert('Post deleted successfully');
        navigate("/admin/control-panel/all-posts");
      }
    } catch (error) {
      console.error(error)
    }
  };

  // const getProductDetails = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:9000/api/blog/post/${id}`);
  //     console.log('details res:',res);
  //     const data = await res.data.data
  //     setDetails(data);
  //   } catch (error) {
  //     console.error(error); 
  //   }
  // };

  //   const getS  = async () =>{fetch(`http://localhost:9000/api/blog/post/${id}`)
  //   .then(res => res.json())
  //   .then(data=>setDetails(data.data))
  // }

  useEffect(() => {
    // getProductDetails();
    displayComment();
  }, [getComment]);

  return (
    <div>
      <div className="feed-post-holder-outter" >
        <div className="feed-post-holder-inner">
          <div className="feed-user-details-holder">
            <div className="feed-details-outter">
              <div className="feed-user-profile-pics"></div>
              <div className="feed-details-inner">
                <div className="feed-post-class">r/AITH</div>
                <div className="feed-post-time">. {new Date(details.createdAt).toUTCString()} .</div>
              </div>
            </div>
            <div className="join" >
              <div className="dropdown">
                <div className="dropbtn"> <IoEllipsisHorizontalSharp size={20} style={{ color: 'black' }} /></div>
                <div className="dropdown-content">
                  <div className="delete btn m-1" onClick={() => deletePost(id)} ><IoTrashBin /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="feed-caption-title">{details?.title}</div>
          <div className="feed-post-text">{details?.text}</div>
          <div className="post-image">
                <img src={details?.postImages ? "http://localhost:9000/" + details?.postImages : ''} className='post-card-img'/>
              </div>
          <div className="feed-interractions">
            <div className="feed-interractions-btns"><PiArrowFatUpThin /> <p>{getComment.length}</p> <PiArrowFatDownThin /></div>
            <div className="feed-interractions-btns">{getComment.length ? getComment.length : <p>Reply</p>} <VscComment /></div>
            <div className="feed-interractions-btns"><TbAward /></div>
            <div className="feed-interractions-btns"><FiShare /></div>
          </div>
        </div>
      </div>
      <div className="comment-area">
         {
            getComment && getComment.map((comments)=>(
       <div className="comment-post-holder-outter" key={comments._id}>
        <div className="profile-area">
          <div className="comment-user-profile-pics"></div>
          <div className="comment-username">SoftwaresDeveloper_dev </div>
          <div className="dot">.</div>
          <div className="comment-post-time"> {new Date(comments.createdAt).toUTCString()}.</div>
        </div>
        <div className="comment-post-holder-inner">
       
              <div className="comment-post-text">{comments?.comment}</div>
        
            {/* <div className="join" >
              <div className="dropdown">
                <div className="dropbtn"> <IoEllipsisHorizontalSharp size={20} style={{ color: 'black' }} /></div>
                <div className="dropdown-content">
                  <div className="delete btn m-1" onClick={() => deletePost(id)} ><Tooltip title="Delete" style={{ color: 'black' }}><IoTrashBin /></Tooltip></div>
                  <div className="Edit btn m-1" ><Link to={`/edit/${id}`}><PiPencil /></Link> </div>

                </div>
              </div>
            </div> */}
          <div className="comment-interractions">
            <div className="comment-interractions-btns"><PiArrowFatUpThin /> <p>5</p> <PiArrowFatDownThin /></div>
            <div className="comment-interractions-btns"><VscComment /></div>
            <div className="comment-interractions-btns"><TbAward /></div>
            <div className="comment-interractions-btns"><FiShare /></div>
          </div>
        </div>
      </div>
    ))
          }
      </div>
    </div>
  )
}

export default AdminSingleFeed;

export const AdminSingleFeedLoader = async ({ params }) => {
  try {
    const { id } = params;
    const resp = await axios.get(`http://localhost:9000/api/blog/post/${id}`);
    console.log('Signle', resp)
    return resp.data.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
}


