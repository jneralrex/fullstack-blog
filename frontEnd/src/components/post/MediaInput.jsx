import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import '../styles/post/PostInput.css';
import { useContext, useState } from 'react';
import { GlobalDataContext } from '../../context/GlobalData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostInput = () => {
    const { loggedUser } = useContext(GlobalDataContext);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const navigate = useNavigate();

    const [postImage, setPostImage] = useState(null);

    const [createPost, setCreatePost] = useState({
        user_id: loggedUser._id,
        title: '',
        postImages: '',
    });

    const uploadImg = (e) => {
        setPostImage((prev) => (prev = e.target.files[0].name));
        setCreatePost((prev) => ({ ...prev, postImages: e.target.files[0] }));
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCreatePost((prev) => ({ ...prev, [name]: value }));
    };
    const uploadPost = async (e) => {
        e.preventDefault();

        if (!postImage) {
            alert("Please select an image file.");
            return;
        }

        try {
            let form_data = new FormData();
            form_data.append("user_id", createPost.user_id);
            form_data.append("title", createPost.title);
            form_data.append("postImages", createPost.postImages);
            const resp = await axios.post("http://localhost:9000/api/blog/post", form_data);
            setCreatePost({
                user_id: '',
                title: '',
                postImages: '',
            });
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form noValidate autoComplete="off" className='text-form' onSubmit={uploadPost}>
                <div className='input-box'>
                    <FormControl sx={{}}>
                        <OutlinedInput placeholder="Please enter text"
                            id="outlined-password-input"
                            sx={{ borderRadius: '2ch', width: '61ch' }}
                            value={createPost.title}
                            name='title'
                            onChange={handleInput}
                        />
                    </FormControl>
                </div>

                <div className='file-box'>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<IoCloudUploadOutline />}
                        sx={{
                            borderRadius: '2ch',
                            height: '20ch',
                            width: '70ch',
                            border: 'grey dotted',
                            backgroundColor: 'transparent',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'black',
                            }
                        }}
                    >
                        <VisuallyHiddenInput type="file" id="add_photo" onChange={uploadImg}
                        />
                        <p className='file-placeHolder'> Drag and Drop images or videos or</p>
                    </Button>
                </div>

                <div className="submit-btn">
                    <Button type="submit" variant="outlined" size="medium"
                        sx={{
                            borderRadius: '100ch',
                            border: 'none'
                        }}
                    >
                        Post
                    </Button>
                </div>
            </form>
        </>
    );
}

export default PostInput;
