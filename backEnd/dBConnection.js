const mongoose = require('mongoose');

const connectDB =()=>{
    mongoose.connect('mongodb://localhost:27017/blog')
    .then(()=>{
        console.log("database connected")
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDB;