const express = require('express');
const mongoose = require('mongoose');

require("dotenv/config");

const port = process.env.PORT || 5000;
const app = express();

/*Routes Config*/

const indexRoute = require("./routes/index");

/*-----Routes Config End------*/


/*App Config*/

app.use("/",indexRoute);

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