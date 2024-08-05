const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id:{
        type:String,
        required: true
    },
    post_id:{
        type:String,
        required: true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;