const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../../models/userModel");

router.get("/", (req, res) => {
  res.send("Welcome to Login Page");
});

router.post("/", (req, res) => {
  console.log(req.body);

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.send("Logged in sucessfully bud !");
      });
    }
  });
});
module.exports = router;
