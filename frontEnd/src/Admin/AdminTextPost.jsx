import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import "../components/styles/post/PostInput.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminGlobalDataContext } from "./AdminGlobalDataProvider";

const AdminTextPost = () => {
const {loggedAdmin} = useContext(AdminGlobalDataContext)
  const navigate = useNavigate();

  const [post, setPost] = useState({
    user_id:loggedAdmin._id,
    title: "",
    text: "",
  });

  const postUpdate = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:9000/api/blog/post",
        post
      );
      setPost({ user_id:"", title: "", text: "",
      });
      navigate("/admin/control-panel/all-posts");
    } catch (error) {
      console.log(error);
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

export default AdminTextPost;
