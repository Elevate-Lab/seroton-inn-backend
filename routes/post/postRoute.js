const express = require('express');
const router = express.Router();
const { createPost,
  updatePost,
  getAllPost,
  getSinglePost
} = require("../../controllers/postController");
const upload = require('../../middlewares/upload')
const searchAndFilterPosts = require('../../middlewares/searchAndFilterPosts')

// Create Post
router.route("/create").post(upload.single("file"), createPost);

// Update Post
router.route("/update/:id").post(updatePost);

// Get All the Posts
router.get('/', searchAndFilterPosts, getAllPost);

// Get a single post
router.get('/:id', getSinglePost);

module.exports = router
