const Comment = require("../Models/comment.model");

const createComment = async(req, res) =>{
try {
    const comment = req.body;
    try {
    const create_comment =  new Comment(comment);
    const result = await create_comment.save();
    if(!result){
        res.json({
            status: 404,
            message: 'Unable to create comment'
        })
    }else{
        res.json({
            status: 200,
            message: 'Comment created succesfully',
            data: result
        })
    }
    } catch (error) {
        console.error(error)
    }
} catch (error) {
    res.status(500).json({error: error.message})
}
};

const getCommentByPost = async(req, res) =>{
    try {
        const posts_id = req.query.post_id;
        const result = await Comment.find({post_id: posts_id}, {});
        if(!result){
            res.json({
                status: 404,
                message: 'ID not found'
            })
        }else{
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

const getAllComment = async (req, res) => {

    try {
        const result = await Comment.find()
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

module.exports = {createComment, getCommentByPost, getAllComment};
