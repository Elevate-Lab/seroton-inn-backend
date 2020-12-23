const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  creationTime: Number,
  creatorEmail: String,
  contentLink: String,
  fileName: String,
});

module.exports = mongoose.model("Post", postSchema);
