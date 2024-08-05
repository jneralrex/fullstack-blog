import '../components/styles/post/PostCard.css';
import { TbAward } from "react-icons/tb";
import { PiArrowFatUpThin } from "react-icons/pi";
import { PiArrowFatDownThin } from "react-icons/pi";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import { SlOptionsVertical } from "react-icons/sl";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';



const AllPostCard = () => {
  const [getPost, setGetPost] = useState([]);

  const displayPost = async () => {
    try {
      const resp = await axios.get('http://localhost:9000/api/blog/post');
      if (Array.isArray(resp.data.data)) {
        setGetPost(resp.data.data);
      }
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    displayPost();
  })

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/createPost/${id}`)
      setGetPost(getPost.filter(post => post.id !== id))
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div>
      {getPost.map((post) => (
        <div className="post-holder-outter" key={post.id}>
          <div className="post-holder-inner">
            <div className="user-details-holder">
              <div className="details-outter">
                <div className="user-profile-pics"></div>
                <div className="details-inner">
                  <div className="post-class">r/AITH</div>
                  <div className="post-time">. {new Date(post.createdAt).toUTCString()} .</div>
                </div>
              </div>
            </div>
            <Link to={`/admin/control-panel/${post._id}`} >
              <div className="caption-title">{post.title}</div>
              <div className="post-text">
                <TextTruncate
                  line={6}
                  truncateText="…"
                  text={post.text}
                  style={{ color: "black" }}
                />
              </div>
              <div className="post-image">
                  <img
                    src={post?.postImages ? `http://localhost:9000/${post.postImages}` : ''}
                    className='post-card-img'
                  />
                </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllPostCard;
