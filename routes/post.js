const router = require("express").Router();
const { createPost, updatePost } = require("../controllers/post");

router.route("/create").post(createPost);
router.route("/update/:id").post(updatePost);

module.exports = router;
