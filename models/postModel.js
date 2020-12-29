const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const postSchema = new mongoose.Schema({
  content: String,
  creationTime: Number,
  creatorEmail: String,
  contentLink: String,
  fileDetails: Object,
});


postSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Post", postSchema);
