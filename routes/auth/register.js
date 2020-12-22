const express = require("express");
const passport = require('passport');
const User = require('../../models/userModel');

const router = express.Router();


router.get("/", (req, res) => {
    console.log(req.body);
    res.send("Welcome to Register Page");
});

router.post("/", (req,res) => {
    console.log(req.body);
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {

          //This function will add the email ID of the user to the document.
          User.updateOne({_id: user._id}, {googleId: req.body.email}, function(err){
            if(err){
              console.log(err);
            } else {
              console.log("Email updated!");
            }
          });
          passport.authenticate("local")(req, res, function(){
            res.send("Registered Successfully !\n"+user);
          });
        }
      });
})
module.exports = router;