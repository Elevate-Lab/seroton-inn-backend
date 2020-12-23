const postModel = require("../models/postModel");

exports.createPost = async (req, res) => {
  try{
    const post = new postModel({
      content: req.body.content,
      creationTime: req.body.creationTime,
      creatorEmail: req.body.creatorEmail,
      contentLink: req.body.contentLink,
      fileName: req.file.filename
    });
    await post.save();
    res.json(post)
  } catch(err) {
    return res.send(`Error: ${err}`);
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  await postModel.findByIdAndUpdate(id, req.body);
  res.redirect("/");
};
