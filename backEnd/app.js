const express = require('express');
const app = express();
const PORT = 9000;
const cors = require('cors');
const dbConnection = require('./dBConnection');
const userApiRoute = require('./Routes/users.route');
const adminApiRoute = require('./Routes/admin.route');
const postApiRoute = require('./Routes/post.route');
const commentApiRoute = require('./Routes/comment.route');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/uploads", express.static("uploads"));
dbConnection();

app.use('/api/blog/users', userApiRoute);
app.use('/api/blog/admin', adminApiRoute);
app.use('/api/blog/post', postApiRoute);
app.use('/api/blog/post/comment', commentApiRoute);

app.listen( PORT, (err)=>{
    if(err) throw err
});