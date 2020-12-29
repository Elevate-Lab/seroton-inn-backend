const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/userModel");
const cors = require('cors')
const bodyParser = require('body-parser')

// imp packages for file uploads
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

require("dotenv/config");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
/* -------- Passport serialise ended ------------*/

/* -------- Passport serialise ended ------------*/

/*Routes Config*/

const indexRoute = require("./routes/index");
const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const googleAuth = require('./routes/auth/googleAuth');
const userOperation = require('./routes/user/user_operations');
const postsRoute = require('./routes/post/postRoute');
const commentRoute = require('./routes/comment/commentRoute');

/*-----Routes Config End------*/

/*App Config*/

app.use("/", indexRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/auth/google", googleAuth);
app.use("/user", userOperation);
app.use("/posts", postsRoute);
app.use("/comments", commentRoute);


/*------App Config End--------*/

/* Mongoose config*/
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sereton-inn";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

let gfs;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  
  //Initialize our stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('imageUpload');
});

app.get('/image/:imageName', (req, res) => {
  gfs.files.findOne({ filename: req.params.imageName }, (err, file) => {
    //check if files exist
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: "No files exist"
      })
    }
    //check if image
    if (file.contentType === 'image/jpeg' || file.contentType === "image/png") {
      //read output to browser
      const readStream = gfs.createReadStream(file.filename)
      readStream.pipe(res)
    } else {
      res.status(404).json({
        err: "Not an image"
      })
    }
  })
});

/*----Mongoose config End-----*/

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});