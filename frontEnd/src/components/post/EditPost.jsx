import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import "../styles/post/PostInput.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalDataContext } from "../../context/GlobalData";

const EditPost = () => {
const{loggedUser} = useContext(GlobalDataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState({});
  const [post, setPost] = useState({ user_id: loggedUser._id, title: '', text: '' });

  const getSinglePost = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/blog/post/${id}`);
      const data = res.data.data;
      setDetails(data);
    } catch (error) {
      console.error(error); 
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  useEffect(() => {
    if (details) {
      setPost({ user_id:loggedUser._id, title: details.title, text: details.text });
    }
  }, [details, loggedUser._id]);

  const postUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/blog/post/${id}`, post);
      alert('Post updated successfully!');
      navigate(`/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        className="text-form"
        onSubmit={postUpdate}
      >
        <div className="input-box">
          <FormControl>
            <OutlinedInput
              placeholder="Please enter title"
              id="outlined-title-input"
              sx={{ borderRadius: "2ch", width: "61ch" }}
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </FormControl>
        </div>

        <div className="file-box">
          <FormControl>
            <OutlinedInput
              placeholder="Please enter text"
              id="outlined-text-input"
              sx={{ borderRadius: "2ch", width: "61ch", height: "20ch" }}
              value={post.text}
              onChange={(e) => setPost({ ...post, text: e.target.value })}
            />
          </FormControl>
        </div>

        <div className="submit-btn">
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            sx={{ borderRadius: "100ch", border: "none" }}
          >
            Post
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditPost;
