const express = require('express')
const User = require('../../models/userModel')
const user_operations = express.Router()

user_operations.get('/:user_id/editProfile' , async (req , res) => {
    var user_id = req.params.user_id;
    var required_user = await User.find({ googleId: user_id}).exec();
    res.render("edit_profile" , {user: required_user});
});

user_operations.post('/:user_id/editUser' , async (req , res)=> {
    var user_id = req.params.user_id;
    User.update({googleId: user_id} , {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        profilePic: req.body.pic
    });
});

user_operations.post('/:user_id/delete' , (req , res) => {
    var user_id = req.params.user_id;
    User.update({googleId: user_id} , {
        account_activation_status: false
    });
    res.render("delete_success");
});

module.exports = user_operations;