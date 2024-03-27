var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ios2024:Q1EtKuyx0y9mxK8s@cluster0.w4q1xhe.mongodb.net/AppRaoVat', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}, function(err){
    if(err){
        console.log("Mongodb connected error! " + err);
    }else{
        console.log("Mongodb connected successfully.");
    }
});

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

require("./Routes/FileManager")(app);
require("./Routes/Account")(app);
require("./Routes/City")(app);
require("./Routes/Category")(app);
require("./Routes/Post")(app);