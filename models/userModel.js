const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    password: String,
    name: String,
    email: String,
    profilePic: Object,
    account_activation_status: Boolean,
    posts: [{type: mongoose.Schema.Types.ObjectId , ref: 'Post'}]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);