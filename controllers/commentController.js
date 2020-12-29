const Comment = require('../models/commentModel')

exports.createComment = async (req, res) => {
    try{
        const comment = new Comment({
            user_id: req.params.user_id,
            post_id: req.params.post_id,
            comment: req.body.comment,
            userName: req.body.userName
        })
        await comment.save()
        res.json({
            msg: "Added comment successfully",
            err: null,
            comment: comment
        })
    } catch(error){
        res.json({
            msg: "Error adding comment",
            err: error
        })
    }
}

exports.getComments = async (req, res) => {
    try{
        const commentsList = await Comment.find({post_id: req.params.post_id})
        res.json({commentsList})
    } catch(error) {
        res.send({
            msg: "Error retrieving comment",
            err: error
        })
    }
}

exports.updateComment = async (req, res) => {
    try{ 
        await Comment.updateOne(
            {
                _id: req.params.comment_id
            },
            {
                $set:{
                    comment: req.body.comment
                }
            }
        )
        res.send({
            msg: "Comment updated successfully",
            err: null
        })
    } catch(error){
        res.send({
            msg: "Error updating comment",
            err: error
        })
    }
}

exports.deleteComment = async (req, res) => {
    try{
        await Comment.remove({
            _id: req.params.comment_id
        })
        res.send({
            msg: "Comment deleted successfully",
            err: null
        })
    } catch(error){
        res.send({
            msg: "Error deleting comment",
            err: error
        })
    }
}