const express = require('express')
const router = express.Router()

const {
    createComment,
    getComments,
    updateComment,
    deleteComment
} = require('../../controllers/commentController')

// Create a comment
router.route('/create/:post_id/:user_id').post(createComment)

// Get all comments on a single post
router.route('/:post_id').get(getComments)

// Edit comment
router.route('/update/:comment_id').patch(updateComment)

// Delete comment
router.route('/delete/:comment_id').delete(deleteComment)

module.exports = router