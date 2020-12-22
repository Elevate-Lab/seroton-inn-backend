const postModel = require("../models/postModel");

exports.createPost = async (req, res) => {
  const post = new postModel(req.body);
  await post.save();
  res.redirect("/posts");
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  await postModel.findByIdAndUpdate(id, req.body);
  res.redirect("/");
};
