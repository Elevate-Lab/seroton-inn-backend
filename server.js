const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

const User = require('./models/userModel');

// require("dotenv/config");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//Including CORS to facilitate frontend/backend communication
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // All requests from this server will be intercepted here.
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Facilitates browser session cookies
  })
);

/* -------- Set up session ------------*/
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  /* -------- Session set up ended ------------*/


  /* -------- Passport serialise ------------*/
  passport.use(User.createStrategy());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  /* -------- Passport serialise ended ------------*/


/*Routes Config*/

const indexRoute = require("./routes/index");
const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const googleAuth = require('./routes/auth/googleAuth');
const userOperation = require('./routes/user/user_operations')

/*-----Routes Config End------*/


/*App Config*/

app.use("/",indexRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/auth/google", googleAuth);
app.use("/user" , userOperation);

/*------App Config End--------*/


/* Mongoose config*/
const uri = process.env.MONGO_URL || "mongodb://localhost:27017/sereton-inn";

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

/*----Mongoose config End-----*/

app.listen(port,() => {
    console.log(`Server started on port ${port}`);
});