const express = require('express');
const { createComment, getCommentByPost,getAllComment } = require('../Controllers/comment.controller');
const route = express.Router();

route.post('/', createComment);
route.get('/my_com', getCommentByPost);
route.get('/', getAllComment)

module.exports = route;