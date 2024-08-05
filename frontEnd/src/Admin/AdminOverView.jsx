import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import './styles/General.css'
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const AdminOverView = () => {
  const [allUsers, setAllUsers] = React.useState([]);
  const [allPost, setAllPost] = React.useState([]);
  const [allComment, setAllComment] = React.useState([]);



  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await axios.get('http://localhost:9000/api/blog/users');
        if (Array.isArray(resp.data.data)) {
          setAllUsers(resp.data.data);
         
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, []);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const resp = await axios.get('http://localhost:9000/api/blog/post');
        if (Array.isArray(resp.data.data)) {
          setAllPost(resp.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPost();
  }, []);

  React.useEffect(() => {
    const fetchComment = async () => {
      try {
        const resp = await axios.get('http://localhost:9000/api/blog/post/comment');
        if (Array.isArray(resp.data.data)) {
          setAllComment(resp.data.data);
          console.log('Comment',resp.data.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchComment();
  }, []);

  return (
    <div>
         <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Item sx={{ height: '20ch', backgroundColor:'rgb(246,233,217)' }}>Total User <PeopleIcon /> <div>{allUsers.length}</div> </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ height: '20ch', backgroundColor:'rgb(155,117,198)' }}>Total Post <PostAddIcon /> <div>{allPost.length}</div></Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ height: '20ch', backgroundColor:'rgb(210,242,224)' }}>Total Likes <FavoriteBorderIcon/></Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ height: '20ch', backgroundColor:'rgb(247,179,69)' }}>Total Comment <CommentIcon/>  <div>{allComment.length}</div> </Item>
              </Grid>
            </Grid>
    </div>
  )
}

export default AdminOverView