import '../../components/styles/post/PostCard.css';
import Join from '../buttons/Join';
import { TbAward } from "react-icons/tb";
import { PiArrowFatUpThin, PiArrowFatDownThin } from "react-icons/pi";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import { GlobalDataContext } from '../../context/GlobalData';

const GuestPostView = () => {
  const { loggedUser } = useContext(GlobalDataContext);
  const [getPost, setGetPost] = useState([]);
  const [comments, setComments] = useState({});

  const displayPost = async () => {
    try {
      const resp = await axios.get('http://localhost:9000/api/blog/post');
      if (Array.isArray(resp.data.data)) {
        setGetPost(resp.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const displayComment = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:9000/api/blog/post/comment/my_com?post_id=${postId}`);
      if (Array.isArray(res.data.data)) {
        setComments((prevComments) => ({ ...prevComments, [postId]: res.data.data, }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displayPost();
  }, []);

  useEffect(() => {
    getPost.forEach((post) => {
      displayComment(post._id);
    });
  }, [getPost]);

  return (
    <div className="">
      <div>
        {getPost.map((post) => (
          <div className="post-holder-outter" key={post._id}>
            <div className="post-holder-inner">
              <div className="user-details-holder">
                <div className="details-outter">
                  <div className="user-profile-pics"></div>
                  <div className="details-inner">
                    <div className="post-class">r/AITH</div>
                    <div className="post-time">. .</div>
                    <div className="popularity-cat"></div>
                  </div> {new Date(post.createdAt).toUTCString()}
                </div>
                <div className="join"><Join /></div>
              </div>
              <Link to={`/${post._id}`}>
                <div className="caption-title">{post.title}</div>
                <div className="post-text">
                  <TextTruncate
                    line={6}
                    truncateText="...see more"
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
              <div className="interractions">
                <div className="interractions-btns">
                  <PiArrowFatUpThin size={20} /> <p>5</p> <PiArrowFatDownThin size={20} />
                </div>
                <Link to={`/${post._id}`}>
                  <div className="interractions-btns">
                    <VscComment size={20} /> {comments[post._id]?.length || 0}
                  </div>
                </Link>
                <div className="interractions-btns"><TbAward size={20} /></div>
                <div className="interractions-btns"><FiShare size={20} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestPostView;
