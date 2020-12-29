const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            ref: "User",
            require: true
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            require: true
        },
        comment: {
            type: String,
            require: true
        },
        userName:{
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Comment", commentSchema)