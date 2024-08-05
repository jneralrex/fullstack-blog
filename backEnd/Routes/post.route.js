const express = require('express');
const { createPost, singlePost, getAllPost, editPost, deletePost } = require('../Controllers/post.controller');
const route = express.Router();
const FileUpload = require("../middlewares/FileUpload");

route.post('/',  FileUpload.single("postImages"), createPost);
route.get('/', getAllPost);
route.get('/:id', singlePost);
route.put('/:id', editPost);
route.delete('/:id', deletePost)

 
module.exports = route;