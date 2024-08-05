const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user_id:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true
    }, 
    text:{
        type:String,
    }, 
    postImages:{
        type:String
    },
    date_created: {
        type: Date,
        default: Date.now()
      },
}, {timestamps:true});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
