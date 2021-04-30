const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    word:{
        type: String,
        required: true,
    },
    
    path: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Video", videoSchema);