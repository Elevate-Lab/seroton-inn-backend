const router = require("express").Router();
const { createPost, updatePost } = require("../controllers/postController");
const upload = require('../middlewares/upload')

router.route("/create").post(upload.single("file"),createPost);
router.route("/update/:id").post(updatePost);

module.exports = router;
