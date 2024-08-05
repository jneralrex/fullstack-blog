const Post = require("../Models/post.model");
const User = require('../Models/user.model')
const { RespErr } = require("../middlewares/RespErr");


const createPost = async (req, res) => {
    try {
        const getUser = await User.findById(req.body.user_id);
        if (getUser) {
          const new_post = new Post(req.body);
          if (req.file) {
            new_post.postImages = req.file.path;
          }
          try {
            const result = await new_post.save();
            res.status(201).json({
              message: "Post Created",
              data: result,
            });
          } catch (err) {
            res.status(404).json({ message: err.message });
          }
        }
      } catch (error) {
        RespErr(error, "Invalid user_id", res);
      }
};

const getAllPost = async (req, res) => {

    try {
        const result = await Post.find()
        if (!result) {
            res.json({
                status: 404,
                message: 'Operation on successful, id not found'
            })
        } else {
            res.json({
                status: 200,
                message: 'OPeration successful',
                length: result.length,
                data: result
            })
        }
    } catch (error) {
        console.error(error)
    }
};

const singlePost = async (req, res) => { 
    try {
        const id = req.params.id;
        const result = await Post.findById(id,{});
        if (!result) {
            res.json({
                status: 404,
                message: 'Operation not successful, id not found'
            })
        } else {
            res.json({
                status: 200,
                message: 'Operation successful',
                data: result
            })
        }
    } catch (error) {
        console.error(error)
    }
};

const editPost = async (req, res) => {
    try {
        const id = req.params.id;
        const updated_value = req.body;
        const result = await Post.findByIdAndUpdate(id, updated_value, { new: true })
        if (!result) {
            res.json({
                status: 404,
                message: 'Operation not successful'
            })
        } else {
            res.json({
                status: 200,
                message: 'Post updated successful',
                data: result
            })
        }
    } catch (error) {
        console.error(error)
    }
};

const deletePost =async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Post.findByIdAndDelete(id)
        if (!result) {
            res.json({
                status: 404,
                message: 'Operation not successful, id not found'
            })
        } else {
            res.json({
                status: 200,
                message: 'Post deleted successful',
                data: result
            })
        }
    } catch (error) {
        console.error(error)
    }
};

module.exports = { createPost, getAllPost, singlePost, editPost, deletePost}