const express = require('express')
const User = require('../../models/userModel')
const user_operations = express.Router()

user_operations.get('/:user_id/getProfile' ,(req , res) => {
    var googleId = req.params.user_id;
    User.find({googleId: googleId}, function(err,response){
        if(err){
            res.json({message: err});
        }
        else{
            res.json({user: response});
        }
    })
});

user_operations.patch('/:user_id/editUser' , async (req , res)=> {
    var user_id = req.params.user_id;

    User.findOneAndUpdate({googleId: user_id} , {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        profilePic: req.body.profilePic
    },function(err,response){
        if(err){
            console.log(err);
        }
        else{
            console.log("user", response);
        }
    });
});

user_operations.post('/:user_id/delete' , (req , res) => {
    var user_id = req.params.user_id;
    User.findOneAndUpdate({googleId: user_id} , {
        account_activation_status: false
    },function(err,response) {
        if(err){
            console.log(err);
        }
        else{
            console.log("deletion successfull");
        }
    });
});

module.exports = user_operations;